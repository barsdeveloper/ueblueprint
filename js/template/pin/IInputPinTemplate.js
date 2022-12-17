import { html } from "lit"
import MouseIgnore from "../../input/mouse/MouseIgnore"
import PinTemplate from "./PinTemplate"
import Utility from "../../Utility"

/**
 * @template T
 * @typedef {import("../../element/PinElement").default<T>} PinElement
 */

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

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#inputContentElements = /** @type {HTMLElement[]} */([...this.element.querySelectorAll("ueb-input")])
        if (this.#inputContentElements.length) {
            this.#inputContentElements.forEach(element => {
                element.addEventListener("focusout", this.#onFocusOutHandler)
            })
        }
    }

    cleanup() {
        super.cleanup()
        this.#inputContentElements.forEach(element => {
            element.removeEventListener("focusout", this.#onFocusOutHandler)
        })
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            ...this.#inputContentElements.map(elem => new MouseIgnore(elem, this.element.blueprint)),
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

    /** @param {String[]?} values */
    setInputs(values = [], updateDefaultValue = true) {
        // @ts-expect-error
        this.#inputContentElements.forEach(this.constructor.singleLineInput
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
        // @ts-expect-error
        const singleLine = this.constructor.singleLineInput
        // @ts-expect-error
        const selectOnFocus = this.constructor.selectOnFocus
        return html`
            <div class="ueb-pin-input">
                <ueb-input .singleLine="${singleLine}" .selectOnFocus="${selectOnFocus}"
                    .innerText="${IInputPinTemplate.stringFromUEToInput(this.element.entity.DefaultValue.toString())}">
                </ueb-input>
            </div>
        `
    }
}
