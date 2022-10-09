import MouseMoveDraggable from "./MouseMoveDraggable"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 */

/** @extends {MouseMoveDraggable<ISelectableDraggableElement>} */
export default class MouseMoveNodes extends MouseMoveDraggable {

    startDrag() {
        if (!this.target.selected) {
            this.blueprint.unselectAll()
            this.target.setSelected(true)
        }
    }

    dragAction(location, offset) {
        this.target.dispatchDragEvent(offset)
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll()
            this.target.setSelected(true)
        }
    }
}
