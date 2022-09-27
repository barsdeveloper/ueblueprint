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

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#input = this.element.querySelector(".ueb-pin-input")
    }

    /** @returns {IInput[]} */
    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseOpenWindow(this.#input, this.element.blueprint, {
                moveEverywhere: true,
                looseTarget: true
            })
        ]
    }

    /** @param {PinElement} pin */
    getInputs(pin) {
        return [this.#input.dataset.linearColor]
    }

    /** @param {String[]} value */
    setInputs(value = []) {
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <span class="ueb-pin-input" data-linear-color="${this.element.defaultValue.toString()}"
                    .style="--ueb-linear-color:rgba(${this.element.defaultValue.toString()})">
                </span>
            `
        }
        return super.renderInput()
    }
}
