import IEntity from "./IEntity.js"

/** @typedef {import("./ObjectEntity.js").default} ObjectEntity */

export default class Base64ObjectsEncoded extends IEntity {

    static attributes = {
        ...super.attributes,
        value: {
            type: String,
        },
        objects: {
            ignored: true,
        },
    }

    constructor(values) {
        super(values)
        /** @type {String} */this.value
        /** @type {ObjectEntity[]} */this.objects
    }

    decode() {

    }
}
