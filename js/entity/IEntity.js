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

    #trailing = this.Self().trailing
    get trailing() {
        return this.#trailing
    }
    set trailing(value) {
        this.#trailing = value
    }

    #lookbehind = /** @type {String} */(this.Self().lookbehind)
    get lookbehind() {
        return this.#lookbehind.trim()
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

    /**
     * @protected
     * @returns {P<IEntity>}
     */
    static createGrammar() {
        return this.unknownEntity
    }

    constructor(values = {}) {
        const attributes = this.Self().attributes
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

    static className() {
        let self = this
        while (!self.name) {
            self = Object.getPrototypeOf(self)
        }
        return self.name
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
            result = class extends this { }
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
     */
    static withDefault(value = /** @type {(type: T) => (InstanceType<T> | NullEntity)} */(type => new type())) {
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
     * @template {typeof IEntity} T
     * @this {InstanceType<T>}
     */
    Self() {
        return /** @type {T} */(this.constructor)
    }

    /** @param {String} key */
    showProperty(key) {
        /** @type {IEntity} */
        let value = this[key]
        const Self = value.Self()
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
    serialize(
        insideString = false,
        indentation = "",
        Self = this.Self(),
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
            let keyValue = this instanceof Array ? `(${key})` : key
            if (value === undefined || this instanceof IEntity && !this.showProperty(key)) {
                continue
            }
            if (first) {
                first = false
            } else {
                result += attributeSeparator
            }
            if (value.Self?.().inlined) {
                const inlinedPrintKey = value.Self().className() === "ArrayEntity"
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
                if (Self.quoted) {
                    keyValue = `"${keyValue}"`
                }
                result += (attributeSeparator.includes("\n") ? indentation : "") + keyValue + keySeparator
            }
            let serialization = value?.serialize(insideString, indentation)
            if (value.Self().serialized) {
                serialization = `"${serialization.replaceAll(/(?<=(?:[^\\]|^)(?:\\\\)*?)"/g, '\\"')}"`
            }
            result += serialization
        }
        if (this instanceof IEntity && this.trailing && result.length) {
            result += attributeSeparator
        }
        return wrap(/** @type {IEntity} */(this), result)
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
}
