/**
 * A Graph Entity is an element that can stay directly (as a first child) on the blueprint grid. Those entities are either nodes or links
 */
export default class GraphEntity extends HTMLElement {
    constructor() {
        super()
        /** @type {import("./UEBlueprint").EBlueprint}" */
        this.blueprint = null
    }

    connectedCallback() {
        this.blueprint = this.closest('u-blueprint')
        let aDiv = document.createElement('div')
        aDiv.innerHTML = this.render()
        this.appendChild(aDiv.firstElementChild)
    }

    // Subclasses want to rewrite this
    render() {
        return ""
    }
}