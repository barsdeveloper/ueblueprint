/**
 * @template T
 * @typedef {import("./TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor
 */

export default class UnionType {

    #types
    get types() {
        return this.#types
    }

    /** @param  {...AnyValueConstructor<any>} types */
    constructor(...types) {
        this.#types = types
    }

    getFirstType() {
        return this.#types[0]
    }
}
