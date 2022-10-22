import { html } from "lit"
import { styleMap } from "lit/directives/style-map.js"
import ColorHandlerElement from "../element/ColorHandlerElement"
import ColorSliderElement from "../element/ColorSliderElement"
import LinearColorEntity from "../entity/LinearColorEntity"
import WindowTemplate from "./WindowTemplate"

/** @typedef {import("../element/WindowElement").default} WindowElement */

export default class ColorPickerWindowTemplate extends WindowTemplate {

    #wheelHandler = new ColorHandlerElement()
    get wheelHandler() {
        return this.#wheelHandler
    }

    #saturationSlider = new ColorSliderElement()
    get saturationSlider() {
        return this.#saturationSlider
    }

    #valueSlider = new ColorSliderElement()
    get valueSlider() {
        return this.#valueSlider
    }

    #color = new LinearColorEntity()
    get color() {
        return this.#color
    }
    /** @param {LinearColorEntity} value */
    set color(value) {
        if (value.toNumber() == this.color?.toNumber()) {
            return
        }
        this.element.requestUpdate("color", this.#color)
        this.#color = value
    }

    #fullColor = new LinearColorEntity()
    get fullColor() {
        return this.#fullColor
    }

    /** @type {LinearColorEntity} */
    #initialColor
    get initialColor() {
        return this.#initialColor
    }


    connectedCallback() {
        super.connectedCallback()
        this.#initialColor = this.element.windowOptions.getPinColor()
        this.color.setFromHSVA([
            this.initialColor.H.value,
            this.initialColor.S.value,
            this.initialColor.V.value,
            this.initialColor.A.value
        ])
        this.fullColor.setFromHSVA([this.color.H.value, 1, 1, 1])
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        this.wheelHandler.template.locationChangeCallback =
            /** @param {[Number, Number]} param0 x, y in the range [-1, 1] */
            ([x, y]) => {
                this.color.setFromWheelLocation([x, y], this.color.V.value, this.color.A.value)
                this.fullColor.setFromHSVA([this.color.H.value, 1, 1, 1])
                this.element.requestUpdate()
            }
        this.saturationSlider.template.locationChangeCallback =
            /** @param {[Number, Number]} param0 y is in the range [0, 1] */
            ([_, y]) => {
                this.color.setFromHSVA([this.color.H.value, y, this.color.V.value, this.color.A.value])
                this.element.requestUpdate()
            }
        this.valueSlider.template.locationChangeCallback =
            /** @param {[Number, Number]} param0 y is in the range [0, 1] */
            ([_, y]) => {
                this.color.setFromHSVA([this.color.H.value, this.color.S.value, y, this.color.A.value])
                this.element.requestUpdate()
            }
        this.element.querySelector(".ueb-color-picker-wheel").appendChild(this.wheelHandler)
        this.element.querySelector(".ueb-color-picker-saturation").appendChild(this.saturationSlider)
        this.element.querySelector(".ueb-color-picker-value").appendChild(this.valueSlider)
    }

    renderContent() {
        const theta = this.color.H.value * 2 * Math.PI
        const wheelRadius = Math.max(
            this.#wheelHandler.template.movementSpaceSize[0],
            this.#wheelHandler.template.movementSpaceSize[1],
        ) / 2
        const style = {
            "--ueb-color-r": this.color.R.toString(),
            "--ueb-color-g": this.color.G.toString(),
            "--ueb-color-b": this.color.B.toString(),
            "--ueb-color-a": this.color.A.toString(),
            "--ueb-color-h": this.color.H.toString(),
            "--ueb-color-s": this.color.S.toString(),
            "--ueb-color-v": this.color.V.toString(),
            "--ueb-color-wheel-x": `${Math.round(this.color.S.value * Math.cos(theta) * wheelRadius + wheelRadius)}px`,
            "--ueb-color-wheel-y": `${Math.round(this.color.S.value * Math.sin(theta) * wheelRadius + wheelRadius)}px`,
        }
        return html`
            <div class="ueb-color-picker" style=${styleMap(style)}>
                <div class="ueb-color-picker-toolbar">
                    <div class="ueb-color-picker-theme"></div>
                    <div class="ueb-color-picker-srgb"></div>
                </div>
                <div class="ueb-color-picker-main">
                    <div class="ueb-color-picker-wheel"></div>
                    <div class="ueb-color-picker-saturation"
                        style="background-color: #${this.fullColor.toRGBAString()}">
                    </div>
                    <div class="ueb-color-picker-value"
                        style="background-color: #${this.fullColor.toRGBAString()}"></div>
                    <div class="ueb-color-picker-preview">
                        <div class="ueb-color-picker-preview-old"
                            style="background: #${this.#initialColor.toRGBAString()}">
                        </div>
                        <div class="ueb-color-picker-preview-new"
                            style="background: #${this.color.toRGBAString()}">
                        </div >
                    </div >
                </div >
                <div class="ueb-color-picker-advanced-toggle"></div>
                <div class="ueb-color-picker-advanced">
                    <div class="ueb-color-picker-r"></div>
                    <div class="ueb-color-picker-g"></div>
                    <div class="ueb-color-picker-b"></div>
                    <div class="ueb-color-picker-a"></div>
                    <div class="ueb-color-picker-h"></div>
                    <div class="ueb-color-picker-s"></div>
                    <div class="ueb-color-picker-v"></div>
                    <div class="ueb-color-picker-hex-linear"></div>
                    <div class="ueb-color-picker-hex-srgb"></div>
                </div>
                <div class="ueb-color-picker-ok"></div>
                <div class="ueb-color-picker-cancel"></div>
            </div >
            `
    }

    renderWindowName() {
        return html`Color Picker`
    }
}
