import IMouseClickDrag from "./IMouseClickDrag.js"
import Utility from "../../Utility.js"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/IDraggableElement").default} IDraggableElement
 */

/**
 * @template {IDraggableElement} T
 * @extends {IMouseClickDrag<T>}
 */
export default class MouseMoveDraggable extends IMouseClickDrag {

    /** @param {[Number, Number]} location */
    clicked(location) {
        if (this.options.repositionOnClick) {
            this.target.setLocation(...(this.stepSize > 1
                ? Utility.snapToGrid(location[0], location[1], this.stepSize)
                : location
            ))
            this.clickedOffset = [0, 0]
        }
    }

    /**
     * @param {Number[]} location
     * @param {Number[]} offset
     */
    dragTo(location, offset) {
        const targetLocation = [
            this.target.locationX ?? this.lastLocation[0],
            this.target.locationY ?? this.lastLocation[1],
        ]
        const [adjustedLocation, adjustedTargetLocation] = this.stepSize > 1
            ? [
                Utility.snapToGrid(location[0], location[1], this.stepSize),
                Utility.snapToGrid(targetLocation[0], targetLocation[1], this.stepSize)
            ]
            : [location, targetLocation]
        offset = [
            adjustedLocation[0] - this.lastLocation[0],
            adjustedLocation[1] - this.lastLocation[1],
        ]
        if (offset[0] == 0 && offset[1] == 0) {
            return
        }
        // Make sure it snaps on the grid
        offset[0] += adjustedTargetLocation[0] - targetLocation[0]
        offset[1] += adjustedTargetLocation[1] - targetLocation[1]
        this.dragAction(adjustedLocation, offset)
        // Reassign the position of mouse
        this.lastLocation = adjustedLocation
    }

    /**
     * @param {Number[]} location
     * @param {Number[]} offset
     */
    dragAction(location, offset) {
        this.target.setLocation(location[0] - this.clickedOffset[0], location[1] - this.clickedOffset[1])
    }
}
