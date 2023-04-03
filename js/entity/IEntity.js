import ComputedType from "./ComputedType.js"
import SerializerFactory from "../serialization/SerializerFactory.js"
import UnionType from "./UnionType.js"
import Utility from "../Utility.js"

/**
 * @typedef {(entity: IEntity) => AnyValue} ValueSupplier
 * @typedef {IEntity | String | Number | BigInt | Boolean} AnySimpleValue
 * @typedef {AnySimpleValue | AnySimpleValue[]} AnyValue
 * @typedef {{
 *     [key: String]: AttributeInformation
 * }} AttributeDeclarations
 * @typedef {typeof IEntity} EntityConstructor
 * @typedef {{
 *     type?: AnyValueConstructor<AnyValue> | AnyValueConstructor<AnyValue>[] | UnionType | ComputedType,
 *     default?: AnyValue | ValueSupplier,
 *     showDefault?: Boolean,
 *     nullable?: Boolean,
 *     ignored?: Boolean,
 *     serialized?: Boolean,
 *     expected?: Boolean,
 *     predicate?: (value: AnyValue) => Boolean,
 * }} AttributeInformation
 */

/**
 * @template {AnyValue} T
 * @typedef {(new () => T) | EntityConstructor | StringConstructor | NumberConstructor | BigIntConstructor 
 *     | BooleanConstructor | ArrayConstructor} AnyValueConstructor
 */

export default class IEntity {

    static lookbehind = ""
    /** @type {AttributeDeclarations} */
    static attributes = {}
    static defaultAttribute = {
        showDefault: true,
        nullable: false,
        ignored: false,
        serialized: false,
        expected: false,
    }

    constructor(values = {}, suppressWarns = false) {
        const attributes = /** @type {typeof IEntity} */(this.constructor).attributes
        if (values.constructor !== Object && Object.keys(attributes).length === 1) {
            // Where there is just one attribute, option can be the value of that attribute
            values = {
                [Object.keys(attributes)[0]]: values
            }
        }
        const valuesNames = Object.keys(values)
        const attributesNames = Object.keys(attributes)
        const allAttributesNames = Utility.mergeArrays(attributesNames, valuesNames)
        for (let attributeName of allAttributesNames) {
            let value = values[attributeName]
            let attribute = /** @type {AttributeInformation} */(attributes[attributeName])

            if (!suppressWarns) {
                if (!(attributeName in attributes)) {
                    const typeName = value instanceof Array ? `[${value[0].constructor.name}]` : value.constructor.name
                    console.warn(
                        `UEBlueprint: Attribute ${attributeName} (of type ${typeName}) in the serialized data is not defined in `
                        + `${this.constructor.name}.attributes`
                    )
                } else if (
                    valuesNames.length > 0
                    && !(attributeName in values)
                    && !(!attribute.showDefault || attribute.ignored)
                ) {
                    console.warn(
                        `UEBlueprint: ${this.constructor.name} will add attribute ${attributeName} not `
                        + "defined in the serialized data"
                    )
                }
            }

            if (!attribute) {
                // Remember attributeName can come from the values and be not defined in the attributes
                // In that case just assign it and skip the rest
                this[attributeName] = value
                continue
            }

            let defaultValue = attribute.default
            let defaultType = attribute.type
            if (defaultType instanceof ComputedType) {
                defaultType = defaultType.compute(this)
            }
            if (defaultType instanceof Array) {
                defaultType = Array
            }
            if (defaultValue instanceof Function) {
                defaultValue = defaultValue(this)
            }
            if (defaultType === undefined) {
                defaultType = Utility.getType(defaultValue)
            }
            const assignAttribute = !attribute.predicate
                ? v => this[attributeName] = v
                : v => {
                    Object.defineProperties(this, {
                        ["#" + attributeName]: {
                            writable: true,
                            enumerable: false,
                        },
                        [attributeName]: {
                            enumerable: true,
                            get() {
                                return this["#" + attributeName]
                            },
                            set(v) {
                                if (!attribute.predicate?.(v)) {
                                    console.warn(
                                        `UEBlueprint: Tried to assign attribute ${attributeName} to `
                                        + `${this.constructor.name} not satisfying the predicate`
                                    )
                                    return
                                }
                                this["#" + attributeName] = v
                            }
                        },
                    })
                    this[attributeName] = v
                }

            if (value !== undefined) {
                // Remember value can still be null
                if (value?.constructor === String && attribute.serialized && defaultType !== String) {
                    value = SerializerFactory
                        .getSerializer(/** @type {AnyValueConstructor<*>} */(defaultType))
                        .deserialize(/** @type {String} */(value))
                }
                assignAttribute(Utility.sanitize(value, /** @type {AnyValueConstructor<*>} */(defaultType)))
                continue // We have a value, need nothing more
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
            if (defaultValue === undefined) {
                defaultValue = Utility.sanitize(new /** @type {AnyValueConstructor<*>} */(defaultType)())
            }
            if (!attribute.showDefault) {
                assignAttribute(undefined) // Declare undefined to preserve the order of attributes
                continue
            }
            if (attribute.serialized) {
                if (defaultType !== String && defaultValue.constructor === String) {
                    defaultValue = SerializerFactory
                        .getSerializer(/** @type {AnyValueConstructor<*>} */(defaultType))
                        .deserialize(defaultValue)
                }
            }
            assignAttribute(Utility.sanitize(
                /** @type {AnyValue} */(defaultValue),
                /** @type {AnyValueConstructor<AnyValue>} */(defaultType)
            ))
        }
    }

    /** @param {AttributeDeclarations} attributes */
    static cleanupAttributes(attributes, prefix = "") {
        for (const attributeName in attributes) {
            const attribute = /** @type {AttributeInformation} */(attributes[attributeName])
            if (attribute.type === undefined && !(attribute.default instanceof Function)) {
                attribute.type = Utility.getType(attribute.default)
            }
            attributes[attributeName] = {
                ...IEntity.defaultAttribute,
                ...attribute,
            }
            if (attribute.default === undefined) {
                if (attribute.type === undefined) {
                    throw new Error(
                        `UEBlueprint: Expected either "type" or "value" property in ${this.name} attribute ${prefix}`
                        + attributeName
                    )
                }
                attribute[attributeName] = Utility.sanitize(undefined, attribute.type)
            }
            if (attribute.default === null) {
                attributes[attributeName].nullable = true
            }
        }
    }

    static isValueOfType(value, type) {
        return value != null && (value instanceof type || value.constructor === type)
    }

    static expectsAllKeys() {
        return !Object.values(this.attributes)
            .filter(/** @param {AttributeInformation} attribute */attribute => !attribute.ignored)
            .some(/** @param {AttributeInformation} attribute */attribute => !attribute.expected)
    }

    unexpectedKeys() {
        return Object.keys(this).length
            - Object.keys(/** @type {typeof IEntity} */(this.constructor).attributes).length
    }

    /** @param {IEntity} other */
    equals(other) {
        const thisKeys = Object.keys(this)
        const otherKeys = Object.keys(this)
        if (thisKeys.length != otherKeys.length) {
            return false
        }
        for (const key of thisKeys) {
            if (this[key] instanceof IEntity && !this[key].equals(other[key])) {
                return false
            } else if (!Utility.equals(this[key], other[key])) {
                return false
            }
        }
        return true
    }
}
