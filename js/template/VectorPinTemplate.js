import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity}
 */

export default class VectorPinTemplate extends IInputPinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /**
     * @param {PinElement} pin
     * @param {Map} changedProperties
     */
    firstUpdated(pin, changedProperties) {
        super.firstUpdated(pin, changedProperties)
        this.#input = pin.querySelector(".ueb-pin-input")
    }

    /**
     * @param {PinElement} pin
     */
    getInputs(pin) {
        return [this.#input.dataset.linearColor]
    }

    /**
     * @param {PinElement} pin
     * @param {String[]} value
     */
    setInputs(pin, value = []) {
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <div class="ueb-pin-input">
                    <span class="ueb-pin-input-x" role="textbox" contenteditable="true" .innerText=${pin.unreactiveDefaultValue}></span>
                </div>
            `
        }
        return super.renderInput(pin)
    }
}
