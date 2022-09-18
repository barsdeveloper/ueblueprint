import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import GuidEntity from "../entity/GuidEntity"
import IdentifierEntity from "../entity/IdentifierEntity"
import IntegerEntity from "../entity/IntegerEntity"
import InvariantTextEntity from "../entity/InvariantTextEntity"
import KeyBindingEntity from "../entity/KeyBindingEntity"
import LinearColorEntity from "../entity/LinearColorEntity"
import LocalizedTextEntity from "../entity/LocalizedTextEntity"
import ObjectEntity from "../entity/ObjectEntity"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import Parsimmon from "parsimmon"
import PathSymbolEntity from "../entity/PathSymbolEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity"
import TypeInitialization from "../entity/TypeInitialization"
import Utility from "../Utility"
import VectorEntity from "../entity/VectorEntity"

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 */

let P = Parsimmon

export default class Grammar {

    /*   ---   Factory   ---   */

    static getGrammarForType(r, attributeType, defaultGrammar) {
        if (attributeType instanceof TypeInitialization) {
            let result = Grammar.getGrammarForType(r, attributeType.type, defaultGrammar)
            if (attributeType.serialized && !(attributeType.type instanceof String)) {
                result = result.wrap(P.string('"'), P.string('"'))
            }
            return result
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
            case VectorEntity:
                return r.Vector
            case SimpleSerializationVectorEntity:
                return r.SimpleSerializationVectorEntity
            case LinearColorEntity:
                return r.LinearColor
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

    static createPropertyGrammar = (r, entityType, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
        r.AttributeName.skip(valueSeparator)
            .chain(attributeName => {
                // Once the property name is known, look into entityType.properties to get its type 
                const attributeKey = attributeName.split(".")
                const attribute = Utility.objectGet(entityType.attributes, attributeKey)
                let attributeValueGrammar = Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue)
                // Returns a setter function for the property
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                )
            })

    static createEntityGrammar = (r, entityType) =>
        P.seqMap(
            entityType.lookbehind
                ? P.seq(P.string(entityType.lookbehind), P.optWhitespace, P.string("("))
                : P.string("("),
            Grammar.createPropertyGrammar(r, entityType)
                .trim(P.optWhitespace) // Drop spaces around a property assignment
                .sepBy(P.string(",")) // Assignments are separated by comma
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma and maybe additional space
            P.string(')'),
            (_0, attributes, _2) => {
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

    Boolean = r => P.alt(
        P.string("True"),
        P.string("true"),
        P.string("False"),
        P.string("false"),
    ).map(v => v.toLocaleLowerCase() === "true" ? true : false)
        .desc("either True or False")

    HexDigit = r => P.regex(/[0-9a-fA-f]/).desc("hexadecimal digit")

    Number = r => P.regex(/[\-\+]?[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")

    NaturalNumber = r => P.regex(/0|[1-9]\d*/).map(Number).desc("a natural number")

    ColorNumber = r => r.NaturalNumber.assert(n => 0 <= n && n < 256, "the color must be between 0 and 256 excluded")

    Word = r => P.regex(/[a-zA-Z]+/).desc("a word")

    String = r => P.regex(/(?:[^"\\]|\\.)*/).wrap(P.string('"'), P.string('"')).map(Utility.unescapeString)
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

    Guid = r => r.HexDigit.times(32).tie().map(v => new GuidEntity({ value: v })).desc("32 digit hexadecimal value")

    Identifier = r => P.regex(/\w+/).map(v => new IdentifierEntity(v))

    PathSymbol = r => P.regex(/[0-9\w]+/).map(v => new PathSymbolEntity({ value: v }))

    Reference = r => P.alt(
        r.None,
        ...[r.ReferencePath.map(path => new ObjectReferenceEntity({ type: "", path: path }))]
            .flatMap(referencePath => [
                referencePath, // Version having just path
                referencePath.trim(P.string('"')) // Version having path surround with double quotes
            ]),
        P.seqMap(
            r.Word, // Goes into referenceType
            P.optWhitespace, // Goes into _1 (ignored)
            P.alt(...[r.ReferencePath].flatMap(referencePath => [
                referencePath.wrap(P.string(`"`), P.string(`"`)),
                referencePath.wrap(P.string(`'"`), P.string(`"'`))
            ])), // Goes into referencePath
            (referenceType, _1, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        ),
        r.Word.map(type => new ObjectReferenceEntity({ type: type, path: "" })),
    )

    LocalizedText = r => P.seqMap(
        P.string(LocalizedTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")), // Goes into _0 (ignored)
        r.String.trim(P.optWhitespace), // Goes into namespace
        P.string(","), // Goes into _2 (ignored)
        r.String.trim(P.optWhitespace), // Goes into key
        P.string(","), // Goes into _4 (ignored)
        r.String.trim(P.optWhitespace), // Goes into value
        P.string(")"), // Goes into _6 (ignored)
        (_0, namespace, _2, key, _4, value, _6) => new LocalizedTextEntity({
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
        r.Reference,
        r.Vector,
        r.LinearColor,
    )

    PinReference = r => P.seqMap(
        r.PathSymbol, // Goes into objectNAme
        P.whitespace, // Goes into _ (ignored)
        r.Guid, // Goes into pinGuid
        (objectName, _, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid,
        })
    )

    Vector = r => Grammar.createEntityGrammar(r, VectorEntity)

    SimpleSerializationVectorEntity = r => P.seqMap(
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        (x, _1, y, _3, z) => new SimpleSerializationVectorEntity({
            X: x,
            Y: y,
            Z: z,
        })
    )

    LinearColor = r => Grammar.createEntityGrammar(r, LinearColorEntity)

    FunctionReference = r => Grammar.createEntityGrammar(r, FunctionReferenceEntity)

    KeyBinding = r => P.alt(
        r.Identifier.map(identifier => new KeyBindingEntity({
            Key: identifier
        })),
        Grammar.createEntityGrammar(r, KeyBindingEntity)
    )

    Pin = r => Grammar.createEntityGrammar(r, PinEntity)

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
                Grammar.createPropertyGrammar(r, ObjectEntity)
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

    /*   ---   Others   ---   */

    LinearColorFromHex = r => P
        .string("#")
        .then(r.HexDigit.times(2).tie().times(3, 4))
        .trim(P.optWhitespace)
        .map(([R, G, B, A]) => new LinearColorEntity({
            R: parseInt(R, 16) / 255,
            G: parseInt(G, 16) / 255,
            B: parseInt(B, 16) / 255,
            A: A ? parseInt(A, 16) / 255 : 1,
        }))

    LinearColorFromRGBList = r => P.seqMap(
        r.ColorNumber,
        P.string(",").skip(P.optWhitespace),
        r.ColorNumber,
        P.string(",").skip(P.optWhitespace),
        r.ColorNumber.map(Number),
        (R, _, G, __, B) => new LinearColorEntity({
            R: R / 255,
            G: G / 255,
            B: B / 255,
            A: 1,
        })
    )

    LinearColorFromRGB = r => P.string("rgb").then(
        r.LinearColorFromRGBList.wrap(
            P.regex(/\(\s*/),
            P.regex(/\s*\)/)
        )
    )

    LinearColorFromRGBA = r => P.string("rgba").then(
        P.seqMap(
            r.ColorNumber,
            P.string(",").skip(P.optWhitespace),
            r.ColorNumber,
            P.string(",").skip(P.optWhitespace),
            r.ColorNumber.map(Number),
            P.string(",").skip(P.optWhitespace),
            P.regex(/0?\.\d+|[01]/).map(Number),
            (R, _, G, __, B, ___, A) => new LinearColorEntity({
                R: R / 255,
                G: G / 255,
                B: B / 255,
                A: A,
            })
        ).wrap(
            P.regex(/\(\s*/),
            P.regex(/\s*\)/)
        )
    )

    LinearColorFromAnyColor = r => P.alt(
        r.LinearColorFromRGBList,
        r.LinearColorFromHex,
        r.LinearColorFromRGB,
        r.LinearColorFromRGBA,
    )
}
