import P from "parsernostrum"
import Utility from "../Utility.js"

/** @abstract */
export default class IEntity {

    /** @type {(v: String) => String} */
    static same = v => v
    /** @type {(entity: IEntity, serialized: String) => String} */
    static notWrapped = (entity, serialized) => serialized
    /** @type {(entity: IEntity, serialized: String) => String} */
    static defaultWrapped = (entity, serialized) => `${entity.#lookbehind}(${serialized})`
    static wrap = this.defaultWrapped
    static attributeSeparator = ","
    static keySeparator = "="
    /** @type {(k: String) => String} */
    static printKey = k => k
    static grammar = P.lazy(() => this.createGrammar())
    /** @type {P<IEntity>} */
    static unknownEntityGrammar
    static unknownEntity
    /** @type {{ [key: String]: typeof IEntity }} */
    static attributes = {}
    /** @type {String | String[]} */
    static lookbehind = ""
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

    /** @type {String[]} */
    #keys
    get keys() {
        return this.#keys ?? Object.keys(this)
    }
    set keys(value) {
        this.#keys = [... new Set(value)]
    }

    #lookbehind = /** @type {String} */(this.constructor.lookbehind)
    get lookbehind() {
        return this.#lookbehind.trim()
    }
    set lookbehind(value) {
        this.#lookbehind = value
    }

    #ignored = this.constructor.ignored
    get ignored() {
        return this.#ignored
    }
    set ignored(value) {
        this.#ignored = value
    }

    #trailing = this.constructor.trailing
    get trailing() {
        return this.#trailing
    }
    set trailing(value) {
        this.#trailing = value
    }

    constructor(values = {}) {
        const attributes = /** @type {typeof IEntity} */(this.constructor).attributes
        const keys = Utility.mergeArrays(
            Object.keys(values),
            Object.entries(attributes).filter(([k, v]) => v.default !== undefined).map(([k, v]) => k)
        )
        for (const key of keys) {
            if (values[key] !== undefined) {
                if (values[key].constructor === Object) {
                    // It is part of a nested key (words separated by ".")
                    values[key] = new (
                        attributes[key] !== undefined ? attributes[key] : IEntity.unknownEntity
                    )(values[key])
                }
                const computedEntity = /** @type {ComputedTypeEntityConstructor} */(attributes[key])
                this[key] = values[key]
                if (computedEntity?.compute) {
                    /** @type {typeof IEntity} */
                    const actualEntity = computedEntity.compute(this)
                    const parsed = actualEntity.grammar.run(values[key].toString())
                    if (parsed.status) {
                        this[key] = parsed.value
                    }
                }
                continue
            }
            const attribute = attributes[key]
            if (attribute.default !== undefined) {
                this[key] = attribute.default(attribute)
                continue
            }
        }
    }

    /**
     * @protected
     * @returns {P<IEntity>}
     */
    static createGrammar() {
        return this.unknownEntityGrammar
    }

    static actualClass() {
        let self = this
        while (!self.name) {
            self = Object.getPrototypeOf(self)
        }
        return self
    }

    static className() {
        return this.actualClass().name
    }

