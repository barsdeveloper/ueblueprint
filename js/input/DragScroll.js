import MouseClickDrag from "./MouseClickDrag"

export default class DragScroll extends MouseClickDrag {

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
