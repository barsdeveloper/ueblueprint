import { char, choice, exactly, many, many1, optionalWhitespace, Parser, possibly, regex, sepBy1, sequenceOf, str, whitespace, } from "arcsecond"
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
        static whitespace = whitespace
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
            result = sequenceOf([
                str("("),
                this.grammarFor(undefined, type[0]),
                possibly(sequenceOf([whitespace, str(",")])),
                str(")"),
            ])
        } else if (type instanceof UnionType) {
            result = type.types
                .map(v => this.grammarFor(undefined, v))
                .reduce((acc, cur) => !cur || cur === this.unknownValue || acc === this.unknownValue
                    ? this.unknownValue
                    : choice([acc, cur])
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
                    result = sequenceOf([char('"'), result, char('"')])
                }
            }
            if (attribute.nullable) {
                result = choice([result, this.null])
            }
        }
        return result
    }

    static createAttributeGrammar(
        entityType,
        valueSeparator = regex(/^\s*=\s*/)
    ) {
        return sequenceOf([
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
        sequenceOf([
            entityType.lookbehind.length
                ? regex(new RegExp(`^${entityType.lookbehind}\\s*\\(\\s*`))
                : regex(/^\(\s*/),
            sequenceOf([
                Grammar.createAttributeGrammar(entityType),
                many(
                    sequenceOf([
                        this.commaSeparation,
                        Grammar.createAttributeGrammar(entityType),
                    ]).map(([_0, entry]) => entry)
                )
            ]).map(([first, remaining]) => [first, ...remaining]),
            regex(/^(?:\s*,)?\s*\)/),
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

    static null = regex(/^\(\s*\)/).map(() => null)
    static true = regex(/^true/i).map(() => true)
    static false = regex(/^false/i).map(() => false)
    static boolean = choice([this.true, this.false])
    static number = regex(Grammar.Regex.Number).map(Number)
    static integer = regex(Grammar.Regex.Integer).map(Number)
    static bigInt = regex(Grammar.Regex.Integer).map(BigInt)
    static realUnit = regex(Grammar.Regex.RealUnit).map(Number)
    static naturalNumber = regex(/^\d+/).map(Number)
    static byteNumber = regex(Grammar.Regex.ByteInteger).map(Number)

    /*   ---   Fragment   ---   */

    static colorValue = this.byteNumber
    static word = regex(Grammar.Regex.Word)
    static string = sequenceOf([
        char('"'),
        regex(Grammar.Regex.InsideString),
        char('"')
    ]).map(([_1, insideString, _2]) => Utility.unescapeString(insideString))
    static path = choice([
        regex(this.Regex.Path),
        sequenceOf([char('"'), regex(this.Regex.PathOptSpace), char('"')])
            .map(values => values[1]),
        sequenceOf([str(`'"`), regex(this.Regex.PathOptSpace), str(`"'`)])
            .map(values => values[1]),
    ])
    static symbol = regex(this.Regex.Symbol)
    static attributeName = regex(this.Regex.DotSeparatedSymbols)
    static guid = regex(new RegExp(`${this.Regex.HexDigit.source}{32}`))
    static commaSeparation = regex(/^\s*,\s*/)
    static typeReference = choice([regex(this.Regex.Path), this.symbol])
    static hexColorChannel = regex(new RegExp(`^${this.unanchor(Grammar.Regex.HexDigit.source)}{2}`))

    /*   ---   Entity   ---   */

    static byteEntity = this.byteNumber.map(v => new ByteEntity(v))

    static enumEntity = this.symbol.map(v => new EnumEntity(v))

    static formatTextEntity = sequenceOf([
        regex(new RegExp(`^${FormatTextEntity.lookbehind}\\s*`)),
        this.grammarFor(FormatTextEntity.attributes.value)
    ])

    static functionReferenceEntity = this.createEntityGrammar(FunctionReferenceEntity)

    static guidEntity = this.guid.map(v => new GuidEntity(v))

    static identifierEntity = this.symbol.map(v => new IdentifierEntity(v))

    static integer64Entity = this.bigInt.map(v => new Integer64Entity(v))

    static integerEntity = this.integer.map(v => new IntegerEntity(v))

    static invariantTextEntity = sequenceOf([
        regex(new RegExp(`^${InvariantTextEntity.lookbehind}\\s*`)),
        this.grammarFor(InvariantTextEntity.attributes.value)
    ])

    static keyBindingEntity = choice([
        this.identifierEntity.map(identifier => new KeyBindingEntity({
            Key: identifier
        })),
        Grammar.createEntityGrammar(KeyBindingEntity)
    ])

    static linearColorEntity = Grammar.createEntityGrammar(LinearColorEntity, false)

    static localizedTextEntity = sequenceOf([
        regex(new RegExp(`^${LocalizedTextEntity.lookbehind}\\s*\\(\\s*"`)),
        regex(Grammar.Regex.InsideString),
        regex(/^"\s*,\s*"/),
        regex(Grammar.Regex.InsideString),
        regex(/^"\s*,\s*"/),
        regex(Grammar.Regex.InsideString),
        regex(/^"\s*\)/),
    ]).map(([_1, namespace, _2, key, _3, value]) =>
        new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value,
        })
    )

    static macroGraphReferenceEntity = Grammar.createEntityGrammar(MacroGraphReferenceEntity)

    static naturalNumberEntity = this.naturalNumber.map(v => new NaturalNumberEntity(v))

    static noneReferenceEntity = str("None").map(() =>
        new ObjectReferenceEntity({ type: "None", path: "" })
    )

    static typeReferenceEntity = this.typeReference.map(v =>
        new ObjectReferenceEntity({ type: v, path: "" })
    )

    static pathReferenceEntity = this.path.map(path =>
        new ObjectReferenceEntity({ type: "", path: path })
    )

    static fullReferenceEntity = sequenceOf([this.typeReference, optionalWhitespace, this.path])
        .map(([type, _2, path]) =>
            new ObjectReferenceEntity({ type: type, path: path })
        )

    static objectReferenceEntity = choice([
        this.noneReferenceEntity,
        this.fullReferenceEntity,
        this.pathReferenceEntity,
        this.typeReferenceEntity,
    ])

    static pathSymbolEntity = this.symbol.map(v => new PathSymbolEntity(v))

    static pinEntity = Grammar.createEntityGrammar(PinEntity)

    static pinReferenceEntity = sequenceOf([
        this.pathSymbolEntity,
        whitespace,
        this.guidEntity]).map(
            ([objectName, _1, pinGuid]) => new PinReferenceEntity({
                objectName: objectName,
                pinGuid: pinGuid,
            })
        )

    static pinTypeEntity = Grammar.createEntityGrammar(PinTypeEntity)

    static realUnitEntity = this.realUnit.map(value => new RealUnitEntity(value))

    static rotatorEntity = Grammar.createEntityGrammar(RotatorEntity, false)

    static simpleSerializationRotatorEntity = sequenceOf([
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

    static simpleSerializationVector2DEntity = sequenceOf([
        this.number,
        this.commaSeparation,
        this.number,
    ]).map(([x, _1, y]) => new SimpleSerializationVector2DEntity({
        X: x,
        Y: y,
    }))


    static simpleSerializationVectorEntity = sequenceOf([
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

    static unknownKeysEntity = sequenceOf([
        this.symbol,
        regex(/^\w*\s*\(\s*/),
        many1(this.createAttributeGrammar(UnknownKeysEntity)),
        possibly(regex(/^\s*\,\)/)), // Optional trailing comma
        regex(/^\s*\)/),
    ]).map(([lookbehind, _1, attributes, _3, _4]) => {
        let values = {}
        attributes.forEach(attributeSetter => attributeSetter(values))
        let result = new UnknownKeysEntity(values)
        if (lookbehind) {
            result.lookbehind = lookbehind
        }
        return result
    })

    static unknownValue = choice([
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

    static customProperty = sequenceOf([
        regex(/^CustomProperties\s+/),
        this.pinEntity,
    ]).map(([_0, pin]) => values => {
        if (!values["CustomProperties"]) {
            values["CustomProperties"] = []
        }
        values["CustomProperties"].push(pin)
    })

    static objectEntity = sequenceOf([
        regex(/^Begin\s+Object/),
        many1(
            sequenceOf([
                whitespace,
                choice([
                    this.customProperty,
                    this.createAttributeGrammar(ObjectEntity),
                ])
            ]).map(([_0, entry]) => entry)
        ),
        regex(/^\s+End\s+Object/),
    ]).map(
        ([_0, attributes, _2]) => {
            let values = {}
            attributes.forEach(attributeSetter => attributeSetter(values))
            return new ObjectEntity(values)
        }
    )

    static multipleObject = sequenceOf([
        optionalWhitespace,
        sepBy1(whitespace)(this.objectEntity),
        optionalWhitespace,
    ]).map(([_0, objects, _2]) => objects)

    /*   ---   Others   ---   */

    /** @param {Grammar} r */
    static linearColorFromHex = sequenceOf([
        char("#"),
        exactly(3)(
            this.hexColorChannel
        ),
        possibly(this.hexColorChannel)
    ]).map((_0, [[R, G, B], A]) => new LinearColorEntity({
        R: parseInt(R, 16) / 255,
        G: parseInt(G, 16) / 255,
        B: parseInt(B, 16) / 255,
        A: A ? parseInt(A, 16) / 255 : 1,
    }))

    static linearColorRGBList = sequenceOf([
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

    static linearColorRGBAList = sequenceOf([
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

    static linearColorRGB = sequenceOf([
        regex(/^rgb\s*\(\s*/),
        this.linearColorRGBList,
        regex(/^\s*\)/)
    ]).map(([_0, linearColor, _2]) => linearColor)

    static linearColorRGBA = sequenceOf([
        regex(/^rgba\s*\(\s*/),
        this.linearColorRGBAList,
        regex(/^\s*\)/)
    ]).map(([_0, linearColor, _2]) => linearColor)

    static linearColorFromAnyFormat = choice([
        this.linearColorFromHex,
        this.linearColorRGBA,
        this.linearColorRGB,
        this.linearColorRGBList,
    ])
}
