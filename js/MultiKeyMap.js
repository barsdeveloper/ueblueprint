import Utility from "./Utility"

/**
 * @template Key
 * @template Value
 */
export default class MultiKeyWeakMap {

    map = new WeakMap()

    constructor() {
        return new Proxy(this.map, this)
    }

    /**
     * @param {WeakMap} target
     * @param {Key} p
     * @param {*} receiver
     * @returns {Value}
     */
    get(target, p, receiver) {
        return Utility.objectGet(target, p)
    }

    /**
     * @param {WeakMap} target
     * @param {Key} p
     * @param {Value} value
     */
    set(target, p, value) {
        return Utility.objectSet(target, p, value, true, WeakMap)
    }
}