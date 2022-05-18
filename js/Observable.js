// @ts-check

export default class Observable {

    /** @type {Map<String, Object[]>} */
    #observers = new Map()

    /**
     * @param {String} property
     * @param {Object} observer
     */
    subscribe(property, observer) {
        const observers = this.#observers
        if (observers.has(property)) {
            if (!observers.get(property).includes(observer)) {
                observers.get(property).push(observer)
            }
        } else {
            observers.set(property, [observer])
        }
        if ("value" in (Object.getOwnPropertyDescriptor(this, property) ?? {})) {
            // It is a regular value
            let holderKey = Symbol.for(property + "Holder")
            Object.defineProperties(this, {
                [holderKey]: {
                    value: this[property],
                    configurable: true,
                    enumerable: false,
                    writable: true,
                },
                [property]: {
                    configurable: true,
                    enumerable: true,
                    get() {
                        return this[holderKey]
                    },
                    set(v) {
                        this[holderKey] = v
                        observers.get(property).forEach(observer => {
                            observer(v)
                        })
                    },
                }
            })
        }
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
            Object.defineProperty(this, property, {
                value: this[property],
                configurable: true,
                enumerable: true,
                writable: true,
            })
            delete this[Symbol.for(property + "Holder")]
        }
        return true
    }
}
