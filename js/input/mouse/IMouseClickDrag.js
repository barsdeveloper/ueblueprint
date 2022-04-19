// @ts-check

import Configuration from "../../Configuration"
import IPointing from "./IPointing"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 */

/**
 * This class manages the ui gesture of mouse click and drag. Tha actual operations are implemented by the subclasses.
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

    started = false

    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0
        options.consumeEvent ??= true
        options.exitAnyButton ??= true
        options.looseTarget ??= false
        options.moveEverywhere ??= false
        super(target, blueprint, options)
        this.clickedPosition = [0, 0]

        const movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace
        let self = this

        this.#mouseDownHandler = e => {
            this.blueprint.setFocused(true)
            switch (e.button) {
                case self.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.options.looseTarget || e.target == e.currentTarget) {
                        if (this.options.consumeEvent) {
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
                    if (!self.options.exitAnyButton) {
                        self.#mouseUpHandler(e)
                    }
                    break
            }
        }

        this.#mouseStartedMovingHandler = e => {
            if (this.options.consumeEvent) {
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
            if (this.options.consumeEvent) {
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
                if (this.options.consumeEvent) {
                    e.stopImmediatePropagation() // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler)
                movementListenedElement.removeEventListener("mousemove", self.#mouseMoveHandler)
                document.removeEventListener("mouseup", self.#mouseUpHandler)
                if (self.started) {
                    self.endDrag()
                }
                self.unclicked()
                if (self.#trackingMouse) {
                    const dragEvent = self.getEvent(Configuration.trackingMouseEventName.end)
                    this.target.dispatchEvent(dragEvent)
                    self.#trackingMouse = false
                }
                self.started = false
            }
        }

        this.listenEvents()
    }

    listenEvents() {
        this.target.addEventListener("mousedown", this.#mouseDownHandler)
        if (this.options.clickButton == 2) {
            this.target.addEventListener("contextmenu", e => e.preventDefault())
        }
    }

    unlistenEvents() {
        this.target.removeEventListener("mousedown", this.#mouseDownHandler)
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

    dragTo(location, movement) {
    }

    endDrag() {
    }

    unclicked(location) {
    }
}
