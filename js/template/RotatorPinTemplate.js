import { html } from "lit"
import RotatorEntity from "../entity/RotatorEntity"
import IInputPinTemplate from "./IInputPinTemplate"
import RealPinTemplate from "./RealPinTemplate"

export default class RotatorPinTemplate extends RealPinTemplate {

    setDefaultValue(pin, values = [], rawValues = values) {
        if (!(pin.entity.DefaultValue instanceof RotatorEntity)) {
            throw new TypeError("Expected DefaultValue to be a VectorEntity")
        }
        let rotator = pin.entity.DefaultValue
        rotator.R = values[0] // Roll
        rotator.P = values[1] // Pitch
        rotator.Y = values[2] // Yaw
    }

    /** @param {PinElement} pin */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <div class="ueb-pin-input-wrapper">
                    <span class="ueb-pin-input-label">X</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-x" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(pin.entity.getDefaultValue().R.toString())}"></span>
                    </div>
                    <span class="ueb-pin-input-label">Y</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-y" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(pin.entity.getDefaultValue().P.toString())}"></span>
                    </div>
                    <span class="ueb-pin-input-label">Z</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-z" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(pin.entity.getDefaultValue().Y.toString())}"></span>
                    </div>
                </div>
            `
        }
        return html``
    }
}
