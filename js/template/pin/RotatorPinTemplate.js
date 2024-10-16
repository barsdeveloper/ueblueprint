import { html } from "lit"
import NumberEntity from "../../entity/NumberEntity.js"
import RotatorEntity from "../../entity/RotatorEntity.js"
import INumericPinTemplate from "./INumericPinTemplate.js"

/** @extends INumericPinTemplate<RotatorEntity> */
export default class RotatorPinTemplate extends INumericPinTemplate {

    #getR() {
        return NumberEntity.printNumber(this.element.getDefaultValue()?.R.valueOf() ?? 0)
    }

    #getP() {
        return NumberEntity.printNumber(this.element.getDefaultValue()?.P.valueOf() ?? 0)
    }

    #getY() {
        return NumberEntity.printNumber(this.element.getDefaultValue()?.Y.valueOf() ?? 0)
    }

    setDefaultValue(values = [], rawValues = values) {
        const rotator = this.element.getDefaultValue(true)
        if (!(rotator instanceof RotatorEntity)) {
            throw new TypeError("Expected DefaultValue to be a RotatorEntity")
        }
        rotator.R.value = values[0] // Roll
        rotator.P.value = values[1] // Pitch
        rotator.Y.value = values[2] // Yaw
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
