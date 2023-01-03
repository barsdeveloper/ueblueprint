import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"
import INumericPinTemplate from "./INumericInputPinTemplate"
import RotatorEntity from "../../entity/RotatorEntity"
import Utility from "../../Utility"

/** @typedef {import("../../entity/RotatorEntity").default} Rotator */

/** @extends INumericPinTemplate<Rotator> */
export default class RotatorPinTemplate extends INumericPinTemplate {

    #getR() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.R ?? 0))
    }

    #getP() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.P ?? 0))
    }

    #getY() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.Y ?? 0))
    }

    setDefaultValue(values = [], rawValues = values) {
        const rotator = this.element.getDefaultValue(true)
        if (!(rotator instanceof RotatorEntity)) {
            throw new TypeError("Expected DefaultValue to be a RotatorEntity")
        }
        rotator.R = values[0] // Roll
        rotator.P = values[1] // Pitch
        rotator.Y = values[2] // Yaw
        this.element.requestUpdate("DefaultValue", rotator)
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input-wrapper">
                <span class="ueb-pin-input-label">X</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getR()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Y</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getP()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Z</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getY()}"></ueb-input>
                </div>
            </div>
        `
    }
}
