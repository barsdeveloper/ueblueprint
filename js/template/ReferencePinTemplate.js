import { html } from "lit"
import PinTemplate from "./PinTemplate"

export default class ReferencePinTemplate extends PinTemplate {

    /** @param {PinElement} pin */
    renderIcon(pin) {
        return html`
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <polygon class="ueb-pin-tofill" points="4 16 16 4 28 16 16 28" stroke="currentColor" stroke-width="5" />
            </svg>
        `
    }
}