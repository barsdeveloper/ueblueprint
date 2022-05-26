export default class Observable {

    /** @type {Map<String, Object[]>} */
    #observers = new Map()

    /**
     * @param {String} property
     * @param {(value: any) => {}} observer
     */
    subscribe(property, observer) {
        let observers = this.#observers
        if (observers.has(property)) {
            let propertyObservers = observers.get(property)
            if (propertyObservers.includes(observer)) {
                return false
            } else {
                propertyObservers.push(observer)
            }
        } else {
            let fromPrototype = false
            let propertyDescriptor = Object.getOwnPropertyDescriptor(this, property)
            if (!propertyDescriptor) {
                fromPrototype = true
                propertyDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), property) ?? {}
                if (!propertyDescriptor) {
                    return false
                }
            }
            observers.set(property, [observer])
            const isValue = "value" in propertyDescriptor
            const hasSetter = "set" in propertyDescriptor
            if (!(isValue || hasSetter)) {
                throw new Error(`Property ${property} is not a value or a setter`)
            }
            // A Symbol so it does not show up in Object.getOwnPropertyNames()
            const storageKey = Symbol.for(property + "Storage")
            const valInfoKey = Symbol.for(property + "ValInfo")
            Object.defineProperties(
                fromPrototype ? Object.getPrototypeOf(this) : this,
                {
                    [storageKey]: {
                        configurable: true,
                        enumerable: false, // Non enumerable so it does not show up in for...in or Object.keys()
                        ...(isValue
                            ? {
                                value: this[property],
                                writable: true,
                            }
                            : {
                                get: propertyDescriptor.get,
                                set: propertyDescriptor.set,
                            }
                        )
                    },
                    [valInfoKey]: {
                        configurable: true,
                        enumerable: false,
                        value: [fromPrototype, isValue]
                    },
                    [property]: {
                        configurable: true,
                        ...(isValue && {
                            get() {
                                return this[storageKey]
                            }
                        }),
                        set(v) {
                            this[storageKey] = v
                            observers.get(property).forEach(observer => {
                                observer(this[property])
                            })
                        },
                    }
                }
            )
        }
        return true
    }

    /**
     * @param {String} property
     * @param {Object} observer
     */
    unsubscribe(property, observer) {
        let observers = this.#observers.get(property)
        if (!observers?.includes(observer)) {
            return false
        }
        observers.splice(observers.indexOf(observer), 1)
        if (observers.length == 0) {
            const storageKey = Symbol.for(property + "Storage")
            const valInfoKey = Symbol.for(property + "ValInfo")
            const fromPrototype = this[valInfoKey][0]
            const isValue = this[valInfoKey][1]
            Object.defineProperty(
                fromPrototype ? Object.getPrototypeOf(this) : this,
                property,
                Object.getOwnPropertyDescriptor(fromPrototype ? Object.getPrototypeOf(this) : this, storageKey),
            )
            delete this[valInfoKey]
            delete this[storageKey]
        }
        return true
    }
}
