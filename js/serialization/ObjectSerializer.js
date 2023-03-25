import Grammar from "./Grammar.js"
import ISerializer from "./ISerializer.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import PinEntity from "../entity/PinEntity.js"
import SerializerFactory from "./SerializerFactory.js"

/**
 * @template T
 * @typedef {import("arcsecond").Ok<T, any>} Ok
 */

export default class ObjectSerializer extends ISerializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false)
    }

    showProperty(entity, object, attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately
                return false
        }
        return super.showProperty(entity, object, attributeKey, attributeValue)
    }

    /** @param {String} value */
    read(value) {
        const parseResult = Grammar.objectEntity.run(value)
        if (parseResult.isError) {
            throw new Error("Error when trying to parse the object.")
        }
        return /** @type {Ok<ObjectEntity>} */(parseResult).result
    }

    /** @param {String} value */
    readMultiple(value) {
        const parseResult = Grammar.multipleObject.run(value)
        if (parseResult.isError) {
            throw new Error("Error when trying to parse the object.")
        }
        return /** @type {Ok<ObjectEntity[]>} */(parseResult).result
    }

    /**
     * @param {ObjectEntity} object
     * @param {Boolean} insideString
     */
    write(entity, object, insideString) {
        let result = `Begin Object Class=${object.Class.path} Name=${this.writeValue(entity, object.Name, ["Name"], insideString)}
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
