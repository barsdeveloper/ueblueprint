/** @template {any[]} T */
export default class Union {

    /** @type {T} */
    #values
    get values() {
        return /** @type {T extends any ? any[] : T} */(this.#values)
    }

    /** @param  {T} values */
    constructor(...values) {
        this.#values = values
    }
}
