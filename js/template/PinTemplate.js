// @ts-check

import html from "./html"
import ITemplate from "./ITemplate"
import LinkElement from "../element/LinkElement"
import sanitizeText from "./sanitizeText"
import Utility from "../Utility"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */
export default class PinTemplate extends ITemplate {

    hasInput() {
        return false
    }

    /**
     * Computes the html content of the pin.
     * @param {PinElement} pin html element
     * @returns The result html
     */
    render(pin) {
        if (pin.isInput()) {
            return html`
                <div class="ueb-pin-icon">
                    ${this.renderIcon(pin)}
                </div>
                <div class="ueb-pin-content">
                    <span class="ueb-pin-name">${sanitizeText(pin.getPinDisplayName())}</span>
                    ${this.renderInput(pin)}
                </div>
            `
        } else {
            return html`
                <div class="ueb-pin-name">${sanitizeText(pin.getPinDisplayName())}</div>
                <div class="ueb-pin-icon">
                    ${this.renderIcon(pin)}
                </div>
            `
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
     * Applies the style to the element.
     * @param {PinElement} pin element of the graph
     */
    apply(pin) {
        super.apply(pin)
        pin.classList.add(
            "ueb-node-" + (pin.isInput() ? "input" : pin.isOutput() ? "output" : "hidden"),
            "ueb-pin-" + sanitizeText(pin.getType())
        )
        pin.dataset.id = pin.GetPinIdValue()
        if (pin.entity.bAdvancedView) {
            pin.dataset.advancedView = "true"
        }
        pin.clickableElement = pin
        window.customElements.whenDefined("ueb-node").then(_ => pin.nodeElement = pin.closest("ueb-node"))
        pin.getLinks().forEach(pinReference => {
            const targetPin = pin.blueprint.getPin(pinReference)
            if (targetPin) {
                const [sourcePin, destinationPin] = pin.isOutput() ? [pin, targetPin] : [targetPin, pin]
                pin.blueprint.addGraphElement(
                    new LinkElement(/** @type {PinElement} */(sourcePin), /** @type {PinElement} */(destinationPin))
                )
            }
        })
    }

    /**
     * Applies the connection style to the element.
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
