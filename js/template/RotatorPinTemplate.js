import { html } from "lit"
import RotatorEntity from "../entity/RotatorEntity"
import IInputPinTemplate from "./IInputPinTemplate"
import RealPinTemplate from "./RealPinTemplate"

/** @typedef {import("../entity/RotatorEntity").default} Rotator */

/** @extends IInputPinTemplate<Rotator> */
export default class RotatorPinTemplate extends IInputPinTemplate {

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
        if (!(this.element.entity.DefaultValue instanceof RotatorEntity)) {
            throw new TypeError("Expected DefaultValue to be a VectorEntity")
        }
        let rotator = this.element.entity.DefaultValue
        rotator.R = values[0] // Roll
        rotator.P = values[1] // Pitch
        rotator.Y = values[2] // Yaw
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <div class="ueb-pin-input-wrapper">
                    <span class="ueb-pin-input-label">X</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-x" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.getDefaultValue().R.toString())}"></span>
                    </div>
                    <span class="ueb-pin-input-label">Y</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-y" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.getDefaultValue().P.toString())}"></span>
                    </div>
                    <span class="ueb-pin-input-label">Z</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-z" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.getDefaultValue().Y.toString())}"></span>
                    </div>
                </div>
            `
        }
        return html``
    }
}
