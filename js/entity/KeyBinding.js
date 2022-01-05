import Entity from "./Entity"

export default class KeyBinding extends Entity {

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
