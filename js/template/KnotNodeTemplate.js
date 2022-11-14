import { html } from "lit"
import ISelectableDraggableTemplate from "./ISelectableDraggableTemplate"
import KnotPinTemplate from "./KnotPinTemplate"
import PinElement from "../element/PinElement"

/** @typedef {import("../element/NodeElement").default} NodeElement */

/** @extends {ISelectableDraggableTemplate<NodeElement>} */
export default class KnotNodeTemplate extends ISelectableDraggableTemplate {

    /** @type {PinElement} */
    #inputPin
    get inputPin() {
        return this.#inputPin
    }

    /** @type {PinElement} */
    #outputPin
    get outputPin() {
        return this.#outputPin
    }

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

    createPinElements() {
        const entities = this.element.getPinEntities().filter(v => !v.isHidden())
        const inputEntity = entities[entities[0].isInput() ? 0 : 1]
        const outputEntity = entities[entities[0].isOutput() ? 0 : 1]
        return [
            this.#inputPin = new PinElement(inputEntity, new KnotPinTemplate(), this.element),
            this.#outputPin = new PinElement(outputEntity, new KnotPinTemplate(), this.element),
        ]
    }
}
