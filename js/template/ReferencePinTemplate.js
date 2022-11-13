import { html } from "lit"
import PinTemplate from "./PinTemplate"

export default class ReferencePinTemplate extends PinTemplate {

    renderIcon() {
        return html`
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="ueb-pin-icon">
                <polygon class="ueb-pin-tofill" points="4 16 16 4 28 16 16 28" stroke="currentColor" stroke-width="5" />
            </svg>
        `
    }
}
