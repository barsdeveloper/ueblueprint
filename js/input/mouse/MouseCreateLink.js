import IMouseClickDrag from "./IMouseClickDrag"
import LinkElement from "../../element/LinkElement"

/**
 * @typedef {import("../../element/PinElement").default} PinElement
 */

/**
 * @extends IMouseClickDrag<PinElement>
 */
export default class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    /** @type {(e: MouseEvent) => void} */
    #mouseenterHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseleaveHandler

    /** @type {LinkElement?} */
    link

    /** @type {PinElement?} */
    enteredPin

    linkValid = false

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        let self = this
        this.#mouseenterHandler = e => {
            if (!self.enteredPin) {
                self.linkValid = false
                self.enteredPin = /** @type {PinElement} */ (e.target)
                const a = self.enteredPin
                const b = self.target
                if (a.getNodeElement() == b.getNodeElement()) {
                    self.link.setMessageSameNode()
                } else if (a.isOutput() == b.isOutput()) {
                    self.link.setMessageDirectionsIncompatible()
                } else if (a.isOutput() == b.isOutput()) {
                    self.link.setMessageDirectionsIncompatible()
                } else if (self.blueprint.getLinks([a, b]).length) {
                    self.link.setMessageReplaceLink()
                    self.linkValid = true
                } else {
                    self.link.setMessageCorrect()
                    self.linkValid = true
                }
            }
        }
        this.#mouseleaveHandler = e => {
            if (self.enteredPin == e.target) {
                self.enteredPin = null
                self.linkValid = false
                self.link?.setMessagePlaceNode()
            }
        }
    }

    startDrag(location) {
        this.link = new LinkElement(this.target, null)
        this.blueprint.linksContainerElement.prepend(this.link)
        this.link.setMessagePlaceNode()
        this.#listenedPins = this.blueprint.querySelectorAll("ueb-pin")
        this.#listenedPins.forEach(pin => {
            if (pin != this.target) {
                pin.getClickableElement().addEventListener("mouseenter", this.#mouseenterHandler)
                pin.getClickableElement().addEventListener("mouseleave", this.#mouseleaveHandler)
            }
        })
        this.link.startDragging()
        this.link.setDestinationLocation(location)
    }

    dragTo(location, movement) {
        this.link.setDestinationLocation(location)
    }

    endDrag() {
        this.#listenedPins.forEach(pin => {
            pin.removeEventListener("mouseenter", this.#mouseenterHandler)
            pin.removeEventListener("mouseleave", this.#mouseleaveHandler)
        })
        if (this.enteredPin && this.linkValid) {
            this.blueprint.addGraphElement(this.link)
            this.link.destinationPin = this.enteredPin
            this.link.removeMessage()
            this.link.finishDragging()
        } else {
            this.link.finishDragging()
            this.link.remove()
        }
        this.enteredPin = null
        this.link = null
        this.#listenedPins = null
    }
}
