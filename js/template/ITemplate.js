import { html } from "lit"

/**
 * @typedef {import("../element/IElement.js").default} IElement
 * @typedef {import("../input/IInput.js").default} IInput
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/** @template {IElement} T */
export default class ITemplate {

    /** @type {T} */
    element

    get blueprint() {
        return this.element.blueprint
    }

    /** @type {IInput[]} */
    #inputObjects = []
    get inputObjects() {
        return this.#inputObjects
    }

    /** @param {T} element */
    initialize(element) {
        this.element = element
    }

    createInputObjects() {
        return /** @type {IInput[]} */([])
    }

    /**
     * @template {IInput} T
     * @param {new () => T} type
     */
    getInputObject(type) {
        return /** @type {T} */(this.inputObjects.find(object => object.constructor == type))
    }

    setup() {
        this.#inputObjects.forEach(v => v.setup())
    }

    cleanup() {
        this.#inputObjects.forEach(v => v.cleanup())
    }

    /** @param {PropertyValues} changedProperties */
    willUpdate(changedProperties) {
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
    }

    render() {
        return html``
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
    }

    inputSetup() {
        this.#inputObjects = this.createInputObjects()
    }
}
