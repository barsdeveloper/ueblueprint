import { html } from "lit"
import Integer64Entity from "../../entity/Integer64Entity.js"
import INumericPinTemplate from "./INumericPinTemplate.js"

/** @extends INumericPinTemplate<Integer64Entity> */
export default class Int64PinTemplate extends INumericPinTemplate {

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        const value = this.element.getDefaultValue()
        value.value = BigInt(values[0])
        this.element.setDefaultValue(value)
        this.element.requestUpdate()
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${true}" .innerText="${this.element.getDefaultValue()?.toString() ?? "0"}">
                </ueb-input>
            </div>
        `
    }
}
