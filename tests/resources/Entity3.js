import AlternativesEntity from "../../js/entity/AlternativesEntity.js"
import ArrayEntity from "../../js/entity/ArrayEntity.js"
import BooleanEntity from "../../js/entity/BooleanEntity.js"
import IEntity from "../../js/entity/IEntity.js"
import NumberEntity from "../../js/entity/NumberEntity.js"
import StringEntity from "../../js/entity/StringEntity.js"
import Entity1 from "./Entity1.js"
import Entity2 from "./Entity2.js"

export default class Entity3 extends IEntity {

    static attributes = {
        alpha: NumberEntity.withDefault(type => new type(32)),
        bravo: NumberEntity.withDefault(type => new type(78)),
        charlie: StringEntity.withDefault(type => new type("Charlie")),
        delta: StringEntity.withDefault(type => null),
        echo: StringEntity.withDefault(type => new type("echo")),
        foxtrot: BooleanEntity.withDefault(),
        golf: ArrayEntity.of(StringEntity).withDefault(),
        hotel: ArrayEntity.of(NumberEntity).withDefault(() => null),
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
        mike: AlternativesEntity.accepting(NumberEntity, StringEntity, ArrayEntity).withDefault(type => new StringEntity("Bar")),
        november: AlternativesEntity.accepting(NumberEntity, StringEntity, ArrayEntity).withDefault(type => new NumberEntity(0)),
        oscar: Entity1.withDefault(type => new type()),
        papa: Entity1.withDefault(type => new type({ a: 12, b: 13 })),
        quebec: NumberEntity.withDefault(), // will assign undefined because it does not satisfy the predicate,
        romeo: Entity1.withDefault().flagInlined(),
        sierra: Entity2.withDefault().flagInlined(),
    }
}
