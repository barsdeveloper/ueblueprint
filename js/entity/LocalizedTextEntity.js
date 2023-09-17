import Grammar from "../serialization/Grammar.js"
import IEntity from "./IEntity.js"
import Utility from "../Utility.js"

export default class LocalizedTextEntity extends IEntity {

    static lookbehind = "NSLOCTEXT"
    static attributes = {
        ...super.attributes,
        namespace: {
            default: "",
        },
        key: {
            default: "",
        },
        value: {
            default: "",
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    static getGrammar() {
        return Grammar.regexMap(
            new RegExp(
                String.raw`${LocalizedTextEntity.lookbehind}\s*\(`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
                + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*`
                + String.raw`(?:,\s+)?`
                + String.raw`\)`,
                "m"
            ),
            matchResult => new LocalizedTextEntity({
                namespace: Utility.unescapeString(matchResult[1]),
                key: Utility.unescapeString(matchResult[2]),
                value: Utility.unescapeString(matchResult[3]),
            })
        )
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.namespace
        /** @type {String} */ this.key
        /** @type {String} */ this.value
    }

    toString() {
        return Utility.capitalFirstLetter(this.value)
    }
}
