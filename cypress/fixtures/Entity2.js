import Entity1 from "./Entity1.js"
import IEntity from "../../js/entity/IEntity.js"

export default class Entity2 extends IEntity {

    static attributes = {
        someNumber: {
            default: 567,
        },
        someString: {
            default: "alpha",
        },
        someString2: {
            default: "beta",
        },
        someBoolean: {
            default: true,
        },
        someBoolean2: {
            default: false,
        },
        someObjectString: {
            default: new String("gamma"),
        },
        someArray: {
            default: [400, 500, 600, 700, 800],
        },
        someEntity: {
            type: Entity1,
            default: new Entity1()
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
