export default class Guid {
    static generateGuid(random) {
        let result = ""
        let values = new Uint32Array(4);
        if (random === true) {
            crypto.getRandomValues(values)
        }
        values.forEach(n => {
            this.result += ('00000000' + n.toString(16).toUpperCase()).slice(-8)
        })
        return result
    }

    constructor(guid) {
        if (guid?.constructor?.name === 'String') {
            this.value = guid
        } else if (guid?.constructor?.name === 'FGuid') {
            this.value = guid.value
        } else {
            this.value = Guid.generateGuid(guid === true)
        }
    }

    toString() {
        return this.value
    }
}