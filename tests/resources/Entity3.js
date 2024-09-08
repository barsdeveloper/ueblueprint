import AlternativesEntity from "../../js/entity/AlternativesEntity.js"
import ArrayEntity from "../../js/entity/ArrayEntity.js"
import BooleanEntity from "../../js/entity/BooleanEntity.js"
import IEntity from "../../js/entity/IEntity.js"
import NullEntity from "../../js/entity/NullEntity.js"
import NumberEntity from "../../js/entity/NumberEntity.js"
import StringEntity from "../../js/entity/StringEntity.js"
import Entity1 from "./Entity1.js"
import Entity2 from "./Entity2.js"

export default class Entity3 extends IEntity {

    static attributeSeparator = "\n"
    static keySeparator = ": "
    static printKey = k => `    ${k}`
    static wrap = (entity, v) => `[[\n${v}\n]]`
    static attributes = {
        ...super.attributes,
        alpha: NumberEntity.withDefault(type => new type(32)),
        bravo: NumberEntity.withDefault(type => new type(78)),
        charlie: StringEntity.withDefault(type => new type("Charlie")),
        delta: StringEntity.withDefault(type => new NullEntity()),
        echo: StringEntity.withDefault(type => new type("echo")),
        foxtrot: BooleanEntity.withDefault(),
        golf: ArrayEntity.of(StringEntity).withDefault(),
        hotel: ArrayEntity.of(NumberEntity).withDefault(() => new NullEntity()),
        india: ArrayEntity.of(NumberEntity).withDefault(),
        juliett: ArrayEntity.of(StringEntity).withDefault(type => new type([
            new StringEntity("a"),
            new StringEntity("b"),
            new StringEntity("c"),
            new StringEntity("d"),
            new StringEntity("e"),
        ])),
        kilo: ArrayEntity.of(BooleanEntity).withDefault(type => new type([
            new BooleanEntity(true),
            new BooleanEntity(),
            new BooleanEntity(),
            new BooleanEntity(true),
            new BooleanEntity(true),
        ])),
        lima: StringEntity,
        mike: AlternativesEntity
            .accepting(NumberEntity, StringEntity, ArrayEntity)
            .withDefault(type => new StringEntity("Bar")),
        november: AlternativesEntity
            .accepting(NumberEntity, StringEntity, ArrayEntity)
            .withDefault(type => new NumberEntity(0)),
        oscar: Entity1.withDefault(),
        papa: Entity1.withDefault(type => new type({
            a: new NumberEntity(12),
            b: new NumberEntity(13),
        })),
        quebec: NumberEntity,
        romeo: Entity1.withDefault().flagInlined(),
        sierra: Entity2.withDefault().flagInlined(),
    }
}
