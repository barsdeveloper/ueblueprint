// @ts-check

import html from "./html"
import PinTemplate from "./PinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */
export default class StringPinTemplate extends PinTemplate {

    hasInput() {
        return true
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        const stopEventPropagation = "e => stopPropagation()"
        return html`
            <span class="ueb-pin-input">
                <span class="ueb-pin-input-content" role="textbox" contenteditable="true"
                    onfocus="this.closest('ueb-blueprint')?.dispatchEditTextEvent(true)"
                    onfocusout="this.closest('ueb-blueprint')?.dispatchEditTextEvent(false)"
                ></span>
            </span>
        `
    }
}
