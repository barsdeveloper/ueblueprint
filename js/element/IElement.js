import { LitElement } from "lit"

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../input/IInput").default} IInput
 * @typedef {import("../template/ITemplate").default} ITemplate
 * @typedef {import("lit").PropertyDeclarations} PropertyDeclarations
 */

/**
 * @template {IEntity} T
 * @template {ITemplate} U
 */
export default class IElement extends LitElement {

    /** @type {PropertyDeclarations} */
    static properties = {
    }

    #nextUpdatedCallbacks = []

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }
    set blueprint(v) {
        this.#blueprint = v
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
        this.blueprint = /** @type {Blueprint} */ this.closest("ueb-blueprint")
        this.template.connectedCallback()
    }

    /** @param {Map} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties)
        this.template.willUpdate(changedProperties)
    }

    /** @param {Map} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        this.template.update(changedProperties)
    }

    render() {
        return this.template.render()
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.template.firstUpdated(changedProperties)
        this.template.inputSetup()
    }

    /** @param {Map<String, String>} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties)
        this.template.updated(changedProperties)
        // Remember the array might change while iterating
        for (const f of this.#nextUpdatedCallbacks) {
            f(changedProperties)
        }
        this.#nextUpdatedCallbacks = []
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.template.cleanup()
    }

    addNextUpdatedCallbacks(callback, requestUpdate = false) {
        this.#nextUpdatedCallbacks.push(callback)
        if (requestUpdate) {
            this.requestUpdate()
        }
    }

    /** @param {IElement} element */
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
