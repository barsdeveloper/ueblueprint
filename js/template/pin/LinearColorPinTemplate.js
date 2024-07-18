import { html, nothing } from "lit"
import Configuration from "../../Configuration.js"
import ElementFactory from "../../element/ElementFactory.js"
import ColorPickerWindowTemplate from "../window/ColorPickerWindowTemplate.js"
import PinTemplate from "./PinTemplate.js"

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
            <span class="ueb-pin-input-wrapper ueb-pin-input" data-linear-color="${this.element.getDefaultValue()?.serialize() ?? nothing}"
                @click="${this.#launchColorPickerWindow}"
                style="--ueb-linear-color: rgba(${this.element.getDefaultValue()?.serialize() ?? nothing})">
            </span>
        `
    }
}
