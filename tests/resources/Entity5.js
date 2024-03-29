import AttributeInfo from "../../js/entity/AttributeInfo.js"
import IntegerEntity from "../../js/entity/IntegerEntity.js"
import ObjectEntity from "../../js/entity/ObjectEntity.js"
import EntityF from "./EntityF.js"

// @ts-expect-error
export default class Entity5 extends ObjectEntity {

    static attributes = {
        key1: AttributeInfo.createType(String),
        key2: AttributeInfo.createType(EntityF),
        key3: new AttributeInfo({
            type: IntegerEntity,
            default: new IntegerEntity(5),
            silent: true,
        }),
    }
    static grammar = this.createGrammar()
}
