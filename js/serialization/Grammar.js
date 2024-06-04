import Parsernostrum from "parsernostrum"
import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import AlternativesEntity from "../entity/AlternativesEntity.js"
import AttributeInfo from "../entity/AttributeInfo.js"
import IEntity from "../entity/IEntity.js"
import MirroredEntity from "../entity/MirroredEntity.js"
import Serializable from "./Serializable.js"

export default class Grammar {

    /** @type {String} */
    // @ts-expect-error
    static numberRegexSource = Parsernostrum.number.getParser().parser.regexp.source

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
        static MultipleWordsSymbols = Grammar.separatedBy(this.Symbol.source, "(?:\\.|\\ +)")
        static PathFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:]")
        static PathSpaceFragment = Grammar.separatedBy(this.Symbol.source, "[\\.:\\ ]")
        static Path = new RegExp(`(?:\\/${this.PathFragment.source}){2,}`) // Multiple (2+) /PathFragment
    }

    /*   ---   Primitive   ---   */

    static null = Parsernostrum.reg(/\(\s*\)/).map(() => null)
    static true = Parsernostrum.reg(/true/i).map(() => true)
    static false = Parsernostrum.reg(/false/i).map(() => false)
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
    static attributeNameQuoted = Parsernostrum.reg(new RegExp('"(' + Grammar.Regex.InsideString.source + ')"'), 1)
    static guid = Parsernostrum.reg(new RegExp(`${Grammar.Regex.HexDigit.source}{32}`))
    static commaSeparation = Parsernostrum.reg(/\s*,\s*(?!\))/)
    static commaOrSpaceSeparation = Parsernostrum.reg(/\s*,\s*(?!\))|\s+/)
    static equalSeparation = Parsernostrum.reg(/\s*=\s*/)
    static hexColorChannel = Parsernostrum.reg(new RegExp(Grammar.Regex.HexDigit.source + "{2}"))

    /*   ---   Factory   ---   */

    /**
     * @template T
     * @param {AttributeInfo<T>} attribute
     * @param {Parsernostrum<any>} defaultGrammar
     * @returns {Parsernostrum<T>}
     */
    static grammarFor(attribute, type = attribute?.type, defaultGrammar = this.unknownValue) {
        let result = defaultGrammar
        if (type === Array || type instanceof Array) {
            if (attribute?.inlined) {
                return this.grammarFor(undefined, type[0])
            }
            result = Parsernostrum.seq(
                Parsernostrum.reg(/\(\s*/),
                this.grammarFor(undefined, type[0]).sepBy(this.commaSeparation).opt(),
                Parsernostrum.reg(/\s*(?:,\s*)?\)/),
            ).map(([_0, values, _3]) => values instanceof Array ? values : [])
        } else if (type instanceof Union) {
            result = type.values
                .map(v => this.grammarFor(undefined, v))
                .reduce((acc, cur) => !cur || cur === this.unknownValue || acc === this.unknownValue
                    ? this.unknownValue
                    : Parsernostrum.alt(acc, cur)
                )
        } else if (type instanceof MirroredEntity) {
            // @ts-expect-error
            return this.grammarFor(undefined, type.getTargetType())
                .map(v => new MirroredEntity(type.type, () => v))
        } else if (attribute?.constructor === Object) {
            result = this.grammarFor(undefined, type)
        } else {
            switch (type) {
                case Boolean:
                    result = this.boolean
                    break
                case null:
                    result = this.null
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
                        result = /** @type {typeof Serializable} */(type).grammar
                    }
            }
        }
        if (attribute) {
            if (attribute.serialized && type.constructor !== String) {
                if (result == this.unknownValue) {
                    result = this.string
                } else {
                    result = Parsernostrum.seq(Parsernostrum.str('"'), result, Parsernostrum.str('"')).map(([_0, value, _2]) => value)
                }
            }
            if (attribute.nullable) {
                result = Parsernostrum.alt(result, this.null)
            }
        }
        return result
    }


    /**
     * @param {typeof IEntity} entityType
     * @param {String[]} key
     * @returns {typeof IEntity}
     */
    static getAttribute(entityType, [key, ...keys]) {
        const attribute = entityType?.attributes?.[key]
        if (!attribute) {
            return
        }
        if (attribute.prototype instanceof AlternativesEntity) {
            for (const alternative of /** @type {typeof AlternativesEntity} */(attribute).alternatives) {
                const candidate = this.getAttribute(alternative, keys)
                if (candidate) {
                    return candidate
                }
            }
        }
        if (keys.length > 0) {
            return this.getAttribute(attribute, keys)
        }
        return attribute
    }

    /**
     * @param {typeof IEntity} entityType
     * @param {*} attributeName
     * @param {*} valueSeparator
     * @param {*} handleObjectSet
     * @returns 
     */
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
            return (attributeValue?.grammar ?? IEntity.unknownEntityGrammar).map(attributeValue =>
                values => {
                    handleObjectSet(values, attributeKey, attributeValue)
                    Utility.objectSet(values, attributeKey, attributeValue)
                }
            )
        })
    }

    /**
     * @template {typeof IEntity} T
     * @param {T} entityType
     * @return {Parsernostrum<InstanceType<T>>}
     */
    static createEntityGrammar(entityType, entriesSeparator = this.commaSeparation, complete = false) {
        const lookbehind = entityType.lookbehind instanceof Array ? entityType.lookbehind.join("|") : entityType.lookbehind
        return Parsernostrum.seq(
            Parsernostrum.reg(new RegExp(String.raw`(${lookbehind})\s*\(\s*`), 1),
            this.createAttributeGrammar(entityType).sepBy(entriesSeparator),
            Parsernostrum.reg(/\s*(,\s*)?\)/, 1), // optional trailing comma
        )
            .map(([lookbehind, attributes, trailing]) => {
                let values = {}
                if (lookbehind.length) {
                    values["lookbehind"] = lookbehind
                }
                attributes.forEach(attributeSetter => attributeSetter(values))
                values["trailing"] = trailing !== undefined
                return values
            })
            // Decide if we accept the entity or not. It is accepted if it doesn't have too many unexpected keys
            .chain(values => {
                if (entityType.lookbehind instanceof Array || entityType.lookbehind !== lookbehind) {
                    entityType = entityType.withLookbehind(lookbehind)
                }
                const keys = Object.keys(values)
                return complete
                    ? Parsernostrum.success()
                        .assert(v => Object.keys(entityType.attributes).every(k => keys.includes(k)))
                        .map(() => new entityType(values))
                    : Parsernostrum.success().map(() => new entityType(values))
            })
    }

    /** @type {Parsernostrum<any>} */
    static unknownValue // Defined in initializeSerializerFactor to avoid circular include
}
