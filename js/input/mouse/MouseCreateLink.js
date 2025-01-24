import Configuration from "../../Configuration.js"
import ElementFactory from "../../element/ElementFactory.js"
import IMouseClickDrag from "./IMouseClickDrag.js"

/**
 * @typedef {import("./IMouseClickDrag.js").Options & {
 *     scrollGraphEdge?: Boolean,
* }} Options
*/

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
            const a = this.link.origin ?? this.target // Remember target might have change
            const b = this.enteredPin
            const outputPin = a.isOutput() ? a : b
            if (a.isKnot() || b.isKnot()) {
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
                (a.entity.PinType.PinCategory.valueOf() != "object" || b.entity.PinType.PinCategory.valueOf() != "object")
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
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.scrollGraphEdge ??= true
        super(target, blueprint, options)
    }

    startDrag(location) {
        if (this.target.isKnot()) {
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
        this.link.setTargetLocation(location)
    }

    dragTo(location, movement) {
        this.link.setTargetLocation(location)
    }

    endDrag() {
        this.#listenedPins.forEach(pin => {
            pin.removeEventListener("mouseenter", this.#mouseenterHandler)
            pin.removeEventListener("mouseleave", this.#mouseleaveHandler)
        })
        this.#listenedPins = null
        if (this.enteredPin && this.linkValid) {
            // Knot can use wither the input or output (by default) part indifferently, check if a switch is needed
            if (this.#knotPin) {
                const otherPin = this.#knotPin !== this.link.origin ? this.link.origin : this.enteredPin
                // Knot pin direction correction
                if (this.#knotPin.isInput() && otherPin.isInput() || this.#knotPin.isOutput() && otherPin.isOutput()) {
                    const oppositePin = /** @type {KnotPinTemplate} */(this.#knotPin.template).getoppositePin()
                    if (this.#knotPin === this.link.origin) {
                        this.link.origin = oppositePin
                    } else {
                        this.enteredPin = oppositePin
                    }
                }
            } else if (this.enteredPin.isKnot()) {
                this.#knotPin = this.enteredPin
                if (this.link.origin.isOutput()) {
                    // Knot uses by default the output pin, let's switch to keep it coherent with the origin node we have
                    this.enteredPin = /** @type {KnotPinTemplate} */(this.enteredPin.template).getoppositePin()
                }
            }
            if (!this.link.origin.getLinks().find(ref => ref.equals(this.enteredPin.createPinReference()))) {
                this.blueprint.addGraphElement(this.link)
                this.link.target = this.enteredPin
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
        this.#knotPin = null
    }
}
