import IEntity from "./IEntity"

export default class KeyBindingEntity extends IEntity {

    static attributes = {
        bCtrlDown: false,
        bAltDown: false,
        bShiftDown: false,
        Key: String,
        CommandName: String,
    }

    /** @type {Boolean} */ bCtrlDown
    /** @type {Boolean} */ bAltDown
    /** @type {Boolean} */ bShiftDown
    /** @type {String} */ Key
    /** @type {String} */ CommandName
}
