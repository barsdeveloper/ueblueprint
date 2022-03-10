import TypeInitialization from "./TypeInitialization"
import Utility from "../Utility"

export default class IEntity {

    constructor(options = {}) {
        /**
         * @param {String[]} prefix
         * @param {Object} target
         * @param {Object} properties
         */
        const defineAllAttributes = (prefix, target, properties) => {
            let fullKey = prefix.concat("")
            const last = fullKey.length - 1
            for (let property in properties) {
                fullKey[last] = property
                // Not instanceof because all objects are instenceof Object, exact match needed
                if (properties[property]?.constructor === Object) {
                    target[property] = {}
                    defineAllAttributes(fullKey, target[property], properties[property])
                    continue
                }
                /*
                 * The value can either be:
                 *     - Array: can contain multiple values, its property is assigned multiple times like (X=1, X=4, X="Hello World")
                 *     - TypeInitialization: contains the maximum amount of information about the attribute.
                 *     - A type: the default value will be default constructed object without arguments.
                 *     - A proper value.
                 */
                const value = Utility.objectGet(options, fullKey)
                if (value !== null) {
                    target[property] = value
                    continue
                }
                let defaultValue = properties[property]
                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        continue
                    }
                    defaultValue = defaultValue.value
                }
                if (defaultValue instanceof Array) {
                    target[property] = []
                    continue
                }
                if (defaultValue instanceof Function) {
                    defaultValue = TypeInitialization.sanitize(new defaultValue())
                }
                target[property] = defaultValue
            }
        }
        defineAllAttributes([], this, this.constructor.attributes)
    }
}
