import { html } from "lit"
import IntegerEntity from "../../entity/IntegerEntity"
import INumericInputPinTemplate from "./INumericInputPinTemplate"

/** @typedef {import("../../entity/IntegerEntity").default} IntEntity */

/** @extends INumericInputPinTemplate<IntEntity> */
export default class IntInputPinTemplate extends INumericInputPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        const integer = this.element.getDefaultValue(true)
        if (!(integer instanceof IntegerEntity)) {
            throw new TypeError("Expected DefaultValue to be a IntegerEntity")
        }
        integer.value = values[0]
        this.element.requestUpdate("DefaultValue", integer)
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
