import Configuration from "../../Configuration.js"
import ElementFactory from "../../element/ElementFactory.js"
import IMouseClickDrag from "./IMouseClickDrag.js"

/** @extends IMouseClickDrag<PinElement> */
export default class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    /** @type {PinElement} */
    #knotPin = null

    /** @param {MouseEvent} e */
    #mouseenterHandler = e => {
        if (!this.enteredPin) {
            this.linkValid = false
            this.enteredPin = /** @type {PinElement} */(e.target)
            const a = this.link.source ?? this.target // Remember target might have change
            const b = this.enteredPin
            const outputPin = a.isOutput() ? a : b
            if (
                a.nodeElement.getType() === Configuration.paths.knot
                || b.nodeElement.getType() === Configuration.paths.knot
            ) {
                // A knot can be linked to any pin, it doesn't matter the type or input/output direction
                this.link.setMessageCorrect()
                this.linkValid = true
            } else if (a.getNodeElement() === b.getNodeElement()) {
                this.link.setMessageSameNode()
            } else if (a.isOutput() === b.isOutput()) {
                this.link.setMessageDirectionsIncompatible()
            } else if (this.blueprint.getLinks(a, b).length) {
                this.link.setMessageReplaceLink()
                this.linkValid = true
            } else if (outputPin.entity.getType() === "exec" && outputPin.isLinked) {
                this.link.setMessageReplaceOutputLink()
                this.linkValid = true
            } else if (
                (a.entity.PinType.PinCategory != "object" || b.entity.PinType.PinCategory != "object")
                && a.pinType != b.pinType
            ) {
                this.link.setMessageTypesIncompatible(a, b)
                this.linkValid = false
            } else {
                this.link.setMessageCorrect()
                this.linkValid = true
            }
        }
    }

    /** @param {MouseEvent} e */
    #mouseleaveHandler = e => {
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

    /**
     * @param {PinElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.scrollGraphEdge ??= true
        super(target, blueprint, options)
    }

    startDrag(location) {
        if (this.target.nodeElement.getType() == Configuration.paths.knot) {
            this.#knotPin = this.target
        }
        /** @type {LinkElement} */
        this.link = /** @type {LinkElementConstructor} */(ElementFactory.getConstructor("ueb-link"))
            .newObject(this.target, null)
        this.blueprint.template.linksContainerElement.prepend(this.link)
        this.link.setMessagePlaceNode()
        this.#listenedPins = this.blueprint.querySelectorAll("ueb-pin")
        this.#listenedPins.forEach(pin => {
            if (pin != this.target) {
                pin.addEventListener("mouseenter", this.#mouseenterHandler)
                pin.addEventListener("mouseleave", this.#mouseleaveHandler)
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
        this.#listenedPins = null
        if (this.enteredPin && this.linkValid) {
            if (this.#knotPin) {
                const otherPin = this.#knotPin !== this.link.source ? this.link.source : this.enteredPin
                // Knot pin direction correction
                if (this.#knotPin.isInput() && otherPin.isInput() || this.#knotPin.isOutput() && otherPin.isOutput()) {
                    const oppositePin = /** @type {KnotPinTemplate} */(this.#knotPin.template).getOppositePin()
                    if (this.#knotPin === this.link.source) {
                        this.link.source = oppositePin
                    } else {
                        this.enteredPin = oppositePin
                    }
                }
            } else if (this.enteredPin.nodeElement.getType() === Configuration.paths.knot) {
                this.enteredPin = /** @type {KnotPinTemplate} */(this.enteredPin.template).getOppositePin()
            }
            if (!this.link.source.getLinks().find(ref => ref.equals(this.enteredPin.createPinReference()))) {
                this.blueprint.addGraphElement(this.link)
                this.link.destination = this.enteredPin
            } else {
                this.link.remove()
            }
        } else {
            this.link.remove()
        }
        this.enteredPin = null
        this.link.removeMessage()
        this.link.finishDragging()
        this.link = null
    }
}
