import Configuration from "../../Configuration.js"
import IDraggableElement from "../../element/IDraggableElement.js"
import IPointing from "./IPointing.js"
import Utility from "../../Utility.js"

/**
 * @typedef {import("./IPointing.js").Options & {
 *     clickButton?: Number,
 *     consumeEvent?: Boolean,
 *     draggableElement?: IElement,
 *     exitAnyButton?: Boolean,
 *     moveEverywhere?: Boolean,
 *     movementSpace?: HTMLElement,
 *     repositionOnClick?: Boolean,
 *     scrollGraphEdge?: Boolean,
 *     strictTarget?: Boolean,
 *     stepSize?: Number,
 * }} Options
 */

/**
 * @template {IElement} T
 * @extends {IPointing<T>}
 */
export default class IMouseClickDrag extends IPointing {

    /** @param {MouseEvent} e  */
    #mouseDownHandler = e => {
        this.blueprint.setFocused(true)
        switch (e.button) {
            case this.options.clickButton:
                // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                if (!this.options.strictTarget || e.target == e.currentTarget) {
                    if (this.consumeEvent) {
                        e.stopImmediatePropagation() // Captured, don't call anyone else
                    }
                    // Attach the listeners
                    this.#movementListenedElement.addEventListener("mousemove", this.#mouseStartedMovingHandler)
                    document.addEventListener("mouseup", this.#mouseUpHandler)
                    this.setLocationFromEvent(e)
                    this.clickedPosition[0] = this.location[0]
                    this.clickedPosition[1] = this.location[1]
                    this.blueprint.mousePosition[0] = this.location[0]
                    this.blueprint.mousePosition[1] = this.location[1]
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

    /** @param {MouseEvent} e  */
    #mouseStartedMovingHandler = e => {
        if (this.consumeEvent) {
            e.stopImmediatePropagation() // Captured, don't call anyone else
        }
        // Delegate from now on to this.#mouseMoveHandler
        this.#movementListenedElement.removeEventListener("mousemove", this.#mouseStartedMovingHandler)
        this.#movementListenedElement.addEventListener("mousemove", this.#mouseMoveHandler)
        // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
        const dragEvent = this.getEvent(Configuration.trackingMouseEventName.begin)
        this.#trackingMouse = this.target.dispatchEvent(dragEvent) == false
        this.setLocationFromEvent(e)
        // Do actual actions
        this.lastLocation = Utility.snapToGrid(this.clickedPosition[0], this.clickedPosition[1], this.stepSize)
        this.startDrag(this.location)
        this.started = true
    }

    /** @param {MouseEvent} e  */
    #mouseMoveHandler = e => {
        if (this.consumeEvent) {
            e.stopImmediatePropagation() // Captured, don't call anyone else
        }
        const location = this.setLocationFromEvent(e)
        const movement = [e.movementX, e.movementY]
        this.dragTo(location, movement)
        if (this.#trackingMouse) {
            this.blueprint.mousePosition = location
        }
        if (this.options.scrollGraphEdge) {
            const movementNorm = Math.sqrt(movement[0] * movement[0] + movement[1] * movement[1])
            const threshold = this.blueprint.scaleCorrect(Configuration.edgeScrollThreshold)
            const leftThreshold = this.blueprint.template.gridLeftVisibilityBoundary() + threshold
            const rightThreshold = this.blueprint.template.gridRightVisibilityBoundary() - threshold
            let scrollX = 0
            if (location[0] < leftThreshold) {
                scrollX = location[0] - leftThreshold
            } else if (location[0] > rightThreshold) {
                scrollX = location[0] - rightThreshold
            }
            const topThreshold = this.blueprint.template.gridTopVisibilityBoundary() + threshold
            const bottomThreshold = this.blueprint.template.gridBottomVisibilityBoundary() - threshold
            let scrollY = 0
            if (location[1] < topThreshold) {
                scrollY = location[1] - topThreshold
            } else if (location[1] > bottomThreshold) {
                scrollY = location[1] - bottomThreshold
            }
            scrollX = Utility.clamp(this.blueprint.scaleCorrectReverse(scrollX) ** 3 * movementNorm * 0.6, -20, 20)
            scrollY = Utility.clamp(this.blueprint.scaleCorrectReverse(scrollY) ** 3 * movementNorm * 0.6, -20, 20)
            this.blueprint.scrollDelta(scrollX, scrollY)
        }
    }

    /** @param {MouseEvent} e  */
    #mouseUpHandler = e => {
        if (!this.options.exitAnyButton || e.button == this.options.clickButton) {
            if (this.consumeEvent) {
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
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        options.clickButton ??= Configuration.mouseClickButton
        options.consumeEvent ??= true
        options.draggableElement ??= target
        options.exitAnyButton ??= true
        options.moveEverywhere ??= false
        options.movementSpace ??= blueprint?.getGridDOMElement()
        options.repositionOnClick ??= false
        options.scrollGraphEdge ??= false
        options.strictTarget ??= false
        super(target, blueprint, options)
        this.stepSize = Number(options.stepSize ?? Configuration.gridSize)
        this.#movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace
        this.#draggableElement = /** @type {HTMLElement} */(this.options.draggableElement)

        this.listenEvents()
    }

    listenEvents() {
        super.listenEvents()
        this.#draggableElement.addEventListener("mousedown", this.#mouseDownHandler)
        if (this.options.clickButton === Configuration.mouseRightClickButton) {
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
