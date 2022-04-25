// @ts-check

import html from "./html"
import PinElement from "../element/PinElement"
import sanitizeText from "./sanitizeText"
import SelectableDraggableTemplate from "./SelectableDraggableTemplate"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 */

export default class NodeTemplate extends SelectableDraggableTemplate {

    toggleAdvancedDisplayHandler

    /**
     * Computes the html content of the target element.
     * @param {NodeElement} node Graph node element
     * @returns The result html
     */
    render(node) {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    <div class="ueb-node-header">
                        <div class="ueb-node-name">
                            <span class="ueb-node-name-symbol"></span>
                            <span class="ueb-node-name-text">
                                ${sanitizeText(node.getNodeDisplayName())}
                            </span>
                        </div>
                    </div>
                    <div class="ueb-node-body">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
                    ${node.entity.AdvancedPinDisplay ? html`
                        <div class="ueb-node-expansion">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="ueb-node-expansion-icon"
                                viewBox="4 2 24 24"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="
                                        M 16.003 18.626
                                        l 7.081 -7.081
                                        L 25 13.46
                                        l -8.997 8.998 -9.003 -9 1.917 -1.916
                                        z
                                    "
                                />
                            </svg>
                        </div>
                    ` : ""}
                </div>
            </div>
        `
    }

    /**
     * @param {NodeElement} node
     */
    setup(node) {
        super.setup(node)
        const nodeName = node.entity.getFullName()
        node.dataset.name = sanitizeText(nodeName)
        if (node.selected) {
            node.classList.add("ueb-selected")
        }
        this.applyAdvancedPinDisplay(node)
        node.style.setProperty("--ueb-position-x", sanitizeText(node.location[0]))
        node.style.setProperty("--ueb-position-y", sanitizeText(node.location[1]))
        /** @type {HTMLElement} */
        let inputContainer = node.querySelector(".ueb-node-inputs")
        /** @type {HTMLElement} */
        let outputContainer = node.querySelector(".ueb-node-outputs")
        let pins = node.getPinEntities()
        pins.filter(v => v.isInput()).forEach(v => inputContainer.appendChild(new PinElement(v)))
        pins.filter(v => v.isOutput()).forEach(v => outputContainer.appendChild(new PinElement(v)))
        let self = this
        this.toggleAdvancedDisplayHandler = _ => {
            node.toggleShowAdvancedPinDisplay()
        }
        node.querySelector(".ueb-node-expansion").addEventListener("click", this.toggleAdvancedDisplayHandler)
    }

    /**
     * @param {NodeElement} node
     */
    applyAdvancedPinDisplay(node) {
        if (node.entity.AdvancedPinDisplay) {
            node.dataset.advancedDisplay = node.entity.AdvancedPinDisplay.toString()
        }
    }

    /**
     * @param {NodeElement} node
     */
    applyRename(node) {
        const nodeName = node.entity.getFullName()
        node.dataset.name = sanitizeText(nodeName)
        // @ts-expect-error
        node.querySelector(".ueb-node-name-text").innerText = sanitizeText(node.entity.getFullName())
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }
}
