import { html } from "lit"
import Utility from "../../Utility.js"
import INumericPinTemplate from "./INumericPinTemplate.js"
import Vector4DEntity from "../../entity/Vector4DEntity.js"

/** @extends INumericPinTemplate<Vector4DEntity> */
export default class Vector4DPinTemplate extends INumericPinTemplate {

    #getX() {
        return Utility.printNumber(this.element.getDefaultValue()?.X ?? 0)
    }

    #getY() {
        return Utility.printNumber(this.element.getDefaultValue()?.Y ?? 0)
    }

    #getZ() {
        return Utility.printNumber(this.element.getDefaultValue()?.Z ?? 0)
    }

    #getW() {
        return Utility.printNumber(this.element.getDefaultValue()?.W ?? 0)
    }

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values, rawValues) {
        const vector = this.element.getDefaultValue(true)
        if (!(vector instanceof Vector4DEntity)) {
            throw new TypeError("Expected DefaultValue to be a Vector4DEntity")
        }
        vector.X = values[0]
        vector.Y = values[1]
        vector.Z = values[2]
        vector.W = values[3]
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
                <span class="ueb-pin-input-label">W</span>
                <div class="ueb-pin-input">
                    <ueb-input .singleLine="${true}" .innerText="${this.#getW()}"></ueb-input>
                </div>
            </div>
        `
    }
}
