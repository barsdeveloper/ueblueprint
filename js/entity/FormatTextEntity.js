import IEntity from "./IEntity"
import InvariantTextEntity from "./InvariantTextEntity"
import LocalizedTextEntity from "./LocalizedTextEntity"
import UnionType from "./UnionType"

export default class FormatTextEntity extends IEntity {

    static lookbehind = "LOCGEN_FORMAT_NAMED"
    static attributes = {
        value: {
            type: [new UnionType(LocalizedTextEntity, InvariantTextEntity, FormatTextEntity)]
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.value
    }
}
