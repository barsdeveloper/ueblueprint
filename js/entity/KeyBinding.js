import IEntity from "./IEntity"

export default class KeyBinding extends IEntity {

    static attributes = {
        bCtrlDown: false,
        bAltDown: false,
        bShiftDown: false,
        Key: String,
        CommandName: String,
    }

    getAttributes() {
        return KeyBinding.attributes
    }
}
