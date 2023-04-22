import { html } from "lit"
import ITemplate from "../ITemplate.js"
import MouseIgnore from "../../input/mouse/MouseIgnore.js"

/**
 * @typedef {import ("../../element/DropdownElement.js").default} DropdownElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

/** @extends {ITemplate<DropdownElement>} */
export default class DropdownTemplate extends ITemplate {

    /** @type {HTMLSelectElement} */
    #selectElement

    render() {
        return html`
            <select class="ueb-pin-input-content">
                ${this.element.options.map(([k, v]) => html`
                    <option value="${k}" ?selected="${k === this.element.selected}">${v}</option>
                `)}
            </select>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#selectElement = this.element.querySelector("select")
        const event = new Event("input", { bubbles: true })
        this.#selectElement.dispatchEvent(event)
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            // Prevents creating links when selecting text and other undesired mouse actions detection
            new MouseIgnore(this.element, this.blueprint),
        ]
    }

    setSelectedValue(value) {
        /** @type {HTMLOptionElement} */(this.element.querySelector(`option[value="${value}"]`)).defaultSelected = true
    }

    getSelectedValue() {
        return this.#selectElement.value
    }
}
