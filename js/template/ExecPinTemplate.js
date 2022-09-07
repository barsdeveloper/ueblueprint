import { html } from "lit"
import PinTemplate from "./PinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class ExecPinTemplate extends PinTemplate {

    /**
     * @param {PinElement} pin
     */
    renderIcon(pin) {
        return html`
            <svg viewBox="-2 0 16 16">
                <path class="ueb-pin-tofill" stroke-width="1.25" stroke="white"
                    d="M 2 1 a 2 2 0 0 0 -2 2 v 10 a 2 2 0 0 0 2 2 h 4 a 2 2 0 0 0 1.519 -0.698 l 4.843 -5.651 a 1 1 0 0 0 0 -1.302 L 7.52 1.7 a 2 2 0 0 0 -1.519 -0.698 z"
                />
            </svg>
        `
    }
}
