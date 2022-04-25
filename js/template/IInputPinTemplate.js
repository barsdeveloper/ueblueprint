// @ts-check

import html from "./html"
import MouseIgnore from "../input/mouse/MouseIgnore"
import PinTemplate from "./PinTemplate"
import sanitizeText from "./sanitizeText"
import Utility from "../Utility"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class IInputPinTemplate extends PinTemplate {

    /** @type {HTMLElement} */
    input = null
    hasInput = true

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin)
        if (this.input = pin.querySelector(".ueb-pin-input-content")) {
            let self = this
            this.onFocusHandler = (e) => {
                pin.blueprint.dispatchEditTextEvent(true)
            }
            this.onFocusOutHandler = (e) => {
                e.preventDefault()
                document.getSelection().removeAllRanges() // Deselect text inside the input
                self.acceptInput(pin)
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

    /**
     * @param {PinElement} pin
     */
    getInput(pin) {
        return Utility.sanitizeString(
            /** @type {HTMLElement} */(pin.querySelector(".ueb-pin-input-content")).innerText
        )
    }

    /**
     * @param {PinElement} pin
     */
    acceptInput(pin) {
        pin.entity.DefaultValue = this.getInput(pin)
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <div class="ueb-pin-input">
                    <div class="ueb-pin-input-content" role="textbox" contenteditable="true">
                        ${Utility.renderInputString(sanitizeText(pin.entity.getDefaultValue()))}
                    </div>
                </div>
            `
        }
        return ""
    }
}
