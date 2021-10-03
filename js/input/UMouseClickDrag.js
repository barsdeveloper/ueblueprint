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
        this.started = false
        this.clickedPosition = [0, 0]
        let movementSpace = this.blueprint?.getGridDOMElement() ?? document
        let self = this

        this.mouseDownHandler = function (e) {
            switch (e.button) {
                case self.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.looseTarget || e.target == e.currentTarget) {
                        self.started = false
                        // Attach the listeners
                        movementSpace.addEventListener('mousemove', self.mouseStartedMovingHandler)
                        document.addEventListener('mouseup', self.mouseUpHandler)
                        self.clickedPosition = [e.offsetX, e.offsetY]
                        self.clicked(e)
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

            // Delegate from now on to self.mouseMoveHandler
            movementSpace.removeEventListener('mousemove', self.mouseStartedMovingHandler)
            movementSpace.addEventListener('mousemove', self.mouseMoveHandler)

            // Do actual actions
            self.startDrag(e)
            self.started = true
        }

        this.mouseMoveHandler = function (e) {
            e.preventDefault()
            self.dragTo(e)
        }

        this.mouseUpHandler = function (e) {
            if (!self.exitAnyButton || e.button == self.clickButton) {
                // Remove the handlers of `mousemove` and `mouseup`
                movementSpace.removeEventListener('mousemove', self.mouseStartedMovingHandler)
                movementSpace.removeEventListener('mousemove', self.mouseMoveHandler)
                document.removeEventListener('mouseup', self.mouseUpHandler)
                self.endDrag(e)
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

    unlistenDOMElement() {
        this.target.removeEventListener('mousedown', this.mouseDownHandler)
        if (this.clickButton == 2) {
            this.target.removeEventListener('contextmenu', this.preventDefault)
        }
    }

    /* Subclasses will override the following methods */
    clicked(e) {
    }

    startDrag(e) {
    }

    dragTo(e) {
    }

    endDrag(e) {
    }
}