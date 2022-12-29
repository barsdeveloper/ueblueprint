import { html } from "lit"
import ByteEntity from "../../entity/ByteEntity"
import IInputPinTemplate from "./IInputPinTemplate"
import INumericInputPinTemplate from "./INumericInputPinTemplate"

/** @typedef {import("../../entity/IntegerEntity").default} IntEntity */

/** @extends INumericInputPinTemplate<ByteEntity> */
export default class IntInputPinTemplate extends INumericInputPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        const integer = this.element.getDefaultValue(true)
        if (!(integer instanceof ByteEntity)) {
            throw new TypeError("Expected DefaultValue to be a ByteEntity")
        }
        integer.value = values[0]
        this.element.requestUpdate("DefaultValue", integer)
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${true}"
                    .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.getDefaultValue()?.toString() ?? "0")}">
                </ueb-input>
            </div>
        `
    }
}
