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

    /** @type {{ [attribute: String]: AttributeInfo }} */
    static attributes = {
        attributes: new AttributeInfo({
            ignored: true,
        }),
        lookbehind: new AttributeInfo({
            default: /** @type {String | Union<String[]>} */(""),
            ignored: true,
        }),
    }

    constructor(values = {}, suppressWarns = false) {
        super()
        const Self = /** @type {typeof IEntity} */(this.constructor)
        /** @type {AttributeDeclarations?} */ this.attributes
        /** @type {String} */ this.lookbehind
        const valuesKeys = Object.keys(values)
        const attributesKeys = values.attributes
            ? Utility.mergeArrays(Object.keys(values.attributes), Object.keys(Self.attributes))
            : Object.keys(Self.attributes)
        const allAttributesKeys = Utility.mergeArrays(valuesKeys, attributesKeys)
        for (const key of allAttributesKeys) {
            let value = values[key]
            if (!suppressWarns && !(key in values)) {
                if (!(key in Self.attributes) && !key.startsWith(Configuration.subObjectAttributeNamePrefix)) {
                    const typeName = value instanceof Array ? `[${value[0]?.constructor.name}]` : value.constructor.name
                    console.warn(
                        `UEBlueprint: Attribute ${key} (of type ${typeName}) in the serialized data is not defined in ${Self.name}.attributes`
                    )
                }
            }
            if (!(key in Self.attributes)) {
                // Remember attributeName can come from the values and be not defined in the attributes.
                // In that case just assign it and skip the rest.
                this[key] = value
                continue
            }
            Self.attributes.lookbehind
            const predicate = AttributeInfo.getAttribute(values, key, "predicate", Self)
            const assignAttribute = !predicate
                ? v => this[key] = v
                : v => {
                    Object.defineProperties(this, {
                        ["#" + key]: {
                            writable: true,
                            enumerable: false,
                        },
                        [key]: {
                            enumerable: true,
                            get() {
                                return this["#" + key]
                            },
                            set(v) {
                                if (!predicate(v)) {
                                    console.warn(
                                        `UEBlueprint: Tried to assign attribute ${key} to ${Self.name} not satisfying the predicate`
                                    )
                                    return
                                }
                                this["#" + key] = v
                            }
                        },
                    })
                    this[key] = v
                }

            let defaultValue = AttributeInfo.getAttribute(values, key, "default", Self)
            if (defaultValue instanceof Function) {
                defaultValue = defaultValue(this)
            }
            let defaultType = AttributeInfo.getAttribute(values, key, "type", Self)
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
                if (
                    value?.constructor === String
                    && AttributeInfo.getAttribute(values, key, "serialized", Self)
                    && defaultType !== String
                ) {
                    try {
                        value = SerializerFactory
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
            if (defaultValue !== undefined) {
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

    static defineAttributes(object, attributes) {
        Object.defineProperty(object, "attributes", {
            writable: true,
            configurable: false,
        })
        object.attributes = attributes
    }

    getLookbehind() {
        let lookbehind = this.lookbehind ?? AttributeInfo.getAttribute(this, "lookbehind", "default")
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
