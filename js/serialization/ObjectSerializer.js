import Grammar from "./Grammar.js"
import ISerializer from "./ISerializer.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import PinEntity from "../entity/PinEntity.js"
import SerializerFactory from "./SerializerFactory.js"

export default class ObjectSerializer extends ISerializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false)
    }

    showProperty(entity, key) {
        switch (key) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately, check doWrite()
                return false
        }
        return super.showProperty(entity, key)
    }

    /** @param {String} value */
    doRead(value) {
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
     * @param {ObjectEntity} entity
     * @param {Boolean} insideString
     */
    doWrite(entity, insideString) {
        let result = `Begin Object Class=${entity.Class.path} Name=${this.doWriteValue(entity.Name, insideString)}\n`
            + super.doWrite(entity, insideString)
            + entity.CustomProperties.map(pin =>
                this.attributeSeparator
                + this.attributePrefix
                + "CustomProperties "
                + SerializerFactory.getSerializer(PinEntity).write(pin)
            )
                .join("")
            + "\nEnd Object\n"
        return result
    }
}
