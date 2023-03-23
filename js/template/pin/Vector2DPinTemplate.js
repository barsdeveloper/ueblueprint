import { html } from "lit"
import INumericPinTemplate from "./INumericPinTemplate.js"
import Utility from "../../Utility.js"
import Vector2DEntity from "../../entity/Vector2DEntity.js"

/**
 * @extends INumericPinTemplate<Vector2DEntity>
 */
export default class VectorInputPinTemplate extends INumericPinTemplate {

    #getX() {
        return Utility.minDecimals(this.element.getDefaultValue()?.X ?? 0)
    }

    #getY() {
        return Utility.minDecimals(this.element.getDefaultValue()?.Y ?? 0)
    }

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values, rawValues) {
        const vector = this.element.getDefaultValue(true)
        if (!(vector instanceof Vector2DEntity)) {
            throw new TypeError("Expected DefaultValue to be a Vector2DEntity")
        }
        vector.X = values[0]
        vector.Y = values[1]
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
            </div>
        `
    }
}
