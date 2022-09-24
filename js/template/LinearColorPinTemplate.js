import { html } from "lit"
import MouseOpenWindow from "../input/mouse/MouseOpenWindow"
import IInputPinTemplate from "./IInputPinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity}
 */

export default class LinearColorPinTemplate extends IInputPinTemplate {

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
     * @returns {IInput[]}
     */
    createInputObjects(pin) {
        return [
            ...super.createInputObjects(pin),
            new MouseOpenWindow(this.#input, pin.blueprint, {
                moveEverywhere: true,
                looseTarget: true
            })
        ]
    }

    /** @param {PinElement} pin */
    getInputs(pin) {
        return [this.#input.dataset.linearColor]
    }

    /**
     * @param {PinElement} pin
     * @param {String[]} value
     */
    setInputs(pin, value = []) {
    }

    /** @param {PinElement} pin */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <span class="ueb-pin-input" data-linear-color="${pin.defaultValue.toString()}"
                    .style="--ueb-linear-color:rgba(${pin.defaultValue.toString()})">
                </span>
            `
        }
        return super.renderInput(pin)
    }
}
