export default class FGuid {
    static generateGuid() {
        let result = ""
        let random = new Uint32Array(4);
        crypto.getRandomValues(random)
        random.forEach(n => {
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
            this.value = FGuid.generateGuid()
        }
    }

    toString() {
        return this.value
    }
}