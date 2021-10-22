import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import Guid from "../Guid"
import Integer from "../entity/Integer"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import Parsimmon from "parsimmon"
import PinEntity from "../entity/PinEntity"
import Utility from "../Utility"
import ObjectEntity from "../entity/ObjectEntity"
import LocalizedTextEntity from "../entity/LocalizedTextEntity"

let P = Parsimmon

export default class Grammar {
    // General
    InlineWhitespace = _ => P.regex(/[^\S\n]+/).desc("inline whitespace")
    InlineOptWhitespace = _ => P.regex(/[^\S\n]*/).desc("inline optional whitespace")
    WhitespaceNewline = _ => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")
    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(_ => null).desc("null: ()")
    None = _ => P.string("None").map(_ => new ObjectReferenceEntity({ type: "None" })).desc("none")
    Boolean = _ => P.alt(P.string("True"), P.string("False")).map(v => v === "True" ? true : false).desc("either True or False")
    Number = _ => P.regex(/[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")
    Integer = _ => P.regex(/[0-9]+/).map(v => new Integer(v)).desc("an integer")
    String = _ => P.regex(/(?:[^"\\]|\\")*/).wrap(P.string('"'), P.string('"')).desc('string (with possibility to escape the quote using \")')
    Word = _ => P.regex(/[a-zA-Z]+/).desc("a word")
    Guid = _ => P.regex(/[0-9a-zA-Z]{32}/).desc("32 digit hexadecimal (accepts all the letters for safety) value")
    ReferencePath = _ => P.seq(P.string("/"), P.regex(/[0-9a-zA-Z_]+/).sepBy1(P.string(".")).tieWith("."))
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
    AttributeAnyValue = r => P.alt(r.Null, r.None, r.Boolean, r.Number, r.Integer, r.String, r.Guid, r.Reference, r.LocalizedText)
    LocalizedText = r => P.seqMap(
        P.string("NSLOCTEXT").skip(P.optWhitespace).skip(P.string("(")),
        r.String.trim(P.optWhitespace),
        P.string(","),
        r.String.trim(P.optWhitespace),
        P.string(","),
        r.String.trim(P.optWhitespace),
        P.string(")"),
        (_, namespace, __, key, ___, value, ____) => new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value
        })
    )
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
            case LocalizedTextEntity:
                return r.LocalizedText
            case FunctionReferenceEntity:
                return r.FunctionReference
            case PinEntity:
                return r.Pin
            default:
                return defaultGrammar
        }
    }
    // Meta grammar
    static CreateAttributeGrammar = (r, attributeGrammar, attributeSupplier, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
        attributeGrammar.skip(valueSeparator)
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
                        return Utility.objectSet(entity, attributeKey, array, true)
                    }
                    : entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                ) // returns attributeSetter
            })
    // Meta grammar
    static CreateMultiAttributeGrammar = (r, keyGrammar, entityType, attributeSupplier) =>
        /**
         * Basically this creates a parser that looks for a string like 'Key (A=False,B="Something",)'
         * Then it populates an object of type EntityType with the attribute values found inside the parentheses.
         */
        P.seqMap(
            P.seq(keyGrammar, P.optWhitespace, P.string("(")),
            Grammar.CreateAttributeGrammar(r, r.AttributeName, attributeSupplier)
                .trim(P.optWhitespace)
                .sepBy(P.string(","))
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma
            P.string(')'),
            (_, attributes, __) => {
                let result = new entityType()
                attributes.forEach(attributeSetter => attributeSetter(result))
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
            Grammar.CreateAttributeGrammar(r, P.string("CustomProperties"), _ => ObjectEntity.attributes.CustomProperties, P.whitespace),
            Grammar.CreateAttributeGrammar(r, r.AttributeName, attributeKey => Utility.objectGet(ObjectEntity.attributes, attributeKey))
        )
            .sepBy1(P.whitespace),
        P.seq(r.WhitespaceNewline, P.string("End"), P.whitespace, P.string("Object")),
        (_, attributes, __) => {
            let result = new ObjectEntity()
            attributes.forEach(attributeSetter => attributeSetter(result))
            return result
        }
    )
}