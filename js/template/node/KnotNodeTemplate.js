import { html } from "lit"
import ElementFactory from "../../element/ElementFactory.js"
import KnotPinTemplate from "../pin/KnotPinTemplate.js"
import NodeTemplate from "./NodeTemplate.js"

export default class KnotNodeTemplate extends NodeTemplate {

    #switchDirectionsVisually = false
    get switchDirectionsVisually() {
        return this.#switchDirectionsVisually
    }
    set switchDirectionsVisually(value) {
        if (this.#switchDirectionsVisually == value) {
            return
        }
        this.#switchDirectionsVisually = value
        this.element.acknowledgeReflow()
    }

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

    render() {
        return html`
            <div class="ueb-node-border"></div>
        `
    }

    setupPins() {
        for (const p of this.getPinElements()) {
            /** @type {HTMLElement} */(this.element.querySelector(".ueb-node-border")).appendChild(p)
        }
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

    checkSwtichDirectionsVisually() {
        let leftPinsDelta = 0
        let leftPinsCount = 0
        let rightPinsDelta = 0
        let rightPinsCount = 0
        const location = this.outputPin.getLinkLocation()[0]
        const links = this.getAllConnectedLinks()
        for (const link of links) {
            const pin = link.getOtherPin(this.element)
            const delta = pin.getLinkLocation()[0] - location
            if (pin?.isInput()) {
                rightPinsDelta += delta
                ++rightPinsCount
            } else if (pin?.isOutput()) {
                leftPinsDelta += delta
                ++leftPinsCount
            }
        }
        leftPinsDelta /= leftPinsCount
        rightPinsDelta /= rightPinsCount
        if ((rightPinsDelta < leftPinsDelta) != this.switchDirectionsVisually) {
            this.switchDirectionsVisually = rightPinsDelta < leftPinsDelta
        }
    }
}
