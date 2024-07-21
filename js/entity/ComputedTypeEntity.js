import IEntity from "./IEntity.js"
import StringEntity from "./StringEntity.js"

export default class ComputedTypeEntity extends IEntity {

    static grammar = StringEntity.grammar
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
    static compute(entity) {
        return this.f(entity)
    }
}
