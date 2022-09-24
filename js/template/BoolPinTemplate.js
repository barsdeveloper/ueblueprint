import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"

/** @typedef {import("../element/PinElement").default} PinElement */

export default class BoolPinTemplate extends IInputPinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /**
     * @param {PinElement} pin
     * @param {Map} changedProperties
     */
    firstUpdated(pin, changedProperties) {
        super.firstUpdated(pin, changedProperties)
        this.#input = pin.querySelector(".ueb-pin-input")
        let self = this
        this.onChangeHandler = _ => pin.entity.DefaultValue = self.#input.checked ? "true" : "false"
        this.#input.addEventListener("change", this.onChangeHandler)
    }

    /** @param {PinElement} pin */
    cleanup(pin) {
        super.cleanup(pin)
        this.#input.removeEventListener("change", this.onChangeHandler)
    }

    /** @param {PinElement} pin */
    getInputs(pin) {
        return [this.#input.checked ? "true" : "false"]
    }

    /** @param {PinElement} pin */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <input type="checkbox" class="ueb-pin-input" .checked=${pin.defaultValue=="true" } />
            `
        }
        return super.renderInput(pin)
    }
}
