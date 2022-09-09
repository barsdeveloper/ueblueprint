/**
 * @typedef {import("./IEntity").default} IEntity
 */

export default class CalculatedType {

    #f

    /**
     * @param {Function} f
     */
    constructor(f) {
        this.#f = f
    }

    /**
     * @param {IEntity} entity
     */
    calculate(entity) {
        return this.f(entity)
    }
}