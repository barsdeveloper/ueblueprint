import { html } from "lit"
import Configuration from "../Configuration"
import LinearColorEntity from "../entity/LinearColorEntity"
import WindowTemplate from "./WindowTemplate"

/** @typedef {import("../element/WindowElement").default} WindowElement */

export default class ColorPickerWindowTemplate extends WindowTemplate {

    static windowName = html`Color Picker`

    /** @type {LinearColorEntity} */
    #color
    get color() {
        return this.#color
    }
    /** @param {LinearColorEntity} value */
    set color(value) {
        if (value.num() == this.color.num()) {
            this.element.requestUpdate("color", this.#color)
            this.#color = value
        }
    }

    connectedCallback() {
        super.connectedCallback()
        this.color = this.element.windowOptions.getPinColor()
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
    }

    renderContent() {
        const rgba = this.color.rgba()
        return html`
            <div class="ueb-color-picker"
                .style="--ueb-color-r: ${rgba[0]}; --ueb-color-g: ${rgba[1]}; --ueb-color-b: ${rgba[2]}; --ueb-color-a: ${rgba[3]};">
                <div class="ueb-color-picker-toolbar">
                    <div class="ueb-color-picker-theme"></div>
                    <div class="ueb-color-picker-srgb"></div>
                </div>
                <div class="ueb-color-picker-main">
                    <div class="ueb-color-picker-wheel">
                        <ueb-color-handler></ueb-color-handler>
                    </div>
                    <div class="ueb-color-picker-saturation"></div>
                    <div class="ueb-color-picker-value"></div>
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

    cleanup() {
        this.element.blueprint.removeEventListener(Configuration.colorWindowEventName, this.colorWindowHandler)
    }
}
