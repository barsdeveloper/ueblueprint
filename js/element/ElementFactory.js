export default class ElementFactory {

    /** @type {Map<String, Constructor<IElement>>} */
    static #elementConstructors = new Map()

    /**
     * @param {String} tagName
     * @param {Constructor<IElement>} entityConstructor
     */
    static registerElement(tagName, entityConstructor) {
        ElementFactory.#elementConstructors.set(tagName, entityConstructor)
    }

    /** @param {String} tagName */
    static getConstructor(tagName) {
        return ElementFactory.#elementConstructors.get(tagName)
    }
}
