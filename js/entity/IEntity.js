import Configuration from "../Configuration.js"
import Utility from "../Utility.js"
import Serializable from "../serialization/Serializable.js"
import SerializerFactory from "../serialization/SerializerFactory.js"
import AttributeInfo from "./AttributeInfo.js"
import ComputedType from "./ComputedType.js"
import MirroredEntity from "./MirroredEntity.js"
import Union from "./Union.js"

/** @abstract */
export default class IEntity extends Serializable {

    /** @type {String | Union<String[]>} */
    static lookbehind = ""
    /** @type {AttributeDeclarations} */
    static attributes = {
        lookbehind: new AttributeInfo({
            ignored: true,
        }),
    }

    constructor(values = {}, suppressWarns = false) {
        super()
        /** @type {String} */ this.lookbehind
        const Self = /** @type {typeof IEntity} */(this.constructor)
        let attributes = Self.attributes
        // if (values.attributes) {
        //     attributes = { ...Self.attributes }
        //     Utility.mergeArrays(Object.keys(values.attributes), Object.keys(attributes))
        //         .forEach(k => {
        //             attributes[k] = {
        //                 ...IEntity.defaultAttribute,
        //                 ...attributes[k],
        //                 ...values.attributes[k],
        //             }
        //             if (!attributes[k].type) {
        //                 attributes[k].type = values[k] instanceof Array
        //                     ? [Utility.getType(values[k][0])]
        //                     : Utility.getType(values[k])
        //             }
        //         })
        //     IEntity.defineAttributes(this, attributes)
        // }
        /** @type {AttributeDeclarations?} */ this.attributes
        const valuesNames = Object.keys(values)
        const attributesNames = Object.keys(attributes)
        const allAttributesNames = Utility.mergeArrays(valuesNames, attributesNames)
        if (valuesNames.includes("lookbehind")) {
            this.lookbehind = undefined // To keep it first
        }
        for (const attributeName of allAttributesNames) {
            if (attributeName == "attributes") {
                // Ignore this special attribute describing all the attributes
                continue
            }
            let value = values[attributeName]
            let attribute = attributes[attributeName]

            if (!suppressWarns && value !== undefined) {
                if (
                    !(attributeName in attributes)
                    && !attributeName.startsWith(Configuration.subObjectAttributeNamePrefix)
                ) {
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
                    try {
                        value = SerializerFactory
                            // @ts-expect-error
                            .getSerializer(defaultType)
                            .read(/** @type {String} */(value))
                    } catch (e) {
                        assignAttribute(value)
                        continue
                    }
                }
                assignAttribute(Utility.sanitize(value, /** @type {AttributeConstructor<Attribute>} */(defaultType)))
                continue // We have a value, need nothing more
            }
            if (Object.hasOwn(attribute, "default")) { // Accept also explicit undefined
                assignAttribute(defaultValue)
            }
        }
    }

    /** @param {AttributeTypeDescription} attributeType */
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
            return () => new MirroredEntity(attributeType.type, attributeType.getter)
        } else if (attributeType instanceof ComputedType) {
            return undefined
        } else {
            return () => new /** @type {AnyConstructor<Attribute>} */(attributeType)()
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

    /**
     * @param {IEntity | EntityConstructor} source
     * @param {String} attributeName
     * @param {String} info
     * @returns 
     */
    static getAttributeInfo(source, attributeName, info) {
        return source.attributes?.[attributeName]?.[info] // instanceof specific
            ?? /** @type {EntityConstructor} */(this.constructor).attributes[info] // class specific
            ?? IEntity.defaultAttribute[info] // default value
    }

    static getAttribute(object, attribute) {
        return this.getAttributes(object)[attribute]
    }

    /** @returns {AttributeDeclarations} */
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
