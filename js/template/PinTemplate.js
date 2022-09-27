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

    connectedCallback() {
        super.connectedCallback()
        this.element.nodeElement = this.element.closest("ueb-node")
    }

    /** @returns {IInput[]} */
    createInputObjects() {
        return [
            new MouseCreateLink(this.element.clickableElement, this.element.blueprint, {
                moveEverywhere: true,
                looseTarget: true
            })
        ]
    }

    render() {
        const icon = html`
            <div class="ueb-pin-icon">
                ${this.renderIcon()}
            </div>
        `
        const content = html`
            <div class="ueb-pin-content">
                <span class="ueb-pin-name">${this.element.getPinDisplayName()}</span>
                ${this.renderInput()}
            </div>
        `
        return html`
            <div class="ueb-pin-wrapper">
                ${this.element.isInput() ? html`${icon}${content}` : html`${content}${icon}`}
            </div>
        `
    }

    /** @param {PinElement} pin */
    renderIcon(pin) {
        return html`
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle class="ueb-pin-tofill" cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="5" />
                <path d="M 34 6 L 34 26 L 42 16 Z" fill="currentColor" />
            </svg>
        `
    }

    /** @param {PinElement} pin */
    renderInput(pin) {
        return html``
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.element.dataset.id = this.element.GetPinIdValue()
        this.element.clickableElement = this.element
    }

    /** @param {PinElement} pin */
    getLinkLocation(pin) {
        const rect = pin.querySelector(".ueb-pin-icon").getBoundingClientRect()
        const location = Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            pin.blueprint.gridElement
        )
        return pin.blueprint.compensateTranslation(location)
    }
}
