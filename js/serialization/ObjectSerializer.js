import Configuration from "../Configuration.js"
import Grammar from "./Grammar.js"
import ObjectEntity from "../entity/ObjectEntity.js"
import PinEntity from "../entity/PinEntity.js"
import Serializer from "./Serializer.js"
import SerializerFactory from "./SerializerFactory.js"

export default class ObjectSerializer extends Serializer {

    constructor(entityType = ObjectEntity) {
        super(entityType, undefined, "\n", true, undefined, Serializer.same)
    }

    showProperty(entity, key) {
        switch (key) {
            case "Class":
            case "Name":
            case "Archetype":
            case "ExportPath":
            case "CustomProperties":
                // Serielized separately, check doWrite()
                return false
        }
        return super.showProperty(entity, key)
    }

    /** @param {ObjectEntity} value */
    write(value, insideString = false) {
        return this.doWrite(value, insideString) + "\n"
    }

    /** @param {String} value */
    doRead(value) {
        const parseResult = Grammar.grammarFor(undefined, this.entityType).parse(value)
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
        const parseResult = ObjectEntity.getMultipleObjectsGrammar().parse(value)
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
        indentation = "",
        wrap = this.wrap,
        attributeSeparator = this.attributeSeparator,
        trailingSeparator = this.trailingSeparator,
        attributeValueConjunctionSign = this.attributeValueConjunctionSign,
        attributeKeyPrinter = this.attributeKeyPrinter,
    ) {
        const moreIndentation = indentation + Configuration.indentation
        if (!(entity instanceof ObjectEntity)) {
            return super.doWrite(
                entity,
                insideString,
                indentation,
                wrap,
                attributeSeparator,
                trailingSeparator,
                attributeValueConjunctionSign,
                // @ts-expect-error
                key => entity[key] instanceof ObjectEntity ? "" : attributeKeyPrinter(key)
            )
        }
        let result = indentation + "Begin Object"
            + (entity.Class?.type || entity.Class?.path ? ` Class=${this.doWriteValue(entity.Class, insideString)}` : "")
            + (entity.Name ? ` Name=${this.doWriteValue(entity.Name, insideString)}` : "")
            + (entity.Archetype ? ` Archetype=${this.doWriteValue(entity.Archetype, insideString)}` : "")
            + (entity.ExportPath?.type || entity.ExportPath?.path ? ` ExportPath=${this.doWriteValue(entity.ExportPath, insideString)}` : "")
            + "\n"
            + super.doWrite(
                entity,
                insideString,
                moreIndentation,
                wrap,
                attributeSeparator,
                true,
                attributeValueConjunctionSign,
                key => entity[key] instanceof ObjectEntity ? "" : attributeKeyPrinter(key)
            )
            + entity.getCustomproperties().map(pin =>
                moreIndentation
                + attributeKeyPrinter("CustomProperties ")
                + SerializerFactory.getSerializer(PinEntity).doWrite(pin, insideString)
                + this.attributeSeparator
            )
                .join("")
            + indentation + "End Object"
        return result
    }
}
