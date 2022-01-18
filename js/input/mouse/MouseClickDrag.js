import Pointing from "./Pointing"

/**
 * This class manages the ui gesture of mouse click and drag. Tha actual operations are implemented by the subclasses.
 */
export default class MouseClickDrag extends Pointing {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.clickButton = options?.clickButton ?? 0
        this.exitAnyButton = options?.exitAnyButton ?? true
        this.moveEverywhere = options?.moveEverywhere ?? false
        this.looseTarget = options?.looseTarget ?? false
        this.started = false
        this.clickedPosition = [0, 0]

        const movementListenedElement = this.moveEverywhere ? document.documentElement : this.movementSpace
        let self = this

        this.mouseDownHandler = e => {
            this.blueprint.setFocused(true)
            switch (e.button) {
                case self.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.looseTarget || e.target == e.currentTarget) {
                        e.preventDefault()
                        e.stopPropagation()
                        self.started = false
                        // Attach the listeners
                        movementListenedElement.addEventListener("mousemove", self.mouseStartedMovingHandler)
                        document.addEventListener("mouseup", self.mouseUpHandler)
                        self.clickedPosition = self.locationFromEvent(e)
                        self.clicked(self.clickedPosition)
                        return true
                    }
                    break
                default:
                    if (!self.exitAnyButton) {
                        self.mouseUpHandler(e)
                    }
                    break
            }
            return false
        }

        this.mouseStartedMovingHandler = e => {
            e.preventDefault()
            e.stopPropagation()

            // Delegate from now on to self.mouseMoveHandler
            movementListenedElement.removeEventListener("mousemove", self.mouseStartedMovingHandler)
            movementListenedElement.addEventListener("mousemove", self.mouseMoveHandler)

            // Do actual actions
            self.startDrag()
            self.started = true
        }

        this.mouseMoveHandler = e => {
            e.preventDefault()
            e.stopPropagation()
            const location = self.locationFromEvent(e)
            const movement = [e.movementX, e.movementY]
            self.dragTo(location, movement)
        }

        this.mouseUpHandler = e => {
            if (!self.exitAnyButton || e.button == self.clickButton) {
                // Remove the handlers of "mousemove" and "mouseup"
                movementListenedElement.removeEventListener("mousemove", self.mouseStartedMovingHandler)
                movementListenedElement.removeEventListener("mousemove", self.mouseMoveHandler)
                document.removeEventListener("mouseup", self.mouseUpHandler)
                self.endDrag()
            }
        }

        this.target.addEventListener("mousedown", this.mouseDownHandler)
        if (this.clickButton == 2) {
            this.target.addEventListener("contextmenu", this.preventDefault)
        }
    }

    preventDefault(e) {
        e.preventDefault()
    }

    unlistenDOMElement() {
        super.unlistenDOMElement()
        this.target.removeEventListener("mousedown", this.mouseDownHandler)
        if (this.clickButton == 2) {
            this.target.removeEventListener("contextmenu", this.preventDefault)
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
