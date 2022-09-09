import Observable from "../Observable"
import TypeInitialization from "./TypeInitialization"
import Utility from "../Utility"
import CalculatedType from "./CalculatedType"

export default class IEntity extends Observable {

    static attributes = {}
    #showAsString = false

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
                    console.warn(`Property ${prefix}${property} is not defined in ${this.constructor.name}.attributes`)
                } else if (
                    defaultValue != null
                    && !(defaultValue instanceof TypeInitialization && !defaultValue.showDefault)
                    && !(property in values)
                ) {
                    console.warn(
                        `${this.constructor.name} adds property ${prefix}${property} not defined in the serialized data`
                    )
                }

                // Not instanceof because all objects are instenceof Object, exact match needed
                if (defaultType === Object) {
                    target[property] = {}
                    defineAllAttributes(target[property], properties[property], values[property], property + ".")
                    continue
                }

                /*
                 * The value can either be:
                 *     - Array: can contain multiple values, its property is assigned multiple times like (X=1, X="4").
                 *     - CalculatedType: the exact type depends on the previous attributes assigned to this entity.
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
                if (defaultValue instanceof CalculatedType) {
                    defaultValue = defaultValue.calculate(this)
                    defaultType = Utility.getType(defaultValue)
                }
                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        target[property] = undefined // Declare undefined to preserve the order of attributes
                        continue
                    }
                    defaultValue = defaultValue.value
                }
                if (defaultValue instanceof Array) {
                    target[property] = []
                    continue
                }
                target[property] = TypeInitialization.sanitize(defaultValue, defaultType)
            }
        }
        const attributes = this.constructor.attributes
        if (values.constructor !== Object && Object.getOwnPropertyNames(attributes).length == 1) {
            // Where there is just one attribute, option can be the value of that attribute
            values = {
                [Object.getOwnPropertyNames(attributes)[0]]: values
            }
        }
        defineAllAttributes(this, attributes, values)
    }

    isShownAsString() {
        return this.#showAsString
    }

    /**
     * @param {Boolean} v
     */
    setShowAsString(v) {
        this.#showAsString = v
    }
}
