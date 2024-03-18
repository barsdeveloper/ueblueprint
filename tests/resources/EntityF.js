import AttributeInfo from "../../js/entity/AttributeInfo.js"
import IEntity from "../../js/entity/IEntity.js"
import Union from "../../js/entity/Union.js"
import Grammar from "../../js/serialization/Grammar.js"

export default class EntityF extends IEntity {

    static lookbehind = new Union("Foo", "Bar")
    static attributes = {
        ...super.attributes,
        arg1: AttributeInfo.createType(Number),
        arg2: AttributeInfo.createType(String),
    }

    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.createEntityGrammar(this, false)
    }

    constructor(values = {}) {
        super(values)
    }
}
