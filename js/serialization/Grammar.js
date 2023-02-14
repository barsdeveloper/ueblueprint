// @ts-nocheck
import ByteEntity from "../entity/ByteEntity"
import EnumEntity from "../entity/EnumEntity"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity"
import GuidEntity from "../entity/GuidEntity"
import IdentifierEntity from "../entity/IdentifierEntity"
import Integer64Entity from "../entity/Integer64Entity"
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
import PinTypeEntity from "../entity/PinTypeEntity"
import RealUnitEntity from "../entity/UnitRealEntity"
import RotatorEntity from "../entity/RotatorEntity"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity"
import SimpleSerializationVector2DEntity from "../entity/SimpleSerializationVector2DEntity"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity"
import SymbolEntity from "../entity/SymbolEntity"
import UnionType from "../entity/UnionType"
import UnknownKeysEntity from "../entity/UnknownKeysEntity"
import Utility from "../Utility"
import VariableReferenceEntity from "../entity/VariableReferenceEntity"
import Vector2DEntity from "../entity/Vector2DEntity"
import VectorEntity from "../entity/VectorEntity"

/**
 * @typedef {import ("../entity/IEntity").AttributeInformation} AttributeInformation
 * @typedef {import ("../entity/IEntity").EntityConstructor} EntityConstructor
 */

let P = Parsimmon

export default class Grammar {

    static Regex = {
        ByteInteger: /0*(?:25[0-5]|2[0-4]\d|1?\d?\d|)(?!\d)/, // A integer between 0 and 255
        HexDigit: /[0-9a-fA-F]/,
        InlineOptWhitespace: /[^\S\n]*/,
        InlineWhitespace: /[^\S\n]+/,
        InsideString: /(?:[^"\\]|\\.)*/,
        Integer: /[\-\+]?\d+/,
        MultilineWhitespace: /\s*\n\s*/,
        Number: /[-\+]?\d+(?:\.\d+)?/,
        RealUnit: /^\+?(?:0(?:\.\d+)?|1(?:\.0+)?)(?![\.\d])/, // A number between 0 and 1 included
        Symbol: /[a-zA-Z_]\w*/,
        Word: /[a-zA-Z_]+/,
    }

    /*   ---   Factory   ---   */

    /**
     * @template T
     * @param {RegExp} re
     * @param {(execResult) => T} mapper
     */
    static regexMap(re, mapper) {
        const anchored = RegExp("^(?:" + re.source + ")", re.flags)
        const expected = "" + re
        /** @param {Grammar} r */
        return P((input, i) => {
            const match = anchored.exec(input.slice(i))
            if (match) {
                return P.makeSuccess(i + match[0].length, mapper(match))
            }
            return P.makeFailure(i, expected)
        })
    }

    /** @param {String} str */
    static getStringParser(str) {
        return P((input, i) => {
            var j = i + str.length
            var head = input.slice(i, j)
            if (head === str) {
                return makeSuccess(j, head)
            } else {
                return makeFailure(i, expected)
            }
        })
    }

    /** @param {Grammar} r */
    static getGrammarForType(r, attribute, defaultGrammar = r.AttributeAnyValue) {
        if (attribute.constructor === Object) {
            attribute = /** @type {AttributeInformation} */(attribute)
            let type = attribute.type
            let result
            if (type instanceof Array) {
                result = Grammar.getGrammarForType(r, type[0])
                    .trim(P.optWhitespace)
                    .sepBy(P.string(","))
                    .skip(P.regex(/,?\s*/))
                    .wrap(P.string("("), P.string(")"))
            } else if (type instanceof UnionType) {
                result = type.types
                    .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                    .reduce((accum, cur) => !cur || accum === r.AttributeAnyValue
                        ? r.AttributeAnyValue
                        : accum.or(cur))
            } else {
                result = Grammar.getGrammarForType(r, type, defaultGrammar)
            }
            if (attribute.serialized && !(type instanceof String)) {
                result = result.wrap(P.string('"'), P.string('"'))
            }
            if (attribute.nullable) {
                result = result.or(r.Null)
            }
            return result
        }
        switch (attribute) {
            case BigInt:
                return r.BigInt
            case Boolean:
                return r.Boolean
            case ByteEntity:
                return r.Byte
            case EnumEntity:
                return r.Enum
            case FunctionReferenceEntity:
                return r.FunctionReference
            case GuidEntity:
                return r.Guid
            case IdentifierEntity:
                return r.Identifier
            case Integer64Entity:
                return r.Integer64
            case IntegerEntity:
                return r.Integer
            case InvariantTextEntity:
                return r.InvariantText
            case KeyBindingEntity:
                return r.KeyBinding
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
            case PathSymbolEntity:
                return r.PathSymbol
            case PinEntity:
                return r.Pin
            case PinReferenceEntity:
                return r.PinReference
            case PinTypeEntity:
                return r.PinType
            case RealUnitEntity:
                return r.RealUnit
            case RotatorEntity:
                return r.Rotator
            case SimpleSerializationRotatorEntity:
                return r.SimpleSerializationRotator
            case SimpleSerializationVector2DEntity:
                return r.SimpleSerializationVector2D
            case SimpleSerializationVectorEntity:
                return r.SimpleSerializationVector
            case String:
                return r.String
            case SymbolEntity:
                return r.Symbol
            case VariableReferenceEntity:
                return r.VariableReference
            case Vector2DEntity:
                return r.Vector2D
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
                const attributeValueGrammar = attribute // Remember attributeKey can not correspond to any attribute
                    ? attribute.constructor === Object && /** @type {AttributeInformation} */(attribute).serialized
                        ? r.String
                        : Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue)
                    : r.AttributeAnyValue
                // Returns a setter function for the attribute
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                )
            })

