// @ts-check

import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import GuidEntity from "../entity/GuidEntity"
import IdentifierEntity from "../entity/IdentifierEntity"
import IntegerEntity from "../entity/IntegerEntity"
import InvariantTextEntity from "../entity/InvariantTextEntity"
import KeyBindingEntity from "../entity/KeyBindingEntity"
import LocalizedTextEntity from "../entity/LocalizedTextEntity"
import ObjectEntity from "../entity/ObjectEntity"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import Parsimmon from "parsimmon"
import PathSymbolEntity from "../entity/PathSymbolEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import TypeInitialization from "../entity/TypeInitialization"
import Utility from "../Utility"

let P = Parsimmon

export default class Grammar {

    /*   ---   Factory   ---   */

    static getGrammarForType(r, attributeType, defaultGrammar) {
        if (attributeType instanceof TypeInitialization) {
            attributeType = attributeType.type
        }
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
            case IdentifierEntity:
                return r.Identifier
            case ObjectReferenceEntity:
                return r.Reference
            case LocalizedTextEntity:
                return r.LocalizedText
            case InvariantTextEntity:
                return r.InvariantText
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

    static createAttributeGrammar = (r, entityType, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
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

    /**
     * @template T
     * @param {new (values: Object) => T} entityType 
     * @returns {Parsimmon.Parser<T>}
     */
    static createMultiAttributeGrammar = (r, entityType) =>
        /**
         * Basically this creates a parser that looks for a string like 'Key (A=False,B="Something",)'
         * Then it populates an object of type EntityType with the attribute values found inside the parentheses.
         */
        P.seqMap(
            // @ts-expect-error
            entityType.lookbehind
                // @ts-expect-error
                ? P.seq(P.string(entityType.lookbehind), P.optWhitespace, P.string("("))
                : P.string("("),
            Grammar.createAttributeGrammar(r, entityType)
                .trim(P.optWhitespace)
                .sepBy(P.string(","))
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma
            P.string(')'),
            (_, attributes, __) => {
                let values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                return new entityType(values)
            }
        )

    /*   ---   General   ---   */

    InlineWhitespace = r => P.regex(/[^\S\n]+/).desc("inline whitespace")

    InlineOptWhitespace = r => P.regex(/[^\S\n]*/).desc("inline optional whitespace")

    MultilineWhitespace = r => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")

    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(_ => null).desc("null: ()")

    Boolean = r => P.alt(P.string("True"), P.string("False")).map(v => v === "True" ? true : false)
        .desc("either True or False")

    Number = r => P.regex(/[\-\+]?[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")

    Word = r => P.regex(/[a-zA-Z]+/).desc("a word")

    String = r => P.regex(/(?:[^"\\]|\\.)*/).wrap(P.string('"'), P.string('"'))
        .desc('string (with possibility to escape the quote using \")')

    ReferencePath = r => P.seq(
        P.string("/"),
        r.PathSymbol
            .map(v => v.toString())
            .sepBy1(P.string("."))
            .tieWith(".")
    )
        .tie()
        .atLeast(2)
        .tie()
        .desc('a path (words with possibly underscore, separated by ".", separated by "/")')

    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc('words separated by ""')

    /*   ---   Entity   ---   */

    None = r => P.string("None").map(_ => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")

    Integer = r => P.regex(/[\-\+]?[0-9]+/).map(v => new IntegerEntity(v)).desc("an integer")

    Guid = r => P.regex(/[0-9a-zA-Z]{32}/).map(v => new GuidEntity({ value: v }))
        .desc("32 digit hexadecimal (accepts all the letters for safety) value")

    Identifier = r => P.regex(/\w+/).map(v => new IdentifierEntity(v))

    PathSymbol = r => P.regex(/[0-9\w]+/).map(v => new PathSymbolEntity({ value: v }))

    Reference = r => P.alt(
        r.None,
        ...[r.ReferencePath.map(path => new ObjectReferenceEntity({ type: "", path: path }))]
            .flatMap(referencePath => [
                referencePath, // version having just path
                referencePath.trim(P.string('"')) // Version having path surround with double quotes
            ]),
        P.seqMap(
            r.Word, // Goes into referenceType
            P.optWhitespace, // Goes into _ (ignored)
            P.alt(...[r.ReferencePath].flatMap(referencePath => [
                referencePath.wrap(P.string(`"`), P.string(`"`)),
                referencePath.wrap(P.string(`'"`), P.string(`"'`))
            ])), // Goes into referencePath
            (referenceType, _, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        ),
        r.Word.map(type => new ObjectReferenceEntity({ type: type, path: "" })),
    )

    LocalizedText = r => P.seqMap(
        P.string(LocalizedTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")), // Goes into _ (ignored)
        r.String.trim(P.optWhitespace), // Goes into namespace
        P.string(","), // Goes into __ (ignored)
        r.String.trim(P.optWhitespace), // Goes into key
        P.string(","), // Goes into ___ (ignored)
        r.String.trim(P.optWhitespace), // Goes into value
        P.string(")"), // Goes into ____ (ignored)
        (_, namespace, __, key, ___, value, ____) => new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value
        })
    )

    InvariantText = r => r.String.trim(P.optWhitespace).wrap(
        P.string(InvariantTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")),
        P.string(")")
    )
        .map(value => new InvariantTextEntity({ value: value }))

    AttributeAnyValue = r => P.alt(
        r.Null,
        r.None,
        r.Boolean,
        r.Number,
        r.Integer,
        r.String,
        r.Guid,
        r.LocalizedText,
        r.InvariantText,
        r.Reference
    )

    PinReference = r => P.seqMap(
        r.PathSymbol, // Goes into objectNAme
        P.whitespace, // Goes into _ (ignored)
        r.Guid, // Goes into pinGuid
        (objectName, _, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid
        })
    )

    FunctionReference = r => Grammar.createMultiAttributeGrammar(r, FunctionReferenceEntity)

    KeyBinding = r => P.alt(
        r.Identifier.map(identifier => new KeyBindingEntity({
            Key: identifier
        })),
        Grammar.createMultiAttributeGrammar(r, KeyBindingEntity)
    )

    Pin = r => Grammar.createMultiAttributeGrammar(r, PinEntity)

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

    /** @returns {Parsimmon.Parser<ObjectEntity>} */
    Object = r => P.seqMap(
        P.seq(P.string("Begin"), P.whitespace, P.string("Object"), P.whitespace),
        P
            .alt(
                r.CustomProperties,
                Grammar.createAttributeGrammar(r, ObjectEntity)
            )
            .sepBy1(P.whitespace),
        P.seq(r.MultilineWhitespace, P.string("End"), P.whitespace, P.string("Object")),
        (_, attributes, __) => {
            let values = {}
            attributes.forEach(attributeSetter => attributeSetter(values))
            return new ObjectEntity(values)
        }
    )

    /** @returns {Parsimmon.Parser<ObjectEntity[]>} */
    MultipleObject = r => r.Object.sepBy1(P.whitespace).trim(P.optWhitespace)
}
