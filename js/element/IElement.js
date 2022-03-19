/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../input/IContext").default} IContext
 * @typedef {import("../template/ITemplate").default} ITemplate
 */

export default class IElement extends HTMLElement {

    static tagName = ""

    /**
     * @param {IEntity} entity The entity containing blueprint related data for this graph element
     * @param {ITemplate} template The template to render this node
     */
    constructor(entity, template) {
        super()
        /** @type {Blueprint} */
        this.blueprint = null
        /** @type {IEntity} */
        this.entity = entity
        /** @type {ITemplate} */
        this.template = template
        /** @type {IContext[]} */
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

    /**
     * @param {IElement} element
     */
    isSameGraph(element) {
        return this.blueprint && this.blueprint == element?.blueprint
    }
}
