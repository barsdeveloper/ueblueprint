// @ts-check

import IMouseClickDrag from "./IMouseClickDrag"
import Utility from "../../Utility"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 */

/**
 * @extends {IMouseClickDrag<ISelectableDraggableElement>}
 */
export default class MouseMoveNodes extends IMouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.stepSize = parseInt(options?.stepSize ?? this.blueprint.gridSize)
        this.mouseLocation = [0, 0]
    }

    startDrag() {
        // Get the current mouse position
        this.mouseLocation = Utility.snapToGrid(this.clickedPosition, this.stepSize)

        if (!this.target.selected) {
            this.blueprint.unselectAll()
            this.target.setSelected(true)
        }
    }

    dragTo(location, movement) {
        const [mouseLocation, targetLocation] = this.stepSize > 1
            ? [Utility.snapToGrid(location, this.stepSize), Utility.snapToGrid(this.target.location, this.stepSize)]
            : [location, this.target.location]
        const d = [
            mouseLocation[0] - this.mouseLocation[0],
            mouseLocation[1] - this.mouseLocation[1]
        ]

        if (d[0] == 0 && d[1] == 0) {
            return
        }

        // Make sure it snaps on the grid
        d[0] += targetLocation[0] - this.target.location[0]
        d[1] += targetLocation[1] - this.target.location[1]

        this.target.dispatchDragEvent(d)

        // Reassign the position of mouse
        this.mouseLocation = mouseLocation
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll()
            this.target.setSelected(true)
        }
    }
}
