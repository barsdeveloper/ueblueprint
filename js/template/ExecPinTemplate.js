// @ts-check

import html from "./html"
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
            <svg class="ueb-pin-icon-exec" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.08a2 2 0 0 0 1.519-.698l4.843-5.651a1 1 0 0 0 0-1.302L10.6 1.7A2 2 0 0 0 9.08 1H2zm7.08 1a1 1 0 0 1 .76.35L14.682 8l-4.844 5.65a1 1 0 0 1-.759.35H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7.08z"/>
            </svg>
        `
    }
}
