import { html } from "lit"
import NumberEntity from "../../entity/NumberEntity.js"
import VectorEntity from "../../entity/VectorEntity.js"
import INumericPinTemplate from "./INumericPinTemplate.js"

/** @extends INumericPinTemplate<VectorEntity> */
export default class VectorPinTemplate extends INumericPinTemplate {

    #getX() {
        return NumberEntity.printNumber(this.element.getDefaultValue()?.X.valueOf() ?? 0)
    }

    #getY() {
        return NumberEntity.printNumber(this.element.getDefaultValue()?.Y.valueOf() ?? 0)
    }

    #getZ() {
        return NumberEntity.printNumber(this.element.getDefaultValue()?.Z.valueOf() ?? 0)
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
        vector.X.value = values[0]
        vector.Y.value = values[1]
        vector.Z.value = values[2]
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
