// @ts-check

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

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
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
    }

    connectedCallback() {
        super.connectedCallback()
        this.#blueprint = this.closest("ueb-blueprint")
        this.template.setup(this)
        this.template.inputSetup(this)
    }

    updated(changedProperties) {
        this.#template.updated(this, changedProperties)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
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
     */
    getInputObject(type) {
        return /** @type {V} */ (this.template.inputObjects.find(object => object.constructor == type))
    }

    render() {
        return this.template.render(this)
    }
}
