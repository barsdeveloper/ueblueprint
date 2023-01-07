import IEntity from "./IEntity"

export default class PinTypeEntity extends IEntity {

    static attributes = {
        TerminalCategory: {
            value: "",
            showDefault: false,
        },
        TerminalSubCategory: {
            value: "",
            showDefault: false,
        },
        bTerminalIsConst: {
            value: false,
            showDefault: false,
        },
        bTerminalIsWeakPointer: {
            value: false,
            showDefault: false,
        },
        bTerminalIsUObjectWrapper: {
            value: false,
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
