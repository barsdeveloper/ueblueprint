// @ts-check

import html from "./html"
import MouseIgnore from "../input/mouse/MouseIgnore"
import PinTemplate from "./PinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class StringPinTemplate extends PinTemplate {

    /** @type {HTMLElement} */
    input = null

    hasInput() {
        return true
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        return html`
            <div class="ueb-pin-input">
                <div class="ueb-pin-input-content" role="textbox" contenteditable="true" onfocusout="e => document.getSelection().removeAllRanges()"></div>
            </div>
        `
    }

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin)
        if (this.input = pin.querySelector(".ueb-pin-input-content")) {
            this.onFocusHandler = (e) => {
                pin.blueprint.dispatchEditTextEvent(true)
            }
            this.onFocusOutHandler = (e) => {
                e.preventDefault()
                document.getSelection().removeAllRanges() // Deselect text inside the input
                pin.blueprint.dispatchEditTextEvent(false)
            }
            this.input.addEventListener("focus", this.onFocusHandler)
            this.input.addEventListener("focusout", this.onFocusOutHandler)
        }
    }

    /**
     * @param {PinElement} pin
     */
    cleanup(pin) {
        super.cleanup(pin)
        if (this.input) {
            this.input.removeEventListener("focus", this.onFocusHandler)
            this.input.removeEventListener("focusout", this.onFocusOutHandler)
        }
    }

    /**
     * @param {PinElement} pin
     */
    createInputObjects(pin) {
        if (pin.isInput()) {
            return [
                ...super.createInputObjects(pin),
                new MouseIgnore(pin.querySelector(".ueb-pin-input-content"), pin.blueprint),
            ]
        }
        return super.createInputObjects(pin)
    }
}
