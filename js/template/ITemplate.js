// @ts-check

/**
 * @typedef {import("../element/IElement").default} IElement
 */

/**
 * @template {IElement} T
 */
export default class ITemplate {

    /** @type {Object[]} */
    inputObjects = []

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
        this.inputObjects = this.createInputObjects()
    }

    /**
     * @param {T} element
     */
    cleanup(element) {
        this.inputObjects.forEach(v => v.unlistenDOMElement())
    }

    createInputObjects() {
        return []
    }
}
