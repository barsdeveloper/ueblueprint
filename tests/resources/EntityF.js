import IEntity from "../../js/entity/IEntity.js"
import NumberEntity from "../../js/entity/NumberEntity.js"
import StringEntity from "../../js/entity/StringEntity.js"
import Grammar from "../../js/serialization/Grammar.js"

export default class EntityF extends IEntity {

    static lookbehind = ["Foo", "Bar"]
    static attributes = {
        ...super.attributes,
        arg1: NumberEntity,
        arg2: StringEntity,
    }
    static grammar = Grammar.createEntityGrammar(this)

    constructor(values = {}) {
        super(values)
    }
}
