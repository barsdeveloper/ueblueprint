import IEntity from "./IEntity.js"

/** @template {typeof IEntity} T */
export default class MirroredEntity extends IEntity {

    /** @type {typeof IEntity} */
    static type

    /** @param {() => InstanceType<T>} getter */
    constructor(getter = null) {
        super()
        this.getter = getter
    }

    /**
     * @template {typeof IEntity} T
     * @param {T} type
     */
    static of(type) {
        const result = this.asUniqueClass()
        result.type = type
        result.grammar = result.getTargetType().grammar.map(v => new this())
        return result
    }

    /** @returns {typeof IEntity} */
    static getTargetType() {
        const result = this.type
        if (result.prototype instanceof MirroredEntity) {
            return /** @type {typeof MirroredEntity} */(result).getTargetType()
        }
        return result
    }

    toString(
        insideString = false,
        indentation = "",
        printKey = this.Self().printKey,
    ) {
        return this.getter().toString(insideString, indentation, printKey)
    }
}
