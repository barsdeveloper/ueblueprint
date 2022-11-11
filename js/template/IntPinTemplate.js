import { html, nothing } from "lit"
import INumericPinTemplate from "./INumericPinTemplate"

/** @typedef {import("../entity/IntegerEntity").default} IntEntity */

/** @extends INumericPinTemplate<IntEntity> */
export default class IntPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0])
    }

    renderInput() {
        if (this.element.isInput() && !this.element.isLinked) {
            return html`
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.element.entity.DefaultValue.toString()}">
                    </ueb-input>
                </div>
            `
        }
        return nothing
    }
}
