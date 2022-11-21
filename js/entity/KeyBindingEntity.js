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

    constructor(values = {}) {
        values.ActionName = values.ActionName ?? ""
        values.bShift = values.bShift ?? false
        values.bCtrl = values.bCtrl ?? false
        values.bAlt = values.bAlt ?? false
        values.bCmd = values.bCmd ?? false
        super(values)
        /** @type {String} */ this.ActionName
        /** @type {Boolean} */ this.bShift
        /** @type {Boolean} */ this.bCtrl
        /** @type {Boolean} */ this.bAlt
        /** @type {Boolean} */ this.bCmd
        /** @type {IdentifierEntity} */ this.Key
    }
}
