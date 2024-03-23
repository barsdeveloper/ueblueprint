import Parsernostrum from "parsernostrum"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class LocalizedTextEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        namespace: AttributeInfo.createValue(""),
        key: AttributeInfo.createValue(""),
        value: AttributeInfo.createValue(""),
        lookbehind: new AttributeInfo({
            ...super.attributes.lookbehind,
            default: "NSLOCTEXT",
        }),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Parsernostrum.regArray(new RegExp(
            String.raw`${this.attributes.lookbehind.default}\s*\(`
            + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
            + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*,`
            + String.raw`\s*"(${Grammar.Regex.InsideString.source})"\s*`
            + String.raw`(?:,\s+)?`
            + String.raw`\)`,
            "m"
        )).map(matchResult => new this({
            namespace: Utility.unescapeString(matchResult[1]),
            key: Utility.unescapeString(matchResult[2]),
            value: Utility.unescapeString(matchResult[3]),
        }))
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
