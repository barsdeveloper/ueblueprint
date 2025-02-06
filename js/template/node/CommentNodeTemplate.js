import { html } from "lit"
import Configuration from "../../Configuration.js"
import Utility from "../../Utility.js"
import IResizeableTemplate from "../IResizeableTemplate.js"

export default class CommentNodeTemplate extends IResizeableTemplate {

    #selectableAreaHeight = 0

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        element.classList.add("ueb-node-style-comment", "ueb-node-resizeable")
        element.sizeX = 25 * Configuration.gridSize
        element.sizeY = 6 * Configuration.gridSize
        super.initialize(element) // Keep it at the end because it needs the color. this.#color must be initialized
    }

    /** @returns {HTMLElement} */
    getDraggableElement() {
        return this.element.querySelector(".ueb-node-top")
    }

    render() {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top"
                        .innerText="${Utility.encodeHTMLWhitespace(this.element.entity.NodeComment?.toString())}">
                    </div>
                </div>
            </div>
        `
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        const bounding = this.getDraggableElement().getBoundingClientRect()
        this.#selectableAreaHeight = bounding.height
    }

    manageNodesBind() {
        let nodes = this.blueprint.getNodes()
        for (let node of nodes) {
            if (
                node.topBoundary() >= this.element.topBoundary()
                && node.rightBoundary() <= this.element.rightBoundary()
                && node.bottomBoundary() <= this.element.bottomBoundary()
                && node.leftBoundary() >= this.element.leftBoundary()
            ) {
                node.bindToComment(this.element)
            } else {
                node.unbindFromComment(this.element)
            }
        }
    }

    /** @param {Number} value */
    setSizeX(value) {
        value = Math.round(value)
        if (value >= 2 * Configuration.gridSize) {
            this.element.setNodeWidth(value)
            return true
        }
        return false
    }

    /** @param {Number} value */
    setSizeY(value) {
        value = Math.round(value)
        if (value >= 2 * Configuration.gridSize) {
            this.element.setNodeHeight(value)
            return true
        }
        return false
    }

    endResize() {
        this.manageNodesBind()
    }

    topBoundary(justSelectableArea = false) {
        return this.element.locationY
    }

    rightBoundary(justSelectableArea = false) {
        return this.element.locationX + this.element.sizeX
    }

    bottomBoundary(justSelectableArea = false) {
        return justSelectableArea
            ? this.element.locationY + this.#selectableAreaHeight
            : super.bottomBoundary()
    }

    leftBoundary(justSelectableArea = false) {
        return this.element.locationX
    }
}
