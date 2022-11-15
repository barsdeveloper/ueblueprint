import CalculatedType from "./CalculatedType"
import Observable from "../Observable"
import SerializerFactory from "../serialization/SerializerFactory"
import TypeInitialization from "./TypeInitialization"
import Utility from "../Utility"

/**
 * @template {IEntity} T
 * @typedef {new (Object) => T} IEntityConstructor
 */

export default class IEntity extends Observable {

    static attributes = {}

    constructor(values) {
        super()
        /**
         * @param {Object} target
         * @param {Object} attributes
         * @param {Object} values
         * @param {String} prefix
         */
        const defineAllAttributes = (target, attributes, values = {}, prefix = "") => {
            const valuesPropertyNames = Object.getOwnPropertyNames(values)
            for (let attribute of Utility.mergeArrays(Object.getOwnPropertyNames(attributes), valuesPropertyNames)) {
                let value = Utility.objectGet(values, [attribute])
                let defaultValue = attributes[attribute]
                let defaultType = Utility.getType(defaultValue)
                if (defaultValue instanceof CalculatedType) {
                    defaultValue = defaultValue.calculate(this)
                    defaultType = Utility.getType(defaultValue)
                }
                if (defaultValue != null && defaultValue === defaultType) {
                    defaultValue = new defaultType()
                }

                if (!(attribute in attributes)) {
                    console.warn(
                        `Attribute ${prefix}${attribute} in the serialized data is not defined in ${this.constructor.name}.attributes`
                    )
                } else if (
                    valuesPropertyNames.length > 0
                    && !(attribute in values)
                    && defaultValue !== undefined
                    && !(defaultValue instanceof TypeInitialization && (!defaultValue.showDefault || defaultValue.ignored))
                ) {
                    console.warn(
                        `${this.constructor.name} will add attribute ${prefix}${attribute} not defined in the serialized data`
                    )
                }

                // Not instanceof because all objects are instenceof Object, exact match needed
                // @ts-expect-error
                if (defaultType === Object) {
                    target[attribute] = {}
                    defineAllAttributes(target[attribute], attributes[attribute], values[attribute], attribute + ".")
                    continue
                }

                if (value !== undefined) {
                    // Remember value can still be null
                    if (
                        value?.constructor === String
                        && defaultValue instanceof TypeInitialization
                        && defaultValue.serialized
                        && defaultValue.type !== String
                    ) {
                        // @ts-expect-error
                        value = SerializerFactory.getSerializer(defaultValue.type).deserialize(value)
                    }
                    target[attribute] = TypeInitialization.sanitize(value, Utility.getType(defaultValue))
                    continue // We have a value, need nothing more
                }

                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        target[attribute] = undefined // Declare undefined to preserve the order of attributes
                        continue
                    }
                    if (defaultValue.serialized) {
                        defaultValue = ""
                    } else {
                        // @ts-expect-error
                        defaultType = defaultValue.type
                        defaultValue = defaultValue.value
                        if (defaultValue instanceof Function) {
                            defaultValue = defaultValue()
                        }
                    }
                }
                if (defaultValue instanceof Array) {
                    defaultValue = []
                }
                target[attribute] = TypeInitialization.sanitize(defaultValue, defaultType)
            }
        }
        // @ts-expect-error
        const attributes = this.constructor.attributes
        if (values.constructor !== Object && Object.getOwnPropertyNames(attributes).length === 1) {
            // Where there is just one attribute, option can be the value of that attribute
            values = {
                [Object.getOwnPropertyNames(attributes)[0]]: values
            }
        }
        defineAllAttributes(this, attributes, values)
    }
}
