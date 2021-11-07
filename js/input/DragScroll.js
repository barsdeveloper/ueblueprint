import MouseClickDrag from "./MouseClickDrag"

export default class DragScroll extends MouseClickDrag {

    dragTo(location, movement) {
        this.blueprint.scrollDelta([-movement[0], -movement[1]])
    }
}
