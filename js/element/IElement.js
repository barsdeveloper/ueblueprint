import { LitElement } from "lit"

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
export default class IElement extends LitElement {

    static properties = {
    }

    #nextUpdatedCallbacks = []

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }
    set blueprint(v) {
        return this.#blueprint = v
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
        this.#template.constructed(this)
    }

    createRenderRoot() {
        return this
    }

    connectedCallback() {
        super.connectedCallback()
        this.blueprint = this.closest("ueb-blueprint")
        this.template.connectedCallback(this)
    }

    /**
     * @param {Map} changedProperties
     */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties)
        this.template.willUpdate(this, changedProperties)
    }

    /**
     * @param {Map} changedProperties
     */
    update(changedProperties) {
        super.update(changedProperties)
        this.template.update(this, changedProperties)
    }

    render() {
        return this.template.render(this)
    }

    /**
     * @param {Map} changedProperties
     */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.template.firstUpdated(this, changedProperties)
        this.template.inputSetup(this)
    }

    updated(changedProperties) {
        super.updated(changedProperties)
        this.template.updated(this, changedProperties)
        this.#nextUpdatedCallbacks.forEach(f => f(changedProperties))
        this.#nextUpdatedCallbacks = []
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.template.cleanup(this)
    }

    addNextUpdatedCallbacks(callback, requestUpdate = false) {
        this.#nextUpdatedCallbacks.push(callback)
        if (requestUpdate) {
            this.requestUpdate()
        }
    }

    /**
     * @param {IElement} element
     */
    isSameGraph(element) {
        return this.blueprint && this.blueprint == element?.blueprint
    }

    /**
     * @template {IInput} V
     * @param {new (...args: any[]) => V} type
     */
    getInputObject(type) {
        return /** @type {V} */ (this.template.inputObjects.find(object => object.constructor == type))
    }
}
