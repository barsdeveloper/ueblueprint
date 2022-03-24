import IdentifierEntity from "./IdentifierEntity"
import IEntity from "./IEntity"

export default class KeyBindingEntity extends IEntity {

    static attributes = {
        ActionName: "",
        bShift: false,
        bCtrl: false,
        bAlt: false,
        bCmd: false,
        Key: IdentifierEntity,
    }
    constructor(options = {}) {
        super(options)
    }
}
