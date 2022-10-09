import IMouseClickDrag from "./IMouseClickDrag"
import Utility from "../../Utility"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {IDraggableElement} T
 * @extends {IMouseClickDrag<T>}
 */
export default class MouseMoveDraggable extends IMouseClickDrag {

    clicked(location) {
        if (this.options.repositionClickOffset) {
            this.target.setLocation(this.stepSize > 1
                ? Utility.snapToGrid(location, this.stepSize)
                : location
            )
        }
    }

    dragTo(location, offset) {
        const targetLocation = [this.target.locationX, this.target.locationY]
        const [adjustedLocation, adjustedTargetLocation] = this.stepSize > 1
            ? [Utility.snapToGrid(location, this.stepSize), Utility.snapToGrid(targetLocation, this.stepSize)]
            : [location, targetLocation]
        offset = [
            adjustedLocation[0] - this.mouseLocation[0],
            adjustedLocation[1] - this.mouseLocation[1]
        ]
        if (offset[0] == 0 && offset[1] == 0) {
            return
        }
        // Make sure it snaps on the grid
        offset[0] += adjustedTargetLocation[0] - this.target.locationX
        offset[1] += adjustedTargetLocation[1] - this.target.locationY
        this.dragAction(adjustedLocation, offset)
        // Reassign the position of mouse
        this.mouseLocation = adjustedLocation
    }

    dragAction(location, offset) {
        this.target.addLocation(offset)
    }
}
