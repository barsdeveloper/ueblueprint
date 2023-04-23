import IEntity from "./IEntity.js"
import InvariantTextEntity from "./InvariantTextEntity.js"
import LocalizedTextEntity from "./LocalizedTextEntity.js"
import UnionType from "./UnionType.js"

export default class FormatTextEntity extends IEntity {

    static lookbehind = "LOCGEN_FORMAT_NAMED"
    static attributes = {
        value: {
            type: [new UnionType(String, LocalizedTextEntity, InvariantTextEntity, FormatTextEntity)],
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {(String | LocalizedTextEntity | InvariantTextEntity | FormatTextEntity)[]} */ this.value
    }

    toString() {
        const pattern = this.value?.[0]?.toString() // The pattern is always the first element of the array
        if (!pattern) {
            return ""
        }
        const values = this.value.slice(1).map(v => v.toString())
        return pattern.replaceAll(/\{([a-zA-Z]\w*)\}/g, (substring, arg) => {
            const argLocation = values.indexOf(arg) + 1
            return argLocation > 0 && argLocation < values.length
                ? values[argLocation]
                : substring
        })
    }
}
