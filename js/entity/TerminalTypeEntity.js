import IEntity from "./IEntity.js"

export default class TerminalTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        TerminalCategory: {
            type: String,
        },
        TerminalSubCategory: {
            type: String,
        },
        bTerminalIsConst: {
            type: Boolean,
        },
        bTerminalIsWeakPointer: {
            type: Boolean,
        },
        bTerminalIsUObjectWrapper: {
            type: Boolean,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }

    constructor(values) {
        super(values)
        /** @type {String} */ this.TerminalCategory
        /** @type {String} */ this.TerminalSubCategory
        /** @type {Boolean} */ this.bTerminalIsConst
        /** @type {Boolean} */ this.bTerminalIsWeakPointer
        /** @type {Boolean} */ this.bTerminalIsUObjectWrapper
    }
}
