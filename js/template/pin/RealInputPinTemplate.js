import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"
import INumericPinTemplate from "./INumericInputPinTemplate"
import Utility from "../../Utility"

/**
 * @template {Number} T
 * @extends INumericPinTemplate<T>
 */
export default class RealInputPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0])
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${true}"
                    .innerText="${IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.entity.DefaultValue ?? 0))}">
                </ueb-input>
            </div>
        `
    }
}
