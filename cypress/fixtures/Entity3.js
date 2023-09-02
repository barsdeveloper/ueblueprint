import Entity1 from "./Entity1.js"
import Entity2 from "./Entity2.js"
import IEntity from "../../js/entity/IEntity.js"
import Union from "../../js/entity/Union.js"

export default class Entity3 extends IEntity {

    static attributes = {
        alpha: {
            default: 32,
        },
        bravo: {
            type: Number,
            default: 78,
        },
        charlie: {
            type: String,
            default: "Charlie",
        },
        delta: {
            type: String,
            default: null,
        },
        echo: {
            default: "echo",
        },
        foxtrot: {
            default: false,
        },
        golf: {
            default: [],
        },
        hotel: {
            type: Array,
            default: null,
        },
        india: {
            type: [Number],
            default: () => [],
        },
        juliett: {
            type: [String],
            default: ["a", "b", "c", "d", "e"],
        },
        kilo: {
            type: [Boolean],
            default: () => [true, false, false, true, true],
        },
        lima: {
            type: String,
        },
        mike: {
            type: new Union(Number, String, Array),
            default: "Bar",
        },
        november: {
            type: new Union(Number, String, Array),
            default: 0,
        },
        oscar: {
            type: Entity1,
            default: () => new Entity1()
        },
        papa: {
            type: Entity1,
            default: () => new Entity1({ a: 12, b: 13 }),
        },
        quebec: {
            default: 0, // will assign undefined because it does not satisfy the predicate
            predicate: v => v >= 1 && v <= 10,
        },
        romeo: {
            type: Entity1,
            default: new Entity1(),
            inlined: true,
        },
        sierra: {
            type: Entity2,
            default: new Entity2(),
            inlined: true,
        }
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
