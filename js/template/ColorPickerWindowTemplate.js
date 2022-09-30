import { html } from "lit"
import WindowTemplate from "./WindowTemplate"

/** @typedef {import("../element/WindowElement").default} WindowElement */

export default class ColorPickerWindowTemplate extends WindowTemplate {

    static windowName = html`Color Picker`

    #picker

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        this.#picker = new iro.ColorPicker(
            this.element.querySelector(".ueb-color-picker"),
            {
                layout: [

                ]
            }
        )
    }

    renderContent() {
        return html`
            <div class="ueb-color-picker">
                <div class="ueb-color-picker-theme"></div>
                <div class="ueb-color-picker-srgb"></div>
                <div class="ueb-color-picker-wheel"></div>
                <div class="ueb-color-picker-saturation"></div>
                <div class="ueb-color-picker-value"></div>
                <div class="ueb-color-picker-preview">
                    <div class="ueb-color-picker-preview-old"></div>
                    <div class="ueb-color-picker-preview-new"></div>
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
}
