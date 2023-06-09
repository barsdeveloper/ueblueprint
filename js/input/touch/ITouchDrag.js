import Configuration from "../../Configuration.js"
import ITouch from "./ITouch.js"

/**
 * @typedef {import("../../Blueprint.js").default} Blueprint
 * @typedef {import("../../element/IElement.js").default} IElement
 * @typedef {import("./ITouch.js").TouchLocations } TouchLocations
 */

/**
 * @template {IElement} T
 * @extends {ITouch<T>}
 */
export default class ITouchDrag extends ITouch {

    /** @type {TouchLocations} */
    #previousClientLocation = {}

    /** @param {TouchEvent} e  */
    #touchStartHandler = e => {
        let touchIds = this.availableTouches(e)
        if (
            this.options.strictTarget && e.target !== e.currentTarget
            || touchIds.length < this.options.touchpointsCount
        ) {
            return
        }
        if (touchIds.length > this.options.touchpointsCount) {
            // Get just the touches needed
            touchIds = touchIds.filter((v, i) => i < this.options.touchpointsCount)
        }
        touchIds.forEach(v => this.captureTouch(v))
        // Attach the listeners
        this.#movementListenedElement.addEventListener("touchmove", this.#touchStartedMovingHandler)
        document.addEventListener("touchend", this.#touchEndHandler)
        this.#previousClientLocation = this.clientLocationsFromEvent(e)
    }

    /** @param {TouchEvent} e  */
    #touchStartedMovingHandler = e => {
        if (this.options.consumeEvent) {
            e.stopImmediatePropagation()
            e.preventDefault()
        }
        // Delegate from now on to this.#touchMoveHandler
        this.#movementListenedElement.removeEventListener("touchmove", this.#touchStartedMovingHandler)
        this.#movementListenedElement.addEventListener("touchmove", this.#touchMoveHandler)
        // Do actual actions
        const locations = this.locationsFromEvent(e)
        this.startDrag(locations)
        this.#previousClientLocation = this.clientLocationsFromEvent(e)
        this.started = true
    }

    /** @param {TouchEvent} e  */
    #touchMoveHandler = e => {
        if (this.options.consumeEvent) {
            e.stopImmediatePropagation()
            e.preventDefault()
        }
        const locations = this.locationsFromEvent(e)
        const newClientLocations = this.clientLocationsFromEvent(e)
        this.dragTo(
            locations,
            ITouchDrag.computeOffsets(this.#previousClientLocation, newClientLocations)
        )
        this.#previousClientLocation = newClientLocations
    }

    /** @param {TouchEvent} e  */
    #touchEndHandler = e => {
        this.releaseMissingTouches(e)
        if (Object.keys(this.touchLocations).length >= this.options.touchpointsCount) {
            return
        }
        this.#movementListenedElement.removeEventListener("touchmove", this.#touchStartHandler)
        this.#movementListenedElement.removeEventListener("touchmove", this.#touchMoveHandler)
        if (this.started) {
            this.endDrag()
        }
        this.started = false
    }

    #movementListenedElement
    #draggableElement

    clickedOffset = [0, 0]
    clickedPosition = [0, 0]
    lastLocation = [0, 0]
    started = false

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.touchpointsCount ??= 1
        options.consumeEvent ??= false
        options.draggableElement ??= target
        options.moveEverywhere ??= false
        options.movementSpace ??= blueprint?.getGridDOMElement()
        options.scrollGraphEdge ??= false
        super(target, blueprint, options)
        this.stepSize = parseInt(options?.stepSize ?? Configuration.gridSize)
        this.#movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace
        this.#draggableElement = /** @type {HTMLElement} */(this.options.draggableElement)
        this.listenEvents()
    }

    /**
     * @param {TouchLocations} from
     * @param {TouchLocations} to
     */
    static computeOffsets(from, to) {
        /** @type {TouchLocations} */
        const result = {}
        for (const id in from) {
            result[id] = [
                to[id][0] - from[id][0],
                to[id][1] - from[id][1],
            ]
        }
        return result
    }

    listenEvents() {
        super.listenEvents()
        this.#draggableElement.addEventListener("touchstart", this.#touchStartHandler)
    }

    unlistenEvents() {
        super.unlistenEvents()
        this.#draggableElement.removeEventListener("mousedown", this.#touchStartHandler)
    }

    /* Subclasses will override the following methods */
    /** @param {TouchLocations} locations */
    touched(locations) {
    }

    /** @param {TouchLocations} locations */
    startDrag(locations) {
    }

    /**
     * @param {TouchLocations} locations
     * @param {TouchLocations} offsets
     */
    dragTo(locations, offsets) {
    }

    endDrag() {
    }

    untouched() {
    }
}
