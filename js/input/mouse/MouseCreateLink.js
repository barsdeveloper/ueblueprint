import IMouseClickDrag from "./IMouseClickDrag"
import LinkElement from "../../element/LinkElement"
import LinkMessageElement from "../../element/LinkMessageElement"

/** 
 * @typedef {import("../../element/LinkElement").default} LinkElement
 * @typedef {import("../../element/PinElement").default} PinElement
 */
export default class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    /** @type {(e: MouseEvent) => void} */
    #mouseenterHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseleaveHandler

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        /** @type {PinElement} */
        this.target
        /** @type {LinkElement} */
        this.link
        /** @type {PinElement} */
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
        this.link = new LinkElement(this.target, null)
        this.link.setLinkMessage(LinkMessageElement.placeNode())
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
            this.link.setLinkMessage(null)
            this.blueprint.addGraphElement(this.link)
        } else {
            this.link.remove()
        }
        this.link = null
    }
}
