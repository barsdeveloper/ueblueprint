import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import Guid from "../Guid"
import Integer from "../entity/Integer"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import Parsimmon from "parsimmon"
import PinEntity from "../entity/PinEntity"
import Utility from "../Utility"
import ObjectEntity from "../entity/ObjectEntity"

let P = Parsimmon

export default class Grammar {
    // General
    InlineWhitespace = _ => P.regex(/[^\S\n]+/)
    InlineOptWhitespace = _ => P.regex(/[^\S\n]*/)
    WhitespaceNewline = _ => P.regex(/[^\S\n]*\n\s*/)
    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(_ => null).desc("null: ()")
    None = _ => P.string("None").map(_ => new ObjectReferenceEntity({ type: "None" })).desc("none")
    Boolean = _ => P.alt(P.string("True"), P.string("False")).map(v => v === "True" ? true : false).desc("either True or False")
    Number = _ => P.regex(/[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")
    Integer = _ => P.regex(/[0-9]+/).map(Integer).desc("an integer")
    String = _ => P.regex(/(?:[^"\\]|\\")*/).wrap(P.string('"'), P.string('"')).desc('string (with possibility to escape the quote using \")')
    Word = _ => P.regex(/[a-zA-Z]+/).desc("a word")
    Guid = _ => P.regex(/[0-9a-zA-Z]{32}/).desc("32 digit hexadecimal (accepts all the letters for safety) value")
    ReferencePath = _ => P.seq(P.string("/"), P.regex(/[a-zA-Z_]+/).sepBy1(P.string(".")).tieWith("."))
        .tie()
        .atLeast(2)
        .tie()
        .desc('a path (words with possibly underscore, separated by ".", separated by "/")')
    Reference = r => P.alt(
        r.None,
        r.ReferencePath.map(path => new ObjectReferenceEntity({ path: path })),
        P.seqMap(
            r.Word,
            P.optWhitespace,
            P.alt(P.string(`"`), P.string(`'"`)).chain(
                result => r.ReferencePath.skip(
                    P.string(result.split("").reverse().join(""))
                )
            ),
            (referenceType, _, referencePath) => new ObjectReferenceEntity({
                type: referenceType,
                path: referencePath
            })
        )
    )
    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc('words separated by ""')
    AttributeAnyValue = r => P.alt(r.Null, r.None, r.Boolean, r.Number, r.Integer, r.String, r.Guid, r.Reference)
    static getGrammarForType(r, type, defaultGrammar) {
        switch (type) {
            case Boolean:
                return r.Boolean
            case Number:
                return r.Number
            case Integer:
                return r.Integer
            case String:
                return r.String
            case Guid:
                return r.Guid
            case ObjectReferenceEntity:
                return r.Reference
            default:
                return defaultGrammar
        }
    }
    // Meta grammar
    static CreateAttributeGrammar = (r, attributeGrammar, attributeSupplier, valueSeparator = P.string("=")) =>
        attributeGrammar.skip(valueSeparator.trim(P.optWhitespace))
            .chain(attributeName => {
                const attributeKey = attributeName.split(".")
                const attribute = attributeSupplier(attributeKey)
                const type = Utility.getType(attribute)
                let attributeValueGrammar = type === Array
                    ? attribute
                        .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                        .reduce((accum, cur) =>
                            !cur || accum === r.AttributeAnyValue
                                ? r.AttributeAnyValue
                                : accum.or(cur)
                        )
                    : Grammar.getGrammarForType(r, type, r.AttributeAnyValue)
                // After the attribute name (already parsed at this point, we continue with an equal sign (possibly surrounded by whitespace) then the expected attribute value)
                return attributeValueGrammar.map(attributeValue => type === Array
                    ? entity => {
                        /** @type {Array} */
                        let array = Utility.objectGet(entity, attributeKey, [])
                        array.push(attributeValue)
                        return Utility.objectSet(entity, attributeKey, array)
                    }
                    : entity => Utility.objectSet(entity, attributeKey, attributeValue)
                ) // returns attributeSetter
            })
    // Meta grammar
    static CreateMultiAttributeGrammar = (r, keyGrammar, entityType, attributeSupplier) =>
        /**
         * Basically this creates a parser that looks for a string like 'AttributeName (A=False,B="Something",)'
         * Then it populates an object of type EntityType with the attribute values found inside the parentheses.
         */
        P.seqObj(
            keyGrammar,
            P.optWhitespace,
            P.string("("),
            [
                "attributes", // this is the name of the attribute of object passed to map chained next
                Grammar.CreateAttributeGrammar(r, r.AttributeName, attributeSupplier)
                    .trim(P.optWhitespace)
                    .sepBy(P.string(","))
                    .skip(P.regex(/,?/).then(P.optWhitespace)) // Optional trailing comma
            ],
            P.string(')')
        ).map(object => {
            let result = new entityType()
            object.attributes.forEach(attributeSetter => attributeSetter(result))
            return result
        })
    FunctionReference = r => Grammar.CreateMultiAttributeGrammar(
        r,
        P.succeed(),
        FunctionReferenceEntity,
        attributeKey => Utility.objectGet(FunctionReferenceEntity.attributes, attributeKey)
    )
    Pin = r => Grammar.CreateMultiAttributeGrammar(
        r,
        P.string("Pin"),
        PinEntity,
        attributeKey => Utility.objectGet(PinEntity.attributes, attributeKey)
    )
    Object = r => P.seqMap(
        P.seq(P.string("Begin"), P.whitespace, P.string("Object"), P.whitespace),
        P.alt(
            Grammar.CreateAttributeGrammar(r, P.string("CustomProperties"), _ => ObjectEntity.attributes.CustomProperties, P.string(" ")),
            Grammar.CreateAttributeGrammar(r, r.AttributeName, attributeKey => Utility.objectGet(ObjectEntity, attributeKey))
        )
            .trim(r.InlineOptWhitespace) // whitespace which is NOT newline
            .sepBy(P.string("\n"))
            .skip(r.WhitespaceNewline), // Optional trailing comma
        P.seq(P.string("End"), P.whitespace, P.string("Object")),
        (_, attributes, __) => {
            let result = new ObjectEntity()
            attributes.forEach(attributeSetter => attributeSetter(result))
            return result
        }
    )
}