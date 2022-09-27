import { html } from "lit"
import PinElement from "../element/PinElement"
import SelectableDraggableTemplate from "./SelectableDraggableTemplate"

/** @typedef {import("../element/NodeElement").default} NodeElement */

export default class NodeTemplate extends SelectableDraggableTemplate {

    toggleAdvancedDisplayHandler

    render() {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">
                        <div class="ueb-node-name">
                            <span class="ueb-node-name-symbol">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.72002 6.0699C9.88111 4.96527 10.299 3.9138 10.94 2.99991C10.94 2.99991 10.94 3.05991 10.94 3.08991C10.94 3.36573 11.0496 3.63026 11.2446 3.8253C11.4397 4.02033 11.7042 4.12991 11.98 4.12991C12.2558 4.12991 12.5204 4.02033 12.7154 3.8253C12.9105 3.63026 13.02 3.36573 13.02 3.08991C13.0204 2.90249 12.9681 2.71873 12.8691 2.5596C12.7701 2.40047 12.6283 2.27237 12.46 2.18991H12.37C11.8725 2.00961 11.3275 2.00961 10.83 2.18991C9.21002 2.63991 8.58002 4.99991 8.58002 4.99991L8.40002 5.1199H5.40002L5.15002 6.1199H8.27002L7.27002 11.4199C7.11348 12.0161 6.79062 12.5555 6.33911 12.9751C5.8876 13.3948 5.32607 13.6773 4.72002 13.7899C4.78153 13.655 4.81227 13.5081 4.81002 13.3599C4.81002 13.0735 4.69624 12.7988 4.4937 12.5962C4.29116 12.3937 4.01646 12.2799 3.73002 12.2799C3.44359 12.2799 3.16889 12.3937 2.96635 12.5962C2.76381 12.7988 2.65002 13.0735 2.65002 13.3599C2.66114 13.605 2.75692 13.8386 2.92104 14.021C3.08517 14.2033 3.30746 14.3231 3.55002 14.3599C7.91002 15.1999 8.55002 11.4499 8.55002 11.4499L9.55002 7.05991H12.55L12.8 6.05991H9.64002L9.72002 6.0699Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                            <span class="ueb-node-name-text">
                                ${this.element.nodeDisplayName}
                            </span>
                        </div>
                    </div>
                    <div class="ueb-node-content">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
                    ${this.element.enabledState?.toString() == "DevelopmentOnly" ? html`
                    <div class="ueb-node-developmentonly">Development Only</div>
                    ` : html``}
                    ${this.element.advancedPinDisplay ? html`
                    <div class="ueb-node-expansion" @click="${this.toggleAdvancedDisplayHandler}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="ueb-node-expansion-icon" viewBox="4 4 24 24">
                            <path d="M 16.003 18.626 l 7.081 -7.081 L 25 13.46 l -8.997 8.998 -9.003 -9 1.917 -1.916 z" />
                        </svg>
                    </div>
                    ` : html``}
                </div>
            </div>
        `
    }

    /** @param {Map} changedProperties */
    async firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        const inputContainer = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-inputs"))
        const outputContainer = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-outputs"))
        Promise.all(this.element.getPinElements().map(n => n.updateComplete)).then(() => this.element.dispatchReflowEvent())
        this.element.getPinElements().forEach(p => {
            if (p.isInput()) {
                inputContainer.appendChild(p)
            } else if (p.isOutput()) {
                outputContainer.appendChild(p)
            }
        })
        this.toggleAdvancedDisplayHandler = _ => {
            this.element.toggleShowAdvancedPinDisplay()
            this.element.addNextUpdatedCallbacks(() => this.element.dispatchReflowEvent(), true)
        }
        this.element.nodeNameElement = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-name-text"))
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }
}
