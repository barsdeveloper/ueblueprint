export default class ElementFactory {

    /** @type {Map<String, IElementConstructor>} */
    static #elementConstructors = new Map()

    /**
     * @param {String} tagName
     * @param {IElementConstructor} entityConstructor
     */
    static registerElement(tagName, entityConstructor) {
        ElementFactory.#elementConstructors.set(tagName, entityConstructor)
    }

    /** @param {String} tagName */
    static getConstructor(tagName) {
        return ElementFactory.#elementConstructors.get(tagName)
    }
}
