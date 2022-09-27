import { html } from "lit"
import VectorEntity from "../entity/VectorEntity"
import IInputPinTemplate from "./IInputPinTemplate"
import RealPinTemplate from "./RealPinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity}
 */

export default class VectorPinTemplate extends RealPinTemplate {

    setDefaultValue(pin, values = [], rawValues = values) {
        if (!(pin.entity.DefaultValue instanceof VectorEntity)) {
            throw new TypeError("Expected DefaultValue to be a VectorEntity")
        }
        let vector = pin.entity.DefaultValue
        vector.X = values[0]
        vector.Y = values[1]
        vector.Z = values[2]
    }

    /** @param {PinElement} pin */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <div class="ueb-pin-input-wrapper">
                    <span class="ueb-pin-input-label">X</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-x" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(pin.entity.getDefaultValue().X.toString())}"></span>
                    </div>
                    <span class="ueb-pin-input-label">Y</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-y" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(pin.entity.getDefaultValue().Y.toString())}"></span>
                    </div>
                    <span class="ueb-pin-input-label">Z</span>
                    <div class="ueb-pin-input">
                        <span class="ueb-pin-input-content ueb-pin-input-z" role="textbox" contenteditable="true"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(pin.entity.getDefaultValue().Z.toString())}"></span>
                    </div>
                </div>
            `
        }
        return html``
    }
}
