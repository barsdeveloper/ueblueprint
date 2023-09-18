import Grammar from "../../js/serialization/Grammar.js"
import IEntity from "../../js/entity/IEntity.js"
import Union from "../../js/entity/Union.js"

export default class EntityF extends IEntity {

    static lookbehind = new Union("Foo", "Bar")
    static attributes = {
        ...super.attributes,
        arg1: {
            type: Number,
        },
        arg2: {
            type: String,
        },
    }

    static createGrammar() {
        return Grammar.createEntityGrammar(this, false)
    }

    constructor(values = {}) {
        super(values)
    }
}
