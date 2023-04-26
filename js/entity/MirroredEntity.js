import IEntity from "./IEntity.js"

/** @typedef {import("./IEntity.js").EntityConstructor} EntityConstructor */

export default class MirroredEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        type: {
            ignored: true,
        },
        key: {
            ignored: true,
        },
        object: {
            ignored: true,
        },
    }

    constructor(values = {}) {
        super({})
        /** @type {EntityConstructor} */ this.type
        /** @type {String} */ this.key
        /** @type {IEntity} */ this.object
    }

    get() {
        return this.object?.[this.key]
    }


    set(value) {
        if (this.object[this.key]) {
            this.object[this.key] = value
        }
    }
}
