import Primitive from "./Primitive";

export default class Guid extends Primitive {

    static generateGuid(random) {
        let values = new Uint32Array(4);
        if (random === true) {
            crypto.getRandomValues(values)
        }
        let result = ""
        values.forEach(n => {
            result += ('00000000' + n.toString(16).toUpperCase()).slice(-8)
        })
        return result
    }

    constructor(guid) {
        super()
        // Using constructor equality and not instanceof in order to consider both primitives and objects
        if (guid?.constructor === Boolean) {
            guid = Guid.generateGuid(guid == true)
        }
        if (guid instanceof Guid) {
            guid = guid.value
        }
        this.value = guid
    }

    toString() {
        return this.value.toString()
    }
}