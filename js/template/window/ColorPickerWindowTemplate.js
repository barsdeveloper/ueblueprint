import { html } from "lit"
import { styleMap } from "lit/directives/style-map.js"
import ColorHandlerElement from "../../element/ColorHandlerElement.js"
import ColorSliderElement from "../../element/ColorSliderElement.js"
import Configuration from "../../Configuration.js"
import LinearColorEntity from "../../entity/LinearColorEntity.js"
import Utility from "../../Utility.js"
import WindowTemplate from "./WindowTemplate.js"

/**
 * @typedef {import("../../element/WindowElement.js").default} WindowElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

export default class ColorPickerWindowTemplate extends WindowTemplate {

    /** @type {ColorHandlerElement} */ #wheelHandler
    /** @type {ColorSliderElement} */ #saturationSlider
    /** @type {ColorSliderElement} */ #valueSlider
    /** @type {ColorSliderElement} */ #rSlider
    /** @type {ColorSliderElement} */ #gSlider
    /** @type {ColorSliderElement} */ #bSlider
    /** @type {ColorSliderElement} */ #aSlider
    /** @type {ColorSliderElement} */ #hSlider
    /** @type {ColorSliderElement} */ #sSlider
    /** @type {ColorSliderElement} */ #vSlider

    #hexRGBHandler =
        /** @param {UIEvent} v */
        v => {
            // Faster than innerText which causes reflow
            const input = Utility.clearHTMLWhitespace(/** @type {HTMLElement} */(v.target).innerHTML)
            const RGBAValue = parseInt(input, 16)
            if (isNaN(RGBAValue)) {
                return
            }
            this.color.setFromRGBANumber(RGBAValue)
            this.element.requestUpdate()
        }

    #hexSRGBHandler =
        /** @param {UIEvent} v */
        v => {
            // Faster than innerText which causes reflow
            const input = Utility.clearHTMLWhitespace(/** @type {HTMLElement} */(v.target).innerHTML)
            const sRGBAValue = parseInt(input, 16)
            if (isNaN(sRGBAValue)) {
                return
            }
            this.color.setFromSRGBANumber(sRGBAValue)
            this.element.requestUpdate()
        }

    #doOnEnter =
        /** @param {(e: UIEvent) => void} action */
        action =>
            /** @param {KeyboardEvent} e */
            e => {
                if (e.code == "Enter") {
                    e.preventDefault()
                    action(e)
                }
            }

    #color = new LinearColorEntity()
    get color() {
        return this.#color
    }
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

    #tempColor = new LinearColorEntity()

    #colorHexReplace(channel, value, opaque = false) {
        const colorHex = this.color.toRGBAString()
        const result = `${colorHex.substring(0, 2 * channel)}${value}${colorHex.substring(2 + 2 * channel)}`
        return opaque ? `${result.substring(0, 6)}FF` : result
    }


    /** @param {WindowElement} element */
    initialize(element) {
        super.initialize(element)
        this.#initialColor = this.element.windowOptions.getPinColor()
        this.color.setFromHSVA(
            this.initialColor.H.value,
            this.initialColor.S.value,
            this.initialColor.V.value,
            this.initialColor.A.value,
        )
        this.fullColor.setFromHSVA(this.color.H.value, 1, 1, 1)
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        this.#wheelHandler = this.element.querySelector(".ueb-color-picker-wheel ueb-color-handler")
        this.#saturationSlider = this.element.querySelector(".ueb-color-picker-saturation ueb-ui-slider")
        this.#valueSlider = this.element.querySelector(".ueb-color-picker-value ueb-ui-slider")
        this.#rSlider = this.element.querySelector(".ueb-color-picker-r ueb-ui-slider")
        this.#gSlider = this.element.querySelector(".ueb-color-picker-g ueb-ui-slider")
        this.#bSlider = this.element.querySelector(".ueb-color-picker-b ueb-ui-slider")
        this.#aSlider = this.element.querySelector(".ueb-color-picker-a ueb-ui-slider")
        this.#hSlider = this.element.querySelector(".ueb-color-picker-h ueb-ui-slider")
        this.#sSlider = this.element.querySelector(".ueb-color-picker-s ueb-ui-slider")
        this.#vSlider = this.element.querySelector(".ueb-color-picker-v ueb-ui-slider")
        this.#wheelHandler.template.locationChangeCallback =
            /**
             * @param {Number} x in the range [0, 1]
             * @param {Number} y in the range [0, 1]
             */
            (x, y) => {
                this.color.setFromWheelLocation(x, y, this.color.V.value, this.color.A.value)
                this.fullColor.setFromHSVA(this.color.H.value, 1, 1, 1)
                this.element.requestUpdate()
            }
        this.#saturationSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(this.color.H.value, y, this.color.V.value, this.color.A.value)
                this.element.requestUpdate()
            }
        this.#valueSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(this.color.H.value, this.color.S.value, y, this.color.A.value)
                this.element.requestUpdate()
            }
        this.#rSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromRGBA(x, this.color.G.value, this.color.B.value, this.color.A.value)
                this.element.requestUpdate()
            }
        this.#gSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromRGBA(this.color.R.value, x, this.color.B.value, this.color.A.value)
                this.element.requestUpdate()
            }
        this.#bSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromRGBA(this.color.R.value, this.color.G.value, x, this.color.A.value)
                this.element.requestUpdate()
            }
        this.#aSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromRGBA(this.color.R.value, this.color.G.value, this.color.B.value, x)
                this.element.requestUpdate()
            }
        this.#hSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(x, this.color.S.value, this.color.V.value, this.color.A.value)
                this.element.requestUpdate()
            }
        this.#sSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(this.color.H.value, x, this.color.V.value, this.color.A.value)
                this.element.requestUpdate()
            }
        this.#vSlider.template.locationChangeCallback =
            /** @param {Number} x in the range [0, 1] */
            (x, y) => {
                this.color.setFromHSVA(this.color.H.value, this.color.S.value, x, this.color.A.value)
                this.element.requestUpdate()
            }
    }

    /** @param {Number} channel */
    renderSlider(channel) {
        let channelLetter = ""
        let channelValue = 0
        let background = ""
        const getCommonBackground = channel =>
            `linear-gradient(to right, #${this.#colorHexReplace(channel, '00', true)}, #${this.#colorHexReplace(channel, 'ff', true)})`
        switch (channel) {
            case 0:
                channelLetter = "r"
                channelValue = this.color.R.value
                background = getCommonBackground(channel)
                break
            case 1:
                channelLetter = "g"
                channelValue = this.color.G.value
                background = getCommonBackground(channel)
                break
            case 2:
                channelLetter = "b"
                channelValue = this.color.B.value
                background = getCommonBackground(channel)
                break
            case 3:
                channelLetter = "a"
                channelValue = this.color.A.value
                background = `${Configuration.alphaPattern}, ${getCommonBackground(channel)}`
                break
            case 4:
                channelLetter = "h"
                channelValue = this.color.H.value * 360
                background = "linear-gradient(to right, #f00 0%, #ff0 16.666%, #0f0 33.333%, #0ff 50%, #00f 66.666%, #f0f 83.333%, #f00 100%)"
                break
            case 5:
                channelLetter = "s"
                channelValue = this.color.S.value
                background = "linear-gradient("
                    + "to right,"
                    + `#${this.#tempColor.setFromHSVA(
                        this.color.H.value,
                        0,
                        this.color.V.value,
                        1
                    ), this.#tempColor.toRGBAString()},`
                    + `#${this.#tempColor.setFromHSVA(
                        this.color.H.value,
                        1,
                        this.color.V.value,
                        1,
                    ), this.#tempColor.toRGBAString()})`
                break
            case 6:
                channelLetter = "v"
                channelValue = this.color.V.value
                background = `linear-gradient(to right, #000, #${this.fullColor.toRGBAString()})`
                break
        }
        background = `background: ${background};`
        return html`
            <div class="ueb-color-picker-${channelLetter.toLowerCase()}">
                <span class="ueb-color-control-label">${channelLetter.toUpperCase()}</span>
                <div>
                    <div class="ueb-horizontal-slider">
                        <span class="ueb-horizontal-slider-text"
                            .innerText="${Utility.minDecimals(Utility.roundDecimals(channelValue, 3))}">
                        </span>
                        <ueb-ui-slider></ueb-ui-slider>
                    </div>
                    <div class="ueb-color-picker-gradient" style="${background}"></div>
                </div>
            </div>
        `
    }

    renderContent() {
        const theta = this.color.H.value * 2 * Math.PI
        const style = {
            "--ueb-color-r": this.color.R.toString(),
            "--ueb-color-g": this.color.G.toString(),
            "--ueb-color-b": this.color.B.toString(),
            "--ueb-color-a": this.color.A.toString(),
            "--ueb-color-h": this.color.H.toString(),
            "--ueb-color-s": this.color.S.toString(),
            "--ueb-color-v": this.color.V.toString(),
            "--ueb-color-wheel-x": `${(this.color.S.value * Math.cos(theta) * 0.5 + 0.5) * 100}%`,
            "--ueb-color-wheel-y": `${(this.color.S.value * Math.sin(theta) * 0.5 + 0.5) * 100}%`,
        }
        const colorRGB = this.color.toRGBAString()
        const colorSRGB = this.color.toSRGBAString()
        const fullColorHex = this.fullColor.toRGBAString()
        return html`
            <div class="ueb-color-picker" style="${styleMap(style)}">
                <div class="ueb-color-picker-toolbar">
                    <div class="ueb-color-picker-theme"></div>
                    <div class="ueb-color-picker-srgb"></div>
                </div>
                <div class="ueb-color-picker-main">
                    <div class="ueb-color-picker-wheel">
                        <ueb-color-handler></ueb-color-handler>
                    </div>
                    <div class="ueb-color-picker-saturation ueb-vertical-slider"
                        style="background-color: #${fullColorHex}">
                        <ueb-ui-slider></ueb-ui-slider>
                    </div>
                    <div class="ueb-color-picker-value ueb-vertical-slider"
                        style="background-color: #${fullColorHex}">
                        <ueb-ui-slider></ueb-ui-slider>
                    </div>
                    <div class="ueb-color-picker-preview">
                        Old
                        <div class="ueb-color-picker-preview-old "
                            style="background: #${this.#initialColor.toRGBAString()}">
                        </div>
                        <div class="ueb-color-picker-preview-new">
                            <div class="ueb-color-picker-preview-1"
                                style="background: #${this.#colorHexReplace(3, "FF")}">
                            </div>
                            <div class="ueb-color-picker-preview-2"
                                style="background: ${`linear-gradient(#${colorRGB}, #${colorRGB}),${Configuration.alphaPattern}`}">
                            </div>
                        </div>
                        New
                    </div>
                </div>
                <div class="ueb-color-picker-advanced-toggle ueb-toggle-control">
                    Advanced
                </div>
                <div class="ueb-color-picker-advanced">
                    <div class="ueb-color-picker-column">
                        ${this.renderSlider(0)}
                        ${this.renderSlider(1)}
                        ${this.renderSlider(2)}
                        ${this.renderSlider(3)}
                    </div>
                    <div class="ueb-color-picker-column">
                        ${this.renderSlider(4)}
                        ${this.renderSlider(5)}
                        ${this.renderSlider(6)}
                        <div class="ueb-color-control">
                            <span class="ueb-color-control-label">Hex Linear</span>
                            <div class="ueb-color-picker-hex-linear ueb-text-input">
                                <ueb-input
                                    .innerText="${colorRGB}"
                                    @focusout="${this.#hexRGBHandler}"
                                    @keydown="${this.#doOnEnter(this.#hexRGBHandler)}">
                                </ueb-input>
                            </div>
                        </div>
                        <div class="ueb-color-control">
                             <span class="ueb-color-control-label">Hex sRGB</span>
                            <div class="ueb-color-picker-hex-srgb ueb-text-input">
                                <ueb-input
                                    .innerText="${colorSRGB}"
                                    @focusout="${this.#hexSRGBHandler}"
                                    @keydown="${this.#doOnEnter(this.#hexSRGBHandler)}">
                                </ueb-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ueb-buttons">
                    <div class="ueb-color-picker-ok ueb-button" @click="${() => this.apply()}">
                        ${Configuration.windowApplyButtonText}
                    </div>
                    <div class="ueb-color-picker-cancel ueb-button" @click="${() => this.cancel()}">
                        ${Configuration.windowCancelButtonText}
                    </div>
                </div>
            </div>
        `
    }

    renderWindowName() {
        return html`${Configuration.colorWindowName}`
    }
}
