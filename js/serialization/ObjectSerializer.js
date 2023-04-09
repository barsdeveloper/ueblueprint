import Grammar from "./Grammar.js"
import Serializer from "./Serializer.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import PinEntity from "../entity/PinEntity.js"
import SerializerFactory from "./SerializerFactory.js"

export default class ObjectSerializer extends Serializer {

    constructor() {
        super(ObjectEntity, undefined, "\n", false, undefined, k => `   ${k}`)
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
     * @returns {String}
     */
    doWrite(
        entity,
        insideString,
        wrap = this.wrap,
        attributeSeparator = this.attributeSeparator,
        trailingSeparator = this.trailingSeparator,
        attributeValueConjunctionSign = this.attributeValueConjunctionSign,
        attributeKeyPrinter = this.attributeKeyPrinter
    ) {
        if (!(entity instanceof ObjectEntity)) {
            return super.doWrite(entity, insideString)
        }
        let result = `Begin Object Class=${entity.Class.path} Name=${this.doWriteValue(entity.Name, insideString)}\n`
            + super.doWrite(entity, insideString)
            + entity.CustomProperties.map(pin =>
                this.attributeSeparator
                + "   CustomProperties "
                + SerializerFactory.getSerializer(PinEntity).doWrite(pin, insideString)
            )
                .join("")
            + "\nEnd Object\n"
        return result
    }
}
