import AttributeInfo from "../../js/entity/AttributeInfo.js"
import IEntity from "../../js/entity/IEntity.js"
import Union from "../../js/entity/Union.js"
import Entity1 from "./Entity1.js"
import Entity2 from "./Entity2.js"

export default class Entity3 extends IEntity {

    static attributes = {
        alpha: AttributeInfo.createValue(32),
        bravo: new AttributeInfo({
            type: Number,
            default: 78,
        }),
        charlie: new AttributeInfo({
            type: String,
            default: "Charlie",
        }),
        delta: new AttributeInfo({
            type: String,
            default: null,
        }),
        echo: AttributeInfo.createValue("echo"),
        foxtrot: AttributeInfo.createValue(false),
        golf: AttributeInfo.createValue([]),
        hotel: new AttributeInfo({
            type: Array,
            default: null,
        }),
        india: new AttributeInfo({
            type: [Number],
            default: () => [],
        }),
        juliett: new AttributeInfo({
            type: [String],
            default: ["a", "b", "c", "d", "e"],
        }),
        kilo: new AttributeInfo({
            type: [Boolean],
            default: () => [true, false, false, true, true],
        }),
        lima: AttributeInfo.createType(String),
        mike: new AttributeInfo({
            type: new Union(Number, String, Array),
            default: "Bar",
        }),
        november: new AttributeInfo({
            type: new Union(Number, String, Array),
            default: 0,
        }),
        oscar: new AttributeInfo({
            type: Entity1,
            default: () => new Entity1()
        }),
        papa: new AttributeInfo({
            type: Entity1,
            default: () => new Entity1({ a: 12, b: 13 }),
        }),
        quebec: new AttributeInfo({
            default: 0, // will assign undefined because it does not satisfy the predicate
            predicate: v => v >= 1 && v <= 10,
        }),
        romeo: new AttributeInfo({
            type: Entity1,
            default: new Entity1(),
            inlined: true,
        }),
        sierra: new AttributeInfo({
            type: Entity2,
            default: new Entity2(),
            inlined: true,
        }),
    }
}
