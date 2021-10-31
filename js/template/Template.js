/**
 * @typedef {import(""../entity/Entity"").default} Entity
 */
export default class Template {

    /**
     * Computes the html content of the target element.
     * @param {Entity} entity Entity representing the element
     * @returns The computed html 
     */
    render(entity) {
        return ``
    }

    /**
     * Returns the html elements rendered by this template.
     * @param {Entity} entity Entity representing the element
     * @returns The rendered elements
     */
    getElements(entity) {
        let aDiv = document.createElement('div')
        aDiv.innerHTML = this.render(entity)
        return aDiv.childNodes
    }
}
