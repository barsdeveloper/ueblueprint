import AttributeInfo from "../../js/entity/AttributeInfo.js"
import IEntity from "../../js/entity/IEntity.js"

export default class Entity1 extends IEntity {

    static attributes = {
        a: new AttributeInfo({
            type: Number,
            default: 8,
        }),
        b: new AttributeInfo({
            type: Number,
            default: 9,
        }),
    }

    constructor(values = {}) {
        super(values)
    }
}
