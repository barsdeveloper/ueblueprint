/** @template {Attribute} T */
export default class MirroredEntity {

    static attributes = {
        type: {
            ignored: true,
        },
        getter: {
            ignored: true,
        },
    }

    /**
     * @param {ConstructorType<T>} type
     * @param {() => T} getter
     */
    constructor(type, getter = null) {
        this.type = type
        this.getter = getter
    }

    get() {
        return this.getter()
    }

    /** @return {AttributeConstructor<Attribute>} */
    getTargetType() {
        const result = this.type
        if (result instanceof MirroredEntity) {
            return result.getTargetType()
        }
        return result
    }
}
