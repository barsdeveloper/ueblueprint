import ComputedType from "./ComputedType.js"
import MirroredEntity from "./MirroredEntity.js"
import Serializable from "../serialization/Serializable.js"
import SerializerFactory from "../serialization/SerializerFactory.js"
import Union from "./Union.js"
import Utility from "../Utility.js"

/**
 * @template {AnyValue} T
 * @typedef {(new (...any) => T) | StringConstructor | NumberConstructor | BigIntConstructor | BooleanConstructor
 *     | ArrayConstructor} AnyValueConstructor
*/

/**
 * @typedef {IEntity | MirroredEntity | String | Number | BigInt | Boolean} AnySimpleValue
 * @typedef {AnySimpleValue | AnySimpleValue[]} AnyValue
 * @typedef {(entity: IEntity) => AnyValue} ValueSupplier
 * @typedef {AnyValueConstructor<AnyValue> | AnyValueConstructor<AnyValue>[] | Union | Union[] | ComputedType | MirroredEntity} AttributeType
 * @typedef {{
 *     type?: AttributeType,
 *     default?: AnyValue | ValueSupplier,
 *     nullable?: Boolean,
 *     ignored?: Boolean,
 *     serialized?: Boolean,
 *     expected?: Boolean,
 *     inlined?: Boolean,
 *     quoted?: Boolean,
 *     predicate?: (value: AnyValue) => Boolean,
 * }} AttributeInformation
 * @typedef {{
 *     [key: String]: AttributeInformation
 * }} AttributeDeclarations
 * @typedef {typeof IEntity} EntityConstructor
 */
/**
 * @template T
 * @typedef {{
 *     (value: Boolean): BooleanConstructor,
 *     (value: Number): NumberConstructor,
 *     (value: String): StringConstructor,
 *     (value: BigInt): BigIntConstructor,
 *     (value: T): typeof value.constructor,
 * }} TypeGetter
 */

export default class IEntity extends Serializable {

    /** @type {String | Union<String[]>} */
    static lookbehind = ""
    /** @type {AttributeDeclarations} */
    static attributes = {
        lookbehind: {
            ignored: true,
        }
    }
    static defaultAttribute = {
        nullable: false,
        ignored: false,
        serialized: false, // Value is written and read as string
        expected: false, // Must be there
        inlined: false, // The key is a subobject or array and printed as inlined (A.B=123, A(0)=123)
        quoted: false, // Key is serialized with quotes
    }

