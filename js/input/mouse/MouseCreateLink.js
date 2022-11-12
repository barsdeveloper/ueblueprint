import IMouseClickDrag from "./IMouseClickDrag"
import LinkElement from "../../element/LinkElement"

/** @typedef {import("../../element/PinElement").default} PinElement */

/** @extends IMouseClickDrag<PinElement> */
export default class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    #mouseenterHandler =
        /** @param {MouseEvent} e */
        e => {
            if (!this.enteredPin) {
                this.linkValid = false
                this.enteredPin = /** @type {PinElement} */ (e.target)
                const a = this.enteredPin
                const b = this.target
                if (a.getNodeElement() == b.getNodeElement()) {
                    this.link.setMessageSameNode()
                } else if (a.isOutput() == b.isOutput()) {
                    this.link.setMessageDirectionsIncompatible()
                } else if (a.isOutput() == b.isOutput()) {
                    this.link.setMessageDirectionsIncompatible()
                } else if (this.blueprint.getLinks([a, b]).length) {
                    this.link.setMessageReplaceLink()
                    this.linkValid = true
                } else {
                    this.link.setMessageCorrect()
                    this.linkValid = true
                }
            }
        }

    #mouseleaveHandler =
        /** @param {MouseEvent} e */
        e => {
            if (this.enteredPin == e.target) {
                this.enteredPin = null
                this.linkValid = false
                this.link?.setMessagePlaceNode()
            }
        }

    /** @type {LinkElement?} */
    link

    /** @type {PinElement?} */
    enteredPin

    linkValid = false

    startDrag(location) {
        this.link = new LinkElement(this.target, null)
        this.blueprint.linksContainerElement.prepend(this.link)
        this.link.setMessagePlaceNode()
        this.#listenedPins = this.blueprint.querySelectorAll("ueb-pin")
        this.#listenedPins.forEach(pin => {
            if (pin != this.target) {
                const clickableElement = pin.template.getClickableElement()
                clickableElement.addEventListener("mouseenter", this.#mouseenterHandler)
                clickableElement.addEventListener("mouseleave", this.#mouseleaveHandler)
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
