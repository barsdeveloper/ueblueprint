// @ts-nocheck
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import GuidEntity from "../entity/GuidEntity"
import IdentifierEntity from "../entity/IdentifierEntity"
import IntegerEntity from "../entity/IntegerEntity"
import InvariantTextEntity from "../entity/InvariantTextEntity"
import KeyBindingEntity from "../entity/KeyBindingEntity"
import LinearColorEntity from "../entity/LinearColorEntity"
import LocalizedTextEntity from "../entity/LocalizedTextEntity"
import MacroGraphReferenceEntity from "../entity/MacroGraphReferenceEntity"
import ObjectEntity from "../entity/ObjectEntity"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity"
import Parsimmon from "parsimmon"
import PathSymbolEntity from "../entity/PathSymbolEntity"
import PinEntity from "../entity/PinEntity"
import PinReferenceEntity from "../entity/PinReferenceEntity"
import RealUnitEntity from "../entity/UnitRealEntity"
import RotatorEntity from "../entity/RotatorEntity"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity"
import SymbolEntity from "../entity/SymbolEntity"
import TypeInitialization from "../entity/TypeInitialization"
import UnionType from "../entity/UnionType"
import UnknownKeysEntity from "../entity/UnknownKeysEntity"
import Utility from "../Utility"
import VariableReferenceEntity from "../entity/VariableReferenceEntity"
import VectorEntity from "../entity/VectorEntity"

let P = Parsimmon

export default class Grammar {

    /*   ---   Factory   ---   */

    /** @param {Grammar} r */
    static getGrammarForType(r, attributeType, defaultGrammar = r.AttributeAnyValue) {
        if (attributeType instanceof TypeInitialization) {
            let result = Grammar.getGrammarForType(r, attributeType.type, defaultGrammar)
            if (attributeType.serialized && !(attributeType.type instanceof String)) {
                result = result.wrap(P.string('"'), P.string('"'))
            }
            return result
        }
        switch (Utility.getType(attributeType)) {
            case Array:
                return P.seqMap(
                    P.string("("),
                    attributeType
                        .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                        .reduce((accum, cur) => !cur || accum === r.AttributeAnyValue
                            ? r.AttributeAnyValue
                            : accum.or(cur)
                        )
                        .trim(P.optWhitespace)
                        .sepBy(P.string(","))
                        .skip(P.regex(/,?\s*/)),
                    P.string(")"),
                    (_0, grammar, _2) => grammar
                )
            case Boolean:
                return r.Boolean
            case FunctionReferenceEntity:
                return r.FunctionReference
            case GuidEntity:
                return r.Guid
            case IdentifierEntity:
                return r.Identifier
            case IntegerEntity:
                return r.Integer
            case InvariantTextEntity:
                return r.InvariantText
            case LinearColorEntity:
                return r.LinearColor
            case LocalizedTextEntity:
                return r.LocalizedText
            case MacroGraphReferenceEntity:
                return r.MacroGraphReference
            case Number:
                return r.Number
            case ObjectReferenceEntity:
                return r.ObjectReference
            case PinEntity:
                return r.Pin
            case PinReferenceEntity:
                return r.PinReference
            case RealUnitEntity:
                return r.RealUnit
            case RotatorEntity:
                return r.Rotator
            case SimpleSerializationRotatorEntity:
                return r.SimpleSerializationRotator
            case SimpleSerializationVectorEntity:
                return r.SimpleSerializationVector
            case String:
                return r.String
            case SymbolEntity:
                return r.Symbol
            case UnionType:
                return attributeType.types
                    .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                    .reduce((accum, cur) => !cur || accum === r.AttributeAnyValue
                        ? r.AttributeAnyValue
                        : accum.or(cur))
            case VariableReferenceEntity:
                return r.VariableReference
            case VectorEntity:
                return r.Vector
            default:
                return defaultGrammar
        }
    }

