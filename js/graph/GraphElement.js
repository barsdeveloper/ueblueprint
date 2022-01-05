/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/Entity").default} Entity
 * @typedef {import("../input/Context").default} Context
 * @typedef {import("../template/Template").default} Template
 */

export default class GraphElement extends HTMLElement {

    /**
     * 
     * @param {Entity} entity The entity containing blueprint related data for this graph element
     * @param {Template} template The template to render this node
     */
    constructor(entity, template) {
        super()
        /** @type {Blueprint}" */
        this.blueprint = null
        /** @type {Entity}" */
        this.entity = entity
        /** @type {Template}" */
        this.template = template
        /** @type {Context[]} */
        this.inputObjects = []
    }

    getTemplate() {
        return this.template
    }

    connectedCallback() {
        this.blueprint = this.closest("ueb-blueprint")
        this.template.apply(this)
        this.inputObjects = this.createInputObjects()
    }

    disconnectedCallback() {
        this.inputObjects.forEach(v => v.unlistenDOMElement())
    }

    createInputObjects() {
        return []
    }
}
