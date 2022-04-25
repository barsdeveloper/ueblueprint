// @ts-check

/**
 * @typedef {import("../element/IElement").default} IElement
 * @typedef {import("../input/IInput").default} IInput")}
 */

/**
 * @template {IElement} T
 */
export default class ITemplate {

    /** @type {IInput[]} */
    #inputObjects = []

    get inputObjects() {
        return this.#inputObjects
    }

    /**
     * @param {T} entity
     */
    render(entity) {
        return ""
    }

    /**
     * @param {T} element
     */
    setup(element) {
        // TODO replace with the safer element.setHTML(...) when it will be availableBreack
        element.innerHTML = this.render(element)
    }

    /**
     * @param {T} element
     */
    inputSetup(element) {
        this.#inputObjects = this.createInputObjects(element)
    }

    /**
     * @param {T} element
     */
    cleanup(element) {
        this.#inputObjects.forEach(v => v.unlistenDOMElement())
    }

    /**
     * @param {T} element
     * @returns {IInput[]}
     */
    createInputObjects(element) {
        return []
    }
}
