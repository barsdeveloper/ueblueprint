import { html } from "lit"
import INumericPinTemplate from "./INumericPinTemplate.js"
import IntegerEntity from "../../entity/IntegerEntity.js"

/** @extends INumericPinTemplate<IntegerEntity> */
export default class IntPinTemplate extends INumericPinTemplate {

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values = [], rawValues) {
        this.element.setDefaultValue(new IntegerEntity(values[0]))
        this.element.requestUpdate()
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${true}" .innerText="${this.element.getDefaultValue()?.serialize() ?? "0"}">
                </ueb-input>
            </div>
        `
    }
}
