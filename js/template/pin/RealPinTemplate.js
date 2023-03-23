import { html } from "lit"
import INumericPinTemplate from "./INumericPinTemplate.js"
import Utility from "../../Utility.js"

/**
 * @template {Number} T
 * @extends INumericPinTemplate<T>
 */
export default class RealPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0])
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${true}"
                    .innerText="${Utility.minDecimals(this.element.getDefaultValue() ?? 0)}">
                </ueb-input>
            </div>
        `
    }
}
