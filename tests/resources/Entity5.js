import AttributeInfo from "../../js/entity/AttributeInfo.js"
import ObjectEntity from "../../js/entity/ObjectEntity.js"
import EntityF from "./EntityF.js"

// @ts-expect-error
export default class Entity5 extends ObjectEntity {

    static attributes = {
        key1: AttributeInfo.createType(String),
        key2: AttributeInfo.createType(EntityF),
    }
    static grammar = this.createGrammar()
}
