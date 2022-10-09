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
         * @param {Object} properties
         * @param {Object} values
         * @param {String} prefix
         */
        const defineAllAttributes = (target, properties, values, prefix = "") => {
            for (let property of Utility.mergeArrays(
                Object.getOwnPropertyNames(properties),
                Object.getOwnPropertyNames(values ?? {})
            )) {
                let value = Utility.objectGet(values, [property])
                let defaultValue = properties[property]
                let defaultType = Utility.getType(defaultValue)
                if (defaultValue instanceof CalculatedType) {
                    defaultValue = defaultValue.calculate(this)
                    defaultType = Utility.getType(defaultValue)
                }

                if (!(property in properties)) {
                    console.warn(
                        `Property ${prefix}${property} in the serialized data is not defined in ${this.constructor.name}.properties`
                    )
                } else if (
                    !(property in values)
                    && defaultValue !== undefined
                    && !(defaultValue instanceof TypeInitialization && !defaultValue.showDefault)
                ) {
                    console.warn(
                        `${this.constructor.name}.properties will add property ${prefix}${property} not defined in the serialized data`
                    )
                }

                // Not instanceof because all objects are instenceof Object, exact match needed
                // @ts-expect-error
                if (defaultType === Object) {
                    target[property] = {}
                    defineAllAttributes(target[property], properties[property], values[property], property + ".")
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
                    target[property] = TypeInitialization.sanitize(value, Utility.getType(defaultValue))
                    continue // We have a value, need nothing more
                }

                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        target[property] = undefined // Declare undefined to preserve the order of attributes
                        continue
                    }
                    if (defaultValue.serialized) {
                        defaultValue = ""
                    } else {
                        // @ts-expect-error
                        defaultType = defaultValue.type
                        defaultValue = defaultValue.value
                    }
                }
                if (defaultValue instanceof Array) {
                    defaultValue = []
                }
                target[property] = TypeInitialization.sanitize(defaultValue, defaultType)
            }
        }
        // @ts-expect-error
        const attributes = this.constructor.attributes
        if (values.constructor !== Object && Object.getOwnPropertyNames(attributes).length == 1) {
            // Where there is just one attribute, option can be the value of that attribute
            values = {
                [Object.getOwnPropertyNames(attributes)[0]]: values
            }
        }
        defineAllAttributes(this, attributes, values)
    }
}
