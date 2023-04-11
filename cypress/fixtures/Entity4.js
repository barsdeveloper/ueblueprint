import Entity1 from "./Entity1.js"
import Entity3 from "./Entity3.js"
import IEntity from "../../js/entity/IEntity.js"

export default class Entity4 extends IEntity {

    static attributes = {
        first: {
            type: Entity3,
            inlined: true,
        },
        second: {
            default: [new Entity1({ a: 1, b: 2 }), new Entity1({ a: 11, b: 22 })],
            inlined: true,
        },
    }

    constructor() {
        super()
        IEntity.defineAttributes(this.second, {
            0: {
                inlined: true,
            },
        })
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
