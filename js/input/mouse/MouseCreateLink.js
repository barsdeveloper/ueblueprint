import GraphLink from "../../graph/GraphLink"
import GraphLinkMessage from "../../graph/GraphLinkMessage"
import MouseClickDrag from "./MouseClickDrag"

/** @typedef {import("../../graph/GraphPin").default} GraphPin */
export default class MouseCreateLink extends MouseClickDrag {

    /** @type {NodeListOf<GraphPin>} */
    #listenedPins

    /** @type {(e: MouseEvent) => void} */
    #mouseenterHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseleaveHandler

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        /** @type {import("../../graph/GraphPin").default} */
        this.target
        /** @type {import("../../graph/GraphLink").default} */
        this.link
        /** @type {import("../../entity/PinEntity").default} */
        this.enteredPin

        let self = this
        this.#mouseenterHandler = e => {
            if (!self.enteredPin) {
                self.enteredPin = e.target
            }
        }
        this.#mouseleaveHandler = e => {
            if (self.enteredPin == e.target) {
                self.enteredPin = null
            }
        }
    }

    startDrag() {
        this.link = new GraphLink(this.target, null)
        this.link.setLinkMessage(GraphLinkMessage.PLACE_NODE())
        this.blueprint.nodesContainerElement.insertBefore(this.link, this.blueprint.selectorElement.nextElementSibling)
        this.#listenedPins = this.blueprint.querySelectorAll(this.target.constructor.tagName)
        this.#listenedPins.forEach(pin => {
            if (pin != this.target) {
                pin.getClickableElement().addEventListener("mouseenter", this.#mouseenterHandler)
                pin.getClickableElement().addEventListener("mouseleave", this.#mouseleaveHandler)
            }
        })
    }

    dragTo(location, movement) {
        this.link.setDestinationLocation(location)
    }

    endDrag() {
        this.#listenedPins.forEach(pin => {
            pin.removeEventListener("mouseenter", this.#mouseenterHandler)
            pin.removeEventListener("mouseleave", this.#mouseleaveHandler)
        })
        if (this.enteredPin && !this.blueprint.getLinks().find(
            link =>
                link.getSourcePin() == this.target && link.getDestinationPin() == this.enteredPin
                || link.getSourcePin() == this.enteredPin && link.getDestinationPin() == this.target
        )) {
            this.link.setDestinationPin(this.enteredPin)
            this.blueprint.addGraphElement(this.link)
        } else {
            this.link.remove()
        }
        this.link = null
    }
}
