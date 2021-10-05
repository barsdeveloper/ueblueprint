export default class FGuid {
    constructor(guid) {
        if (guid?.constructor?.name === 'String') {
            this.value = guid
        } else if (guid?.constructor?.name === 'FGuid') {
            this.value = guid.value
        } else {
            let random = new Uint32Array(4);
            crypto.getRandomValues(random)
            this.value = ""
            random.forEach(n => {
                this.value += ('00000000' + n.toString(16).toUpperCase()).slice(-8)
            })
        }
    }

    toString() {
        return this.value
    }
}