import { html } from "lit"
import ISelectableDraggableTemplate from "./ISelectableDraggableTemplate"
import PinElement from "../element/PinElement"

/** @typedef {import("../element/NodeElement").default} NodeElement */

/** @extends {ISelectableDraggableTemplate<NodeElement>} */
export default class KnotNodeTemplate extends ISelectableDraggableTemplate {

    render() {
        return html`
            <div class="ueb-node-border"></div>
        `
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        const content = /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-border"))
        Promise.all(this.element.getPinElements().map(n => n.updateComplete)).then(() => this.element.dispatchReflowEvent())
        this.element.getPinElements().forEach(p => content.appendChild(p))
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }
}
