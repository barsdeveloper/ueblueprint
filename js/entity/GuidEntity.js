import IEntity from "./IEntity.js"
import P from "parsernostrum"

var crypto
if (typeof window === "undefined") {
    import("crypto").then(mod => crypto = mod.default).catch()
} else {
    crypto = window.crypto
}

export default class GuidEntity extends IEntity {

    static grammar = /** @type {P<GuidEntity>} */(
        P.reg(/[0-9A-F]{32}/i).map(v => new this(v)).label("GuidEntity")
    )

    static generateGuid() {
        let values = new Uint32Array(4)
        crypto.getRandomValues(values)
        let guid = ""
        values.forEach(n => {
            guid += ("0".repeat(8) + n.toString(16).toUpperCase()).slice(-8)
        })
        return guid
    }

    constructor(value = GuidEntity.generateGuid()) {
        super()
        this.value = value
    }

    serialize() {
        return this.value
    }

    toString() {
        return this.value
    }
}
