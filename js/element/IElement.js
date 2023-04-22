import { LitElement } from "lit"
import Configuration from "../Configuration.js"

/**
 * @typedef {import("../Blueprint.js").default} Blueprint
 * @typedef {import("../entity/IEntity.js").default} IEntity
 * @typedef {import("../input/IInput.js").default} IInput
 * @typedef {import("../template/ITemplate.js").default} ITemplate
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/**
 * @template {IEntity} T
 * @template {ITemplate} U
 */
export default class IElement extends LitElement {

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

    isInitialized = false
    isSetup = false

    /** @type {IInput[]} */
    inputObjects = []

    /**
     * @param {T} entity
     * @param {U} template
     */
    initialize(entity, template) {
        this.requestUpdate()
        this.#entity = entity
        this.#template = template
        this.#template.initialize(this)
        if (this.isConnected) {
            this.updateComplete.then(() => this.setup())
        }
        this.isInitialized = true
    }

    connectedCallback() {
        super.connectedCallback()
        this.blueprint = /** @type {Blueprint} */(this.closest("ueb-blueprint"))
        if (this.isInitialized) {
            this.requestUpdate()
            this.updateComplete.then(() => this.setup())
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        if (this.isSetup) {
            this.updateComplete.then(() => this.cleanup())
        }
        this.acknowledgeDelete()
    }

    createRenderRoot() {
        return this
    }

    setup() {
        this.template.setup()
        this.isSetup = true
    }

    cleanup() {
        this.template.cleanup()
        this.isSetup = false
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties)
        this.template.willUpdate(changedProperties)
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        this.template.update(changedProperties)
    }

    render() {
        return this.template.render()
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.template.firstUpdated(changedProperties)
        this.template.inputSetup()
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties)
        this.template.updated(changedProperties)
    }

    acknowledgeDelete() {
        let deleteEvent = new CustomEvent(Configuration.removeEventName)
        this.dispatchEvent(deleteEvent)
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
        return /** @type {V} */(this.template.inputObjects.find(object => object.constructor == type))
    }
}
