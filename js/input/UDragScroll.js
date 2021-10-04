import UMouseClickDrag from "./UMouseClickDrag"

export default class UDragScroll extends UMouseClickDrag {

    dragTo(location, movement) {
        this.blueprint.scrollDelta([-movement[0], -movement[1]])
    }

}