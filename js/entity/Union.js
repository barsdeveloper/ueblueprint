/**
 * @template {[...U]} T
 * @template {any[]} U
 */
export default class Union {

    /** @type {T} */
    #values
    get values() {
        return this.#values
    }

    /** @param  {T} values */
    constructor(...values) {
        this.#values = values
    }
}
