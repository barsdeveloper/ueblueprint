import Configuration from "../../Configuration"
import Pointing from "./Pointing"

/**
 * This class manages the ui gesture of mouse click and drag. Tha actual operations are implemented by the subclasses.
 */
export default class MouseClickDrag extends Pointing {

    #mouseDownHandler = _ => { }
    #mouseStartedMovingHandler
    #mouseMoveHandler
    #mouseUpHandler
    #trackingMouse = false

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.clickButton = options?.clickButton ?? 0
        this.exitAnyButton = options?.exitAnyButton ?? true
        this.moveEverywhere = options?.moveEverywhere ?? false
        this.looseTarget = options?.looseTarget ?? false
        this.consumeClickEvent = options?.consumeClickEvent ?? true
        this.started = false
        this.clickedPosition = [0, 0]

        const movementListenedElement = this.moveEverywhere ? document.documentElement : this.movementSpace
        let self = this

        /**
         * 
         * @param {MouseEvent} e 
         */
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
                        self.started = false
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

        /**
         * 
         * @param {MouseEvent} e 
         */
        this.#mouseStartedMovingHandler = e => {
            e.preventDefault()
            // Delegate from now on to self.#mouseMoveHandler
            movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler)
            movementListenedElement.addEventListener("mousemove", self.#mouseMoveHandler)

            // Do actual actions
            self.startDrag()
            self.started = true
            const dragEvent = self.getEvent(Configuration.trackingMouseEventName.begin)
            // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
            self.#trackingMouse = this.target.dispatchEvent(dragEvent) == false
        }

        this.#mouseMoveHandler = e => {
            e.preventDefault()
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
                // Remove the handlers of "mousemove" and "mouseup"
                movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler)
                movementListenedElement.removeEventListener("mousemove", self.#mouseMoveHandler)
                document.removeEventListener("mouseup", self.#mouseUpHandler)
                self.endDrag()
                if (self.#trackingMouse) {
                    const dragEvent = self.getEvent(Configuration.trackingMouseEventName.end)
                    this.target.dispatchEvent(dragEvent)
                    self.#trackingMouse = false
                }
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

    startDrag() {
    }

    dragTo(location, movement) {
    }

    endDrag() {
    }
}