    /**
     * @protected
     * @template {typeof IEntity} T
     * @this {T}
     * @returns {T}
     */
    static asUniqueClass() {
        let result = this
        if (this.name.length) {
            // @ts-expect-error
            result = (() => class extends this { })() // Comes from a lambda otherwise the class will have name "result"
            result.grammar = result.createGrammar() // Reassign grammar to capture the correct this from subclass
        }
        return result
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
     * @param {(type: T) => (InstanceType<T> | NullEntity)} value
     * @returns {T}
     */
    static withDefault(value = type => new type()) {
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
    static flagIgnored(value = true) {
        const result = this.asUniqueClass()
        result.ignored = value
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
     * @protected
     * @param {String} string
     */
    static asSerializedString(string) {
        return `"${string.replaceAll(/(?<=(?:[^\\]|^)(?:\\\\)*?)"/g, '\\"')}"`
    }

    /** @param {String} key */
    showProperty(key) {
        /** @type {IEntity} */
        let value = this[key]
        const valueType = /** @type {typeof IEntity} */(value.constructor)
        if (valueType.silent && valueType.default !== undefined) {
            if (valueType["#default"] === undefined) {
                valueType["#default"] = valueType.default(valueType)
            }
            const defaultValue = valueType["#default"]
            return !value.equals(defaultValue)
        }
        return true
    }

    /**
     * 
     * @param {String} attributeName
     * @param {(v: any) => void} callback
     */
    listenAttribute(attributeName, callback) {
        const descriptor = Object.getOwnPropertyDescriptor(this, attributeName)
        const setter = descriptor.set
        if (setter) {
            descriptor.set = v => {
                setter(v)
                callback(v)
            }
            Object.defineProperties(this, { [attributeName]: descriptor })
        } else if (descriptor.value) {

            Object.defineProperties(this, {
                ["#" + attributeName]: {
                    value: descriptor.value,
                    writable: true,
                    enumerable: false,
                },
                [attributeName]: {
                    enumerable: true,
                    get() {
                        return this["#" + attributeName]
                    },
                    set(v) {
                        callback(v)
                        this["#" + attributeName] = v
                    },
                },
            })
        }
    }

    /** @this {IEntity | Array} */
    doSerialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        let result = ""
        let first = true
        const keys = this instanceof IEntity ? this.keys : Object.keys(this)
        for (const key of keys) {
            /** @type {IEntity} */
            const value = this[key]
            const valueType = /** @type {typeof IEntity} */(value?.constructor)
            let keyValue = this instanceof Array ? `(${key})` : key
            if (value === undefined || this instanceof IEntity && !this.showProperty(key)) {
                continue
            }
            if (first) {
                first = false
            } else {
                result += attributeSeparator
            }
            if (valueType.inlined) {
                const inlinedPrintKey = valueType.className() === "ArrayEntity"
                    ? k => printKey(`${keyValue}${k}`)
                    : k => printKey(`${keyValue}.${k}`)
                result += value.serialize(
                    insideString,
                    indentation,
                    undefined,
                    inlinedPrintKey,
                    keySeparator,
                    attributeSeparator,
                    Self.notWrapped
                )
                continue
            }
            keyValue = printKey(keyValue)
            if (keyValue.length) {
                if (valueType.quoted) {
                    keyValue = `"${keyValue}"`
                }
                result += (attributeSeparator.includes("\n") ? indentation : "") + keyValue + keySeparator
            }
            let serialization = value?.serialize(insideString, indentation)
            result += serialization
        }
        if (this instanceof IEntity && this.trailing && result.length) {
            result += attributeSeparator
        }
        return wrap(/** @type {IEntity} */(this), result)
    }

    /** @this {IEntity | Array} */
    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
        printKey = Self.printKey,
        keySeparator = Self.keySeparator,
        attributeSeparator = Self.attributeSeparator,
        wrap = Self.wrap,
    ) {
        let result = this instanceof Array
            ? IEntity.prototype.doSerialize.bind(this)(insideString, indentation, Self, printKey, keySeparator, attributeSeparator, wrap)
            : this.doSerialize(insideString, indentation, Self, printKey, keySeparator, attributeSeparator, wrap)
        if (Self.serialized) {
            result = IEntity.asSerializedString(result)
        }
        return result
    }

    equals(other) {
        if (!(other instanceof IEntity)) {
            return false
        }
        const thisKeys = Object.keys(this)
        const otherKeys = Object.keys(other)
        const thisType = /** @type {typeof IEntity} */(this.constructor).actualClass()
        const otherType = /** @type {typeof IEntity} */(other.constructor).actualClass()
        if (
            thisKeys.length !== otherKeys.length
            || this.lookbehind != other.lookbehind
            || !(other instanceof thisType) && !(this instanceof otherType)
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
            } else if (a instanceof Array && b instanceof Array) {
                if (a.length !== b.length) {
                    return false
                }
                for (let j = 0; j < a.length; ++j) {
                    if (!(a[j] instanceof IEntity && a[j].equals(b[j])) && a[j] !== b[j]) {
                        return false
                    }
                }
            } else {
                if (a !== b) {
                    return false
                }
            }
        }
        return true
    }
}
