import { css, nothing } from "lit"

/**
 * @typedef {import("../element/IElement").default} IElement
 * @typedef {import("../input/IInput").default} IInput
 */

/** @template {IElement} T */
export default class ITemplate {

    static styles = css``

    /** @type {T} */
    element

    /** @type {IInput[]} */
    #inputObjects = []
    get inputObjects() {
        return this.#inputObjects
    }

    /** @param {T} element */
    constructed(element) {
        this.element = element
    }

    /** @returns {IInput[]} */
    createInputObjects() {
        return []
    }

    connectedCallback() {
    }

    /** @param {Map} changedProperties */
    willUpdate(changedProperties) {
    }

    /** @param {Map} changedProperties */
    update(changedProperties) {
    }

    render() {
        return nothing
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
    }

    /** @param {Map} changedProperties */
    updated(changedProperties) {
    }

    inputSetup() {
        this.#inputObjects = this.createInputObjects()
    }

    cleanup() {
        this.#inputObjects.forEach(v => v.unlistenDOMElement())
    }
}
