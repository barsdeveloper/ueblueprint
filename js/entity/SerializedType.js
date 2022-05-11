// @ts-check

/**
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {(new (object?: Object) => IEntity) | StringConstructor | NumberConstructor | BooleanConstructor} Constructor
 * @typedef {Constructor|Constructor[]} AcceptedType
 */

export default class SerializedType {

    /** @type {(Constructor|Array<Constructor>)[]} */
    #types
    get types() {
        return this.#types
    }
    set types(v) {
        this.#types = v
    }

    /**
     * @param {...AcceptedType} acceptedTypes
     */
    constructor(...acceptedTypes) {
        this.#types = acceptedTypes
    }
}
