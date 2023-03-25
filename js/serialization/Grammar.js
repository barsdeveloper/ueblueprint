import * as arcsecond from "arcsecond"
import ByteEntity from "../entity/ByteEntity.js"
import EnumEntity from "../entity/EnumEntity.js"
import FormatTextEntity from "../entity/FormatTextEntity.js"
import FunctionReferenceEntity from "../entity/FunctionReferenceEntity.js"
import GuidEntity from "../entity/GuidEntity.js"
import IdentifierEntity from "../entity/IdentifierEntity.js"
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
import PathSymbolEntity from "../entity/PathSymbolEntity.js"
import PinEntity from "../entity/PinEntity.js"
import PinReferenceEntity from "../entity/PinReferenceEntity.js"
import PinTypeEntity from "../entity/PinTypeEntity.js"
import RealUnitEntity from "../entity/UnitRealEntity.js"
import RotatorEntity from "../entity/RotatorEntity.js"
import SimpleSerializationRotatorEntity from "../entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../entity/SimpleSerializationVectorEntity.js"
import SymbolEntity from "../entity/SymbolEntity.js"
import UnionType from "../entity/UnionType.js"
import UnknownKeysEntity from "../entity/UnknownKeysEntity.js"
import Utility from "../Utility.js"
import VariableReferenceEntity from "../entity/VariableReferenceEntity.js"
import Vector2DEntity from "../entity/Vector2DEntity.js"
import VectorEntity from "../entity/VectorEntity.js"

/**
 * @typedef {import ("../entity/IEntity").AttributeInformation} AttributeInformation
 * @typedef {import ("../entity/IEntity").EntityConstructor} EntityConstructor
 */
/**
 * @template T
 * @typedef {import ("arcsecond").Parser<T>} Parser
 */
/**
 * @template T
 * @typedef {import ("../entity/IEntity").AnyValueConstructor<T>} AnyValueConstructor
 */

export default class Grammar {

    /** @param {String} source */
    static unanchor = source => source[0] === "^" ? source.substring(1) : source

    static separatedBy = (source, separator, min = 1) =>
        new RegExp(
            `^${this.unanchor(source)}(?:${this.unanchor(separator)}${this.unanchor(source)})${min === 1
                ? "*"
                : min === 2
                    ? "+"
                    : `{${min},}`}`
        )

    static Regex = class {
        static ByteInteger = /^0*(?:25[0-5]|2[0-4]\d|1?\d?\d)(?!\d|\.)/ // A integer between 0 and 255
        static HexDigit = /^[0-9a-fA-F]/
        static InlineOptWhitespace = /^[^\S\n]*/
        static InlineWhitespace = /^[^\S\n]+/
        static InsideString = /^(?:[^"\\]|\\.)*/
        static Integer = /^[\-\+]?\d+(?!\d|\.)/
        static MultilineWhitespace = /\s*\n\s*/
        static Number = /^[-\+]?\d+(?:\.\d+)?(?!\d|\.)/
        static RealUnit = /^\+?(?:0(?:\.\d+)?|1(?:\.0+)?)(?![\.\d])/ // A number between 0 and 1 included
        static Symbol = /^[a-zA-Z_]\w*/
        static DotSeparatedSymbols = Grammar.separatedBy(this.Symbol.source, "\\.")
        static PathFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:]")
        static PathSpaceFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:\\ ]")
        static Path = new RegExp(`^(?:\\/${Grammar.unanchor(this.PathFragment.source)}){2,}`)
        static PathOptSpace = new RegExp(`^(?:\\/${Grammar.unanchor(this.PathSpaceFragment.source)}){2,}`)
        static Word = /^[a-zA-Z_]+/
        static whitespace = arcsecond.whitespace
    };

    /*   ---   Factory   ---   */

