import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import GuidEntity from "../entity/GuidEntity"
import IntegerEntity from "../entity/IntegerEntity"
import LocalizedTextEntity from "../entity/LocalizedTextEntity"
import ObjectEntity from "../entity/ObjectEntity"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import Parsimmon from "parsimmon"
import PathSymbolEntity from "../entity/PathSymbolEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import Utility from "../Utility"

let P = Parsimmon

export default class Grammar {

    /** @param {Grammar} r */
    InlineWhitespace = r => P.regex(/[^\S\n]+/).desc("inline whitespace")

    /** @param {Grammar} r */
    InlineOptWhitespace = r => P.regex(/[^\S\n]*/).desc("inline optional whitespace")

    /** @param {Grammar} r */
    WhitespaceNewline = r => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")

    /** @param {Grammar} r */
    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(_ => null).desc("null: ()")

    /** @param {Grammar} r */
    None = r => P.string("None").map(_ => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")

    /** @param {Grammar} r */
    Boolean = r => P.alt(P.string("True"), P.string("False")).map(v => v === "True" ? true : false).desc("either True or False")

    /** @param {Grammar} r */
    Number = r => P.regex(/[\-\+]?[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")

    /** @param {Grammar} r */
    Integer = r => P.regex(/[\-\+]?[0-9]+/).map(v => new IntegerEntity(v)).desc("an integer")

    /** @param {Grammar} r */
    String = r => P.regex(/(?:[^"\\]|\\.)*/).wrap(P.string('"'), P.string('"')).desc('string (with possibility to escape the quote using \")')

    /** @param {Grammar} r */
    Word = r => P.regex(/[a-zA-Z]+/).desc("a word")

    /** @param {Grammar} r */
    Guid = r => P.regex(/[0-9a-zA-Z]{32}/).map(v => new GuidEntity({ value: v })).desc("32 digit hexadecimal (accepts all the letters for safety) value")

    /** @param {Grammar} r */
    PathSymbolEntity = r => P.regex(/[0-9a-zA-Z_]+/).map(v => new PathSymbolEntity({ value: v }))

    /** @param {Grammar} r */
    ReferencePath = r => P.seq(P.string("/"), r.PathSymbolEntity.map(v => v.toString()).sepBy1(P.string(".")).tieWith("."))
        .tie()
        .atLeast(2)
        .tie()
        .desc('a path (words with possibly underscore, separated by ".", separated by "/")')

    /** @param {Grammar} r */
    Reference = r => P.alt(
        r.None,
        ...[r.ReferencePath.map(path => new ObjectReferenceEntity({ type: "", path: path }))].flatMap(
            v => [v, v.trim(P.string('"'))]
        ),
        P.seqMap(
            r.Word,
            P.optWhitespace,
            P.alt(P.string('"'), P.string('\'"')).chain(
                result => r.ReferencePath.skip(
                    P.string(result.split("").reverse().join(""))
                )
            ),
            (referenceType, _, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        )
    )

    /** @param {Grammar} r */
    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc('words separated by ""')

    /** @param {Grammar} r */
    AttributeAnyValue = r => P.alt(r.Null, r.None, r.Boolean, r.Number, r.Integer, r.String, r.Guid, r.Reference, r.LocalizedText)

    /** @param {Grammar} r */
    LocalizedText = r => P.seqMap(
        P.string(LocalizedTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")),
        r.String.trim(P.optWhitespace), // namespace
        P.string(","),
        r.String.trim(P.optWhitespace), // key
        P.string(","),
        r.String.trim(P.optWhitespace), // value
        P.string(")"),
        (_, namespace, __, key, ___, value, ____) => new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value
        })
    )

    /** @param {Grammar} r */
    PinReference = r => P.seqMap(
        r.PathSymbolEntity,
        P.whitespace,
        r.Guid,
        (objectName, _, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid
        })
    )

    /** @param {Grammar} r */
    static getGrammarForType(r, attributeType, defaultGrammar) {
        switch (Utility.getType(attributeType)) {
            case Boolean:
                return r.Boolean
            case Number:
                return r.Number
            case IntegerEntity:
                return r.Integer
            case String:
                return r.String
            case GuidEntity:
                return r.Guid
            case ObjectReferenceEntity:
                return r.Reference
            case LocalizedTextEntity:
                return r.LocalizedText
            case PinReferenceEntity:
                return r.PinReference
            case FunctionReferenceEntity:
                return r.FunctionReference
            case PinEntity:
                return r.Pin
            case Array:
                return P.seqMap(
                    P.string("("),
                    attributeType
                        .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                        .reduce((accum, cur) =>
                            !cur || accum === r.AttributeAnyValue
                                ? r.AttributeAnyValue
                                : accum.or(cur)
                        )
                        .trim(P.optWhitespace)
                        .sepBy(P.string(","))
                        .skip(P.regex(/,?\s*/)),
                    P.string(")"),
                    (_, grammar, __) => grammar
                )
            default:
                return defaultGrammar
        }
    }

    /** @param {Grammar} r */
    static CreateAttributeGrammar = (r, entityType, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
        r.AttributeName.skip(valueSeparator)
            .chain(attributeName => {
                const attributeKey = attributeName.split(".")
                const attribute = Utility.objectGet(entityType.attributes, attributeKey)
                let attributeValueGrammar = Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue)
                // Returns attributeSetter: a function called with an object as argument that will set the correct attribute value
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                )
            })

    /** @param {Grammar} r */
    static CreateMultiAttributeGrammar = (r, entityType) =>
        /**
         * Basically this creates a parser that looks for a string like 'Key (A=False,B="Something",)'
         * Then it populates an object of type EntityType with the attribute values found inside the parentheses.
         */
        P.seqMap(
            entityType.lookbehind
                ? P.seq(P.string(entityType.lookbehind), P.optWhitespace, P.string("("))
                : P.string("("),
            Grammar.CreateAttributeGrammar(r, entityType)
                .trim(P.optWhitespace)
                .sepBy(P.string(","))
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma
            P.string(')'),
            (_, attributes, __) => {
                let result = new entityType()
                attributes.forEach(attributeSetter => attributeSetter(result))
                return result
            })

    /** @param {Grammar} r */
    FunctionReference = r => Grammar.CreateMultiAttributeGrammar(r, FunctionReferenceEntity)

    /** @param {Grammar} r */
    Pin = r => Grammar.CreateMultiAttributeGrammar(r, PinEntity)

    /** @param {Grammar} r */
    CustomProperties = r =>
        P.string("CustomProperties")
            .then(P.whitespace)
            .then(r.Pin)
            .map(pin => entity => {
                /** @type {Array} */
                let properties = Utility.objectGet(entity, ["CustomProperties"], [])
                properties.push(pin)
                Utility.objectSet(entity, ["CustomProperties"], properties, true)
            })

    /** @param {Grammar} r */
    Object = r => P.seqMap(
        P.seq(P.string("Begin"), P.whitespace, P.string("Object"), P.whitespace),
        P
            .alt(
                r.CustomProperties,
                Grammar.CreateAttributeGrammar(r, ObjectEntity)
            )
            .sepBy1(P.whitespace),
        P.seq(r.WhitespaceNewline, P.string("End"), P.whitespace, P.string("Object")),
        (_, attributes, __) => {
            let result = new ObjectEntity()
            attributes.forEach(attributeSetter => attributeSetter(result))
            return result
        }
    )

    /** @param {Grammar} r */
    MultipleObject = r => r.Object.sepBy1(P.whitespace).trim(P.optWhitespace)
}
