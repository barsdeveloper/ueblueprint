import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

export default class Base64ObjectsEncoded extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createType(String),
        objects: new AttributeInfo({
            ignored: true,
        }),
    }

    constructor(values) {
        super(values)
        /** @type {String} */this.value
        /** @type {ObjectEntity[]} */this.objects
    }

    decode() {

    }
}
