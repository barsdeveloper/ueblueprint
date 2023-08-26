/**
 * @template {any[]} U
 * @template {[...U]} T
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

let x = new Union(1, "alpha").values
let y = new Union().values