    /**
     * @param {AnyValueConstructor<any>} type
     * @param {Parser<any>} defaultGrammar
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
            result = arcsecond.sequenceOf([
                arcsecond.str("("),
                this.grammarFor(undefined, type[0]),
                arcsecond.possibly(arcsecond.sequenceOf([arcsecond.whitespace, arcsecond.str(",")])),
                arcsecond.str(")"),
            ])
        } else if (type instanceof UnionType) {
            result = type.types
                .map(v => this.grammarFor(undefined, v))
                .reduce((acc, cur) => !cur || cur === this.unknownValue || acc === this.unknownValue
                    ? this.unknownValue
                    : arcsecond.choice([acc, cur])
                )
        } else if (attribute?.constructor === Object) {
            result = this.grammarFor(undefined, type, defaultGrammar)
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
                case PinTypeEntity:
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
                    result = arcsecond.sequenceOf([arcsecond.char('"'), result, arcsecond.char('"')])
                }
            }
            if (attribute.nullable) {
                result = arcsecond.choice([result, this.null])
            }
        }
        return result
    }

    static createAttributeGrammar(
        entityType,
        valueSeparator = arcsecond.regex(/^\s*=\s*/)
    ) {
        return arcsecond.sequenceOf([
            this.attributeName,
            valueSeparator,
        ]).chain(([attributeName, _1]) => this
            .grammarFor(entityType.attributes[attributeName], undefined, this.unknownValue)
            .map(attributeValue =>
                values => values[attributeName] = attributeValue
            ))
    }

    /**
     * @param {EntityConstructor} entityType
     * @param {Boolean | Number} acceptUnknownKeys Number to specify the limit or true, to let it be a reasonable value
     */
    static createEntityGrammar = (entityType, acceptUnknownKeys = true) =>
        arcsecond.sequenceOf([
            entityType.lookbehind.length
                ? arcsecond.regex(new RegExp(`^${entityType.lookbehind}\\s*\\(\\s*`))
                : arcsecond.regex(/^\(\s*/),
            arcsecond.sequenceOf([
                Grammar.createAttributeGrammar(entityType),
                arcsecond.many(
                    arcsecond.sequenceOf([
                        this.commaSeparation,
                        Grammar.createAttributeGrammar(entityType),
                    ]).map(([_0, entry]) => entry)
                )
            ]).map(([first, remaining]) => [first, ...remaining]),
            arcsecond.regex(/^(?:\s*,)?\s*\)/),
        ]).map(([_0, attributes, _2]) => {
            let values = {}
            attributes.forEach(attributeSetter => attributeSetter(values))
            return new entityType(values)
            // return values
        })
    // // Decide if we accept the entity or not. It is accepted if it doesn't have too many unexpected keys
    // .chain(values => {
    //     let totalKeys = Object.keys(values)
    //     // Check missing values
    //     if (
    //         Object.keys(entityType.attributes)
    //             .filter(key => entityType.attributes[key].expected)
    //             .find(key => !totalKeys.includes(key))
    //     ) {
    //         return P.fail()
    //     }
    //     const unknownKeys = Object.keys(values).filter(key => !(key in entityType.attributes)).length
    //     if (
    //         !acceptUnknownKeys && unknownKeys > 0
    //         // Unknown keys must still be limited in number
    //         || acceptUnknownKeys && unknownKeys + 0.5 > Math.sqrt(totalKeys)
    //     ) {
    //         return P.fail()
    //     }
    //     return P.succeed().map(() => new entityType(values))
    // })

    /*   ---   Primitive   ---   */

    static null = arcsecond.regex(/^\(\s*\)/).map(() => null)
    static true = arcsecond.regex(/^true/i).map(() => true)
    static false = arcsecond.regex(/^false/i).map(() => false)
    static boolean = arcsecond.choice([this.true, this.false])
    static number = arcsecond.regex(Grammar.Regex.Number).map(Number)
    static integer = arcsecond.regex(Grammar.Regex.Integer).map(Number)
    static bigInt = arcsecond.regex(Grammar.Regex.Integer).map(BigInt)
    static realUnit = arcsecond.regex(Grammar.Regex.RealUnit).map(Number)
    static naturalNumber = arcsecond.regex(/^\d+/).map(Number)
    static byteNumber = arcsecond.regex(Grammar.Regex.ByteInteger).map(Number)

    /*   ---   Fragment   ---   */

    static colorValue = this.byteNumber
    static word = arcsecond.regex(Grammar.Regex.Word)
    static string = arcsecond.sequenceOf([
        arcsecond.char('"'),
        arcsecond.regex(Grammar.Regex.InsideString),
        arcsecond.char('"')
    ]).map(([_1, insideString, _2]) => Utility.unescapeString(insideString))
    static path = arcsecond.choice([
        arcsecond.regex(this.Regex.Path),
        arcsecond.sequenceOf([arcsecond.char('"'), arcsecond.regex(this.Regex.PathOptSpace), arcsecond.char('"')])
            .map(values => values[1]),
        arcsecond.sequenceOf([arcsecond.str(`'"`), arcsecond.regex(this.Regex.PathOptSpace), arcsecond.str(`"'`)])
            .map(values => values[1]),
    ])
    static symbol = arcsecond.regex(this.Regex.Symbol)
    static attributeName = arcsecond.regex(this.Regex.DotSeparatedSymbols)
    static guid = arcsecond.regex(new RegExp(`${this.Regex.HexDigit.source}{32}`))
    static commaSeparation = arcsecond.regex(/^\s*,\s*/)
    static typeReference = arcsecond.choice([arcsecond.regex(this.Regex.Path), this.symbol])
    static hexColorChannel = arcsecond.regex(new RegExp(`^${this.unanchor(Grammar.Regex.HexDigit.source)}{2}`))

    /*   ---   Entity   ---   */

    static byteEntity = this.byteNumber.map(v => new ByteEntity(v))

    static enumEntity = this.symbol.map(v => new EnumEntity(v))

    static formatTextEntity = arcsecond.sequenceOf([
        arcsecond.regex(new RegExp(`^${FormatTextEntity.lookbehind}\\s*`)),
        this.grammarFor(FormatTextEntity.attributes.value)
    ])

    static functionReferenceEntity = this.createEntityGrammar(FunctionReferenceEntity)

    static guidEntity = this.guid.map(v => new GuidEntity(v))

    static identifierEntity = this.symbol.map(v => new IdentifierEntity(v))

    static integer64Entity = this.bigInt.map(v => new Integer64Entity(v))

    static integerEntity = this.integer.map(v => new IntegerEntity(v))

    static invariantTextEntity = arcsecond.sequenceOf([
        arcsecond.regex(new RegExp(`^${InvariantTextEntity.lookbehind}\\s*`)),
        this.grammarFor(InvariantTextEntity.attributes.value)
    ])

    static keyBindingEntity = arcsecond.choice([
        this.identifierEntity.map(identifier => new KeyBindingEntity({
            Key: identifier
        })),
        Grammar.createEntityGrammar(KeyBindingEntity)
    ])

    static linearColorEntity = Grammar.createEntityGrammar(LinearColorEntity, false)

    static localizedTextEntity = arcsecond.sequenceOf([
        arcsecond.regex(new RegExp(`^${LocalizedTextEntity.lookbehind}\\s*\\(\\s*"`)),
        arcsecond.regex(Grammar.Regex.InsideString),
        arcsecond.regex(/^"\s*,\s*"/),
        arcsecond.regex(Grammar.Regex.InsideString),
        arcsecond.regex(/^"\s*,\s*"/),
        arcsecond.regex(Grammar.Regex.InsideString),
        arcsecond.regex(/^"\s*\)/),
    ]).map(([_1, namespace, _2, key, _3, value]) =>
        new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value,
        })
    )

    static macroGraphReferenceEntity = Grammar.createEntityGrammar(MacroGraphReferenceEntity)

    static naturalNumberEntity = this.naturalNumber.map(v => new NaturalNumberEntity(v))

    static noneReferenceEntity = arcsecond.str("None").map(() =>
        new ObjectReferenceEntity({ type: "None", path: "" })
    )

    static typeReferenceEntity = this.typeReference.map(v =>
        new ObjectReferenceEntity({ type: v, path: "" })
    )

    static pathReferenceEntity = this.path.map(path =>
        new ObjectReferenceEntity({ type: "", path: path })
    )

    static fullReferenceEntity = arcsecond.sequenceOf([this.typeReference, arcsecond.optionalWhitespace, this.path])
        .map(([type, _2, path]) =>
            new ObjectReferenceEntity({ type: type, path: path })
        )

    static objectReferenceEntity = arcsecond.choice([
        this.noneReferenceEntity,
        this.fullReferenceEntity,
        this.pathReferenceEntity,
        this.typeReferenceEntity,
    ])

    static pathSymbolEntity = this.symbol.map(v => new PathSymbolEntity(v))

    static pinEntity = Grammar.createEntityGrammar(PinEntity)

    static pinReferenceEntity = arcsecond.sequenceOf([
        this.pathSymbolEntity,
        arcsecond.whitespace,
        this.guidEntity]).map(
            ([objectName, _1, pinGuid]) => new PinReferenceEntity({
                objectName: objectName,
                pinGuid: pinGuid,
            })
        )

    static pinTypeEntity = Grammar.createEntityGrammar(PinTypeEntity)

    static realUnitEntity = this.realUnit.map(value => new RealUnitEntity(value))

    static rotatorEntity = Grammar.createEntityGrammar(RotatorEntity, false)

    static simpleSerializationRotatorEntity = arcsecond.sequenceOf([
        this.number,
        this.commaSeparation,
        this.number,
        this.commaSeparation,
        this.number,
    ]).map(([p, _1, y, _3, r]) =>
        new SimpleSerializationRotatorEntity({
            R: r,
            P: p,
            Y: y,
        })
    )

    static simpleSerializationVector2DEntity = arcsecond.sequenceOf([
        this.number,
        this.commaSeparation,
        this.number,
    ]).map(([x, _1, y]) => new SimpleSerializationVector2DEntity({
        X: x,
        Y: y,
    }))


    static simpleSerializationVectorEntity = arcsecond.sequenceOf([
        this.number,
        this.commaSeparation,
        this.number,
        this.commaSeparation,
        this.number,
    ]).map(([x, _1, y, _3, z]) => new SimpleSerializationVectorEntity({
        X: x,
        Y: y,
        Z: z,
    }))

    static symbolEntity = this.symbol.map(v => new SymbolEntity(v))

    static variableReferenceEntity = Grammar.createEntityGrammar(VariableReferenceEntity)

    static vector2DEntity = Grammar.createEntityGrammar(Vector2DEntity, false)

    static vectorEntity = Grammar.createEntityGrammar(VectorEntity, false)

    static unknownKeysEntity = arcsecond.sequenceOf([
        this.symbol,
        arcsecond.regex(/^\w*\s*\(\s*/),
        arcsecond.many1(this.createAttributeGrammar(UnknownKeysEntity)),
        arcsecond.possibly(arcsecond.regex(/^\s*\,\)/)), // Optional trailing comma
        arcsecond.regex(/^\s*\)/),
    ]).map(([lookbehind, _1, attributes, _3, _4]) => {
        let values = {}
        attributes.forEach(attributeSetter => attributeSetter(values))
        let result = new UnknownKeysEntity(values)
        if (lookbehind) {
            result.lookbehind = lookbehind
        }
        return result
    })

    static unknownValue = arcsecond.choice([
        // Remember to keep the order, otherwise parsing might fail
        this.boolean,
        this.guidEntity,
        this.noneReferenceEntity,
        this.null,
        this.number,
        this.string,
        this.localizedTextEntity,
        this.invariantTextEntity,
        this.pinReferenceEntity,
        this.vectorEntity,
        this.linearColorEntity,
        this.vector2DEntity,
        this.objectReferenceEntity,
        this.unknownKeysEntity,
        this.symbol,
    ])

    static customProperty = arcsecond.sequenceOf([
        arcsecond.regex(/^CustomProperties\s+/),
        this.pinEntity,
    ]).map(([_0, pin]) => values => {
        if (!values["CustomProperties"]) {
            values["CustomProperties"] = []
        }
        values["CustomProperties"].push(pin)
    })

    static objectEntity = arcsecond.sequenceOf([
        arcsecond.regex(/^Begin\s+Object/),
        arcsecond.many1(
            arcsecond.sequenceOf([
                arcsecond.whitespace,
                arcsecond.choice([
                    this.customProperty,
                    this.createAttributeGrammar(ObjectEntity),
                ])
            ]).map(([_0, entry]) => entry)
        ),
        arcsecond.regex(/^\s+End\s+Object/),
    ]).map(
        ([_0, attributes, _2]) => {
            let values = {}
            attributes.forEach(attributeSetter => attributeSetter(values))
            return new ObjectEntity(values)
        }
    )

    static multipleObject = arcsecond.sequenceOf([
        arcsecond.optionalWhitespace,
        arcsecond.sepBy1(arcsecond.whitespace)(this.objectEntity),
        arcsecond.optionalWhitespace,
    ]).map(([_0, objects, _2]) => objects)

    /*   ---   Others   ---   */

    /** @param {Grammar} r */
    static linearColorFromHex = arcsecond.sequenceOf([
        arcsecond.char("#"),
        arcsecond.exactly(3)(
            this.hexColorChannel
        ),
        arcsecond.possibly(this.hexColorChannel)
    ]).map((_0, [[R, G, B], A]) => new LinearColorEntity({
        R: parseInt(R, 16) / 255,
        G: parseInt(G, 16) / 255,
        B: parseInt(B, 16) / 255,
        A: A ? parseInt(A, 16) / 255 : 1,
    }))

    static linearColorRGBList = arcsecond.sequenceOf([
        this.byteNumber,
        this.commaSeparation,
        this.byteNumber,
        this.commaSeparation,
        this.byteNumber,
    ]).map(([R, _1, G, _3, B]) => new LinearColorEntity({
        R: R / 255,
        G: G / 255,
        B: B / 255,
        A: 1,
    }))

    static linearColorRGBAList = arcsecond.sequenceOf([
        this.byteNumber,
        this.commaSeparation,
        this.byteNumber,
        this.commaSeparation,
        this.byteNumber,
        this.commaSeparation,
        this.byteNumber,
    ]).map(([R, _1, G, _3, B, _5, A]) => new LinearColorEntity({
        R: R / 255,
        G: G / 255,
        B: B / 255,
        A: A,
    }))

    static linearColorRGB = arcsecond.sequenceOf([
        arcsecond.regex(/^rgb\s*\(\s*/),
        this.linearColorRGBList,
        arcsecond.regex(/^\s*\)/)
    ]).map(([_0, linearColor, _2]) => linearColor)

    static linearColorRGBA = arcsecond.sequenceOf([
        arcsecond.regex(/^rgba\s*\(\s*/),
        this.linearColorRGBAList,
        arcsecond.regex(/^\s*\)/)
    ]).map(([_0, linearColor, _2]) => linearColor)

    static linearColorFromAnyFormat = arcsecond.choice([
        this.linearColorFromHex,
        this.linearColorRGBA,
        this.linearColorRGB,
        this.linearColorRGBList,
    ])
}
