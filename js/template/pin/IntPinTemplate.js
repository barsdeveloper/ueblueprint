import { html } from "lit"
import IntegerEntity from "../../entity/IntegerEntity"
import INumericInputPinTemplate from "./INumericInputPinTemplate"

/** @typedef {import("../../entity/IntegerEntity").default} IntEntity */

/** @extends INumericInputPinTemplate<IntEntity> */
export default class IntInputPinTemplate extends INumericInputPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        let value = parseInt(values[0])
        const integer = this.element.getDefaultValue(true)
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
