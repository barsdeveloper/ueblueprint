/**
 * A Graph Entity is an element that can stay directly (as a first child) on the blueprint grid. Those entities are either nodes or links
 */
export default class GraphEntity extends HTMLElement {
    /**
     * 
     * @param {import("./template/Template").default} template The template to render this node
     */
    constructor(template) {
        super()
        /** @type {import("./UEBlueprint").EBlueprint}" */
        this.blueprint = null
        this.template = template
    }

    connectedCallback() {
        this.blueprint = this.closest('u-blueprint')
        this.append(...this.template.getElements(this))
    }

    // Subclasses want to rewrite this
    render() {
        return ''
    }
}