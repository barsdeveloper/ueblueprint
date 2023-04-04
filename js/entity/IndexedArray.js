/** @typedef {import("./IEntity").AnyValueConstructor<*>} AnyValueConstructor */

export default class IndexedArray {

    #type
    get type() {
        return this.#type
    }

    value = []

    /** @param {AnyValueConstructor} type */
    constructor(type, value = []) {
        this.#type = type
        this.value = value
    }
}
