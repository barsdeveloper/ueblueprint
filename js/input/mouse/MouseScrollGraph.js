// @ts-check

import IMouseClickDrag from "./IMouseClickDrag"

export default class MouseScrollGraph extends IMouseClickDrag {

    startDrag() {
        this.blueprint.template.applyStartDragScrolling(this.blueprint)
    }

    dragTo(location, movement) {
        this.blueprint.scrollDelta([-movement[0], -movement[1]])
    }

    endDrag() {
        this.blueprint.template.applyEndDragScrolling(this.blueprint)
    }
}
