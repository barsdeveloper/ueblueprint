import IMouseClickDrag from "./IMouseClickDrag.js"

export default class MouseScrollGraph extends IMouseClickDrag {

    startDrag() {
        this.blueprint.scrolling = true
    }

    /**
     * @param {Coordinates} location
     * @param {Coordinates} movement
     */
    dragTo(location, movement) {
        this.blueprint.scrollDelta(-movement[0], -movement[1])
    }

    endDrag() {
        this.blueprint.scrolling = false
    }
}
