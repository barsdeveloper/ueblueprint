import { html } from "lit"
import Configuration from "../../Configuration.js"
import MouseIgnore from "../../input/mouse/MouseIgnore.js"
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

    #onFocusOutHandler = () => this.setInputs(this.getInputs(), true)
    /** @param {InputEvent} event */
    #onInputCheckWrapHandler = event => this.#updateWrapClass(/** @type {HTMLElement} */(event.target))

    /** @param {HTMLElement}  inputElement*/
    #updateWrapClass(inputElement) {
        const width = this.blueprint.scaleCorrect(inputElement.getBoundingClientRect().width) + this.nameWidth
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
        this.#inputContentElements = /** @type {HTMLElement[]} */([...this.element.querySelectorAll("ueb-input")])
        if (/** @type {typeof IInputPinTemplate} */(this.constructor).canWrapInput) {
            this.nameWidth = this.blueprint.scaleCorrect(
                this.element.querySelector(".ueb-pin-name").getBoundingClientRect().width
            )
            this.inputContentElements.forEach(inputElement => this.#updateWrapClass(inputElement))
        }
    }

    setup() {
        super.setup()
        this.#inputContentElements.forEach(element => {
            element.addEventListener("focusout", this.#onFocusOutHandler)
            if (/** @type {typeof IInputPinTemplate} */(this.constructor).canWrapInput) {
                element.addEventListener("input", this.#onInputCheckWrapHandler)
            }
        })
    }

    cleanup() {
        super.cleanup()
        this.#inputContentElements.forEach(element => {
            element.removeEventListener("focusout", this.#onFocusOutHandler)
            element.removeEventListener("input", this.#onInputCheckWrapHandler)
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            ...this.#inputContentElements.map(elem => new MouseIgnore(elem, this.blueprint)),
        ]
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
        this.element.addNextUpdatedCallbacks(() => this.element.nodeElement.acknowledgeReflow())
    }

    setDefaultValue(values = [], rawValues = values) {
        this.element.setDefaultValue(
            // @ts-expect-error
            values.join("")
        )
    }

    renderInput() {
        const singleLine = /** @type {typeof IInputPinTemplate} */(this.constructor).singleLineInput
        const selectOnFocus = /** @type {typeof IInputPinTemplate} */(this.constructor).selectOnFocus
        return html`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${singleLine}" .selectOnFocus="${selectOnFocus}"
                    .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.getDefaultValue()?.toString() ?? "")}">
                </ueb-input>
            </div>
        `
    }
}
