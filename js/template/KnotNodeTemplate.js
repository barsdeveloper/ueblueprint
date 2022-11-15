import { html } from "lit"
import ElementFactory from "../element/ElementFactory"
import KnotPinTemplate from "./KnotPinTemplate"
import NodeTemplate from "./NodeTemplate"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class KnotNodeTemplate extends NodeTemplate {

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

    setupPins() {
        this.element.getPinElements().forEach(
            p => /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-border")).appendChild(p)
        )
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
        const pinElementConstructor = ElementFactory.getConstructor("ueb-pin")
        return [
            this.#inputPin = /** @type {PinElement} */(new pinElementConstructor(
                inputEntity,
                new KnotPinTemplate(),
                this.element
            )),
            this.#outputPin = /** @type {PinElement} */(new pinElementConstructor(
                outputEntity,
                new KnotPinTemplate(),
                this.element
            )),
        ]
    }
}
