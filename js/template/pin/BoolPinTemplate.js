import { html } from "lit"
import MouseIgnore from "../../input/mouse/MouseIgnore.js"
import PinTemplate from "./PinTemplate.js"

/** @typedef {import("lit").PropertyValues} PropertyValues */

/** @extends PinTemplate<Boolean> */
export default class BoolPinTemplate extends PinTemplate {

    /** @type {HTMLInputElement?} */
    #input

    #onChangeHandler = () => this.element.setDefaultValue(this.#input.checked)

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#input = this.element.querySelector(".ueb-pin-input")
    }

    setup() {
        super.setup()
        this.#input?.addEventListener("change", this.#onChangeHandler)
    }

    cleanup() {
        super.cleanup()
        this.#input?.removeEventListener("change", this.#onChangeHandler)
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseIgnore(this.#input, this.blueprint),
        ]
    }

    renderInput() {
        return html`
            <input type="checkbox" class="ueb-pin-input-wrapper ueb-pin-input" ?checked="${this.element.defaultValue}" />
        `
    }
}
