import P from "parsernostrum"
import Utility from "../Utility.js"

/** @abstract */
export default class IEntity {

    /** @type {(v: String) => String} */
    static same = v => v

    /** @type {(entity: Attribute, serialized: String) => String} */
    static notWrapped = (entity, serialized) => serialized

    /** @type {(entity: IEntity, serialized: String) => String} */
    static defaultWrapped = (entity, serialized) => `${entity.lookbehind}(${serialized})`

    static wrap = this.defaultWrapped

    static attributeSeparator = ","
    static keySeparator = "="

    /** @type {(k: String) => String} */
    static printKey = k => k

    /** @type {P<IEntity>} */
    static grammar = /** @type {any} */(P.failure())

    /** @type {P<IEntity>} */
    static unknownEntityGrammar

    /** @type {{ [key: String]: typeof IEntity }} */
    static attributes = {}

    /** @type {(type: typeof IEntity) => InstanceType<typeof IEntity>} */
    static default
    static nullable = false
    static ignored = false // Never serialize or deserialize
    static serialized = false // Value is written and read as string
    static expected = false // Must be there
    static inlined = false // The key is a subobject or array and printed as inlined (A.B=123, A(0)=123)
    static quoted = false // Key is serialized with quotes
    static silent = false // Do not serialize if default
    static trailing = false // Add attribute separator after the last attribute when serializing

    #trailing = this.Self().trailing
    get trailing() {
        return this.#trailing
    }
    set trailing(value) {
        this.#trailing = value
    }

    /** @type {String | String[]} */
    static lookbehind = ""

    #lookbehind = /** @type {String} */(this.Self().lookbehind)
    get lookbehind() {
        return this.#lookbehind
    }
    set lookbehind(value) {
        this.#lookbehind = value
    }

    /** @type {String[]} */
    #keys
    get keys() {
        return this.#keys ?? Object.keys(this)
    }
    set keys(value) {
        this.#keys = [... new Set(value)]
    }

    constructor(values = {}) {
        const keys = Utility.mergeArrays(Object.keys(values), Object.keys(this.Self().attributes))
        for (const key of keys) {
            if (values[key] !== undefined) {
                this[key] = values[key]
                continue
            }
            const attribute = this.Self().attributes[key]
            if (attribute.default !== undefined) {
                this[key] = attribute.default(attribute)
                continue
            }
        }
    }

    static className() {
        let self = this
        while (!self.name) {
            self = Object.getPrototypeOf(self)
        }
        return self.name
    }

    /** @param {String} key */
    showProperty(key) {
        /** @type {IEntity} */
        let value = this[key]
        const Self = this.Self()
        if (Self.silent && Self.default !== undefined) {
            if (Self["#default"] === undefined) {
                Self["#default"] = Self.default(Self)
            }
            const defaultValue = Self["#default"]
            return !value.equals(defaultValue)
        }
        return true
    }

    /**
     * @protected
     * @template {typeof IEntity} T
     * @this {T}
     * @returns {T}
     */
    static asUniqueClass() {
        if (this.name.length) {
            return class extends this { }
        }
        return this
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     * @param {String} value
     */
    static withLookbehind(value) {
        const result = this.asUniqueClass()
        result.lookbehind = value
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static withDefault(value = /** @type {(type: T) => InstanceType<T>} */(type => new type())) {
        const result = this.asUniqueClass()
        result.default = value
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagNullable(value = true) {
        const result = this.asUniqueClass()
        result.nullable = value
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagSerialized(value = true) {
        const result = this.asUniqueClass()
        result.serialized = value
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagInlined(value = true) {
        const result = this.asUniqueClass()
        result.inlined = value
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagQuoted(value = true) {
        const result = this.asUniqueClass()
        result.quoted = value
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {T}
     */
    static flagSilent(value = true) {
        const result = this.asUniqueClass()
        result.silent = value
        return result
    }

    /**
     * @template {typeof IEntity} T
     * @this {InstanceType<T>}
     */
    Self() {
        return /** @type {T} */(this.constructor)
    }

    /**
     * 
     * @param {String} attribute
     * @param {(v: any) => void} callback
     */
    listenAttribute(attribute, callback) {
        const descriptor = Object.getOwnPropertyDescriptor(this, attribute)
        const setter = descriptor.set
        if (setter) {
            descriptor.set = v => {
                setter(v)
                callback(v)
            }
            Object.defineProperties(this, { [attribute]: descriptor })
        } else if (descriptor.value) {
            Object.defineProperties(this, {
                ["#" + attribute]: {
                    value: descriptor.value,
                    writable: true,
                    enumerable: false,
                },
                [attribute]: {
                    enumerable: true,
                    get() {
                        return this["#" + attribute]
                    },
                    set(v) {
                        if (v != this["#" + attribute]) {
                            callback(v)
                            this["#" + attribute] = v
                        }
                    },
                },
            })
        }
    }

    /** @param {IEntity} other */
    equals(other) {
        if (!(other instanceof IEntity)) {
            return false
        }
        const thisKeys = Object.keys(this)
        const otherKeys = Object.keys(other)
        if (
            thisKeys.length !== otherKeys.length
            || this.lookbehind != other.lookbehind
            || !(this instanceof other.constructor) && !(other instanceof this.constructor)
        ) {
            return false
        }
        for (let i = 0; i < thisKeys.length; ++i) {
            const k = thisKeys[i]
            if (!otherKeys.includes(k)) {
                return false
            }
            const a = this[k]
            const b = other[k]
            if (a instanceof IEntity) {
                if (!a.equals(b)) {
                    return false
                }
            } else {
                if (a !== b) {
                    return false
                }
            }
        }
        return true
    }

    toString(
        insideString = false,
        indentation = "",
        printKey = this.Self().printKey,
    ) {
        const Self = this.Self()
        let result = ""
        let first = true
        for (const key of this.keys) {
            /** @type {IEntity} */
            const value = this[key]
            if (value === undefined || !this.showProperty(key)) {
                continue
            }
            if (first) {
                first = false
            } else {
                result += Self.attributeSeparator
            }
            if (Self.inlined) {
                result += value.toString(insideString, indentation, k => printKey(`${key}.${k}`))
                continue
            }
            let keyValue = printKey(key)
            if (keyValue.length) {
                if (Self.quoted) {
                    keyValue = `"${keyValue}"`
                }
                result += (Self.attributeSeparator.includes("\n") ? indentation : "") + keyValue + Self.keySeparator
            }
            let serialization = value?.toString(insideString, indentation, printKey)
            if (Self.serialized) {
                serialization = `"${serialization.replaceAll(/(?<=(?:[^\\]|^)(?:\\\\)*?)"/, '\\"')}"`
            }
            result += serialization
        }
        if (this.trailing && result.length) {
            result += Self.attributeSeparator
        }
        return Self.wrap(this, result)
    }
}
