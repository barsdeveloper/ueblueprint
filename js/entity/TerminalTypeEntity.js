import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class TerminalTypeEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        TerminalCategory: AttributeInfo.createType(String),
        TerminalSubCategory: AttributeInfo.createType(String),
        bTerminalIsConst: AttributeInfo.createType(Boolean),
        bTerminalIsWeakPointer: AttributeInfo.createType(Boolean),
        bTerminalIsUObjectWrapper: AttributeInfo.createType(Boolean),
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
