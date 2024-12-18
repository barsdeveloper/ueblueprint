import { html } from "lit"

/** @template {IElement} ElementT */
export default class ITemplate {

    /** @type {ElementT} */
    element

    get blueprint() {
        return this.element.blueprint
    }

    /** @type {IInput[]} */
    #inputObjects = []
    get inputObjects() {
        return this.#inputObjects
    }

    /** @param {ElementT} element */
    initialize(element) {
        this.element = element
    }

    createInputObjects() {
        return /** @type {IInput[]} */([])
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
