// @ts-check

import ISerializer from "./ISerializer"
import ObjectEntity from "../entity/ObjectEntity"
import PinEntity from "../entity/PinEntity"
import SerializerFactory from "./SerializerFactory"

export default class ObjectSerializer extends ISerializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false)
    }

    showProperty(object, attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately
                return false
        }
        return super.showProperty(object, attributeKey, attributeValue)
    }

    read(value) {
        const parseResult = ISerializer.grammar.Object.parse(value)
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
        const parseResult = ISerializer.grammar.MultipleObject.parse(value)
        if (!parseResult.status) {
            throw new Error("Error when trying to parse the object.")
        }
        return parseResult.value
    }

    /**
     * @param {ObjectEntity} object
     */
    write(object) {
        let result = `Begin Object Class=${object.Class.path} Name=${this.writeValue(object.Name)}
${this.subWrite([], object)
            + object
                .CustomProperties.map(pin =>
                    this.separator
                    + this.prefix
                    + "CustomProperties "
                    + SerializerFactory.getSerializer(PinEntity).write(pin)
                )
                .join("")}
End Object\n`
        return result
    }
}
