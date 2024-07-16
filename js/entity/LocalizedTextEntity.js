import P from "parsernostrum"
import Utility from "../Utility.js"
import Grammar from "../serialization/Grammar.js"
import StringEntity from "./StringEntity.js"
import IEntity from "./IEntity.js"

export default class LocalizedTextEntity extends IEntity {

    static attributeSeparator = ", "
    static printKey = k => ""
    static lookbehind = "NSLOCTEXT"
    static attributes = {
        ...super.attributes,
        namespace: StringEntity.withDefault(),
        key: StringEntity.withDefault(),
        value: StringEntity.withDefault(),
    }
    static grammar = /** @type {P<LocalizedTextEntity>} */(
        P.regArray(new RegExp(
            String.raw`${LocalizedTextEntity.lookbehind}\s*\(`
            + String.raw`\s*"(?<namespace>${Grammar.Regex.InsideString.source})"\s*,`
            + String.raw`\s*"(?<key>${Grammar.Regex.InsideString.source})"\s*,`
            + String.raw`\s*"(?<value>${Grammar.Regex.InsideString.source})"\s*`
            + String.raw`(?<trailing>,\s+)?`
            + String.raw`\)`,
            "m"
        )).map(({ groups: { namespace, key, value, trailing } }) => {
            return new this({
                namespace: new (this.attributes.namespace)(Utility.unescapeString(namespace)),
                key: new (this.attributes.namespace)(Utility.unescapeString(key)),
                value: new (this.attributes.namespace)(Utility.unescapeString(value)),
                trailing: trailing !== undefined,
            })
        }).label("LocalizedTextEntity")
    )

    constructor(values = {}) {
        super(values)
        /** @type {InstanceType<typeof LocalizedTextEntity.attributes.namespace>} */ this.namespace
        /** @type {InstanceType<typeof LocalizedTextEntity.attributes.key>} */ this.key
        /** @type {InstanceType<typeof LocalizedTextEntity.attributes.value>} */ this.value
    }

    valueOf() {
        return Utility.capitalFirstLetter(this.value.valueOf())
    }
}
