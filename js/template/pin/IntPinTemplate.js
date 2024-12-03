import { html } from "lit"
import INumericPinTemplate from "./INumericPinTemplate.js"
import IntegerEntity from "../../entity/IntegerEntity.js"

/** @extends INumericPinTemplate<IntegerEntity> */
export default class IntPinTemplate extends INumericPinTemplate {

    renderInput() {
        return html`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${true}" .innerText="${this.element.getDefaultValue()?.toString() ?? "0"}">
                </ueb-input>
            </div>
        `
    }
}
