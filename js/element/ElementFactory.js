export default class ElementFactory {

    /** @type {Map<String, AnyConstructor<IElement>>} */
    static #elementConstructors = new Map()

    /**
     * @param {String} tagName
     * @param {AnyConstructor<IElement>} entityConstructor
     */
    static registerElement(tagName, entityConstructor) {
        ElementFactory.#elementConstructors.set(tagName, entityConstructor)
    }

    /** @param {String} tagName */
    static getConstructor(tagName) {
        return ElementFactory.#elementConstructors.get(tagName)
    }
}
