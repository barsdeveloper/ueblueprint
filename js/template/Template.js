/**
 * @typedef {import("./GraphNode").default} GraphNode
 */
export default class Template {

    /**
     * Computes the html content of the target element.
     * @param {GraphNode} element Target element 
     * @returns The computed html 
     */
    render(element) {
        return ``
    }

    /**
     * Returns the html elements rendered by this template.
     * @param {GraphNode} element Target element
     * @returns The rendered elements
     */
    getElements(element) {
        let aDiv = document.createElement('div')
        aDiv.innerHTML = this.render(element)
        return aDiv.childNodes
    }
}