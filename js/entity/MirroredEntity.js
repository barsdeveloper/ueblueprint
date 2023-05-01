
/**
 * @typedef {import("./IEntity.js").default} IEntity
 * @typedef {import("./IEntity.js").EntityConstructor} EntityConstructor
 */

export default class MirroredEntity {

    static attributes = {
        type: {
            ignored: true,
        },
        key: {
            ignored: true,
        },
        getter: {
            ignored: true,
        },
    }

    /**
     * @param {EntityConstructor} type
     * @param {String} key
     */
    constructor(type, key, getter = () => null) {
        this.type = type
        this.key = key
        this.getter = getter
    }

    get() {
        return this.getter()
    }

    getTargetType() {
        const result = this.type.attributes[this.key].type
        if (result instanceof MirroredEntity) {
            return result.getTargetType()
        }
        return result
    }
}
