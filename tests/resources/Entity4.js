import AttributeInfo from "../../js/entity/AttributeInfo.js"
import IEntity from "../../js/entity/IEntity.js"
import Entity1 from "./Entity1.js"
import Entity3 from "./Entity3.js"

export default class Entity4 extends IEntity {

    static attributes = {
        first: new AttributeInfo({
            type: Entity3,
            default: new Entity3(),
            inlined: true,
        }),
        second: new AttributeInfo({
            default: [new Entity1({ a: 1, b: 2 }), new Entity1({ a: 11, b: 22 })],
            inlined: true,
        }),
        third: new AttributeInfo({
            type: Array,
            default: null,
        })
    }

    constructor() {
        super()
        /** @type {Entity1} */ this.second
        IEntity.defineAttributes(this.second, {
            0: {
                inlined: true,
            },
        })
    }
}
