/**
 * @typedef {import("../graph/GraphElement").default} GraphElement
 */
export default class Template {

    /**
     * Computes the html content of the target element.
     * @param {GraphElement} entity Element of the graph
     * @returns The result html 
     */
    render(entity) {
        return ""
    }

    /**
     * Applies the style to the element.
     * @param {GraphElement} element Element of the graph
     */
    apply(element) {
        // TODO replace with the safer element.setHTML(...) when it will be available
        element.innerHTML = this.render(element)
    }
}
