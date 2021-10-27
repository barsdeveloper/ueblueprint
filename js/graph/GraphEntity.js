export default class GraphEntity extends HTMLElement {
    /**
     * 
     * @param {import("../template/Template").default} template The template to render this node
     */
    constructor(template) {
        super()
        /** @type {import("../Blueprint").Blueprint}" */
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
