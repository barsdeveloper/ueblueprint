// @ts-check

import TypeInitialization from "./TypeInitialization"
import Utility from "../Utility"

export default class IEntity {

    static attributes = {}

    constructor(options) {
        // @ts-expect-error
        const attributes = this.constructor.attributes
        if (options.constructor !== Object && Object.getOwnPropertyNames(attributes).length == 1) {
            // Where there is just one attribute, option can be the value of that attribute
            options = {
                [Object.getOwnPropertyNames(attributes)[0]]: options
            }
        }
        /**
         * @param {String[]} prefix
         * @param {Object} target
         * @param {Object} properties
         */
        const defineAllAttributes = (prefix, target, properties) => {
            let fullKey = prefix.concat("")
            const last = fullKey.length - 1
            for (let property of Object.getOwnPropertyNames(properties)) {
                fullKey[last] = property
                let defaultValue = properties[property]
                const defaultType = (defaultValue instanceof Function) ? defaultValue : defaultValue?.constructor
                // Not instanceof because all objects are instenceof Object, exact match needed
                if (defaultType === Object) {
                    target[property] = {}
                    defineAllAttributes(fullKey, target[property], properties[property])
                    continue
                }
                /*
                 * The value can either be:
                 *     - Array: can contain multiple values, its property is assigned multiple times like (X=1, X=4, X="Hello World").
                 *     - TypeInitialization: contains the maximum amount of information about the attribute.
                 *     - A type: the default value will be default constructed object without arguments.
                 *     - A proper value.
                 */
                const value = Utility.objectGet(options, fullKey)
                if (value !== undefined) {
                    target[property] = TypeInitialization.sanitize(value, defaultType)
                    continue
                }
                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        target[property] = undefined // to preserve the order
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
        defineAllAttributes([], this, attributes)
    }

    empty() {
        return true
    }
}
