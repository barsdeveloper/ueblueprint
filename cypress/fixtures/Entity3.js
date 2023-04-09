import Entity1 from "./Entity1"
import Entity2 from "./Entity2.js"
import IEntity from "../../js/entity/IEntity"
import UnionType from "../../js/entity/UnionType"

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
            type: Array,
        },
        hotel: {
            type: Array,
            default: null,
        },
        india: {
            type: [Number],
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
            default: "Foo",
            showDefault: false,
        },
        mike: {
            type: new UnionType(Number, String, Array),
            default: "Bar",
        },
        november: {
            type: new UnionType(Number, String, Array),
        },
        oscar: {
            type: Entity1,
        },
        papa: {
            default: () => new Entity1({ a: 12, b: 13 }),
        },
        quebec: {
            default: 0, // will assign undefined because it does not satisfy the predicate
            predicate: v => v >= 1 && v <= 10,
        },
        romeo: {
            type: Entity1,
            inlined: true,
        },
        sierra: {
            type: Entity2,
            inlined: true,
        }
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
