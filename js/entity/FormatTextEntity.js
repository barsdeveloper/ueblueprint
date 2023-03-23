import IEntity from "./IEntity.js"
import InvariantTextEntity from "./InvariantTextEntity.js"
import LocalizedTextEntity from "./LocalizedTextEntity.js"
import UnionType from "./UnionType.js"

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
