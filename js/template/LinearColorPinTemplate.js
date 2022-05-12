// @ts-check

import html from "./html"
import IInputPinTemplate from "./IInputPinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity)}
 */

export default class LinearColorPinTemplate extends IInputPinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin)
        this.#input = pin.querySelector(".ueb-pin-input")
        this.#input.dataset.linearColor = /** @type {LinearColorEntity} */(pin.entity.DefaultValue).toString()
        let self = this
    }

    /**
     * @param {PinElement} pin
     */
    getInputs(pin) {
        return [this.#input.dataset.linearColor]
    }

    /**
     * @param {PinElement} pin
     * @param {String[]?} value
     */
    setInputs(pin, value = []) {
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <span class="ueb-pin-input"></span>
            `
        }
        return super.renderInput(pin)
    }
}
