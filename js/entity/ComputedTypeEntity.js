import IEntity from "./IEntity.js"

export default class ComputedTypeEntity extends IEntity {

    static grammar = undefined
    /** @type {(entity: IEntity) => typeof IEntity} */
    static f

    /**
     * @template {typeof ComputedTypeEntity.f} T
     * @param {T} producer
     */
    static from(producer) {
        const result = /** @type {(typeof ComputedTypeEntity) & { f: T }} */(this.asUniqueClass())
        result.f = producer
        return result
    }

    /** @param {IEntity} entity */
    compute(entity) {
        return /** @type {typeof ComputedTypeEntity} */(this.Self()).f(entity)
    }
}
