import Utility from "../Utility"

/**
 * This class manages the ui gesture of mouse click and drag. Tha actual operations are implemented by the subclasses.
 */
export default class UMouseClickDrag {
    constructor(target, blueprint, options) {
        this.target = target
        /** @type {import("../UEBlueprint").default}" */
        this.blueprint = blueprint
        this.clickButton = options?.clickButton ?? 0
        this.exitAnyButton = options?.exitAnyButton ?? true
        this.looseTarget = options?.looseTarget ?? false
        this.moveEverywhere = options?.moveEverywhere ?? false
        this.movementSpace = this.blueprint?.getGridDOMElement() ?? document.documentElement
        this.started = false
        this.clickedPosition = [0, 0]
        const movementListenedElement = this.moveEverywhere ? document.documentElement : this.movementSpace
        let self = this

        this.mouseDownHandler = function (e) {
            switch (e.button) {
                case self.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.looseTarget || e.target == e.currentTarget) {
                        e.stopPropagation()
                        self.started = false
                        // Attach the listeners
                        movementListenedElement.addEventListener('mousemove', self.mouseStartedMovingHandler)
                        document.addEventListener('mouseup', self.mouseUpHandler)
                        self.clickedPosition = self.adjustScale(self.adjustLocation([e.clientX, e.clientY]))
                        self.clicked(self.clickedPosition)
                    }
                    break
                default:
                    if (!self.exitAnyButton) {
                        self.mouseUpHandler(e)
                    }
                    break
            }
        }

        this.mouseStartedMovingHandler = function (e) {
            e.preventDefault()
            e.stopPropagation()

            // Delegate from now on to self.mouseMoveHandler
            movementListenedElement.removeEventListener('mousemove', self.mouseStartedMovingHandler)
            movementListenedElement.addEventListener('mousemove', self.mouseMoveHandler)

            // Do actual actions
            self.startDrag()
            self.started = true
        }

        this.mouseMoveHandler = function (e) {
            e.preventDefault()
            e.stopPropagation()
            const offset = self.adjustScale(self.adjustLocation([e.clientX, e.clientY]))
            const movement = [e.movementX, e.movementY]
            self.dragTo(offset, movement)
        }

        this.mouseUpHandler = function (e) {
            if (!self.exitAnyButton || e.button == self.clickButton) {
                // Remove the handlers of "mousemove" and "mouseup"
                movementListenedElement.removeEventListener('mousemove', self.mouseStartedMovingHandler)
                movementListenedElement.removeEventListener('mousemove', self.mouseMoveHandler)
                document.removeEventListener('mouseup', self.mouseUpHandler)
                self.endDrag()
            }
        }

        this.target.addEventListener('mousedown', this.mouseDownHandler)
        if (this.clickButton == 2) {
            this.target.addEventListener('contextmenu', this.preventDefault)
        }
    }

    preventDefault(e) {
        e.preventDefault()
    }

    adjustLocation(location) {
        const targetOffset = this.movementSpace.getBoundingClientRect()
        location = [
            (location[0] - targetOffset.x),
            (location[1] - targetOffset.y)
        ]
        return location
    }

    adjustScale(location) {
        let scaleCorrection = 1 / Utility.getScale(this.target)
        location = [
            location[0] * scaleCorrection,
            location[1] * scaleCorrection
        ]
        return location
    }

    unlistenDOMElement() {
        this.target.removeEventListener('mousedown', this.mouseDownHandler)
        if (this.clickButton == 2) {
            this.target.removeEventListener('contextmenu', this.preventDefault)
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