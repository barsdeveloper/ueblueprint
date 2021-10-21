export default class Guid {
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
        switch (guid?.constructor) {
            case String:
                this.value = guid
                break
            case Guid:
                this.value = guid.value
                break
            default:
                this.value = Guid.generateGuid(guid === true)
        }
    }

    toString() {
        return this.value
    }
}