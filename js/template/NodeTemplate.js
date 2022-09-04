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
                    ${node.enabledState?.toString() == "DevelopmentOnly" ? html`
                        <div class="ueb-node-developmentonly">Development Only</div>
                    ` : html``}
                    ${node.advancedPinDisplay ? html`
                        <div class="ueb-node-expansion" @click="${this.toggleAdvancedDisplayHandler}">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="ueb-node-expansion-icon"
                                viewBox="4 4 24 24"
                            >
                                <path d="M 16.003 18.626 l 7.081 -7.081 L 25 13.46 l -8.997 8.998 -9.003 -9 1.917 -1.916 z" />
                            </svg>
                        </div>
                    ` : html``}
                </div>
            </div>
        `
    }

    /**
     * @param {NodeElement} node
     * @param {Map} changedProperties
     */
    async firstUpdated(node, changedProperties) {
        super.firstUpdated(node, changedProperties)
        const inputContainer = /** @type {HTMLElement} */(node.querySelector(".ueb-node-inputs"))
        const outputContainer = /** @type {HTMLElement} */(node.querySelector(".ueb-node-outputs"))
        Promise.all(node.getPinElements().map(n => n.updateComplete)).then(() => node.dispatchReflowEvent())
        node.getPinElements().forEach(p => {
            if (p.isInput()) {
                inputContainer.appendChild(p)
            } else if (p.isOutput()) {
                outputContainer.appendChild(p)
            }
        })
        this.toggleAdvancedDisplayHandler = _ => {
            node.toggleShowAdvancedPinDisplay()
            node.addNextUpdatedCallbacks(() => node.dispatchReflowEvent(), true)
        }
        node.nodeNameElement = /** @type {HTMLElement} */(node.querySelector(".ueb-node-name-text"))
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }
}
