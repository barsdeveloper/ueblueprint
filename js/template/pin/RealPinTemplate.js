import { html } from "lit"
import NumberEntity from "../../entity/NumberEntity.js"
import INumericPinTemplate from "./INumericPinTemplate.js"

/**
 * @template {NumberEntity} T
 * @extends INumericPinTemplate<T>
 */
export default class RealPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0])
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${true}"
                    .innerText="${NumberEntity.printNumber(this.element.getDefaultValue()?.valueOf() ?? 0)}">
                </ueb-input>
            </div>
        `
    }
}
