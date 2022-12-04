import Configuration from "../../Configuration"
import IDraggableElement from "../../element/IDraggableElement"
import IPointing from "./IPointing"
import Utility from "../../Utility"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/IElement").default} IElement
 */

/**
 * @template {IElement} T
 * @extends {IPointing<T>}
 */
export default class IMouseClickDrag extends IPointing {

    #mouseDownHandler =
        /** @param {MouseEvent} e  */
        e => {
            this.blueprint.setFocused(true)
            switch (e.button) {
                case this.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (!this.options.strictTarget || e.target == e.currentTarget) {
                        if (this.options.consumeEvent) {
                            e.stopImmediatePropagation() // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        this.#movementListenedElement.addEventListener("mousemove", this.#mouseStartedMovingHandler)
                        document.addEventListener("mouseup", this.#mouseUpHandler)
                        this.clickedPosition = this.locationFromEvent(e)
                        this.blueprint.mousePosition[0] = this.clickedPosition[0]
                        this.blueprint.mousePosition[1] = this.clickedPosition[1]
                        if (this.target instanceof IDraggableElement) {
                            this.clickedOffset = [
                                this.clickedPosition[0] - this.target.locationX,
                                this.clickedPosition[1] - this.target.locationY,
                            ]
                        }
                        this.clicked(this.clickedPosition)
                    }
                    break
                default:
                    if (!this.options.exitAnyButton) {
                        this.#mouseUpHandler(e)
                    }
                    break
            }
        }

    #mouseStartedMovingHandler =
        /** @param {MouseEvent} e  */
        e => {
            if (this.options.consumeEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            // Delegate from now on to this.#mouseMoveHandler
            this.#movementListenedElement.removeEventListener("mousemove", this.#mouseStartedMovingHandler)
            this.#movementListenedElement.addEventListener("mousemove", this.#mouseMoveHandler)
            // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
            const dragEvent = this.getEvent(Configuration.trackingMouseEventName.begin)
            this.#trackingMouse = this.target.dispatchEvent(dragEvent) == false
            const location = this.locationFromEvent(e)
            // Do actual actions
            this.lastLocation = Utility.snapToGrid(this.clickedPosition, this.stepSize)
            this.startDrag(location)
            this.started = true
        }

    #mouseMoveHandler =
        /** @param {MouseEvent} e  */
        e => {
            if (this.options.consumeEvent) {
                e.stopImmediatePropagation() // Captured, don't call anyone else
            }
            const location = this.locationFromEvent(e)
            const movement = [e.movementX, e.movementY]
            this.dragTo(location, movement)
            if (this.#trackingMouse) {
                this.blueprint.mousePosition = this.locationFromEvent(e)
            }
        }

    #mouseUpHandler =
        /** @param {MouseEvent} e  */
        e => {
            if (!this.options.exitAnyButton || e.button == this.options.clickButton) {
                if (this.options.consumeEvent) {
                    e.stopImmediatePropagation() // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                this.#movementListenedElement.removeEventListener("mousemove", this.#mouseStartedMovingHandler)
                this.#movementListenedElement.removeEventListener("mousemove", this.#mouseMoveHandler)
                document.removeEventListener("mouseup", this.#mouseUpHandler)
                if (this.started) {
                    this.endDrag()
                }
                this.unclicked()
                if (this.#trackingMouse) {
                    const dragEvent = this.getEvent(Configuration.trackingMouseEventName.end)
                    this.target.dispatchEvent(dragEvent)
                    this.#trackingMouse = false
                }
                this.started = false
            }
        }

    #trackingMouse = false
    #movementListenedElement
    #draggableElement

    clickedOffset = [0, 0]
    clickedPosition = [0, 0]
    lastLocation = [0, 0]
    started = false
    stepSize = 1

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0
        options.consumeEvent ??= true
        options.draggableElement ??= target
        options.exitAnyButton ??= true
        options.moveEverywhere ??= false
        options.movementSpace ??= blueprint?.getGridDOMElement()
        options.repositionOnClick ??= false
        options.strictTarget ??= false
        super(target, blueprint, options)
        this.stepSize = parseInt(options?.stepSize ?? Configuration.gridSize)
        this.#movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace
        this.#draggableElement = /** @type {HTMLElement} */(this.options.draggableElement)

        this.listenEvents()
    }

    listenEvents() {
        super.listenEvents()
        this.#draggableElement.addEventListener("mousedown", this.#mouseDownHandler)
        if (this.options.clickButton == 2) {
            this.#draggableElement.addEventListener("contextmenu", e => e.preventDefault())
        }
    }

    unlistenEvents() {
        super.unlistenEvents()
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
