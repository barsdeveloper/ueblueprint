// @ts-check

/**
 * @typedef {import("../element/IElement").default} IElement
 */
export default class ITemplate {

    /**
     * @param {IElement} entity
     */
    render(entity) {
        return ""
    }

    /**
     * @param {IElement} element
     */
    apply(element) {
        // TODO replace with the safer element.setHTML(...) when it will be availableBreack
        element.innerHTML = this.render(element)
    }
}
