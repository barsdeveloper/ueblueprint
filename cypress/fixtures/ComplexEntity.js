import IEntity from "../../js/entity/IEntity"
import UnionType from "../../js/entity/UnionType"
import Utility from "../../js/Utility"
import SimpleObject from "./SimpleObject"

export default class ComplexEntity extends IEntity {

    static attributes = {
        alpha: 32,
        bravo: {
            type: Number,
            value: 78,
        },
        charlie: {
            type: String,
            value: "Charlie",
        },
        delta: {
            type: String,
            value: null,
        },
        echo: "echo",
        foxtrot: {
            value: false,
        },
        golf: {
            type: Array,
        },
        hotel: {
            type: Array,
            value: null,
        },
        india: {
            type: [Number]
        },
        juliett: {
            type: [String],
            value: ["a", "b", "c", "d", "e"],
        },
        kilo: {
            type: [Boolean],
            value: () => [true, false, false, true, true],
        },
        lima: {
            type: String,
            value: "Foo",
            showDefault: false,
        },
        mike: {
            type: new UnionType(Number, String, Array),
            value: "Bar",
        },
        november: {
            type: new UnionType(Number, String, Array),
        },
        oscar: {
            type: SimpleObject
        },
        papa: () => new SimpleObject(12, 13),
        quebec: {
            value: 0, // will assign 1 according to filter
            filter: v => Utility.clamp(v, 1, 10),
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
