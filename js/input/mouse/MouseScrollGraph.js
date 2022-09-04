import IMouseClickDrag from "./IMouseClickDrag"

export default class MouseScrollGraph extends IMouseClickDrag {

    startDrag() {
        this.blueprint.scrolling = true
    }

    dragTo(location, movement) {
        this.blueprint.scrollDelta([-movement[0], -movement[1]])
    }

    endDrag() {
        this.blueprint.scrolling = false
    }
}
