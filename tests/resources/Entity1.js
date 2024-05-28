import IEntity from "../../js/entity/IEntity.js"
import NumberEntity from "../../js/entity/NumberEntity.js"

export default class Entity1 extends IEntity {

    static attributes = {
        a: NumberEntity.withDefault(type => new type(8)),
        b: NumberEntity.withDefault(type => new type(9)),
    }

    constructor(values = {}) {
        super(values)
    }
}
