import { html } from "lit"
import IInputPinTemplate from "./IInputPinTemplate"
import INumericPinTemplate from "./INumericPinTemplate"
import Utility from "../Utility"
import VectorEntity from "../entity/VectorEntity"

/** @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity */

/**
 * @template {VectorEntity} T
 * @extends INumericPinTemplate<T>
 */
export default class VectorPinTemplate extends INumericPinTemplate {

    /**
     * @param {Number[]} values
     * @param {String[]} rawValues
     */
    setDefaultValue(values, rawValues) {
        if (!(this.element.entity.DefaultValue instanceof VectorEntity)) {
            throw new TypeError("Expected DefaultValue to be a VectorEntity")
        }
        let vector = this.element.entity.DefaultValue
        vector.X = values[0]
        vector.Y = values[1]
        vector.Z = values[2]
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <div class="ueb-pin-input-wrapper">
                    <span class="ueb-pin-input-label">X</span>
                    <div class="ueb-pin-input">
                        <ueb-input .singleLine="${true}"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.entity.getDefaultValue().X))}">
                        </ueb-input>
                    </div>
                    <span class="ueb-pin-input-label">Y</span>
                    <div class="ueb-pin-input">
                        <ueb-input .singleLine="${true}"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.entity.getDefaultValue().Y))}">
                        </ueb-input>
                    </div>
                    <span class="ueb-pin-input-label">Z</span>
                    <div class="ueb-pin-input">
                        <ueb-input .singleLine="${true}"
                            .innerText="${IInputPinTemplate.stringFromUEToInput(Utility.minDecimals(this.element.entity.getDefaultValue().Z))}">
                        </ueb-input>
                    </div>
                </div>
            `
        }
        return html``
    }
}
