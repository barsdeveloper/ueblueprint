import ByteEntity from "../entity/ByteEntity.js"
import Configuration from "../Configuration.js"
import EnumEntity from "../entity/EnumEntity.js"
import FormatTextEntity from "../entity/FormatTextEntity.js"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity.js"
import GuidEntity from "../entity/GuidEntity.js"
import IdentifierEntity from "../entity/IdentifierEntity.js"
import IEntity from "../entity/IEntity.js"
import Integer64Entity from "../entity/Integer64Entity.js"
import IntegerEntity from "../entity/IntegerEntity.js"
import InvariantTextEntity from "../entity/InvariantTextEntity.js"
import KeyBindingEntity from "../entity/KeyBindingEntity.js"
import LinearColorEntity from "../entity/LinearColorEntity.js"
import LocalizedTextEntity from "../entity/LocalizedTextEntity.js"
import MacroGraphReferenceEntity from "../entity/MacroGraphReferenceEntity.js"
import NaturalNumberEntity from "../entity/NaturalNumberEntity.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import ObjectReferenceEntity from "../entity/ObjectReferenceEntity.js"
import Parsimmon from "parsimmon"
import PathSymbolEntity from "../entity/PathSymbolEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import RealUnitEntity from "../entity/UnitRealEntity.js"
import RotatorEntity from "../entity/RotatorEntity.js"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import TerminalTypeEntity from "../entity/TerminalTypeEntity.js"
import UnionType from "../entity/UnionType.js"
import UnknownKeysEntity from "../entity/UnknownKeysEntity.js"
import UserDefinedPinEntity from "../entity/UserDefinedPinEntity.js"
import Utility from "../Utility.js"
import VariableReferenceEntity from "../entity/VariableReferenceEntity.js"
import Vector2DEntity from "../entity/Vector2DEntity.js"
import VectorEntity from "../entity/VectorEntity.js"

/**
 * @typedef {import ("../entity/IEntity").AnyValue} AnyValue
 * @typedef {import ("../entity/IEntity").AttributeType} AttributeType
 * @typedef {import ("../entity/IEntity").AttributeInformation} AttributeInformation
 * @typedef {import ("../entity/IEntity").EntityConstructor} EntityConstructor
 */
/**
 * @template {AnyValue} T
 * @typedef {import ("../entity/IEntity").AnyValueConstructor<T>} AnyValueConstructor
 */

let P = Parsimmon

export default class Grammar {

    static separatedBy = (source, separator, min = 1) =>
        new RegExp(
            source + "(?:" + separator + source + ")"
            + (min === 1 ? "*" : min === 2 ? "+" : `{${min},}`)
        )

    static Regex = class {
        static ByteInteger = /0*(?:25[0-5]|2[0-4]\d|1?\d?\d)(?!\d|\.)/ // A integer between 0 and 255
        static HexDigit = /[0-9a-fA-F]/
        static InlineOptWhitespace = /[^\S\n]*/
        static InlineWhitespace = /[^\S\n]+/
        static InsideString = /(?:[^"\\]|\\.)*/
        static Integer = /[\-\+]?\d+(?!\d|\.)/
        static MultilineWhitespace = /\s*\n\s*/
        static Number = /[-\+]?\d+(?:\.\d+)?(?!\d|\.)/
        static RealUnit = /\+?(?:0(?:\.\d+)?|1(?:\.0+)?)(?![\.\d])/ // A number between 0 and 1 included
        static Word = Grammar.separatedBy("[a-zA-Z]", "_")
        static Symbol = /[a-zA-Z_]\w*/
        static DotSeparatedSymbols = Grammar.separatedBy(this.Symbol.source, "\\.")
        static PathFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:]")
        static PathSpaceFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:\\ ]")
        static Path = new RegExp(`(?:\\/${this.PathFragment.source}){2,}`)
        static PathOptSpace = new RegExp(`(?:\\/${this.PathSpaceFragment.source}){2,}`)
    }

    /*   ---   Primitive   ---   */

