import IEntity from "./IEntity.js"

export default class PinTypeEntity extends IEntity {

    static attributes = {
        TerminalCategory: {
            default: "",
            showDefault: false,
        },
        TerminalSubCategory: {
            default: "",
            showDefault: false,
        },
        bTerminalIsConst: {
            default: false,
            showDefault: false,
        },
        bTerminalIsWeakPointer: {
            default: false,
            showDefault: false,
        },
        bTerminalIsUObjectWrapper: {
            default: false,
            showDefault: false,
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
