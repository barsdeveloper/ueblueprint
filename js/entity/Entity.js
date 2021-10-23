import TypeInitialization from "./TypeInitialization"
import Utility from "../Utility"

export default class Entity {
    constructor(options = {}) {
        /**
         * 
         * @param {String[]} prefix 
         * @param {Object} target 
         * @param {Object} properties 
         */
        const defineAllAttributes = (prefix, target, properties, propertySetter = (t, p, v) => t[p] = v) => {
            let fullKey = prefix.concat("")
            const last = fullKey.length - 1
            for (let property in properties) {
                fullKey[last] = property
                // Not instanceof because all objects are instenceof Object
                if (properties[property]?.constructor === Object) {
                    propertySetter(target, property, {})
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
                    propertySetter(target, property, value)
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
                    propertySetter(target, property, [])
                    defineAllAttributes(
                        fullKey,
                        target[property],
                        defaultValue,
                        (t, _, v) => t.push(v))
                    continue
                }
                if (defaultValue instanceof Function) {
                    defaultValue = Utility.sanitize(new defaultValue())
                }
                propertySetter(target, property, defaultValue)
            }
        }
        defineAllAttributes([], this, this.getAttributes())
    }
}