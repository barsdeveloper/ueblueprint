import Grammar from "../serialization/Grammar.js"
import AttributeInfo from "./AttributeInfo.js"
import IEntity from "./IEntity.js"

var crypto
if (typeof window === "undefined") {
    import("crypto").then(mod => crypto = mod.default).catch()
} else {
    crypto = window.crypto
}

export default class GuidEntity extends IEntity {

    static attributes = {
        ...super.attributes,
        value: AttributeInfo.createValue(""),
    }
    static grammar = this.createGrammar()

    static createGrammar() {
        return Grammar.guid.map(v => new this(v))
    }

    static generateGuid(random = true) {
        let values = new Uint32Array(4)
        if (random === true) {
            crypto.getRandomValues(values)
        }
        let guid = ""
        values.forEach(n => {
            guid += ("0".repeat(8) + n.toString(16).toUpperCase()).slice(-8)
        })
        return new GuidEntity({ value: guid })
    }

    constructor(values) {
        if (!values) {
            values = GuidEntity.generateGuid().value
        }
        if (values.constructor !== Object) {
            values = {
                value: values,
            }
        }
        super(values)
        /** @type {String} */ this.value
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}
