import IEntity from "./IEntity.js"
import P from "parsernostrum"

var crypto
if (typeof window === "undefined") {
    // When used in nodejs, mainly for test purpose
    import("crypto").then(mod => crypto = mod.default).catch()
} else {
    crypto = window.crypto
}

export default class GuidEntity extends IEntity {

    static grammar = this.createGrammar()

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

    static createGrammar() {
        return /** @type {P<GuidEntity>} */(
            P.reg(/[0-9A-F]{32}/i).map(v => new this(v)).label("GuidEntity")
        )
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor),
    ) {
        let result = this.value
        if (Self.serialized) {
            result = `"${result}"`
        }
        return result
    }

    toString() {
        return this.value
    }
}
