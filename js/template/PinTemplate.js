import { css, html } from "lit"
import ITemplate from "./ITemplate"
import MouseCreateLink from "../input/mouse/MouseCreateLink"
import Utility from "../Utility"

/**
 * @typedef {import("../input/IInput").default} IInput
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class PinTemplate extends ITemplate {

    static styles = css``

    /**
     * @param {PinElement} pin
     */
    connectedCallback(pin) {
        super.connectedCallback(pin)
        pin.nodeElement = pin.closest("ueb-node")
    }

    /**
     * @param {PinElement} pin
     * @returns {IInput[]}
     */
    createInputObjects(pin) {
        return [
            new MouseCreateLink(pin.clickableElement, pin.blueprint, {
                moveEverywhere: true,
                looseTarget: true
            })
        ]
    }

    /**
     * @param {PinElement} pin
     */
    render(pin) {
        const icon = html`
            <div class="ueb-pin-icon">
                ${this.renderIcon(pin)}
            </div>
        `
        const content = html`
            <div class="ueb-pin-content">
                <span class="ueb-pin-name">${pin.getPinDisplayName()}</span>
                ${this.renderInput(pin)}
            </div>
        `
        return html`
            <div class="ueb-pin-wrapper">
                ${pin.isInput() ? html`${icon}${content}` : html`${content}${icon}`}
            </div>
        `
    }

    /**
     * @param {PinElement} pin
     */
    renderIcon(pin) {
        return html`<span class="ueb-pin-icon-value"></span>`
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        return html``
    }

    /**
     * @param {PinElement} pin
     * @param {Map} changedProperties
     */
    firstUpdated(pin, changedProperties) {
        super.firstUpdated(pin, changedProperties)
        pin.dataset.id = pin.GetPinIdValue()
        pin.clickableElement = pin
    }

    /**
     * @param {PinElement} pin
     */
    getLinkLocation(pin) {
        const rect = pin.querySelector(".ueb-pin-icon").getBoundingClientRect()
        const location = Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            pin.blueprint.gridElement
        )
        return pin.blueprint.compensateTranslation(location)
    }
}
