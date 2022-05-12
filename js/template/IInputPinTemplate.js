// @ts-check

import html from "./html"
import MouseIgnore from "../input/mouse/MouseIgnore"
import PinTemplate from "./PinTemplate"
import Utility from "../Utility"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class IInputPinTemplate extends PinTemplate {

    /** @type {HTMLElement[]} */
    #inputContentElements
    get inputContentElements() {
        return this.#inputContentElements
    }

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin)
        this.#inputContentElements = /** @type {HTMLElement[]} */(
            [...pin.querySelectorAll(".ueb-pin-input-content")]
        )
        if (this.#inputContentElements.length) {
            this.setInputs(pin, [
                Utility.decodeInputString(/** @type {String} */(pin.entity.DefaultValue))
            ])
            let self = this
            this.onFocusHandler = _ => pin.blueprint.dispatchEditTextEvent(true)
            this.onFocusOutHandler = e => {
                e.preventDefault()
                document.getSelection().removeAllRanges() // Deselect text inside the input
                self.setInputs(pin, this.getInputs(pin))
                pin.blueprint.dispatchEditTextEvent(false)
            }
            this.#inputContentElements.forEach(element => {
                element.addEventListener("focus", this.onFocusHandler)
                element.addEventListener("focusout", this.onFocusOutHandler)
            })
        }
    }

    /**
     * @param {PinElement} pin
     */
    cleanup(pin) {
        super.cleanup(pin)
        this.#inputContentElements.forEach(element => {
            element.removeEventListener("focus", this.onFocusHandler)
            element.removeEventListener("focusout", this.onFocusOutHandler)
        })
    }

    /**
     * @param {PinElement} pin
     */
    createInputObjects(pin) {
        return [
            ...super.createInputObjects(pin),
            ...this.#inputContentElements.map(element => new MouseIgnore(element, pin.blueprint))
        ]
    }

    /**
     * @param {PinElement} pin
     */
    getInput(pin) {
        return this.getInputs(pin).reduce((acc, cur) => acc + cur, "")
    }

    /**
     * @param {PinElement} pin
     */
    getInputs(pin) {
        return this.#inputContentElements.map(element =>
            // Faster than innerText which causes reflow
            element.innerHTML.replaceAll("<br>", "\n"))
    }

    /**
     * @param {PinElement} pin
     * @param {String[]?} values
     */
    setInputs(pin, values = [], updateDefaultValue = true) {
        this.#inputContentElements.forEach((element, i) => element.innerText = values[i])
        if (updateDefaultValue) {
            pin.entity.DefaultValue = this.getInput(pin)
        }
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <div class="ueb-pin-input">
                    <span class="ueb-pin-input-content" role="textbox" contenteditable="true"></span>
                </div>
            `
        }
        return ""
    }
}
