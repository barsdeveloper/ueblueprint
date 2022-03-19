import Configuration from "../../Configuration"
import IPointing from "./IPointing"

/**
 * This class manages the ui gesture of mouse click and drag. Tha actual operations are implemented by the subclasses.
 */
export default class IMouseClickDrag extends IPointing {

    /** @type {(e: MouseEvent) => void} */
    #mouseDownHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseStartedMovingHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseMoveHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseUpHandler

    #trackingMouse = false

    started = false

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.clickButton = options?.clickButton ?? 0
        this.exitAnyButton = options?.exitAnyButton ?? true
        this.moveEverywhere = options?.moveEverywhere ?? false
        this.looseTarget = options?.looseTarget ?? false
        this.consumeClickEvent = options?.consumeClickEvent ?? true
        this.clickedPosition = [0, 0]

        const movementListenedElement = this.moveEverywhere ? document.documentElement : this.movementSpace
        let self = this

        this.#mouseDownHandler = e => {
            this.blueprint.setFocused(true)
            switch (e.button) {
                case self.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.looseTarget || e.target == e.currentTarget) {
                        e.preventDefault()
                        if (this.consumeClickEvent) {
                            e.stopImmediatePropagation() // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        movementListenedElement.addEventListener("mousemove", self.#mouseStartedMovingHandler)
                        document.addEventListener("mouseup", self.#mouseUpHandler)
                        self.clickedPosition = self.locationFromEvent(e)
                        self.clicked(self.clickedPosition)
                    }
                    break
                default:
                    if (!self.exitAnyButton) {
                        self.#mouseUpHandler(e)
                    }
                    break
            }
        }

        this.#mouseStartedMovingHandler = e => {
            e.preventDefault()
            if (this.consumeClickEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            // Delegate from now on to self.#mouseMoveHandler
            movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler)
            movementListenedElement.addEventListener("mousemove", self.#mouseMoveHandler)
            // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
            const dragEvent = self.getEvent(Configuration.trackingMouseEventName.begin)
            self.#trackingMouse = this.target.dispatchEvent(dragEvent) == false
            // Do actual actions
            self.startDrag()
            self.started = true
        }

        this.#mouseMoveHandler = e => {
            e.preventDefault()
            if (this.consumeClickEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            const location = self.locationFromEvent(e)
            const movement = [e.movementX, e.movementY]
            self.dragTo(location, movement)
            if (self.#trackingMouse) {
                self.blueprint.entity.mousePosition = self.locationFromEvent(e)
            }
        }

        this.#mouseUpHandler = e => {
            if (!self.exitAnyButton || e.button == self.clickButton) {
                e.preventDefault()
                if (this.consumeClickEvent) {
                    e.stopImmediatePropagation() // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler)
                movementListenedElement.removeEventListener("mousemove", self.#mouseMoveHandler)
                document.removeEventListener("mouseup", self.#mouseUpHandler)
                if (self.started) {
                    self.endDrag()
                }
                if (self.#trackingMouse) {
                    const dragEvent = self.getEvent(Configuration.trackingMouseEventName.end)
                    this.target.dispatchEvent(dragEvent)
                    self.#trackingMouse = false
                }
                self.started = false
            }
        }

        this.target.addEventListener("mousedown", this.#mouseDownHandler)
        if (this.clickButton == 2) {
            this.target.addEventListener("contextmenu", e => e.preventDefault())
        }
    }

    getEvent(eventName) {
        return new CustomEvent(eventName, {
            detail: {
                tracker: this
            },
            bubbles: true,
            cancelable: true
        })
    }

    unlistenDOMElement() {
        super.unlistenDOMElement()
        this.target.removeEventListener("mousedown", this.#mouseDownHandler)
        if (this.clickButton == 2) {
            this.target.removeEventListener("contextmenu", e => e.preventDefault())
        }
    }

    /* Subclasses will override the following methods */
    clicked(location) {
    }

    startDrag(location) {
    }

    dragTo(location, movement) {
    }

    endDrag() {
    }
}
