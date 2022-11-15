/**
 * @typedef {new (...args) => IElement} ElementConstructor
 * @typedef {import("./IElement").default} IElement
 */

export default class ElementFactory {

    /** @type {Map<String, ElementConstructor>} */
    static #elementConstructors = new Map()

    /**
     * @param {String} tagName
     * @param {ElementConstructor} entityConstructor
     */
    static registerElement(tagName, entityConstructor) {
        ElementFactory.#elementConstructors.set(tagName, entityConstructor)
    }

    /**
     * @param {String} tagName
     */
    static getConstructor(tagName) {
        return ElementFactory.#elementConstructors.get(tagName)
    }
}
