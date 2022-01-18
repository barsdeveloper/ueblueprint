import GraphLink from "../../graph/GraphLink"
import MouseClickDrag from "./MouseClickDrag"

export default class MouseCreateLink extends MouseClickDrag {

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
        this.blueprint.nodesContainerElement.insertBefore(this.link, this.blueprint.selectorElement.nextElementSibling)
        this.blueprint.querySelectorAll("ueb-pin." + this.target.isInput() ? "output" : "input")
            .forEach(pin => {
                pin.addEventListener("mouseenter", this.#mouseenterHandler)
                pin.addEventListener("mouseleave", this.#mouseleaveHandler)
            })
    }

    dragTo(location, movement) {
        this.link.setDestinationLocation(location)
    }

    endDrag() {
        this.blueprint.querySelectorAll("ueb-pin." + this.target.isInput() ? "output" : "input")
            .forEach(pin => {
                pin.removeEventListener("mouseenter", this.#mouseenterHandler)
                pin.removeEventListener("mouseleave", this.#mouseleaveHandler)
            })
        if (this.enteredPin) {
            this.link.setDestinationPin(this.link)
        } else {
            // this.link.remove()
        }
        this.link = null
    }
}
