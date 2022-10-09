import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"
import INumericPinTemplate from "./INumericPinTemplate"
import Utility from "../Utility"

/**
 * @template {Number} T
 * @extends INumericPinTemplate<T>
 */
export default class RealPinTemplate extends INumericPinTemplate {

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values[0])
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <div class="ueb-pin-input">
                    <span class="ueb-pin-input-content" role="textbox" contenteditable="true"
                        .innerText="${
                            IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.entity.DefaultValue))
                        }"></span>
                </div>
            `
        }
        return html``
    }
}