    static null = P.lazy(() => P.regex(/\(\s*\)/).map(() => null))
    static true = P.lazy(() => P.regex(/true/i).map(() => true))
    static false = P.lazy(() => P.regex(/false/i).map(() => false))
    static boolean = P.lazy(() => Grammar.regexMap(/(true)|false/i, v => v[1] ? true : false))
    static number = P.lazy(() => P.regex(Grammar.Regex.Number).map(Number))
    static integer = P.lazy(() => P.regex(Grammar.Regex.Integer).map(Number))
    static bigInt = P.lazy(() => P.regex(Grammar.Regex.Integer).map(BigInt))
    static realUnit = P.lazy(() => P.regex(Grammar.Regex.RealUnit).map(Number))
    static naturalNumber = P.lazy(() => P.regex(/\d+/).map(Number))
    static byteNumber = P.lazy(() => P.regex(Grammar.Regex.ByteInteger).map(Number))
    static string = P.lazy(() =>
        Grammar.regexMap(
            new RegExp(`"(${Grammar.Regex.InsideString.source})"`),
            ([_0, value]) => value
        )
            .map((insideString) => Utility.unescapeString(insideString))
    )

    /*   ---   Fragment   ---   */

    static colorValue = this.byteNumber
    static word = P.regex(Grammar.Regex.Word)
    static pathQuotes = Grammar.regexMap(
        new RegExp(`"(${Grammar.Regex.PathOptSpace.source}|${Grammar.Regex.Symbol.source})"|'"(${Grammar.Regex.PathOptSpace.source}|${Grammar.Regex.Symbol.source})"'`),
        ([_0, a, b, c]) => a ?? b ?? c
    )
    static path = Grammar.regexMap(
        new RegExp(`(${Grammar.Regex.Path.source})|"(${Grammar.Regex.PathOptSpace.source})"|'"(${Grammar.Regex.PathOptSpace.source})"'`),
        ([_0, a, b, c]) => a ?? b ?? c
    )
    static symbol = P.regex(Grammar.Regex.Symbol)
    static attributeName = P.regex(Grammar.Regex.DotSeparatedSymbols)
    static guid = P.regex(new RegExp(`${Grammar.Regex.HexDigit.source}{32}`))
    static commaSeparation = P.regex(/\s*,\s*(?!\))/)
    static equalSeparation = P.regex(/\s*=\s*/)
    static typeReference = P.alt(P.regex(Grammar.Regex.Path), this.symbol)
    static hexColorChannel = P.regex(new RegExp(Grammar.Regex.HexDigit.source + "{2}"))

    /*   ---   Factory   ---   */

    /**
     * @template T
     * @param {RegExp} re
     * @param {(execResult) => T} mapper
     */
    static regexMap(re, mapper) {
        const anchored = RegExp("^(?:" + re.source + ")", re.flags)
        const expected = "" + re
        return P((input, i) => {
            const match = anchored.exec(input.slice(i))
            if (match) {
                return P.makeSuccess(i + match[0].length, mapper(match))
            }
            return P.makeFailure(i, expected)
        })
    }

    /**
      * @param {AttributeType} type
      * @returns {Parsimmon.Parser<any>}
      */
    static grammarFor(
        attribute,
        type = attribute?.constructor === Object
            ? attribute.type
            : attribute?.constructor,
        defaultGrammar = this.unknownValue
    ) {
        let result = defaultGrammar
        if (type instanceof Array) {
            result = P.seq(
                P.regex(/\(\s*/),
                this.grammarFor(undefined, type[0]).sepBy(this.commaSeparation),
                P.regex(/\s*(?:,\s*)?\)/),
            ).map(([_0, values, _3]) => values)
        } else if (type instanceof UnionType) {
            result = type.types
                .map(v => this.grammarFor(undefined, v))
                .reduce((acc, cur) => !cur || cur === this.unknownValue || acc === this.unknownValue
                    ? this.unknownValue
                    : P.alt(acc, cur)
                )
        } else if (attribute?.constructor === Object) {
            result = this.grammarFor(undefined, type)
        } else {
            switch (type) {
                case BigInt:
                    result = this.bigInt
                    break
                case Boolean:
                    result = this.boolean
                    break
                case ByteEntity:
                    result = this.byteEntity
                    break
                case EnumEntity:
                    result = this.enumEntity
                    break
                case FormatTextEntity:
                    result = this.formatTextEntity
                    break
                case FunctionReferenceEntity:
                    result = this.functionReferenceEntity
                    break
                case GuidEntity:
                    result = this.guidEntity
                    break
                case IdentifierEntity:
                    result = this.identifierEntity
                    break
                case Integer64Entity:
                    result = this.integer64Entity
                    break
                case IntegerEntity:
                    result = this.integerEntity
                    break
                case InvariantTextEntity:
                    result = this.invariantTextEntity
                    break
                case KeyBindingEntity:
                    result = this.keyBindingEntity
                    break
                case LinearColorEntity:
                    result = this.linearColorEntity
                    break
                case LocalizedTextEntity:
                    result = this.localizedTextEntity
                    break
                case MacroGraphReferenceEntity:
                    result = this.macroGraphReferenceEntity
                    break
                case Number:
                    result = this.number
                    break
                case ObjectReferenceEntity:
                    result = this.objectReferenceEntity
                    break
                case PathSymbolEntity:
                    result = this.pathSymbolEntity
                    break
                case PinEntity:
                    result = this.pinEntity
                    break
                case PinReferenceEntity:
                    result = this.pinReferenceEntity
                    break
                case TerminalTypeEntity:
                    result = this.pinTypeEntity
                    break
                case RealUnitEntity:
                    result = this.realUnitEntity
                    break
                case RotatorEntity:
                    result = this.rotatorEntity
                    break
                case SimpleSerializationRotatorEntity:
                    result = this.simpleSerializationRotatorEntity
                    break
                case SimpleSerializationVector2DEntity:
                    result = this.simpleSerializationVector2DEntity
                    break
                case SimpleSerializationVectorEntity:
                    result = this.simpleSerializationVectorEntity
                    break
                case String:
                    result = this.string
                    break
                case SymbolEntity:
                    result = this.symbolEntity
                    break
                case UnknownKeysEntity:
                    result = this.unknownKeysEntity
                    break
                case UserDefinedPinEntity:
                    result = this.userDefinedPinEntity
                    break
                case VariableReferenceEntity:
                    result = this.variableReferenceEntity
                    break
                case Vector2DEntity:
                    result = this.vector2DEntity
                    break
                case VectorEntity:
                    result = this.vectorEntity
                    break
            }
        }
        if (attribute?.constructor === Object) {
            if (attribute.serialized && type.constructor !== String) {
                if (result == this.unknownValue) {
                    result = this.string
                } else {
                    result = P.seq(P.string('"'), result, P.string('"'))
                }
            }
            if (attribute.nullable) {
                result = P.alt(result, this.null)
            }
        }
        return result
    }

    /**
     * @param {EntityConstructor} entityType
     * @param {String[]} key
     * @returns {AttributeInformation}
     */
    static getAttribute(entityType, key) {
        let result
        let type
        if (entityType instanceof UnionType) {
            for (let t of entityType.types) {
                if (result = this.getAttribute(t, key)) {
                    return result
                }
            }
        }
        if (entityType instanceof IEntity.constructor) {
            result = entityType.attributes[key[0]]
            type = result?.type
        } else if (entityType instanceof Array) {
            result = entityType[key[0]]
            type = result
        }
        if (key.length > 1) {
            return this.getAttribute(type, key.slice(1))
        }
        return result
    }

    static createAttributeGrammar(entityType, valueSeparator = this.equalSeparation) {
        return P.seq(
            this.attributeName,
            valueSeparator,
        ).chain(([attributeName, _1]) => {
            const attributeKey = attributeName.split(Configuration.keysSeparator)
            return this
                .grammarFor(this.getAttribute(entityType, attributeKey))
                .map(attributeValue =>
                    values => Utility.objectSet(values, attributeKey, attributeValue, true)
                )
        })
    }

    /**
     * @param {EntityConstructor} entityType
     * @param {Boolean | Number} acceptUnknownKeys Number to specify the limit or true, to let it be a reasonable value
     */
    static createEntityGrammar = (entityType, acceptUnknownKeys = true) =>
        P.seq(
            entityType.lookbehind.length
                ? P.regex(new RegExp(`${entityType.lookbehind}\\s*\\(\\s*`))
                : P.regex(/\(\s*/),
            this.createAttributeGrammar(entityType).sepBy1(this.commaSeparation),
            P.regex(/\s*(?:,\s*)?\)/),
        )
            .map(([_0, attributes, _2]) => {
                let values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                return values
            })
            // Decide if we accept the entity or not. It is accepted if it doesn't have too many unexpected keys
            .chain(values => {
                let totalKeys = Object.keys(values)
                let missingKey
                // Check missing values
                if (
                    Object.keys(/** @type {AttributeInformation} */(entityType.attributes))
                        .filter(key => entityType.attributes[key].expected)
                        .find(key => !totalKeys.includes(key) && (missingKey = key))
                ) {
                    return P.fail("Missing key " + missingKey)
                }
                const unknownKeys = Object.keys(values).filter(key => !(key in entityType.attributes)).length
                if (!acceptUnknownKeys && unknownKeys > 0) {
                    return P.fail("Too many unknown keys")
                }
                return P.succeed(new entityType(values))
            })

    /*   ---   Entity   ---   */

    static byteEntity = P.lazy(() => this.byteNumber.map(v => new ByteEntity(v)))

    static enumEntity = P.lazy(() => this.symbol.map(v => new EnumEntity(v)))

    static formatTextEntity = P.lazy(() =>
        P.seq(
            P.regex(new RegExp(`${FormatTextEntity.lookbehind}\\s*`)),
            this.grammarFor(FormatTextEntity.attributes.value)
        )
    )

    static functionReferenceEntity = P.lazy(() => this.createEntityGrammar(FunctionReferenceEntity))

    static guidEntity = P.lazy(() => this.guid.map(v => new GuidEntity(v)))

    static identifierEntity = P.lazy(() => this.symbol.map(v => new IdentifierEntity(v)))

    static integer64Entity = P.lazy(() => this.bigInt.map(v => new Integer64Entity(v)))

    static integerEntity = P.lazy(() => this.integer.map(v => new IntegerEntity(v)))

    static invariantTextEntity = P.lazy(() =>
        P.alt(
            P.seq(
                P.regex(new RegExp(`${InvariantTextEntity.lookbehind}\\s*\\(`)),
                this.grammarFor(InvariantTextEntity.attributes.value),
                P.regex(/\s*\)/)
            )
                .map(([_0, value, _2]) => value),
            P.regex(new RegExp(InvariantTextEntity.lookbehind)) // InvariantTextEntity can not have arguments
                .map(() => "")
        ).map(value => new InvariantTextEntity(value))
    )

    static keyBindingEntity = P.lazy(() =>
        P.alt(
            this.identifierEntity.map(identifier => new KeyBindingEntity({
                Key: identifier
            })),
            this.createEntityGrammar(KeyBindingEntity)
        )
    )

    static linearColorEntity = P.lazy(() => this.createEntityGrammar(LinearColorEntity, false))

    static localizedTextEntity = P.lazy(() =>
        Grammar.regexMap(
            new RegExp(
                String.raw`${LocalizedTextEntity.lookbehind}\s*\(`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*`
                + String.raw`(?:,\s+)?`
                + String.raw`\)`
            ),
            matchResult => new LocalizedTextEntity({
                namespace: matchResult[1],
                key: matchResult[2],
                value: matchResult[3]
            })
        )
    )

    static macroGraphReferenceEntity = P.lazy(() => this.createEntityGrammar(MacroGraphReferenceEntity))

    static naturalNumberEntity = P.lazy(() => this.naturalNumber.map(v => new NaturalNumberEntity(v)))

    static noneReferenceEntity = P.lazy(() =>
        P.string("None").map(() =>
            new ObjectReferenceEntity({ type: "None", path: "" })
        )
    )

    static typeReferenceEntity = P.lazy(() =>
        this.typeReference.map(v =>
            new ObjectReferenceEntity({ type: v, path: "" })
        )
    )

    static pathReferenceEntity = P.lazy(() =>
        this.path.map(path =>
            new ObjectReferenceEntity({ type: "", path: path })
        )
    )

    static fullReferenceEntity = P.lazy(() =>
        P.seq(this.typeReference, P.optWhitespace, this.pathQuotes)
            .map(([type, _2, path]) =>
                new ObjectReferenceEntity({ type: type, path: path })
            )
    )

    static objectReferenceEntity = P.lazy(() =>
        P.alt(
            this.noneReferenceEntity,
            this.fullReferenceEntity,
            this.pathReferenceEntity,
            this.typeReferenceEntity,
        )
    )

    static pathSymbolEntity = P.lazy(() => this.symbol.map(v => new PathSymbolEntity(v)))

    static pinEntity = P.lazy(() => this.createEntityGrammar(PinEntity))

    static pinReferenceEntity = P.lazy(() =>
        P.seq(
            this.pathSymbolEntity,
            P.whitespace,
            this.guidEntity
        ).map(
            ([objectName, _1, pinGuid]) => new PinReferenceEntity({
                objectName: objectName,
                pinGuid: pinGuid,
            })
        )
    )

    static pinTypeEntity = P.lazy(() => this.createEntityGrammar(TerminalTypeEntity))

    static realUnitEntity = P.lazy(() => this.realUnit.map(value => new RealUnitEntity(value)))

    static rotatorEntity = P.lazy(() => this.createEntityGrammar(RotatorEntity, false))

    static simpleSerializationRotatorEntity = P.lazy(() =>
        P.seq(
            this.number,
            this.commaSeparation,
            this.number,
            this.commaSeparation,
            this.number,
        ).map(([p, _1, y, _3, r]) =>
            new SimpleSerializationRotatorEntity({
                R: r,
                P: p,
                Y: y,
            })
        )
    )

    static simpleSerializationVector2DEntity = P.lazy(() =>
        P.seq(
            this.number,
            this.commaSeparation,
            this.number,
        ).map(([x, _1, y]) => new SimpleSerializationVector2DEntity({
            X: x,
            Y: y,
        }))
    )


    static simpleSerializationVectorEntity = P.lazy(() =>
        P.seq(
            this.number,
            this.commaSeparation,
            this.number,
            this.commaSeparation,
            this.number,
        ).map(([x, _1, y, _3, z]) => new SimpleSerializationVectorEntity({
            X: x,
            Y: y,
            Z: z,
        }))
    )

    static symbolEntity = P.lazy(() => this.symbol.map(v => new SymbolEntity(v)))

    static userDefinedPinEntity = P.lazy(() => this.createEntityGrammar(UserDefinedPinEntity))

    static variableReferenceEntity = P.lazy(() => this.createEntityGrammar(VariableReferenceEntity))

    static vector2DEntity = P.lazy(() => this.createEntityGrammar(Vector2DEntity, false))

    static vectorEntity = P.lazy(() => this.createEntityGrammar(VectorEntity, false))

    static unknownKeysEntity = P.lazy(() =>
        P.seq(
            this.regexMap(
                new RegExp(`(${this.Regex.Symbol.source}\\s*)?\\(\\s*`),
                result => result[1] ?? ""
            ),
            this.attributeName
                .skip(this.equalSeparation)
                .chain((attributeName) =>
                    this.unknownValue
                        .map(attributeValue =>
                            values => values[attributeName] = attributeValue
                        )
                )
                .sepBy1(this.commaSeparation),
            P.regex(/\s*(?:,\s*)?\)/),
        )
            .map(([lookbehind, attributes, _2]) => {
                let values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                if (lookbehind.length) {
                    values.lookbehind = lookbehind
                }
                return new UnknownKeysEntity(values)
            })
    )

    static unknownValue = P.lazy(() =>
        P.alt(
            // Remember to keep the order, otherwise parsing might fail
            this.boolean,
            this.guidEntity,
            this.noneReferenceEntity,
            this.null,
            this.number,
            this.string,
            this.fullReferenceEntity,
            this.localizedTextEntity,
            this.invariantTextEntity,
            this.formatTextEntity,
            this.pinReferenceEntity,
            this.vectorEntity,
            this.rotatorEntity,
            this.linearColorEntity,
            this.vector2DEntity,
            this.unknownKeysEntity,
            this.symbolEntity,
            this.grammarFor(undefined, [PinReferenceEntity]),
            this.grammarFor(undefined, [new UnionType(Number, String, SymbolEntity)]),
        )
    )

    static customProperty = P.lazy(() =>
        P.seq(
            P.regex(/CustomProperties\s+/),
            this.grammarFor(undefined, ObjectEntity.attributes.CustomProperties.type[0]),
        ).map(([_0, pin]) => values => {
            if (!values.CustomProperties) {
                values.CustomProperties = []
            }
            values.CustomProperties.push(pin)
        })
    )

    static inlinedArrayEntry = P.lazy(() =>
        P.seq(
            this.symbol,
            this.regexMap(
                new RegExp(`\\s*\\(\\s*(\\d+)\\s*\\)\\s*\\=\\s*`),
                v => v[1]
            )
        )
            .chain(([symbol, _1]) =>
                this.grammarFor(ObjectEntity.attributes[symbol])
                    .map(currentValue =>
                        values => (values[symbol] ??= []).push(currentValue)
                    )
            )
    )

    static subObjectEntity = P.lazy(() =>
        this.objectEntity
            .map(object =>
                values => values["SubObject_" + object.Name] = object
            )
    )

    /** @type {Parsimmon.Parser<ObjectEntity>} */
    static objectEntity = P.lazy(() =>
        P.seq(
            P.regex(/Begin\s+Object/),
            P.seq(
                P.whitespace,
                P.alt(
                    this.customProperty,
                    this.createAttributeGrammar(ObjectEntity),
                    this.inlinedArrayEntry,
                    // Legacy subobject
                    this.subObjectEntity
                )
            )
                .map(([_0, entry]) => entry)
                .many(),
            P.regex(/\s+End\s+Object/),
        ).map(
            ([_0, attributes, _2]) => {
                let values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                return new ObjectEntity(values)
            }
        )
    )

    static multipleObject = P.lazy(() =>
        P.seq(
            P.optWhitespace,
            this.objectEntity,
            P.seq(
                P.whitespace,
                this.objectEntity,
            )
                .map(([_0, object]) => object)
                .many(),
            P.optWhitespace
        ).map(([_0, first, remaining, _4]) => [first, ...remaining])
    )

    /*   ---   Others   ---   */

    static linearColorFromHex = P.lazy(() =>
        Grammar.regexMap(new RegExp(
            `#(${Grammar.Regex.HexDigit.source
            }{2})(${Grammar.Regex.HexDigit.source
            }{2})(${Grammar.Regex.HexDigit.source
            }{2})(${this.Regex.HexDigit.source
            }{2})?`
        ),
            v => [v[1], v[2], v[3], v[4] ?? "FF"])
            .map(([R, G, B, A]) => new LinearColorEntity({
                R: parseInt(R, 16) / 255,
                G: parseInt(G, 16) / 255,
                B: parseInt(B, 16) / 255,
                A: parseInt(A, 16) / 255,
            }))
    )

    static linearColorRGBList = P.lazy(() =>
        P.seq(
            this.byteNumber,
            this.commaSeparation,
            this.byteNumber,
            this.commaSeparation,
            this.byteNumber,
        ).map(([R, _1, G, _3, B]) => new LinearColorEntity({
            R: R / 255,
            G: G / 255,
            B: B / 255,
            A: 1,
        }))
    )

    static linearColorRGBAList = P.lazy(() =>
        P.seq(
            this.byteNumber,
            this.commaSeparation,
            this.byteNumber,
            this.commaSeparation,
            this.byteNumber,
            this.commaSeparation,
            this.byteNumber,
        ).map(([R, _1, G, _3, B, _5, A]) => new LinearColorEntity({
            R: R / 255,
            G: G / 255,
            B: B / 255,
            A: A,
        }))
    )

    static linearColorRGB = P.lazy(() =>
        P.seq(
            P.regex(/rgb\s*\(\s*/),
            this.linearColorRGBList,
            P.regex(/\s*\)/)
        ).map(([_0, linearColor, _2]) => linearColor)
    )

    static linearColorRGBA = P.lazy(() =>
        P.seq(
            P.regex(/rgba\s*\(\s*/),
            this.linearColorRGBAList,
            P.regex(/\s*\)/)
        ).map(([_0, linearColor, _2]) => linearColor)
    )

    static linearColorFromAnyFormat = P.lazy(() =>
        P.alt(
            this.linearColorFromHex,
            this.linearColorRGBA,
            this.linearColorRGB,
            this.linearColorRGBList,
        )
    )
}
