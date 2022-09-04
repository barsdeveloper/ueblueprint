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
        options.ActionName = options.ActionName ?? ""
        options.bShift = options.bShift ?? false
        options.bCtrl = options.bCtrl ?? false
        options.bAlt = options.bAlt ?? false
        options.bCmd = options.bCmd ?? false
        super(options)
    }
}
