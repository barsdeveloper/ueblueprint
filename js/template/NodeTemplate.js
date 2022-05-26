// @ts-check

import { html } from "lit"
import PinElement from "../element/PinElement"
import SelectableDraggableTemplate from "./SelectableDraggableTemplate"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 */

export default class NodeTemplate extends SelectableDraggableTemplate {

    toggleAdvancedDisplayHandler

    /**
     * @param {NodeElement} node
     */
    render(node) {
        return html`
            <style>
                :host {
                    --ueb-position-x: ${node.locationX};
                    --ueb-position-y: ${node.locationY};
                }
            </style>
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">
                        <div class="ueb-node-name">
                            <span class="ueb-node-name-symbol"></span>
                            <span class="ueb-node-name-text">
                                ${node.nodeDisplayName}
                            </span>
                        </div>
                    </div>
                    <div class="ueb-node-content">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
                    ${node.enabledState == "DevelopmentOnly" ? html`
                        <div class="ueb-node-developmentonly">Development Only</div>
                    ` : html``}
                    ${node.advancedPinDisplay ? html`
                        <div class="ueb-node-expansion">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="ueb-node-expansion-icon"
                                viewBox="4 4 24 24"
                            >
                                <path
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
                    ` : html``}
                </div>
            </div>
        `
    }

    /**
     * @param {NodeElement} node
     */
    setup(node) {
        super.setup(node)
        node.dataset.name = node.entity.getObjectName()
        if (node.entity.EnabledState) {
            node.dataset.enabledState = node.entity.EnabledState.toString()
        }
        /** @type {HTMLElement} */
        const inputContainer = node.querySelector(".ueb-node-inputs")
        /** @type {HTMLElement} */
        const outputContainer = node.querySelector(".ueb-node-outputs")
        const pins = node.getPinEntities()
        pins.filter(v => v.isInput()).forEach(v => inputContainer.appendChild(new PinElement(v)))
        pins.filter(v => v.isOutput()).forEach(v => outputContainer.appendChild(new PinElement(v)))
        const self = this
        this.toggleAdvancedDisplayHandler = _ => {
            node.toggleShowAdvancedPinDisplay()
        }
        if (node.entity.AdvancedPinDisplay) {
            node.querySelector(".ueb-node-expansion").addEventListener("click", this.toggleAdvancedDisplayHandler)
        }
        node.nodeNameElement = node.querySelector(".ueb-node-name-text")
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }
}
