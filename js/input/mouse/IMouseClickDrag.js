import Configuration from "../../Configuration"
import IPointing from "./IPointing"
import Utility from "../../Utility"

/** @typedef {import("../../Blueprint").default} Blueprint */

/**
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
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
    #movementListenedElement
    #draggableElement

    started = false
    stepSize = 1
    clickedPosition = [0, 0]
    mouseLocation = [0, 0]

    /**
     * 
     * @param {T} target 
     * @param {Blueprint} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0
        options.consumeEvent ??= true
        options.draggableElement ??= target
        options.exitAnyButton ??= true
        options.looseTarget ??= false
        options.moveEverywhere ??= false
        options.movementSpace ??= blueprint?.getGridDOMElement()
        options.repositionClickOffset ??= false
        super(target, blueprint, options)
        this.stepSize = parseInt(options?.stepSize ?? Configuration.gridSize)

        this.#movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace
        this.#draggableElement = this.options.draggableElement
        let self = this

        this.#mouseDownHandler = e => {
            self.blueprint.setFocused(true)
            switch (e.button) {
                case self.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.options.looseTarget || e.target == e.currentTarget) {
                        if (self.options.consumeEvent) {
                            e.stopImmediatePropagation() // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        self.#movementListenedElement.addEventListener("mousemove", self.#mouseStartedMovingHandler)
                        document.addEventListener("mouseup", self.#mouseUpHandler)
                        self.clickedPosition = self.locationFromEvent(e)
                        self.clicked(self.clickedPosition)
                    }
                    break
                default:
                    if (!self.options.exitAnyButton) {
                        self.#mouseUpHandler(e)
                    }
                    break
            }
        }

        this.#mouseStartedMovingHandler = e => {
            if (self.options.consumeEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            // Delegate from now on to self.#mouseMoveHandler
            self.#movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler)
            self.#movementListenedElement.addEventListener("mousemove", self.#mouseMoveHandler)
            // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
            const dragEvent = self.getEvent(Configuration.trackingMouseEventName.begin)
            self.#trackingMouse = self.target.dispatchEvent(dragEvent) == false
            const location = self.locationFromEvent(e)
            // Do actual actions
            this.mouseLocation = Utility.snapToGrid(this.clickedPosition, this.stepSize)
            self.startDrag(location)
            self.started = true
        }

        this.#mouseMoveHandler = e => {
            if (self.options.consumeEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            const location = self.locationFromEvent(e)
            const movement = [e.movementX, e.movementY]
            self.dragTo(location, movement)
            if (self.#trackingMouse) {
                self.blueprint.mousePosition = self.locationFromEvent(e)
            }
        }

        this.#mouseUpHandler = e => {
            if (!self.options.exitAnyButton || e.button == self.options.clickButton) {
                if (self.options.consumeEvent) {
                    e.stopImmediatePropagation() // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                self.#movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler)
                self.#movementListenedElement.removeEventListener("mousemove", self.#mouseMoveHandler)
                document.removeEventListener("mouseup", self.#mouseUpHandler)
                if (self.started) {
                    self.endDrag()
                }
                self.unclicked()
                if (self.#trackingMouse) {
                    const dragEvent = self.getEvent(Configuration.trackingMouseEventName.end)
                    self.target.dispatchEvent(dragEvent)
                    self.#trackingMouse = false
                }
                self.started = false
            }
        }

        this.listenEvents()
    }

    listenEvents() {
        this.#draggableElement.addEventListener("mousedown", this.#mouseDownHandler)
        if (this.options.clickButton == 2) {
            this.#draggableElement.addEventListener("contextmenu", e => e.preventDefault())
        }
    }

    unlistenEvents() {
        this.#draggableElement.removeEventListener("mousedown", this.#mouseDownHandler)
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

    /* Subclasses will override the following methods */
    clicked(location) {
    }

    startDrag(location) {
    }

    dragTo(location, offset) {
    }

    endDrag() {
    }

    unclicked(location) {
    }
}
