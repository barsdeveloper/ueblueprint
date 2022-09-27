import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"

/** @typedef {import("../element/PinElement").default} PinElement */

export default class BoolPinTemplate extends IInputPinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#input = this.element.querySelector(".ueb-pin-input")
        let self = this
        this.onChangeHandler = _ => this.element.entity.DefaultValue = self.#input.checked ? "true" : "false"
        this.#input.addEventListener("change", this.onChangeHandler)
    }

    cleanup() {
        super.cleanup()
        this.#input.removeEventListener("change", this.onChangeHandler)
    }

    getInputs() {
        return [this.#input.checked ? "true" : "false"]
    }

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0] == "true")
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <input type="checkbox" class="ueb-pin-input" .checked=${this.element.entity.getDefaultValue()} />
            `
        }
        return super.renderInput()
    }
}
