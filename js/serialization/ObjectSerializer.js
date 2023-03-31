import Grammar from "./Grammar.js"
import ISerializer from "./ISerializer.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import PinEntity from "../entity/PinEntity.js"
import SerializerFactory from "./SerializerFactory.js"

export default class ObjectSerializer extends ISerializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false)
    }

    showProperty(entity, object, attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately, check write()
                return false
        }
        return super.showProperty(entity, object, attributeKey, attributeValue)
    }

    /** @param {String} value */
    read(value) {
        const parseResult = Grammar.objectEntity.parse(value)
        if (!parseResult.status) {
            throw new Error("Error when trying to parse the object.")
        }
        return parseResult.value
    }

    /**
     * @param {String} value
     * @returns {ObjectEntity[]}
     */
    readMultiple(value) {
        const parseResult = Grammar.multipleObject.parse(value)
        if (!parseResult.status) {
            throw new Error("Error when trying to parse the object.")
        }
        return parseResult.value
    }

    /**
     * @param {ObjectEntity} object
     * @param {Boolean} insideString
     */
    write(entity, object, insideString) {
        let result = `Begin Object Class=${object.Class.path} Name=${this.writeValue(entity, object.Name, "Name", insideString)}
${this.subWrite(entity, [], object, insideString)
            + object
                .CustomProperties.map(pin =>
                    this.attributeSeparator
                    + this.attributePrefix
                    + "CustomProperties "
                    + SerializerFactory.getSerializer(PinEntity).serialize(pin)
                )
                .join("")}
End Object\n`
        return result
    }
}
