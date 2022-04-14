// @ts-check

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../input/IInput").default} IInput
 * @typedef {import("../template/ITemplate").default} ITemplate
 */

/**
 * @template {IEntity} T
 * @template {ITemplate} U
 */
export default class IElement extends HTMLElement {

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }
    set blueprint(blueprint) {
        this.#blueprint = blueprint
    }

    /** @type {T} */
    #entity
    get entity() {
        return this.#entity
    }
    set entity(entity) {
        this.#entity = entity
    }

    /** @type {U} */
    #template
    get template() {
        return this.#template
    }
    set template(template) {
        this.#template = template
    }

    /** @type {IInput[]} */
    inputObjects = []

    /**
     * @param {T} entity
     * @param {U} template
     */
    constructor(entity, template) {
        super()
        this.#entity = entity
        this.#template = template
        this.inputObjects = []
    }

    getTemplate() {
        return this.template
    }

    connectedCallback() {
        this.#blueprint = this.closest("ueb-blueprint")
        this.template.setup(this)
    }

    disconnectedCallback() {
        this.template.cleanup(this)
    }

    /**
     * @param {IElement} element
     */
    isSameGraph(element) {
        return this.#blueprint && this.#blueprint == element?.blueprint
    }

    /**
     * @template {IInput} V
     * @param {new (...args: any[]) => V} type
     * @returns {V}
     */
    getInputObject(type) {
        return /** @type {V} */ (this.inputObjects.find(object => object.constructor == type))
    }

    // Subclasses will want to override
    createInputObjects() {
        return []
    }
}
