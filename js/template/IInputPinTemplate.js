import { html } from "lit"
import MouseIgnore from "../input/mouse/MouseIgnore"
import PinTemplate from "./PinTemplate"

/**
 * @template T
 * @typedef {import("../element/PinElement").default<T>} PinElement
 */

/**
 * @template T
 * @extends PinTemplate<T>
 */
export default class IInputPinTemplate extends PinTemplate {

    /** @type {HTMLElement[]} */
    #inputContentElements
    get inputContentElements() {
        return this.#inputContentElements
    }

    /** @param {String} value */
    static stringFromInputToUE(value) {
        return value
            .replace(/(?=\n\s*)\n$/, "") // Remove trailing double newline
            .replaceAll("\n", "\\r\n") // Replace newline with \r\n (default newline in UE)
    }

    /** @param {String} value */
    static stringFromUEToInput(value) {
        return value
            .replaceAll(/(?:\r|(?<=(?:^|[^\\])(?:\\\\)*)\\r)(?=\n)/g, "") // Remove \r leftover from \r\n
            .replace(/(?<=\n\s*)$/, "\n") // Put back trailing double newline
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#inputContentElements = /** @type {HTMLElement[]} */([...this.element.querySelectorAll(".ueb-pin-input-content")])
        if (this.#inputContentElements.length) {
            this.setInputs(this.getInputs(), false)
            let self = this
            this.onFocusHandler = _ => this.element.blueprint.dispatchEditTextEvent(true)
            this.onFocusOutHandler = e => {
                e.preventDefault()
                document.getSelection()?.removeAllRanges() // Deselect text inside the input
                self.setInputs(this.getInputs(), true)
                this.element.blueprint.dispatchEditTextEvent(false)
            }
            this.#inputContentElements.forEach(element => {
                element.addEventListener("focus", this.onFocusHandler)
                element.addEventListener("focusout", this.onFocusOutHandler)
            })
        }
    }

    cleanup() {
        super.cleanup()
        this.#inputContentElements.forEach(element => {
            element.removeEventListener("focus", this.onFocusHandler)
            element.removeEventListener("focusout", this.onFocusOutHandler)
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            ...this.#inputContentElements.map(elem => new MouseIgnore(elem, this.element.blueprint))
        ]
    }

    getInput() {
        return this.getInputs().reduce((acc, cur) => acc + cur, "")
    }

    getInputs() {
        return this.#inputContentElements.map(element =>
            // Faster than innerText which causes reflow
            element.innerHTML
                .replaceAll("&nbsp;", "\u00A0")
                .replaceAll("<br>", "\n")
        )
    }

    /** @param {String[]?} values */
    setInputs(values = [], updateDefaultValue = true) {
        this.#inputContentElements.forEach(
            (elem, i) => elem.innerText = values[i]
        )
        if (updateDefaultValue) {
            this.setDefaultValue(values.map(v => IInputPinTemplate.stringFromInputToUE(v)), values)
        }
    }

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(values.reduce((acc, cur) => acc + cur, ""))
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <div class="ueb-pin-input">
                    <span class="ueb-pin-input-content" role="textbox" contenteditable="true"
                        .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.DefaultValue.toString())}"></span>
                </div>
            `
        }
        return html``
    }
}
