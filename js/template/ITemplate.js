/**
 * @typedef {import("../element/IElement").default} IElement
 */
export default class ITemplate {

    /**
     * Computes the html content of the target element.
     * @param {IElement} entity Element of the graph
     * @returns The result html
     */
    render(entity) {
        return ""
    }

    /**
     * Applies the style to the element.
     * @param {IElement} element Element of the graph
     */
    apply(element) {
        // TODO replace with the safer element.setHTML(...) when it will be available
        element.innerHTML = this.render(element)
    }
}
