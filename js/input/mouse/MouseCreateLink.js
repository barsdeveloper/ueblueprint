import Configuration from "../../Configuration"
import IMouseClickDrag from "./IMouseClickDrag"
import LinkElement from "../../element/LinkElement"

/**
 * @typedef {import("../../element/PinElement").default} PinElement
 * @typedef {import("../../template/KnotNodeTemplate").default} KnotNodeTemplate
 */

/** @extends IMouseClickDrag<PinElement> */
export default class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    /** @type {PinElement} */
    #knotPin = null

    #mouseenterHandler =
        /** @param {MouseEvent} e */
        e => {
            if (!this.enteredPin) {
                this.linkValid = false
                this.enteredPin = /** @type {PinElement} */ (e.target)
                const a = this.link.sourcePin ?? this.target // Remember target might have change
                const b = this.enteredPin
                if (
                    a.nodeElement.getType() == Configuration.knotNodeTypeName
                    || b.nodeElement.getType() == Configuration.knotNodeTypeName
                ) {
                    // A knot can be linked to any pin, it doesn't matter the type or input/output direction
                    this.link.setMessageCorrect()
                    this.linkValid = true
                } else if (a.getNodeElement() == b.getNodeElement()) {
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
        if (this.target.nodeElement.getType() == Configuration.knotNodeTypeName) {
            this.#knotPin = this.target
        }
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
            if (this.#knotPin) {
                const otherPin = this.#knotPin !== this.link.sourcePin ? this.link.sourcePin : this.enteredPin
                // Knot pin direction correction
                if (this.#knotPin.isInput() && otherPin.isInput() || this.#knotPin.isOutput() && otherPin.isOutput()) {
                    const oppositePin = this.#knotPin.isInput()
                        ?/** @type {KnotNodeTemplate} */(this.#knotPin.nodeElement.template).outputPin
                        :/** @type {KnotNodeTemplate} */(this.#knotPin.nodeElement.template).inputPin
                    if (this.#knotPin === this.link.sourcePin) {
                        this.link.sourcePin = oppositePin
                    } else {
                        this.enteredPin = oppositePin
                    }
                }
            }
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
