import Configuration from "../Configuration.js"
import IEntity from "../entity/IEntity.js"
import MirroredEntity from "../entity/MirroredEntity.js"
import Parsernostrum from "parsernostrum"
import Serializable from "./Serializable.js"
import Union from "../entity/Union.js"
import Utility from "../Utility.js"

export default class Grammar {

    static separatedBy = (source, separator, min = 1) =>
        new RegExp(
            source + "(?:" + separator + source + ")"
            + (min === 1 ? "*" : min === 2 ? "+" : `{${min},}`)
        )

    static Regex = class {
        static HexDigit = /[0-9a-fA-F]/
        static InsideString = /(?:[^"\\]|\\.)*/
        static InsideSingleQuotedString = /(?:[^'\\]|\\.)*/
        static Integer = /[\-\+]?\d+(?!\d|\.)/
        static Number = /[-\+]?(?:\d*\.)?\d+(?!\d|\.)/
        static RealUnit = /\+?(?:0(?:\.\d+)?|1(?:\.0+)?)(?![\.\d])/ // A number between 0 and 1 included
        static Word = Grammar.separatedBy("[a-zA-Z]", "_")
        static Symbol = /[a-zA-Z_]\w*/
        static DotSeparatedSymbols = Grammar.separatedBy(this.Symbol.source, "\\.")
        static PathFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:]")
        static PathSpaceFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:\\ ]")
        static Path = new RegExp(`(?:\\/${this.PathFragment.source}){2,}`) // Multiple (2+) /PathFragment
    }

    /*   ---   Primitive   ---   */

    static null = Parsernostrum.reg(/\(\s*\)/).map(() => null)
    static true = Parsernostrum.reg(/true/i).map(() => true)
    static false = Parsernostrum.reg(/false/i).map(() => false)
    static boolean = Parsernostrum.regArray(/(true)|false/i).map(v => v[1] ? true : false)
    static number = Parsernostrum.regArray(
        new RegExp(`(${Parsernostrum.number.getParser().parser.regexp.source})|(\\+?inf)|(-inf)`)
    ).map(([_0, n, plusInf, minusInf]) => n ? Number(n) : plusInf ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY)
    static bigInt = Parsernostrum.reg(new RegExp(Parsernostrum.number.getParser().parser.regexp.source)).map(BigInt)
        .map(result =>
            result[2] !== undefined
                ? Number.POSITIVE_INFINITY
                : result[3] !== undefined
                    ? Number.NEGATIVE_INFINITY
                    : Number(result[1])
        )
    static naturalNumber = Parsernostrum.lazy(() => Parsernostrum.reg(/\d+/).map(Number))
    static string = Parsernostrum.doubleQuotedString.map(insideString => Utility.unescapeString(insideString))

    /*   ---   Fragment   ---   */

    static colorValue = Parsernostrum.numberByte
    static word = Parsernostrum.reg(Grammar.Regex.Word)
    static symbol = Parsernostrum.reg(Grammar.Regex.Symbol)
    static symbolQuoted = Parsernostrum.reg(new RegExp('"(' + Grammar.Regex.Symbol.source + ')"'), 1)
    static attributeName = Parsernostrum.reg(Grammar.Regex.DotSeparatedSymbols)
    static attributeNameQuoted = Parsernostrum.reg(new RegExp('"(' + Grammar.Regex.DotSeparatedSymbols.source + ')"'), 1)
    static guid = Parsernostrum.reg(new RegExp(`${Grammar.Regex.HexDigit.source}{32}`))
    static commaSeparation = Parsernostrum.reg(/\s*,\s*(?!\))/)
    static commaOrSpaceSeparation = Parsernostrum.reg(/\s*,\s*(?!\))|\s+/)
    static equalSeparation = Parsernostrum.reg(/\s*=\s*/)
    static hexColorChannel = Parsernostrum.reg(new RegExp(Grammar.Regex.HexDigit.source + "{2}"))

    /*   ---   Factory   ---   */

