import IEntity from "../../js/entity/IEntity"
import SimpleObject from "./SimpleObject"
import UnionType from "../../js/entity/UnionType"

export default class ComplexEntity extends IEntity {

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
            type: SimpleObject,
        },
        papa: {
            default: () => new SimpleObject({ a: 12, b: 13 }),
        },
        quebec: {
            default: 0, // will assign undefined because it does not satisfy the predicate
            predicate: v => v >= 1 && v <= 10,
        },
        romeo: {
            type: SimpleObject,
            inlined: true,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
