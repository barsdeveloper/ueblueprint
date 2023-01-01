import SerializerFactory from "../serialization/SerializerFactory"
import SubAttributesDeclaration from "./SubObject"
import UnionType from "./UnionType"
import Utility from "../Utility"

/**
 * @typedef {(entity: IEntity) => AnyValue} ValueSupplier
 * @typedef {(entity: IEntity) => AnyValueConstructor<AnyValue>} TypeSupplier
 * @typedef {IEntity | String | Number | Boolean} AnySimpleValue
 * @typedef {AnySimpleValue | AnySimpleValue[]} AnyValue
 * @typedef {{
 *     [key: String]: AttributeInformation | AnyValue | SubAttributesDeclaration
 * }} AttributeDeclarations
 * @typedef {typeof IEntity} EntityConstructor
 * @typedef {{
 *     type?: AnyValueConstructor<AnyValue> | AnyValueConstructor<AnyValue>[] | UnionType | TypeSupplier,
 *     value?: AnyValue | ValueSupplier,
 *     showDefault?: Boolean,
 *     nullable?: Boolean,
 *     ignored?: Boolean,
 *     serialized?: Boolean,
 * }} AttributeInformation
 */

/**
 * @template {AnyValue} T
 * @typedef {(new () => T) | EntityConstructor | StringConstructor | NumberConstructor | BooleanConstructor | ArrayConstructor} AnyValueConstructor
 */

export default class IEntity {

    /** @type {AttributeDeclarations} */
    static attributes = {}
    static defaultAttribute = {
        showDefault: true,
        nullable: false,
        ignored: false,
        serialized: false,
    }

    constructor(values = {}, suppressWarns = false) {
        /**
         * @param {Object} target
         * @param {Object} attributes
         * @param {Object} values
         * @param {String} prefix
         */
        const defineAllAttributes = (target, attributes, values = {}, prefix = "") => {
            const valuesNames = Object.getOwnPropertyNames(values)
            for (let attributeName of Utility.mergeArrays(Object.getOwnPropertyNames(attributes), valuesNames)) {
                let value = Utility.objectGet(values, [attributeName])
                /** @type {AttributeInformation} */
                let attribute = attributes[attributeName]

                if (attribute instanceof SubAttributesDeclaration) {
                    target[attributeName] = {}
                    defineAllAttributes(
                        target[attributeName],
                        attribute.attributes,
                        values[attributeName],
                        attributeName + "."
                    )
                    continue
                }

                if (!suppressWarns) {
                    if (!(attributeName in attributes)) {
                        Utility.warn(
                            `Attribute ${prefix}${attributeName} in the serialized data is not defined in `
                            + `${this.constructor.name}.attributes`
                        )
                    } else if (
                        valuesNames.length > 0
                        && !(attributeName in values)
                        && !(!attribute.showDefault || attribute.ignored)
                    ) {
                        Utility.warn(
                            `${this.constructor.name} will add attribute ${prefix}${attributeName} not defined in the `
                            + "serialized data"
                        )
                    }
                }

                let defaultValue = attribute.value
                let defaultType = attribute.type
                if (attribute.serialized && defaultType instanceof Function) {
                    // If the attribute is serialized, the type must contain a function providing the type
                    defaultType = /** @type {TypeSupplier} */(defaultType)(this)
                }
                if (defaultType instanceof Array) {
                    defaultType = Array
                }
                if (defaultValue instanceof Function) {
                    defaultValue = defaultValue(this)
                }
                if (defaultType instanceof UnionType) {
                    if (defaultValue != undefined) {
                        defaultType = defaultType.types.find(
                            type => defaultValue instanceof type || defaultValue.constructor == type
                        ) ?? defaultType.getFirstType()
                    } else {
                        defaultType = defaultType.getFirstType()
                    }
                }
                if (defaultType === undefined) {
                    defaultType = Utility.getType(defaultValue)
                }

                if (value !== undefined) {
                    // Remember value can still be null
                    if (value?.constructor === String && attribute.serialized && defaultType !== String) {
                        value = SerializerFactory
                            .getSerializer(/** @type {AnyValueConstructor<*>} */(defaultType))
                            .deserialize(/** @type {String} */(value))
                    }
                    target[attributeName] = Utility.sanitize(value, /** @type {AnyValueConstructor<*>} */(defaultType))
                    continue // We have a value, need nothing more
                }
                if (defaultValue === undefined) {
                    defaultValue = Utility.sanitize(new /** @type {AnyValueConstructor<*>} */(defaultType)())
                }
                if (!attribute.showDefault) {
                    target[attributeName] = undefined // Declare undefined to preserve the order of attributes
                    continue
                }
                if (attribute.serialized) {
                    if (defaultType !== String && defaultValue.constructor === String) {
                        defaultValue = SerializerFactory
                            .getSerializer(/** @type {AnyValueConstructor<*>} */(defaultType))
                            .deserialize(defaultValue)
                    }
                }
                target[attributeName] = Utility.sanitize(
                    /** @type {AnyValue} */(defaultValue),
                    /** @type {AnyValueConstructor<AnyValue>} */(defaultType)
                )
            }
        }
        const attributes = /** @type {typeof IEntity} */(this.constructor).attributes
        if (values.constructor !== Object && Object.getOwnPropertyNames(attributes).length === 1) {
            // Where there is just one attribute, option can be the value of that attribute
            values = {
                [Object.getOwnPropertyNames(attributes)[0]]: values
            }
        }
        defineAllAttributes(this, attributes, values)
    }

    /** @param {AttributeDeclarations} attributes */
    static cleanupAttributes(attributes, prefix = "") {
        for (const attributeName in attributes) {
            if (attributes[attributeName] instanceof SubAttributesDeclaration) {
                this.cleanupAttributes(
                    /** @type {SubAttributesDeclaration} */(attributes[attributeName]).attributes,
                    prefix + "." + attributeName
                )
                continue
            }
            if (attributes[attributeName].constructor !== Object) {
                attributes[attributeName] = {
                    value: attributes[attributeName],
                }
            }
            const attribute = /** @type {AttributeInformation} */(attributes[attributeName])
            if (attribute.type === undefined && !(attribute.value instanceof Function)) {
                attribute.type = Utility.getType(attribute.value)
            }
            attributes[attributeName] = {
                ...IEntity.defaultAttribute,
                ...attribute,
            }
            if (attribute.value === undefined && attribute.type === undefined) {
                throw new Error(
                    `UEBlueprint: Expected either "type" or "value" property in ${this.name} attribute ${prefix}`
                    + attributeName
                )
            }
            if (attribute.value === null) {
                attributes[attributeName].nullable = true
            }
        }
    }

    static isValueOfType(value, type) {
        return value != null && (value instanceof type || value.constructor === type)
    }

    unexpectedKeys() {
        // @ts-expect-error
        return Object.getOwnPropertyNames(this).length - Object.getOwnPropertyNames(this.constructor.attributes).length
    }
}
