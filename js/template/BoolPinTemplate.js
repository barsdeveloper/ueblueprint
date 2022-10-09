import { html, nothing } from "lit"
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
        this.onChangeHandler = _ => this.element.setDefaultValue(self.#input.checked ? true : false)
        this.#input.addEventListener("change", this.onChangeHandler)
    }

    cleanup() {
        super.cleanup()
        this.#input.removeEventListener("change", this.onChangeHandler)
    }

    getInputs() {
        return [this.#input.checked ? "true" : "false"]
    }

    /**
     * @param {Boolean[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        this.element.setDefaultValue(values[0])
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <input type="checkbox" class="ueb-pin-input" checked="${this.element.defaultValue ? "" : nothing}" />
            `
        }
        return super.renderInput()
    }
}
