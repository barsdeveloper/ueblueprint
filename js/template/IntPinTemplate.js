import { html } from "lit"
import IntegerEntity from "../entity/IntegerEntity"
import INumericInputPinTemplate from "./INumericInputPinTemplate"

/** @typedef {import("../entity/IntegerEntity").default} IntEntity */

/** @extends INumericInputPinTemplate<IntEntity> */
export default class IntInputPinTemplate extends INumericInputPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(new IntegerEntity(values[0]))
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${true}" .innerText="${this.element.entity.DefaultValue?.toString() ?? "0"}">
                </ueb-input>
            </div>
        `
    }
}
