export default class GraphElement extends HTMLElement {

    /**
     * 
     * @param {import("../template/Template").default} template The template to render this node
     */
    constructor(entity, template) {
        super()
        /** @type {import("../Blueprint").default}" */
        this.blueprint = null
        /** @type {import("../entity/Entity").default}" */
        this.entity = entity
        /** @type {import("../template/Template").default}" */
        this.template = template
    }

    getTemplate() {
        return this.template
    }

    connectedCallback() {
        this.blueprint = this.closest("ueb-blueprint")
        this.template.apply(this)
    }

    disconnectedCallback() {
    }
}
