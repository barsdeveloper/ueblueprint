import { html } from "lit"
import { styleMap } from "lit/directives/style-map.js"
import ColorHandlerElement from "../element/ColorHandlerElement"
import ColorSliderElement from "../element/ColorSliderElement"
import LinearColorEntity from "../entity/LinearColorEntity"
import WindowTemplate from "./WindowTemplate"

/** @typedef {import("../element/WindowElement").default} WindowElement */

export default class ColorPickerWindowTemplate extends WindowTemplate {

    /** @type {LinearColorEntity} */
    #color
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

    connectedCallback() {
        super.connectedCallback()
        this.color = this.element.windowOptions.getPinColor()
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        const wheelHandler = new ColorHandlerElement()
        const spectrumHandler = new ColorHandlerElement()
        const saturationSlider = new ColorSliderElement()
        wheelHandler.template.locationChangeCallback = ([x, y], radius, v, a) => {
            this.color = LinearColorEntity.fromWheelLocation([x, y], radius, v, a)
        }
        this.element.querySelector(".ueb-color-picker-wheel").appendChild(wheelHandler)
    }

    renderContent() {
        const [h, s, v] = this.color.toHSVA()
        const style = {
            "--ueb-color-r": this.color.R.toString(),
            "--ueb-color-g": this.color.G.toString(),
            "--ueb-color-b": this.color.B.toString(),
            "--ueb-color-a": this.color.A.toString(),
            "--ueb-color-h": h.toString(),
            "--ueb-color-s": s.toString(),
            "--ueb-color-v": v.toString(),
        }
        return html`
            <div class="ueb-color-picker" style=${styleMap(style)}>
                <div class="ueb-color-picker-toolbar">
                    <div class="ueb-color-picker-theme"></div>
                    <div class="ueb-color-picker-srgb"></div>
                </div>
                <div class="ueb-color-picker-main">
                    <div class="ueb-color-picker-wheel"></div>
                    <div class="ueb-color-picker-saturation">
                        <div class="ueb-color-picker-slider"></div>
                    </div>
                    <div class="ueb-color-picker-value">
                        <div class="ueb-color-picker-slider"></div>
                    </div>
                    <div class="ueb-color-picker-preview">
                        <div class="ueb-color-picker-preview-old"></div>
                        <div class="ueb-color-picker-preview-new"></div>
                    </div>
                </div>
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
            </div>
        `
    }

    renderWindowName() {
        return html`Color Picker`
    }
}
