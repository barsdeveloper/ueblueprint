import IEntity from "../../js/entity/IEntity.js"
import NumberEntity from "../../js/entity/NumberEntity.js"

export default class Entity1 extends IEntity {

    static attributeSeparator = ", "
    static wrap = (entity, v) => `Entity1(${v})`
    static attributes = {
        ...super.attributes,
        a: NumberEntity.withDefault(type => new type(8)),
        b: NumberEntity.withDefault(type => new type(9)),
    }
}
