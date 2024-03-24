import { html } from "lit"
import MouseIgnore from "../../input/mouse/MouseIgnore.js"
import ITemplate from "../ITemplate.js"

/** @extends {ITemplate<DropdownElement>} */
export default class DropdownTemplate extends ITemplate {

    /** @type {HTMLSelectElement} */
    #selectElement

    /** @type {HTMLSelectElement} */
    #referenceSelectElement

    #changeHandler = e => this.element.selectedOption = /** @type {HTMLSelectElement} */(e.target)
        .selectedOptions[0]
        .value

    render() {
        return html`
            <select class="ueb-pin-input-content" @change="${this.#changeHandler}">
                ${this.element.options.map(([k, v]) => html`
                    <option value="${k}" ?selected="${k === this.element.selectedOption}">${v}</option>
                `)}
            </select>
            <select style="visibility: hidden; position: fixed;">
                <option>${this.element.selectedOption}</option>
            </select>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#selectElement = this.element.querySelector("select:first-child")
        this.#referenceSelectElement = this.element.querySelector("select:last-child")
        const event = new Event("input", { bubbles: true })
        this.#selectElement.dispatchEvent(event)
    }

    /** @param {PropertyValues} changedProperties */
    updated(changedProperties) {
        super.updated(changedProperties)
        const bounding = this.#referenceSelectElement.getBoundingClientRect()
        this.element.style.setProperty("--ueb-dropdown-width", bounding.width + "px")
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