    /**
     * @template {AttributeTypeDescription} T
     * @param {T} type
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
            if (attribute?.inlined) {
                return this.grammarFor(undefined, type[0])
            }
            result = Parsernostrum.seq(
                Parsernostrum.reg(/\(\s*/),
                this.grammarFor(undefined, type[0]).sepBy(this.commaSeparation),
                Parsernostrum.reg(/\s*(?:,\s*)?\)/),
            ).map(([_0, values, _3]) => values)
        } else if (type instanceof Union) {
            result = type.values
                .map(v => this.grammarFor(undefined, v))
                .reduce((acc, cur) => !cur || cur === this.unknownValue || acc === this.unknownValue
                    ? this.unknownValue
                    : Parsernostrum.alt(acc, cur)
                )
        } else if (type instanceof MirroredEntity) {
            return this.grammarFor(undefined, type.getTargetType())
                .map(v => new MirroredEntity(type.type, () => v))
        } else if (attribute?.constructor === Object) {
            result = this.grammarFor(undefined, type)
        } else {
            switch (type) {
                case Boolean:
                    result = this.boolean
                    break
                case Number:
                    result = this.number
                    break
                case BigInt:
                    result = this.bigInt
                    break
                case String:
                    result = this.string
                    break
                default:
                    if (/** @type {AttributeConstructor<any>} */(type)?.prototype instanceof Serializable) {
                        return /** @type {typeof Serializable} */(type).grammar
                    }
            }
        }
        if (attribute?.constructor === Object) {
            if (attribute.serialized && type.constructor !== String) {
                if (result == this.unknownValue) {
                    result = this.string
                } else {
                    result = Parsernostrum.seq(Parsernostrum.str('"'), result, Parsernostrum.str('"'))
                }
            }
            if (attribute.nullable) {
                result = Parsernostrum.alt(result, this.null)
            }
        }
        return result
    }

    /**
     * @template {AttributeConstructor<Attribute>} T
     * @param {T} entityType
     * @param {String[]} key
     * @returns {AttributeInformation}
     */
    static getAttribute(entityType, key) {
        let result
        let type
        if (entityType instanceof Union) {
            for (let t of entityType.values) {
                if (result = this.getAttribute(t, key)) {
                    return result
                }
            }
        }
        if (entityType instanceof IEntity.constructor) {
            // @ts-expect-error
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

    static createAttributeGrammar(
        entityType,
        attributeName = this.attributeName,
        valueSeparator = this.equalSeparation,
        handleObjectSet = (obj, k, v) => { }
    ) {
        return Parsernostrum.seq(
            attributeName,
            valueSeparator,
        ).chain(([attributeName, _1]) => {
            const attributeKey = attributeName.split(Configuration.keysSeparator)
            const attributeValue = this.getAttribute(entityType, attributeKey)
            return this
                .grammarFor(attributeValue)
                .map(attributeValue =>
                    values => {
                        handleObjectSet(values, attributeKey, attributeValue)
                        Utility.objectSet(values, attributeKey, attributeValue)
                    }
                )
        })
    }

    /**
     * @template {IEntity} T
     * @param {(new (...args: any) => T) & EntityConstructor} entityType
     * @param {Boolean | Number} acceptUnknownKeys Number to specify the limit or true, to let it be a reasonable value
     */
    static createEntityGrammar = (entityType, acceptUnknownKeys = true, entriesSeparator = this.commaSeparation) =>
        Parsernostrum.seq(
            Parsernostrum.reg(
                entityType.lookbehind instanceof Union
                    ? new RegExp(`(${entityType.lookbehind.values.reduce((acc, cur) => acc + "|" + cur)})\\s*\\(\\s*`)
                    : entityType.lookbehind.constructor == String && entityType.lookbehind.length
                        ? new RegExp(`(${entityType.lookbehind})\\s*\\(\\s*`)
                        : /()\(\s*/,
                1
            ),
            this.createAttributeGrammar(entityType).sepBy(entriesSeparator),
            Parsernostrum.reg(/\s*(?:,\s*)?\)/), // trailing comma
        )
            .map(([lookbehind, attributes, _2]) => {
                let values = {}
                attributes.forEach(attributeSetter => attributeSetter(values))
                if (lookbehind.length) {
                    values.lookbehind = lookbehind
                }
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
                    return Parsernostrum.failure()
                }
                const unknownKeys = Object.keys(values).filter(key => !(key in entityType.attributes)).length
                if (!acceptUnknownKeys && unknownKeys > 0) {
                    return Parsernostrum.failure()
                }
                return Parsernostrum.success().map(() => new entityType(values))
            })

    /*   ---   Entity   ---   */

    static unknownValue // Defined in initializeSerializerFactor to avoid circular include
}
