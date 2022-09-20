import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"
import RealPinTemplate from "./RealPinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity}
 */

export default class VectorPinTemplate extends RealPinTemplate {

    /**
     * @param {PinElement} pin
     * @param {String[]?} values
     */
    setInputs(pin, values = [], updateDefaultValue = true) {
        this.inputContentElements.forEach(
            (element, i) => element.innerText = values[i]
        )
        if (updateDefaultValue) {
            pin.setDefaultValue(values
                .map(v => IInputPinTemplate.stringFromInputToUE(v)) // Double newline at the end of a contenteditable element
                .reduce((acc, cur) => acc + cur, ""))
        }
    }

    /** @param {PinElement} pin */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
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
            `
        }
        return html``
    }
}
