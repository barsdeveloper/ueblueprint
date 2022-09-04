export default class SerializedType {

    #types
    get types() {
        return this.#types
    }
    set types(v) {
        this.#types = v
    }

    constructor(...acceptedTypes) {
        this.#types = acceptedTypes
    }
}
