import { html } from "lit"
import ColorPickerWindowTemplate from "./ColorPickerWindowTemplate"
import Configuration from "../Configuration"
import IInputPinTemplate from "./IInputPinTemplate"
import MouseClickAction from "../input/mouse/MouseClickAction"
import WindowElement from "../element/WindowElement"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/LinearColorEntity").default} LinearColorEntity
 */

/** @extends IInputPinTemplate<LinearColorEntity> */
export default class LinearColorPinTemplate extends IInputPinTemplate {

    /** @type {HTMLInputElement} */
    #input

    /** @type {WindowElement} */
    #window

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#input = this.element.querySelector(".ueb-pin-input")
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseClickAction(this.#input, this.element.blueprint, undefined,
                inputInstance => {
                    this.#window = new WindowElement({
                        type: ColorPickerWindowTemplate,
                        windowOptions: {
                            // The created window will use the following functions to get and set the color
                            getPinColor: () => this.element.defaultValue,
                            /** @param {LinearColorEntity} color */
                            setPinColor: color => this.element.setDefaultValue(color),
                        },
                    })
                    this.element.blueprint.append(this.#window)
                    const windowApplyHandler = () => {
                        this.element.setDefaultValue(
                            /** @type {ColorPickerWindowTemplate} */(this.#window.template).color
                        )
                    }
                    const windowCloseHandler = () => {
                        this.#window.removeEventListener(Configuration.windowApplyEventName, windowApplyHandler)
                        this.#window.removeEventListener(Configuration.windowCloseEventName, windowCloseHandler)
                        this.#window = null
                    }
                    this.#window.addEventListener(Configuration.windowApplyEventName, windowApplyHandler)
                    this.#window.addEventListener(Configuration.windowCloseEventName, windowCloseHandler)
                },
            ),
        ]
    }

    getInputs() {
        return [this.#input.dataset.linearColor]
    }

    /** @param {String[]} value */
    setInputs(value = []) {
    }

    renderInput() {
        if (this.element.isInput()) {
            return html`
                <span class="ueb-pin-input" data-linear-color="${this.element.defaultValue.toString()}"
                    style="--ueb-linear-color: rgba(${this.element.defaultValue.toString()})">
                </span>
            `
        }
        return super.renderInput()
    }
}
