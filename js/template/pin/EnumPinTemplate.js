import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate.js"

/**
 * @typedef {import("../../element/DropdownElement.js").default} DropdownElement
 * @typedef {import("../../element/PinElement.js").AnyValue} AnyValue
 * @typedef {import("../../entity/EnumEntity.js").default} EnumEntity
 * @typedef {import("lit").PropertyValues} PropertyValues
 */
/**
 * @template {AnyValue} T
 * @typedef {import("../../element/PinElement.js").default<T>} PinElement
 */

/** @extends IInputPinTemplate<EnumEntity> */
export default class EnumPinTemplate extends IInputPinTemplate {

    static saveEachInputChange = true // Otherwise save only on focus out

    /** @type {DropdownElement} */
    #dropdownElement

    renderInput() {
        const entity = this.element.nodeElement.entity
        return html`
            <ueb-dropdown
                class="ueb-pin-input"
                .options="${this.element.nodeElement.entity.EnumEntries}"
                .selected="${this.element.defaultValue.value}"
            >
            </ueb-dropdown>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#dropdownElement = this.element.querySelector("ueb-dropdown")
    }

    getInputs() {
        return [this.#dropdownElement.getValue()]
    }
}
