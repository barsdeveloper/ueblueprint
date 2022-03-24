/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../input/IContext").default} IContext
 * @typedef {import("../template/ITemplate").default} ITemplate
 */

export default class IElement extends HTMLElement {

    static tagName = ""

    /** @type {Blueprint} */
    blueprint

    /** @type {IEntity} */
    entity

    /** @type {ITemplate} */
    template

    /** @type {IContext[]} */
    inputObjects = []

    /**
     * @param {IEntity} entity The entity containing blueprint related data for this graph element
     * @param {ITemplate} template The template to render this node
     */
    constructor(entity, template) {
        super()
        this.blueprint = null
        this.entity = entity
        this.template = template
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

    /** @param {IElement} element */
    isSameGraph(element) {
        return this.blueprint && this.blueprint == element?.blueprint
    }

    /**
     * @template {} T
     * @param {new () => T} type
     * @returns {T}
     */
    getInputObject(type) {
        return this.inputObjects.find(object => object.constructor == type)
    }

    // Subclasses will want to override
    createInputObjects() {
        return []
    }
}
