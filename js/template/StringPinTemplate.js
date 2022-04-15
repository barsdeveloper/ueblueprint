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
        return html`
            <div class="ueb-pin-input">
                <div class="ueb-pin-input-content" role="textbox" contenteditable="true"></div>
            </div>
        `
    }

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin)
        const input = pin.querySelector(".ueb-pin-input-content")
        if (input) {
            this.onFocusHandler = () => {
                pin.blueprint.dispatchEditTextEvent(true)
            }
            this.onFocusOutHandler = () => {
                pin.blueprint.dispatchEditTextEvent(false)
                document.getSelection().removeAllRanges() // Deselect text inside the input
            }
            input.addEventListener("onfocus", this.onFocusHandler)
            input.addEventListener("onfocusout", this.onFocusOutHandler)
        }
    }

    /**
     * @param {PinElement} pin
     */
    cleanup(pin) {
        super.cleanup(pin)
        pin.blueprint.removeEventListener("onfocus", this.onFocusHandler)
        pin.blueprint.removeEventListener("onfocusout", this.onFocusOutHandler)
    }
}
