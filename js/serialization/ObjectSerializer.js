import ObjectEntity from "../entity/ObjectEntity"
import PinEntity from "../entity/PinEntity"
import ISerializer from "./ISerializer"
import SerializerFactory from "./SerializerFactory"

export default class ObjectSerializer extends ISerializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false)
    }

    showProperty(attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately
                return false
        }
        return super.showProperty(attributeKey, attributeValue)
    }

    read(value) {
        const parseResult = ISerializer.grammar.Object.parse(value)
        if (!parseResult.status) {
            console.error("Error when trying to parse the object.")
            return parseResult
        }
        return parseResult.value
    }

    /**
     * 
     * @param {String} value 
     * @returns {ObjectEntity[]}
     */
    readMultiple(value) {
        const parseResult = ISerializer.grammar.MultipleObject.parse(value)
        if (!parseResult.status) {
            console.error("Error when trying to parse the object.")
            return parseResult
        }
        return parseResult.value
    }

    /**
     * 
     * @param {ObjectEntity} object 
     * @returns 
     */
    write(object) {
        let result = `Begin Object Class=${this.writeValue(object.Class)} Name=${this.writeValue(object.Name)}
${this.subWrite([], object)
            + object
                .CustomProperties.map(pin => this.separator + this.prefix + "CustomProperties " + SerializerFactory.getSerializer(PinEntity).write(pin))
                .join("")}
End Object`
        return result
    }
}
