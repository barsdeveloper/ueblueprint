import Configuration from "../Configuration.js"
import IEntity from "../entity/IEntity.js"
import MirroredEntity from "../entity/MirroredEntity.js"
import Parsimmon from "parsimmon"
import Serializable from "./Serializable.js"
import Union from "../entity/Union.js"
import Utility from "../Utility.js"

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
        static InsideSingleQuotedString = /(?:[^'\\]|\\.)*/
        static Integer = /[\-\+]?\d+(?!\d|\.)/
        static MultilineWhitespace = /\s*\n\s*/
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

    static null = P.lazy(() => P.regex(/\(\s*\)/).map(() => null))
    static true = P.lazy(() => P.regex(/true/i).map(() => true))
    static false = P.lazy(() => P.regex(/false/i).map(() => false))
    static boolean = P.lazy(() => Grammar.regexMap(/(true)|false/i, v => v[1] ? true : false))
    static number = P.lazy(() =>
        this.regexMap(new RegExp(`(${Grammar.Regex.Number.source})|(\\+?inf)|(-inf)`), result => {
            if (result[2] !== undefined) {
                return Number.POSITIVE_INFINITY
            } else if (result[3] !== undefined) {
                return Number.NEGATIVE_INFINITY
            }
            return Number(result[1])
        })
    )
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
        new RegExp(
            `'"(` + Grammar.Regex.InsideString.source + `)"'`
            + `|'(` + Grammar.Regex.InsideSingleQuotedString.source + `)'`
            + `|"(` + Grammar.Regex.InsideString.source + `)"`
        ),
        ([_0, a, b, c]) => a ?? b ?? c
    )
    static path = Grammar.regexMap(
        new RegExp(
            `'"(` + Grammar.Regex.InsideString.source + `)"'`
            + `|'(` + Grammar.Regex.InsideSingleQuotedString.source + `)'`
            + `|"(` + Grammar.Regex.InsideString.source + `)"`
            + `|(` + Grammar.Regex.Path.source + `)`
        ),
        ([_0, a, b, c, d]) => a ?? b ?? c ?? d
    )
    static symbol = P.regex(Grammar.Regex.Symbol)
    static symbolQuoted = Grammar.regexMap(
        new RegExp('"(' + Grammar.Regex.Symbol.source + ')"'),
        /** @type {(_0: String, v: String) => String} */
        ([_0, v]) => v
    )
    static attributeName = P.regex(Grammar.Regex.DotSeparatedSymbols)
    static attributeNameQuoted = Grammar.regexMap(
        new RegExp('"(' + Grammar.Regex.DotSeparatedSymbols.source + ')"'),
        ([_0, v]) => v
    )
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
            if (attribute?.inlined) {
                return this.grammarFor(undefined, type[0])
            }
            result = P.seq(
                P.regex(/\(\s*/),
                this.grammarFor(undefined, type[0]).sepBy(this.commaSeparation),
                P.regex(/\s*(?:,\s*)?\)/),
            ).map(([_0, values, _3]) => values)
        } else if (type instanceof Union) {
            result = type.values
                .map(v => this.grammarFor(undefined, v))
                .reduce((acc, cur) => !cur || cur === this.unknownValue || acc === this.unknownValue
                    ? this.unknownValue
                    : P.alt(acc, cur)
                )
        } else if (type instanceof MirroredEntity) {
            return this.grammarFor(type.type.attributes[type.key])
                .map(() => new MirroredEntity(type.type, type.key, type.getter))
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
                case Number:
                    result = this.number
                    break
                case String:
                    result = this.string
                    break
                default:
                    if (type?.prototype instanceof Serializable) {
                        // @ts-expect-error
                        return /** @type {typeof Serializable} */(type).createGrammar()
                    }
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
     * @template {AnyValue} T
     * @param {AnyValueConstructor<T>} entityType
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
        return P.seq(
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
                        Utility.objectSet(values, attributeKey, attributeValue, true)
                    }
                )
        })
    }

    /**
     * @template {IEntity} T
     * @param {new (...args: any) => T} entityType
     * @param {Boolean | Number} acceptUnknownKeys Number to specify the limit or true, to let it be a reasonable value
     * @returns {Parsimmon.Parser<T>}
     */
    static createEntityGrammar = (entityType, acceptUnknownKeys = true) =>
        P.seq(
            this.regexMap(
                entityType.lookbehind instanceof Union
                    ? new RegExp(`(${entityType.lookbehind.values.reduce((acc, cur) => acc + "|" + cur)})\\s*\\(\\s*`)
                    : entityType.lookbehind.constructor == String && entityType.lookbehind.length
                        ? new RegExp(`(${entityType.lookbehind})\\s*\\(\\s*`)
                        : /()\(\s*/,
                result => result[1]
            ),
            this.createAttributeGrammar(entityType).sepBy1(this.commaSeparation),
            P.regex(/\s*(?:,\s*)?\)/), // trailing comma
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
                    return P.fail("Missing key " + missingKey)
                }
                const unknownKeys = Object.keys(values).filter(key => !(key in entityType.attributes)).length
                if (!acceptUnknownKeys && unknownKeys > 0) {
                    return P.fail("Too many unknown keys")
                }
                return P.succeed(new entityType(values))
            })

    /*   ---   Entity   ---   */

    static unknownValue // Defined in initializeSerializerFactor to avoid circular include
}
