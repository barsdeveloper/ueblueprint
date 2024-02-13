import EntityF from "./EntityF.js"
import ObjectEntity from "../../js/entity/ObjectEntity.js"

export default class Entity5 extends ObjectEntity {

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
    static grammar = this.createGrammar()
}
