import { css, html } from "lit"

/**
 * @typedef {import("../element/IElement").default} IElement
 * @typedef {import("../input/IInput").default} IInput
 */

/**
 * @template {IElement} T
 */
export default class ITemplate {

    static styles = css``

    /** @type {IInput[]} */
    #inputObjects = []
    get inputObjects() {
        return this.#inputObjects
    }

    /**
     * @param {T} element
     */
    constructed(element) {
    }

    /**
     * @param {T} element
     */
    connectedCallback(element) {
    }

    /**
     * @param {T} element
     * @param {Map} changedProperties
     */
    willUpdate(element, changedProperties) {
    }

    /**
     * @param {T} element
     * @param {Map} changedProperties
     */
    update(element, changedProperties) {
    }

    /**
     * @param {T} element
     */
    render(element) {
        return html``
    }

    /**
     * @param {T} element
     * @param {Map} changedProperties
     */
    firstUpdated(element, changedProperties) {
    }

    /**
     * @param {T} element
     * @param {Map} changedProperties
     */
    updated(element, changedProperties) {
    }

    /**
     * @param {T} element
     */
    inputSetup(element) {
        this.#inputObjects = this.createInputObjects(element)
    }

    /**
     * @param {T} element
     */
    cleanup(element) {
        this.#inputObjects.forEach(v => v.unlistenDOMElement())
    }

    /**
     * @param {T} element
     * @returns {IInput[]}
     */
    createInputObjects(element) {
        return []
    }
}
