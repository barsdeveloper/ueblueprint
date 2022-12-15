import MouseMoveDraggable from "./MouseMoveDraggable"

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/NodeElement").default} NodeElement
 * @typedef {import("../../template/CommentNodeTemplate").default} CommentNodeTemplate
 */

/** @extends {MouseMoveDraggable<NodeElement>} */
export default class MouseMoveNodes extends MouseMoveDraggable {

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