    /** @param {Grammar} r */
    static ReferencePath = (r, referencePathGrammar) =>
        P.alt(
            referencePathGrammar,
            P.seq(
                P.string("/"),
                referencePathGrammar
                    .map(v => v.toString())
                    .sepBy1(P.string("."))
                    .tieWith(".")
                    .sepBy1(P.string(":"))
                    .tieWith(":")
            )
                .tie()
                .atLeast(2)
                .tie()
        )

    /** @param {Grammar} r */
    static createAttributeGrammar = (r, entityType, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
        r.AttributeName
            .skip(valueSeparator)
            .chain(attributeName => {
                // Once the attribute name is known, look into entityType.attributes to get its type
                const attributeKey = attributeName.split(".")
                const attribute = Utility.objectGet(entityType.attributes, attributeKey)
                let attributeValueGrammar = Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue)
                // Returns a setter function for the attribute
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                )
            })

    /** @param {Grammar} r */
    static createEntityGrammar = (r, entityType, limitUnknownKeys = false) =>
        P.seqMap(
            entityType.lookbehind
                ? P.seq(P.string(entityType.lookbehind), P.optWhitespace, P.string("("))
                : P.string("("),
            Grammar.createAttributeGrammar(r, entityType)
                .trim(P.optWhitespace) // Drop spaces around a attribute assignment
                .sepBy(P.string(",")) // Assignments are separated by comma
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma and maybe additional space
            P.string(")"),
            (_0, attributes, _2) => {
                let values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                return values
            }
        )
            // Decide if we accept the entity or not. It is accepted if it doesn't have too many unexpected keys
            .chain(values => {
                if (limitUnknownKeys) {
                    let unexpectedKeysCount = 0
                    let totalKeys = 0
                    for (const key in values) {
                        unexpectedKeysCount += key in entityType.attributes ? 0 : 1
                        ++totalKeys
                    }
                    if (unexpectedKeysCount + 0.5 > Math.sqrt(totalKeys)) {
                        return P.fail()
                    }
                }
                return P.succeed().map(() => new entityType(values))
            })

    /*   ---   General   ---   */

    /** @param {Grammar} r */
    InlineWhitespace = r => P.regex(/[^\S\n]+/).desc("single line whitespace")

    /** @param {Grammar} r */
    InlineOptWhitespace = r => P.regex(/[^\S\n]*/).desc("single line optional whitespace")

    /** @param {Grammar} r */
    MultilineWhitespace = r => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")

    /** @param {Grammar} r */
    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(() => null).desc("null: ()")

    /** @param {Grammar} r */
    Boolean = r => P.alt(
        P.string("True"),
        P.string("true"),
        P.string("False"),
        P.string("false"),
    ).map(v => v.toLocaleLowerCase() === "true" ? true : false)
        .desc("either True or False")

    /** @param {Grammar} r */
    HexDigit = r => P.regex(/[0-9a-fA-f]/).desc("hexadecimal digit")

    /** @param {Grammar} r */
    Number = r => P.regex(/[-\+]?[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")

    /** @param {Grammar} r */
    RealNumber = r => P.regex(/[-\+]?[0-9]+\.[0-9]+/).map(Number).desc("a number written as real")

    /** @param {Grammar} r */
    RealUnit = r => P.regex(/\+?[0-9]+(?:\.[0-9]+)?/).map(Number).assert(v => v >= 0 && v <= 1).desc("a number between 0 and 1")

    /** @param {Grammar} r */
    NaturalNumber = r => P.regex(/0|[1-9]\d*/).map(Number).desc("a natural number")

    /** @param {Grammar} r */
    ColorNumber = r => r.NaturalNumber.assert(n => 0 <= n && n < 256, "the color must be between 0 and 256 excluded")

    /** @param {Grammar} r */
    Word = r => P.regex(/[a-zA-Z_]+/).desc("a word")

    /** @param {Grammar} r */
    String = r => P.regex(/(?:[^"\\]|\\.)*/).wrap(P.string('"'), P.string('"')).map(Utility.unescapeString)
        .desc('string (with possibility to escape the quote using \")')

    /** @param {Grammar} r */
    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc("dot-separated words")

    /*   ---   Entity   ---   */

    /** @param {Grammar} r */
    None = r => P.string("None").map(() => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")

    /** @param {Grammar} r */
    Integer = r => P.regex(/[\-\+]?[0-9]+/).map(v => new IntegerEntity(v)).desc("an integer")

    /** @param {Grammar} r */
    Guid = r => r.HexDigit.times(32).tie().map(v => new GuidEntity({ value: v })).desc("32 digit hexadecimal value")

    /** @param {Grammar} r */
    Identifier = r => P.regex(/\w+/).map(v => new IdentifierEntity(v))

    /** @param {Grammar} r */
    PathSymbol = r => P.regex(/[0-9\w]+/).map(v => new PathSymbolEntity({ value: v }))

    /** @param {Grammar} r */
    PathSymbolOptSpaces = r => P.regex(/[0-9\w]+(?: [0-9\w]+)+|[0-9\w]+/).map(v => new PathSymbolEntity({ value: v }))

    /** @param {Grammar} r */
    Symbol = r => P.regex(/\w+/).map(v => new SymbolEntity({ value: v }))

    /** @param {Grammar} r */
    ObjectReference = r => P.alt(
        r.None,
        ...[
            Grammar.ReferencePath(r, r.PathSymbolOptSpaces)
                .map(path => new ObjectReferenceEntity({ type: "", path: path }))
        ].flatMap(referencePath => [
            referencePath.wrap(P.string(`"`), P.string(`"`)),
            referencePath.wrap(P.string(`'"`), P.string(`"'`)),
        ]),
        P.seqMap(
            Grammar.ReferencePath(r, r.PathSymbolOptSpaces), // Goes into referenceType
            P.optWhitespace, // Goes into _1 (ignored)
            P.alt(...[Grammar.ReferencePath(r, r.PathSymbolOptSpaces)].flatMap(referencePath => [
                referencePath.wrap(P.string(`"`), P.string(`"`)),
                referencePath.wrap(P.string(`'"`), P.string(`"'`))
            ])), // Goes into referencePath
            (referenceType, _1, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        ),
        Grammar.ReferencePath(r, r.PathSymbol).map(path => new ObjectReferenceEntity({ type: "", path: path })),
        r.Word.map(type => new ObjectReferenceEntity({ type: type, path: "" })),
    )

    /** @param {Grammar} r */
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

    /** @param {Grammar} r */
    InvariantText = r => r.String.trim(P.optWhitespace).wrap(
        P.string(InvariantTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")),
        P.string(")")
    )
        .map(value => new InvariantTextEntity({ value: value }))

    /** @param {Grammar} r */
    AttributeAnyValue = r => P.alt(
        // Remember to keep the order, otherwise parsing might fail
        r.Boolean,
        r.Guid,
        r.None,
        r.Null,
        r.Number,
        r.String,
        r.LocalizedText,
        r.InvariantText,
        r.PinReference,
        Grammar.createEntityGrammar(r, VectorEntity, true),
        Grammar.createEntityGrammar(r, LinearColorEntity, true),
        r.UnknownKeys,
        r.ObjectReference,
        r.Symbol,
    )

    /** @param {Grammar} r */
    PinReference = r => P.seqMap(
        r.PathSymbol, // Goes into objectNAme
        P.whitespace, // Goes into _1 (ignored)
        r.Guid, // Goes into pinGuid
        (objectName, _1, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid,
        })
    )

    /** @param {Grammar} r */
    Vector = r => Grammar.createEntityGrammar(r, VectorEntity)

    /** @param {Grammar} r */
    Rotator = r => Grammar.createEntityGrammar(r, RotatorEntity)

    /** @param {Grammar} r */
    SimpleSerializationRotator = r => P.seqMap(
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        (p, _1, y, _3, r) => new SimpleSerializationRotatorEntity({
            R: r,
            P: p,
            Y: y,
        })
    )

    /** @param {Grammar} r */
    SimpleSerializationVector = r => P.seqMap(
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

    /** @param {Grammar} r */
    LinearColor = r => Grammar.createEntityGrammar(r, LinearColorEntity)

    /** @param {Grammar} r */
    FunctionReference = r => Grammar.createEntityGrammar(r, FunctionReferenceEntity)

    /** @param {Grammar} r */
    VariableReference = r => Grammar.createEntityGrammar(r, VariableReferenceEntity)

    /** @param {Grammar} r */
    MacroGraphReference = r => Grammar.createEntityGrammar(r, MacroGraphReferenceEntity)

    /** @param {Grammar} r */
    KeyBinding = r => P.alt(
        r.Identifier.map(identifier => new KeyBindingEntity({
            Key: identifier
        })),
        Grammar.createEntityGrammar(r, KeyBindingEntity)
    )

    /** @param {Grammar} r */
    Pin = r => Grammar.createEntityGrammar(r, PinEntity)

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
                Grammar.createAttributeGrammar(r, ObjectEntity)
            )
            .sepBy1(P.whitespace),
        P.seq(r.MultilineWhitespace, P.string("End"), P.whitespace, P.string("Object")),
        (_0, attributes, _2) => {
            let values = {}
            attributes.forEach(attributeSetter => attributeSetter(values))
            return new ObjectEntity(values)
        }
    )

    /** @returns {Parsimmon.Parser<ObjectEntity[]>} */
    MultipleObject = r => r.Object.sepBy1(P.whitespace).trim(P.optWhitespace)

    /*   ---   Others   ---   */

    /** @param {Grammar} r */
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

    /** @param {Grammar} r */
    LinearColorFromRGBList = r => P.seqMap(
        r.ColorNumber,
        P.string(",").skip(P.optWhitespace),
        r.ColorNumber,
        P.string(",").skip(P.optWhitespace),
        r.ColorNumber.map(Number),
        (R, _1, G, _3, B) => new LinearColorEntity({
            R: R / 255,
            G: G / 255,
            B: B / 255,
            A: 1,
        })
    )

    /** @param {Grammar} r */
    LinearColorFromRGB = r => P.string("rgb").then(
        r.LinearColorFromRGBList.wrap(
            P.regex(/\(\s*/),
            P.regex(/\s*\)/)
        )
    )

    /** @param {Grammar} r */
    LinearColorFromRGBA = r => P.string("rgba").then(
        P.seqMap(
            r.ColorNumber,
            P.string(",").skip(P.optWhitespace),
            r.ColorNumber,
            P.string(",").skip(P.optWhitespace),
            r.ColorNumber.map(Number),
            P.string(",").skip(P.optWhitespace),
            P.regex(/0?\.\d+|[01]/).map(Number),
            (R, _1, G, _3, B, _4, A) => new LinearColorEntity({
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

    /** @param {Grammar} r */
    LinearColorFromAnyColor = r => P.alt(
        r.LinearColorFromRGBList,
        r.LinearColorFromHex,
        r.LinearColorFromRGB,
        r.LinearColorFromRGBA,
    )

    /** @param {Grammar} r */
    UnknownKeys = r => P.seqMap(
        P.regex(/\w*\s*/).skip(P.string("(")),
        P.seqMap(
            r.AttributeName,
            P.string("=").trim(P.optWhitespace),
            r.AttributeAnyValue,
            (attributeName, separator, attributeValue) =>
                entity => Utility.objectSet(entity, attributeName.split("."), attributeValue, true)
        )
            .trim(P.optWhitespace)
            .sepBy(P.string(",")) // Assignments are separated by comma
            .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma and maybe additional space
        P.string(")"),
        (lookbehind, attributes, _2) => {
            let values = {}
            attributes.forEach(attributeSetter => attributeSetter(values))
            let result = new UnknownKeysEntity(values)
            if (lookbehind) {
                result.lookbehind = lookbehind
            }
            return result
        }
    )
}
