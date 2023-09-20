import { html } from "lit"
import Configuration from "../../Configuration.js"
import ElementFactory from "../../element/ElementFactory.js"
import KnotPinTemplate from "../pin/KnotPinTemplate.js"
import NodeTemplate from "./NodeTemplate.js"

export default class KnotNodeTemplate extends NodeTemplate {

    static #traversedPin = new Set()

    /** @type {Boolean?} */
    #chainDirection = null // The node is part of a chain connected to an input or output pin

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

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        this.element.classList.add("ueb-node-style-minimal")
    }

    /** @param {PinElement} startingPin */
    findDirectionaPin(startingPin) {
        if (
            startingPin.nodeElement.getType() !== Configuration.paths.knot
            || KnotNodeTemplate.#traversedPin.has(startingPin)
        ) {
            KnotNodeTemplate.#traversedPin.clear()
            return true
        }
        KnotNodeTemplate.#traversedPin.add(startingPin)
        for (let pin of startingPin.getLinks().map(l => this.blueprint.getPin(l))) {
            if (this.findDirectionaPin(pin)) {
                return true
            }
        }
        return false
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
        const pinElementConstructor = /** @type {PinElementConstructor} */(ElementFactory.getConstructor("ueb-pin"))
        let result = [
            this.#inputPin = pinElementConstructor.newObject(inputEntity, new KnotPinTemplate(), this.element),
            this.#outputPin = pinElementConstructor.newObject(outputEntity, new KnotPinTemplate(), this.element),
        ]
        return result
    }

    linksChanged() {

    }
}
