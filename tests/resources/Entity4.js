import ArrayEntity from "../../js/entity/ArrayEntity.js"
import IEntity from "../../js/entity/IEntity.js"
import NullEntity from "../../js/entity/NullEntity.js"
import NumberEntity from "../../js/entity/NumberEntity.js"
import Entity1 from "./Entity1.js"
import Entity3 from "./Entity3.js"

export default class Entity4 extends IEntity {

    static attributeSeparator = "\n"
    static keySeparator = " => "
    static printKey = k => `  \${${k}}`
    static wrap = (entity, v) => `Begin\n${v}\nEnd`
    static attributes = {
        ...super.attributes,
        first: Entity3.withDefault().flagInlined(),
        second: ArrayEntity.of(Entity1).withDefault(type => new type([
            new (Entity1.flagInlined())({ a: new NumberEntity(1), b: new NumberEntity(2) }),
            new Entity1({ a: new NumberEntity(11), b: new NumberEntity(22) }),
        ])).flagInlined(),
        third: ArrayEntity.withDefault(() => new NullEntity()),
    }
}
