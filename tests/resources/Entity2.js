import AttributeInfo from "../../js/entity/AttributeInfo.js"
import IEntity from "../../js/entity/IEntity.js"
import Entity1 from "./Entity1.js"

export default class Entity2 extends IEntity {

    static attributes = {
        someNumber: AttributeInfo.createValue(567),
        someString: AttributeInfo.createValue("alpha"),
        someString2: AttributeInfo.createValue("beta"),
        someBoolean: AttributeInfo.createValue(true),
        someBoolean2: AttributeInfo.createValue(false),
        someObjectString: AttributeInfo.createValue("gamma"),
        someArray: AttributeInfo.createValue([400, 500, 600, 700, 800]),
        someArray2: AttributeInfo.createValue(() => [400, 500, 600, 700, 800]),
        someEntity: new AttributeInfo({
            type: Entity1,
            default: new Entity1()
        }),
    }
}
