import { html } from "lit"
import MouseIgnore from "../input/mouse/MouseIgnore"
import PinTemplate from "./PinTemplate"

/**
 * @extends PinTemplate<Boolean>
 */
export default class BoolPinTemplate extends PinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#input = this.element.querySelector(".ueb-pin-input")
        let self = this
        this.onChangeHandler = _ => this.element.setDefaultValue(self.#input.checked)
        this.#input.addEventListener("change", this.onChangeHandler)
    }

    cleanup() {
        super.cleanup()
        this.#input.removeEventListener("change", this.onChangeHandler)
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseIgnore(this.#input, this.element.blueprint),
        ]
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <input type="checkbox" class="ueb-pin-input" ?checked="${this.element.defaultValue}" />
            `
        }
        return super.renderInput()
    }
}
