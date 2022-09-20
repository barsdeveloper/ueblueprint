import { html } from "lit"
import MouseIgnore from "../input/mouse/MouseIgnore"
import PinTemplate from "./PinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class IInputPinTemplate extends PinTemplate {

    /** @type {HTMLElement[]} */
    #inputContentElements
    get inputContentElements() {
        return this.#inputContentElements
    }

    static stringFromInputToUE(value) {
        return value
            .replace(/(?=\n\s*)\n$/, "") // Remove trailing double newline
            .replaceAll("\n", "\\r\n") // Replace newline with \r\n (default newline in UE)
    }

    static stringFromUEToInput(value) {
        return value
            .replaceAll(/(?:\r|(?<=(?:^|[^\\])(?:\\\\)*)\\r)(?=\n)/g, "") // Remove \r leftover from \r\n
            .replace(/(?<=\n\s*)$/, "\n") // Put back trailing double newline
    }

    /**
     * @param {PinElement} pin
     * @param {Map} changedProperties
     */
    firstUpdated(pin, changedProperties) {
        super.firstUpdated(pin, changedProperties)
        this.#inputContentElements = [...pin.querySelectorAll(".ueb-pin-input-content")]
        if (this.#inputContentElements.length) {
            this.setInputs(pin, this.getInputs(pin))
            let self = this
            this.onFocusHandler = _ => pin.blueprint.dispatchEditTextEvent(true)
            this.onFocusOutHandler = e => {
                e.preventDefault()
                document.getSelection()?.removeAllRanges() // Deselect text inside the input
                self.setInputs(pin, this.getInputs(pin))
                pin.blueprint.dispatchEditTextEvent(false)
            }
            this.#inputContentElements.forEach(element => {
                element.addEventListener("focus", this.onFocusHandler)
                element.addEventListener("focusout", this.onFocusOutHandler)
            })
        }
    }

    /** @param {PinElement} pin */
    cleanup(pin) {
        super.cleanup(pin)
        this.#inputContentElements.forEach(element => {
            element.removeEventListener("focus", this.onFocusHandler)
            element.removeEventListener("focusout", this.onFocusOutHandler)
        })
    }

    /** @param {PinElement} pin */
    createInputObjects(pin) {
        return [
            ...super.createInputObjects(pin),
            ...this.#inputContentElements.map(element => new MouseIgnore(element, pin.blueprint))
        ]
    }

    /** @param {PinElement} pin */
    getInput(pin) {
        return this.getInputs(pin).reduce((acc, cur) => acc + cur, "")
    }

    /** @param {PinElement} pin */
    getInputs(pin) {
        return this.#inputContentElements.map(element =>
            // Faster than innerText which causes reflow
            element.innerHTML
                .replaceAll("&nbsp;", "\u00A0")
                .replaceAll("<br>", "\n")
        )
    }

    /**
     * @param {PinElement} pin
     * @param {String[]?} values
     */
    setInputs(pin, values = [], updateDefaultValue = true) {
        this.#inputContentElements.forEach(
            (element, i) => element.innerText = values[i]
        )
        if (updateDefaultValue) {
            pin.setDefaultValue(values
                .map(v => IInputPinTemplate.stringFromInputToUE(v)) // Double newline at the end of a contenteditable element
                .reduce((acc, cur) => acc + cur, ""))
        }
    }

    /** @param {PinElement} pin */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <div class="ueb-pin-input">
                    <span class="ueb-pin-input-content" role="textbox" contenteditable="true"
                        .innerText="${IInputPinTemplate.stringFromUEToInput(pin.unreactiveDefaultValue.toString())}"></span>
                </div>
            `
        }
        return html``
    }
}
