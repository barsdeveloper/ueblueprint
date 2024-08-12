import Parsernostrum from "parsernostrum"
import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import AlternativesEntity from "../entity/AlternativesEntity.js"
import IEntity from "../entity/IEntity.js"

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

    /** @param {typeof IEntity} entityType */
    static createAttributeGrammar(
        entityType,
        attributeNameGrammar = this.attributeName,
        valueSeparator = this.equalSeparation,
        handleObjectSet = (values, attributeKey, attributeValue) => { },
    ) {
        return Parsernostrum.seq(
            attributeNameGrammar,
            valueSeparator,
        ).chain(([attributeName, _1]) => {
            const attributeKey = attributeName.split(Configuration.keysSeparator)
            const attributeValue = this.getAttribute(entityType, attributeKey)
            const grammar = attributeValue ? attributeValue.grammar : IEntity.unknownEntityGrammar
            return grammar.map(attributeValue =>
                values => {
                    Utility.objectSet(values, attributeKey, attributeValue)
                    handleObjectSet(values, attributeKey, attributeValue)
                }
            )
        })
    }

    /**
     * @template {typeof IEntity & (new (...values: any) => InstanceType<T>)} T
     * @param {T} entityType
     * @return {Parsernostrum<InstanceType<T>>}
     */
    static createEntityGrammar(entityType, entriesSeparator = this.commaSeparation, complete = false, minKeys = 1) {
        const lookbehind = entityType.lookbehind instanceof Array ? entityType.lookbehind.join("|") : entityType.lookbehind
        return Parsernostrum.seq(
            Parsernostrum.reg(new RegExp(String.raw`(${lookbehind}\s*)\(\s*`), 1),
            this.createAttributeGrammar(entityType).sepBy(entriesSeparator, minKeys),
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
}
