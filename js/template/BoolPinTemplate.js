// @ts-check

import html from "./html"
import IInputPinTemplate from "./IInputPinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class BoolPinTemplate extends IInputPinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin)
        this.#input = pin.querySelector(".ueb-pin-input")
        let self = this
        this.onChangeHandler = _ => pin.entity.DefaultValue = self.#input.checked ? "true" : "false"
        this.#input.addEventListener("change", this.onChangeHandler)
    }

    /**
     * @param {PinElement} pin
     */
    cleanup(pin) {
        super.cleanup(pin)
        this.#input.removeEventListener("change", this.onChangeHandler)
    }

    /**
     * @param {PinElement} pin
     */
    getInputs(pin) {
        return [this.#input.checked ? "true" : "false"]
    }

    /**
     * @param {PinElement} pin
     * @param {String[]?} value
     */
    setInputs(pin, value = []) {
        pin.entity.DefaultValue = value.length ? value[0] : this.getInput(pin)
        this.#input.checked = pin.entity.DefaultValue == "true"
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <input type="checkbox" class="ueb-pin-input" ${pin.entity.DefaultValue == "true" ? "checked" : ""} />
            `
        }
        return super.renderInput(pin)
    }
}
