import { html, nothing } from "lit"
import ColorPickerWindowTemplate from "../window/ColorPickerWindowTemplate"
import Configuration from "../../Configuration"
import ElementFactory from "../../element/ElementFactory"
import PinTemplate from "./PinTemplate"

/**
 * @typedef {import("../../element/WindowElement").default} WindowElement
 * @typedef {import("../../element/WindowElement").WindowElementConstructor} WindowElementConstructor
 * @typedef {import("../../entity/LinearColorEntity").default} LinearColorEntity
 */

/** @extends PinTemplate<LinearColorEntity> */
export default class LinearColorPinTemplate extends PinTemplate {

    /** @type {WindowElement} */
    #window

    /** @param {MouseEvent} e */
    #launchColorPickerWindow = e => {
        e.preventDefault()
        this.blueprint.setFocused(true)
        /** @type {WindowElement} */
        this.#window = /** @type {WindowElementConstructor} */(ElementFactory.getConstructor("ueb-window"))
            .newObject({
                type: new ColorPickerWindowTemplate(),
                windowOptions: {
                    // The created window will use the following functions to get and set the color
                    getPinColor: () => this.element.defaultValue,
                    /** @param {LinearColorEntity} color */
                    setPinColor: color => this.element.setDefaultValue(color),
                },
            })
        this.blueprint.append(this.#window)
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
    }

    renderInput() {
        return html`
            <span class="ueb-pin-input" data-linear-color="${this.element.getDefaultValue()?.toString() ?? nothing}"
                @click="${this.#launchColorPickerWindow}"
                style="--ueb-linear-color: rgba(${this.element.getDefaultValue()?.toString() ?? nothing})">
            </span>
        `
    }
}