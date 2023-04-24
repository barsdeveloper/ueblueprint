import { html } from "lit"
import Configuration from "../../Configuration.js"
import PinTemplate from "./PinTemplate.js"
import Utility from "../../Utility.js"

/** @typedef {import("lit").PropertyValues} PropertyValues */

/**
 * @template T
 * @extends PinTemplate<T>
 */
export default class IInputPinTemplate extends PinTemplate {

    static singleLineInput = false
    static selectOnFocus = true
    static saveEachInputChange = false // Otherwise save only on focus out

    /** @type {HTMLElement} */
    #inputWrapper
    get inputWrapper() {
        return this.#inputWrapper
    }

    /** @type {HTMLElement[]} */
    #inputContentElements

    /** @param {String} value */
    static stringFromInputToUE(value) {
        return value
            .replace(/(?=\n\s*)\n$/, "") // Remove trailing double newline
    }

    /** @param {String} value */
    static stringFromUEToInput(value) {
        return value
            .replaceAll(/(?:\r|(?<=(?:^|[^\\])(?:\\\\)*)\\r)(?=\n)/g, "") // Remove \r leftover from \r\n
            .replace(/(?<=\n\s*)$/, "\n") // Put back trailing double newline
    }

    #setInput = () => this.setInputs(this.getInputs(), true)
    /** @param {Event} event */
    #onInputCheckWrapHandler = event => this.#updateWrapClass(/** @type {HTMLElement} */(event.target))

    /** @param {HTMLElement}  inputElement*/
    #updateWrapClass(inputElement) {
        const width = this.blueprint.scaleCorrect(this.#inputWrapper.getBoundingClientRect().width) + this.nameWidth
        const inputWrapped = this.element.classList.contains("ueb-pin-input-wrap")
        if (!inputWrapped && width > Configuration.pinInputWrapWidth) {
            this.element.classList.add("ueb-pin-input-wrap")
        } else if (inputWrapped && width <= Configuration.pinInputWrapWidth) {
            this.element.classList.remove("ueb-pin-input-wrap")
        }
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        if (/** @type {typeof IInputPinTemplate} */(this.constructor).canWrapInput) {
            this.element.addEventListener("input", this.#onInputCheckWrapHandler)
            this.nameWidth = this.blueprint.scaleCorrect(
                this.element.querySelector(".ueb-pin-name").getBoundingClientRect().width
            )
        }
        this.#inputWrapper = this.element.querySelector(".ueb-pin-input-wrapper")
        this.#inputContentElements = /** @type {HTMLElement[]} */([...this.element.querySelectorAll("ueb-input")])
    }

    setup() {
        super.setup()
        const Self = /** @type {typeof IInputPinTemplate} */(this.constructor)
        if (Self.saveEachInputChange) {
            this.element.addEventListener("input", this.#setInput)
        } else {
            this.element.addEventListener("focusout", this.#setInput)
        }
        if (/** @type {typeof IInputPinTemplate} */(this.constructor).canWrapInput) {
            this.element.addEventListener("input", this.#onInputCheckWrapHandler)
        }
    }

    cleanup() {
        super.cleanup()
        this.element.removeEventListener("input", this.#onInputCheckWrapHandler)
        this.element.removeEventListener("input", this.#setInput)
        this.element.removeEventListener("focusout", this.#setInput)

    }

    getInput() {
        return this.getInputs().reduce((acc, cur) => acc + cur, "")
    }

    getInputs() {
        return this.#inputContentElements.map(element =>
            // Faster than innerText which causes reflow
            Utility.clearHTMLWhitespace(element.innerHTML)
        )
    }

    /** @param {String[]} values */
    setInputs(values = [], updateDefaultValue = true) {
        this.#inputContentElements.forEach(/** @type {typeof IInputPinTemplate } */(this.constructor).singleLineInput
            ? (elem, i) => elem.innerText = values[i]
            : (elem, i) => elem.innerText = values[i].replaceAll("\n", "")
        )
        if (updateDefaultValue) {
            this.setDefaultValue(values.map(v => IInputPinTemplate.stringFromInputToUE(v)), values)
        }
        this.element.requestUpdate()
        this.element.nodeElement.acknowledgeReflow()
    }

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(
            // @ts-expect-error
            values.join("")
        )
    }

    renderInput() {
        const Self = /** @type {typeof IInputPinTemplate} */(this.constructor)
        const singleLine = Self.singleLineInput
        const selectOnFocus = Self.selectOnFocus
        return html`
            <div class="ueb-pin-input-wrapper ueb-pin-input">
                <ueb-input .singleLine="${singleLine}" .selectOnFocus="${selectOnFocus}"
                    .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.getDefaultValue()?.toString() ?? "")}">
                </ueb-input>
            </div>
        `
    }
}
