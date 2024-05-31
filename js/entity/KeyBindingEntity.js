import P from "parsernostrum"
import Grammar from "../serialization/Grammar.js"
import BooleanEntity from "./BooleanEntity.js"
import IEntity from "./IEntity.js"
import IdentifierEntity from "./IdentifierEntity.js"
import StringEntity from "./StringEntity.js"

export default class KeyBindingEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        ActionName: StringEntity,
        bShift: BooleanEntity,
        bCtrl: BooleanEntity,
        bAlt: BooleanEntity,
        bCmd: BooleanEntity,
        Key: IdentifierEntity,
    }
    static grammar = P.alt(
        IdentifierEntity.grammar.map(identifier => {
            const result = new this()
            result.Key = identifier
            return result
        }),
        Grammar.createEntityGrammar(this)
    )

    constructor() {
        super()
        /** @type {InstanceType<typeof KeyBindingEntity.attributes.ActionName>} */ this.ActionName
        /** @type {InstanceType<typeof KeyBindingEntity.attributes.bShift>} */ this.bShift
        /** @type {InstanceType<typeof KeyBindingEntity.attributes.bCtrl>} */ this.bCtrl
        /** @type {InstanceType<typeof KeyBindingEntity.attributes.bAlt>} */ this.bAlt
        /** @type {InstanceType<typeof KeyBindingEntity.attributes.bCmd>} */ this.bCmd
        /** @type {InstanceType<typeof KeyBindingEntity.attributes.Key>} */ this.Key
    }
}
