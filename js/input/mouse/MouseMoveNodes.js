import MouseMoveDraggable from "./MouseMoveDraggable.js"

/** @typedef {import("./IMouseClickDrag.js").Options} Options */

/** @extends {MouseMoveDraggable<NodeElement>} */
export default class MouseMoveNodes extends MouseMoveDraggable {

    /**
     * @param {NodeElement} target
     * @param {Blueprint} blueprint
     * @param {Options} options
     */
    constructor(target, blueprint, options = {}) {
        super(target, blueprint, options)
        this.draggableElement.classList.add("ueb-draggable")
    }

    startDrag() {
        if (!this.target.selected) {
            this.blueprint.unselectAll()
            this.target.setSelected(true)
        }
    }

    dragAction(location, offset) {
        this.target.acknowledgeDrag(offset)
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll()
            this.target.setSelected(true)
        } else {
            this.blueprint.getNodes(true).forEach(node =>
                node.boundComments
                    .filter(comment => !node.isInsideComment(comment))
                    .forEach(comment => node.unbindFromComment(comment))
            )
            this.blueprint.getCommentNodes().forEach(comment =>
                /** @type {CommentNodeTemplate} */(comment.template).manageNodesBind()
            )
        }
    }
}
