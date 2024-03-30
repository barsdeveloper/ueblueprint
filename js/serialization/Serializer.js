import Utility from "../Utility.js"
import AttributeInfo from "../entity/AttributeInfo.js"
import IEntity from "../entity/IEntity.js"
import Grammar from "./Grammar.js"
import SerializerFactory from "./SerializerFactory.js"

/** @template {AttributeConstructor<Attribute>} T */
export default class Serializer {

    /** @type {(v: String) => String} */
    static same = v => v

    /** @type {(entity: Attribute, serialized: String) => String} */
    static notWrapped = (entity, serialized) => serialized

    /** @type {(entity: Attribute, serialized: String) => String} */
    static bracketsWrapped = (entity, serialized) => `(${serialized})`

    /** @param {T} entityType */
    constructor(
        entityType,
        /** @type {(entity: ConstructedType<T>, serialized: String) => String} */
        wrap = (entity, serialized) => serialized,
        attributeSeparator = ",",
        trailingSeparator = false,
        attributeValueConjunctionSign = "=",
        attributeKeyPrinter = Serializer.same
    ) {
        this.entityType = entityType
        this.wrap = wrap
        this.attributeSeparator = attributeSeparator
        this.trailingSeparator = trailingSeparator
        this.attributeValueConjunctionSign = attributeValueConjunctionSign
        this.attributeKeyPrinter = attributeKeyPrinter
    }

    /**
     * @param {String} value
     * @returns {ConstructedType<T>}
     */
    read(value) {
        return this.doRead(value.trim())
    }

    /** @param {ConstructedType<T>} value */
    write(value, insideString = false) {
        return this.doWrite(value, insideString)
    }

    /**
     * @param {String} value
     * @returns {ConstructedType<T>}
     */
    doRead(value) {
        let grammar = Grammar.grammarFor(undefined, this.entityType)
        const parseResult = grammar.run(value)
        if (!parseResult.status) {
            throw new Error(
                this.entityType
                    ? `Error when trying to parse the entity ${this.entityType.prototype.constructor.name}`
                    : "Error when trying to parse null"
            )
        }
        return parseResult.value
    }

    /**
     * @param {ConstructedType<T>} entity
     * @param {Boolean} insideString
     * @returns {String}
     */
    doWrite(
        entity,
        insideString = false,
        indentation = "",
        wrap = this.wrap,
        attributeSeparator = this.attributeSeparator,
        trailingSeparator = this.trailingSeparator,
        attributeValueConjunctionSign = this.attributeValueConjunctionSign,
        attributeKeyPrinter = this.attributeKeyPrinter
    ) {
        let result = ""
        const keys = Object.keys(entity)
        let first = true
        for (const key of keys) {
            const value = entity[key]
            if (value !== undefined && this.showProperty(entity, key)) {
                let keyValue = entity instanceof Array ? `(${key})` : key
                if (AttributeInfo.getAttribute(entity, key, "quoted")) {
                    keyValue = `"${keyValue}"`
                }
                const isSerialized = AttributeInfo.getAttribute(entity, key, "serialized")
                if (first) {
                    first = false
                } else {
                    result += attributeSeparator
                }
                if (AttributeInfo.getAttribute(entity, key, "inlined")) {
                    result += this.doWrite(
                        value,
                        insideString,
                        indentation,
                        Serializer.notWrapped,
                        attributeSeparator,
                        false,
                        attributeValueConjunctionSign,
                        AttributeInfo.getAttribute(entity, key, "type") instanceof Array
                            ? k => attributeKeyPrinter(`${keyValue}${k}`)
                            : k => attributeKeyPrinter(`${keyValue}.${k}`)
                    )
                    continue
                }
                const keyPrinted = attributeKeyPrinter(keyValue)
                const indentationPrinted = attributeSeparator.includes("\n") ? indentation : ""
                result += (
                    keyPrinted.length
                        ? (indentationPrinted + keyPrinted + this.attributeValueConjunctionSign)
                        : ""
                )
                    + (
                        isSerialized
                            ? `"${this.doWriteValue(value, true, indentation)}"`
                            : this.doWriteValue(value, insideString, indentation)
                    )
            }
        }
        if (trailingSeparator && result.length) {
            // append separator at the end if asked and there was printed content
            result += attributeSeparator
        }
        return wrap(entity, result)
    }

    /** @param {Boolean} insideString */
    doWriteValue(value, insideString, indentation = "") {
        const type = Utility.getType(value)
        const serializer = SerializerFactory.getSerializer(type)
        if (!serializer) {
            throw new Error(
                `Unknown value type "${type.name}", a serializer must be registered in the SerializerFactory class, `
                + "check initializeSerializerFactory.js"
            )
        }
        return serializer.doWrite(value, insideString, indentation)
    }

    /**
     * @param {IEntity} entity
     * @param {String} key
     */
    showProperty(entity, key) {
        if (entity instanceof IEntity) {
            if (
                AttributeInfo.getAttribute(entity, key, "ignored")
                || AttributeInfo.getAttribute(entity, key, "silent") && Utility.equals(
                    AttributeInfo.getAttribute(entity, key, "default"),
                    entity[key]
                )
            ) {
                return false
            }
        }
        return true
    }
}
