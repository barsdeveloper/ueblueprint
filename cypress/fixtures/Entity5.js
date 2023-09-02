import EntityF from "./EntityF.js"
import IEntity from "../../js/entity/IEntity.js"

export default class Entity5 extends IEntity {

    static attributes = {
        key1: {
            type: String,
        },
        key2: {
            type: EntityF,
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
