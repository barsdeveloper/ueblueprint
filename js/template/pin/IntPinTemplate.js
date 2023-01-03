import { html } from "lit"
import INumericInputPinTemplate from "./INumericInputPinTemplate"

/** @typedef {import("../../entity/IntegerEntity").default} IntegerEntity */

/** @extends INumericInputPinTemplate<IntegerEntity> */
export default class IntPinTemplate extends INumericInputPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        const integer = this.element.getDefaultValue(true)
        integer.value = values[0]
        this.inputContentElements[0].innerText = this.element.getDefaultValue()?.toString() // needed
        this.element.requestUpdate()
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${true}" .innerText="${this.element.getDefaultValue()?.toString() ?? "0"}">
                </ueb-input>
            </div>
        `
    }
}