    /**
     * @param {Grammar} r
     * @param {EntityConstructor} entityType
     * @param {Boolean | Number} acceptUnknownKeys can be anumber to specify the limit or true, to let it be a reasonable value
     */
    static createEntityGrammar = (r, entityType, acceptUnknownKeys = true) =>
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
                let totalKeys = Object.keys(values)
                // Check missing values
                if (
                    Object.keys(entityType.attributes)
                        .filter(key => entityType.attributes[key].expected)
                        .find(key => !totalKeys.includes(key))
                ) {
                    return P.fail()
                }
                const unknownKeys = Object.keys(values).filter(key => !(key in entityType.attributes)).length
                if (
                    !acceptUnknownKeys && unknownKeys > 0
                    // Unknown keys must still be limited in number
                    || acceptUnknownKeys && unknownKeys + 0.5 > Math.sqrt(totalKeys)
                ) {
                    return P.fail()
                }
                return P.succeed().map(() => new entityType(values))
            })

    /*   ---   General   ---   */

    /** @param {Grammar} r */
    Null = r => P.regex(new RegExp(String.raw`\(${Grammar.Regex.InlineOptWhitespace.source}\)`)).map(() => null).desc("null: ()")

    /** @param {Grammar} r */
    Boolean = r => Grammar.regexMap(/(true)|false/i, v => v[1] ? true : false).desc("either True or False")

    /** @param {Grammar} r */
    Number = r => P.regex(Grammar.Regex.Number).map(Number).desc("a number")

    /** @param {Grammar} r */
    BigInt = r => P.regex(Grammar.Regex.Integer).map(v => BigInt(v)).desc("a big integer")

    /** @param {Grammar} r */
    RealUnit = r => P.regex(Grammar.Regex.RealUnit).map(Number).desc("a number between 0 and 1")

    /** @param {Grammar} r */
    NaturalNumber = r => Grammar.regexMap(/\d+/, v => parseInt(v[0])).desc("a natural number")

    /** @param {Grammar} r */
    ColorNumber = r => P.regexp(Grammar.Regex.ByteInteger).desc("a number between 0 and 255")

    /** @param {Grammar} r */
    Word = r => P.regexp(Grammar.Regex.Word).desc("a word")

    /** @param {Grammar} r */
    String = r => P.regexp(new RegExp(`"(${Grammar.Regex.InsideString.source})"`), 1).map(Utility.unescapeString)
        .desc('string (with possibility to escape the quote using \")')

    /** @param {Grammar} r */
    AttributeName = r => P.regexp(new RegExp(String.raw`(?:(?:^|(?<!^)\.)${Grammar.Regex.Word.source})+`))
        .desc("dot-separated words")

    /*   ---   Entity   ---   */

    /** @param {Grammar} r */
    None = r => P.string("None").map(() => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")

    /** @param {Grammar} r */
    Integer64 = r => r.BigInt.map(v => new Integer64Entity(v)).desc("an integer64")

    /** @param {Grammar} r */
    Integer = r => P.regex(Grammar.Regex.Integer).map(v => new IntegerEntity(v)).desc("an integer")

    /** @param {Grammar} r */
    Byte = r => P.regex(Grammar.Regex.ByteInteger).map(v => new ByteEntity(parseInt(v))).desc("a Byte")

    /** @param {Grammar} r */
    Guid = r => P.regexp(new RegExp(`${Grammar.Regex.HexDigit.source}{32}`))
        .map(v => new GuidEntity({ value: v }))
        .desc("32 digit hexadecimal value")

    /** @param {Grammar} r */
    Identifier = r => P.regex(/\w+/).map(v => new IdentifierEntity(v))

    /** @param {Grammar} r */
    PathSymbol = r => P.regex(/\w+/).map(v => new PathSymbolEntity({ value: v }))

    /** @param {Grammar} r */
    PathSymbolOptSpaces = r => P.regex(/(?:(?:^|(?<!^) )\w+)+/).map(v => new PathSymbolEntity({ value: v }))

    /** @param {Grammar} r */
    Symbol = r => P.regex(Grammar.Regex.Symbol).map(v => new SymbolEntity({ value: v }))

    /** @param {Grammar} r */
    Enum = r => P.regex(Grammar.Regex.Symbol).map(v => new EnumEntity({ value: v }))

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
    LocalizedText = r =>
        Grammar.regexMap(
            new RegExp(
                String.raw`${LocalizedTextEntity.lookbehind}\s*\(`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*\)`
            ),
            matchResult => new LocalizedTextEntity({
                namespace: matchResult[1],
                key: matchResult[2],
                value: matchResult[3]
            }
            )
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
        r.Vector,
        r.LinearColor,
        r.Vector2D,
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
    PinType = r => Grammar.createEntityGrammar(r, PinTypeEntity, true)

    /** @param {Grammar} r */
    Vector2D = r => Grammar.createEntityGrammar(r, Vector2DEntity, false)

    /** @param {Grammar} r */
    Vector = r => Grammar.createEntityGrammar(r, VectorEntity, false)

    /** @param {Grammar} r */
    Rotator = r => Grammar.createEntityGrammar(r, RotatorEntity, false)

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
    SimpleSerializationVector2D = r => P.seqMap(
        r.Number,
        P.string(",").trim(P.optWhitespace),
        r.Number,
        (x, _1, y) => new SimpleSerializationVector2DEntity({
            X: x,
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
    LinearColor = r => Grammar.createEntityGrammar(r, LinearColorEntity, false)

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
        P.regex(/CustomProperties\s+/)
            .then(r.Pin)
            .map(pin => entity => {
                /** @type {Array} */
                let properties = Utility.objectGet(entity, ["CustomProperties"], [])
                properties.push(pin)
                Utility.objectSet(entity, ["CustomProperties"], properties, true)
            })

    /** @param {Grammar} r */
    Object = r => P.seqMap(
        P.regexp(/Begin\s+Object\s+/),
        P
            .alt(
                r.CustomProperties,
                Grammar.createAttributeGrammar(r, ObjectEntity)
            )
            .sepBy1(P.whitespace),
        P.regexp(/\s+End\s+Object/),
        (_0, attributes, _2) => {
            let values = {}
            attributes.forEach(attributeSetter => attributeSetter(values))
            return new ObjectEntity(values)
        }
    )

    /** @param {Grammar} r */
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
