import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"
import Utility from "../Utility"

/**
 * @typedef {import("../entity/VectorEntity").default} VectorEntity
 */
/**
 * @template T
 * @typedef {import("../element/PinElement").default<T>} PinElement
 */

/**
 * @template {Number} T
 * @extends IInputPinTemplate<T>
 */
export default class RealPinTemplate extends IInputPinTemplate {

    /** @param {String[]} values */
    setInputs(values = [], updateDefaultValue = false) {
        if (!values || values.length == 0) {
            values = [this.getInput()]
        }
        let parsedValues = []
        for (let i = 0; i < values.length; ++i) {
            let num = parseFloat(values[i])
            if (isNaN(num)) {
                num = 0
                updateDefaultValue = false
            }
            parsedValues.push(num)
        }
        super.setInputs(values, false)
        this.setDefaultValue(parsedValues, values)
    }

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
