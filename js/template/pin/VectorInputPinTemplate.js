import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"
import INumericPinTemplate from "./INumericInputPinTemplate"
import Utility from "../../Utility"
import VectorEntity from "../../entity/VectorEntity"

/** @typedef {import("../../entity/LinearColorEntity").default} LinearColorEntity */

/**
 * @extends INumericPinTemplate<VectorEntity>
 */
export default class VectorInputPinTemplate extends INumericPinTemplate {

    #getX() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.X ?? 0))
    }

    #getY() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.Y ?? 0))
    }

    #getZ() {
        return IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.getDefaultValue()?.Z ?? 0))
    }

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values, rawValues) {
        const vector = this.element.getDefaultValue(true)
        if (!(vector instanceof VectorEntity)) {
            throw new TypeError("Expected DefaultValue to be a VectorEntity")
        }
        vector.X = values[0]
        vector.Y = values[1]
        vector.Z = values[2]
        this.element.requestUpdate("DefaultValue", vector)
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input-wrapper">
                <span class="ueb-pin-input-label">X</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getX()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Y</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getY()}"></ueb-input>
                </div>
                <span class="ueb-pin-input-label">Z</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getZ()}"></ueb-input>
                </div>
            </div>
        `
    }
}
