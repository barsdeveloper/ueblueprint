/** @typedef {import("./IEntity.js").AnyValueConstructor<*>} AnyValueConstructor */

export default class UnionType {

    #types
    get types() {
        return this.#types
    }

    /** @param  {...AnyValueConstructor} types */
    constructor(...types) {
        this.#types = types
    }

    getFirstType() {
        return this.#types[0]
    }
}
