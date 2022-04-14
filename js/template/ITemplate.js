// @ts-check

/**
 * @typedef {import("../element/IElement").default} IElement
 */

/**
 * @template {IElement} T
 */
export default class ITemplate {

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
    cleanup(element) {
    }
}
