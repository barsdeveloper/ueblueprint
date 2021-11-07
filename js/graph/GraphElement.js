export default class GraphElement extends HTMLElement {

    /**
     * 
     * @param {import("../template/Template").default} template The template to render this node
     */
    constructor(entity, template) {
        super()
        /** @type {import("../Blueprint").default}" */
        this.blueprint = null
        this.entity = entity
        this.template = template
    }

    connectedCallback() {
        this.blueprint = this.closest('u-blueprint')
        this.append(...this.template.getElements(this.entity))
    }
}
