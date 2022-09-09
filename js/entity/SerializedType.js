export default class SerializedType {

    #types
    get types() {
        return this.#types
    }
    set types(v) {
        this.#types = v
    }

    #stringFallback
    get stringFallback() {
        return this.#stringFallback
    }
    set stringFallback(v) {
        this.#stringFallback = v
    }

    constructor([...acceptedTypes], stringFallback = true) {
        this.#types = [...new Set([
            ...acceptedTypes,
            ...(stringFallback ? [String] : [])
        ])]
        this.#stringFallback = stringFallback
    }
}