    constructor(values = {}, suppressWarns = false) {
        super()
        /** @type {String} */ this.lookbehind
        const Self = /** @type {EntityConstructor} */(this.constructor)
        let attributes = Self.attributes
        if (values.attributes) {
            attributes = { ...Self.attributes }
            Utility.mergeArrays(Object.keys(attributes), Object.keys(values.attributes))
                .forEach(k => {
                    attributes[k] = {
                        ...IEntity.defaultAttribute,
                        ...attributes[k],
                        ...values.attributes[k],
                    }
                    if (!attributes[k].type) {
                        attributes[k].type = values[k] instanceof Array
                            ? [Utility.getType(values[k][0])]
                            : Utility.getType(values[k])
                    }
                })
            IEntity.defineAttributes(this, attributes)
        }
        /** @type {AttributeDeclarations?} */ this.attributes
        const valuesNames = Object.keys(values)
        const attributesNames = Object.keys(attributes)
        const allAttributesNames = Utility.mergeArrays(valuesNames, attributesNames)
        for (const attributeName of allAttributesNames) {
            if (attributeName == "attributes") {
                continue
            }
            let value = values[attributeName]
            let attribute = attributes[attributeName]

            if (!suppressWarns && value !== undefined) {
                if (!(attributeName in attributes)) {
                    const typeName = value instanceof Array ? `[${value[0]?.constructor.name}]` : value.constructor.name
                    console.warn(
                        `UEBlueprint: Attribute ${attributeName} (of type ${typeName}) in the serialized data is not `
                        + `defined in ${Self.name}.attributes`
                    )
                }
            }

            if (!attribute) {
                // Remember attributeName can come from the values and be not defined in the attributes.
                // In that case just assign it and skip the rest.
                this[attributeName] = value
                continue
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
                                        `UEBlueprint: Tried to assign attribute ${attributeName} to ${Self.name} not `
                                        + "satisfying the predicate"
                                    )
                                    return
                                }
                                this["#" + attributeName] = v
                            }
                        },
                    })
                    this[attributeName] = v
                }

            let defaultValue = attribute.default
            if (defaultValue instanceof Function) {
                defaultValue = defaultValue(this)
            }
            let defaultType = attribute.type
            if (defaultType instanceof ComputedType) {
                defaultType = defaultType.compute(this)
            }
            if (defaultType instanceof Array) {
                defaultType = Array
            }
            if (defaultType === undefined) {
                defaultType = Utility.getType(defaultValue)
            }

            if (value !== undefined) {
                // Remember value can still be null
                if (value?.constructor === String && attribute.serialized && defaultType !== String) {
                    value = SerializerFactory
                        // @ts-expect-error
                        .getSerializer(defaultType)
                        .read(/** @type {String} */(value))
                }
                assignAttribute(Utility.sanitize(value, /** @type {AnyValueConstructor<*>} */(defaultType)))
                continue // We have a value, need nothing more
            }
            if (Object.hasOwn(attribute, "default")) { // Accept also explicit undefined
                assignAttribute(defaultValue)
            }
        }
    }

    /** @param {AttributeType} attributeType */
    static defaultValueProviderFromType(attributeType) {
        if (attributeType === Boolean) {
            return false
        } else if (attributeType === Number) {
            return 0
        } else if (attributeType === BigInt) {
            return 0n
        } else if (attributeType === String) {
            return ""
        } else if (attributeType === Array || attributeType instanceof Array) {
            return () => []
        } else if (attributeType instanceof Union) {
            return this.defaultValueProviderFromType(attributeType.values[0])
        } else if (attributeType instanceof MirroredEntity) {
            return () => new MirroredEntity(attributeType.type, attributeType.key, attributeType.getter)
        } else if (attributeType instanceof ComputedType) {
            return undefined
        } else {
            // @ts-expect-error
            return () => new attributeType()
        }
    }

    /** @param {AttributeDeclarations} attributes */
    static cleanupAttributes(attributes, prefix = "") {
        for (const attributeName in attributes) {
            attributes[attributeName] = {
                ...IEntity.defaultAttribute,
                ...attributes[attributeName],
            }
            const attribute = /** @type {AttributeInformation} */(attributes[attributeName])
            if (attribute.type === undefined && !(attribute.default instanceof Function)) {
                attribute.type = attribute.default instanceof Array
                    ? [Utility.getType(attribute.default[0])]
                    : Utility.getType(attribute.default)
            }
            if (!attribute.ignored && attribute.default === undefined && attribute.type === undefined) {
                throw new Error(
                    `UEBlueprint: Expected either "type" or "value" property in ${this.name} attribute ${prefix}`
                    + attributeName
                )
            }
            if (attribute.default === null) {
                attribute.nullable = true
            }
        }
    }

    /**
     * @template {new (...args: any) => any} C
     * @param {C} type
     * @returns {value is InstanceType<C>}
     */
    static isValueOfType(value, type) {
        return value != null && (value instanceof type || value.constructor === type)
    }

    static expectsAllKeys() {
        return !Object.values(this.attributes)
            .filter(/** @param {AttributeInformation} attribute */attribute => !attribute.ignored)
            .some(/** @param {AttributeInformation} attribute */attribute => !attribute.expected)
    }

    static getAttribute(object, attribute) {
        return this.getAttributes(object)[attribute]
    }

    static getAttributes(object) {
        return object.attributes ?? object.constructor?.attributes ?? {}
    }

    static defineAttributes(object, attributes) {
        Object.defineProperty(object, "attributes", {
            writable: true,
            configurable: false,
        })
        object.attributes = attributes
    }

    getLookbehind() {
        let lookbehind = this.lookbehind ?? /** @type {EntityConstructor} */(this.constructor).lookbehind
        lookbehind = lookbehind instanceof Union ? lookbehind.values[0] : lookbehind
        return lookbehind
    }

    unexpectedKeys() {
        return Object.keys(this).length - Object.keys(/** @type {typeof IEntity} */(this.constructor).attributes).length
    }

    /** @param {IEntity} other */
    equals(other) {
        const thisKeys = Object.keys(this)
        const otherKeys = Object.keys(other)
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
