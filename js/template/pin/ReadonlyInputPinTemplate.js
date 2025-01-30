import { html } from "lit"
import PinTemplate from "./PinTemplate.js"

/** @extends PinTemplate<StringEntity> */
export default class ReadonlyNamePinTemplate extends PinTemplate {

    setDefaultValue(values = [], rawValues = values) {
    }

    renderInput() {
        return html`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input contenteditable="false" .singleLine="${true}" .selectOnFocus="${false}"
                    .innerText="${this.element.entity.PinName.toString()}">
                </ueb-input>
            </div>
        `
    }
}
