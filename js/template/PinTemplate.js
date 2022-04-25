// @ts-check

import html from "./html"
import ITemplate from "./ITemplate"
import MouseCreateLink from "../input/mouse/MouseCreateLink"
import sanitizeText from "./sanitizeText"
import Utility from "../Utility"

/**
 * @typedef {import ("../input/IInput").default} IInput
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class PinTemplate extends ITemplate {

    hasInput = false

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
                <span class="ueb-pin-name">${sanitizeText(pin.getPinDisplayName())}</span>
                ${this.renderInput(pin)}
            </div>
        `
        if (pin.isInput()) {
            return icon + content
        } else {
            return content + icon
        }
    }

    /**
     * @param {PinElement} pin
     */
    renderIcon(pin) {
        return '<span class="ueb-pin-icon-value"></span>'
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        return ""
    }

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin)
        pin.classList.add(
            "ueb-node-" + (pin.isInput() ? "input" : pin.isOutput() ? "output" : "hidden"),
            "ueb-pin-" + sanitizeText(pin.getType())
        )
        pin.dataset.id = pin.GetPinIdValue()
        if (pin.entity.bAdvancedView) {
            pin.dataset.advancedView = "true"
        }
        pin.clickableElement = pin
        pin.nodeElement = pin.closest("ueb-node")
    }

    /**
     * @param {PinElement} pin
     */
    applyConnected(pin) {
        if (pin.isLinked()) {
            pin.classList.add("ueb-pin-fill")
        } else {
            pin.classList.remove("ueb-pin-fill")
        }
    }

    /**
     * @param {PinElement} pin
     */
    getLinkLocation(pin) {
        const rect = pin.querySelector(".ueb-pin-icon").getBoundingClientRect()
        return pin.blueprint.compensateTranslation(Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            pin.blueprint.gridElement))
    }
}
