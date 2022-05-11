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

    /**
     * @param {String} value
     */
    read(value) {
        const parseResult = ISerializer.grammar.Object.parse(value)
        if (!parseResult.status) {
            throw new Error("Error when trying to parse the object.")
        }
        return parseResult.value
    }

    /**
     * @param {String} value
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
     * @param {Boolean} insideString
     */
    write(object, insideString) {
        let result = `Begin Object Class=${object.Class.path} Name=${this.writeValue(object.Name, ["Name"], insideString)}
${this.subWrite([], object, insideString)
            + object
                .CustomProperties.map(pin =>
                    this.separator
                    + this.prefix
                    + "CustomProperties "
                    + SerializerFactory.getSerializer(PinEntity).serialize(pin)
                )
                .join("")}
End Object\n`
        return result
    }
}
