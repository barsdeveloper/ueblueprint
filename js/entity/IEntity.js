// @ts-check

import ISerializable from "./ISerializable"
import TypeInitialization from "./TypeInitialization"
import Utility from "../Utility"

export default class IEntity extends ISerializable {

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
                let defaultValue = properties[property]
                const defaultType = Utility.getType(defaultValue)
                if (!(property in properties)) {
                    console.warn(`Property ${prefix}${property} is not defined in ${this.constructor.name}`)
                } else if (
                    defaultValue != null
                    && !(defaultValue instanceof TypeInitialization && !defaultValue.showDefault)
                    && !(property in values)
                ) {
                    console.warn(`${this.constructor.name} adds property ${prefix}${property} not defined in the serialized data`)
                }
                // Not instanceof because all objects are instenceof Object, exact match needed
                if (defaultType === Object) {
                    target[property] = {}
                    defineAllAttributes(target[property], properties[property], values[property], property + ".")
                    continue
                }
                /*
                 * The value can either be:
                 *     - Array: can contain multiple values, its property is assigned multiple times like (X=1, X=4, X="Hello World").
                 *     - TypeInitialization: contains the maximum amount of information about the attribute.
                 *     - A type: the default value will be default constructed object without arguments.
                 *     - A proper value.
                 */
                const value = Utility.objectGet(values, [property])
                if (value !== undefined) {
                    target[property] = TypeInitialization.sanitize(value, defaultType)
                    // We have a value, need nothing more
                    continue
                }
                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        target[property] = undefined // Declare undefined to preserve the order or attributes
                        continue
                    }
                    defaultValue = defaultValue.value
                }
                if (defaultValue instanceof Array) {
                    target[property] = []
                    continue
                }
                if (defaultValue instanceof Function) {
                    defaultValue = TypeInitialization.sanitize(new defaultValue(), defaultType)
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
