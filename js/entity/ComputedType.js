export default class ComputedType {

    #f

    /** @param {Function} f */
    constructor(f) {
        this.#f = f
    }

    /** @param {IEntity} entity */
    compute(entity) {
        return this.#f(entity)
    }
}
