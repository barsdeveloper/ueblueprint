import { css, html } from "lit"
import Configuration from "../../Configuration.js"
import IResizeableTemplate from "../IResizeableTemplate.js"
import LinearColorEntity from "../../entity/LinearColorEntity.js"
import Utility from "../../Utility.js"

/**
 * @typedef {import("../../element/NodeElement.js").default} NodeElement
 * @typedef {import("lit").PropertyValues} PropertyValues
 */

export default class CommentNodeTemplate extends IResizeableTemplate {

    #color = LinearColorEntity.getWhite()
    #selectableAreaHeight = 0

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        if (element.entity.CommentColor) {
            this.#color.setFromRGBANumber(element.entity.CommentColor.toNumber())
            this.#color.setFromHSVA(
                this.#color.H.value,
                this.#color.S.value,
                Math.pow(this.#color.V.value, 0.45) * 0.67
            )
        }
        element.classList.add("ueb-node-style-comment", "ueb-node-resizeable")
        element.sizeX = 25 * Configuration.gridSize
        element.sizeY = 6 * Configuration.gridSize
        super.initialize(element) // Keep it at the end because it calls this.getColor() where this.#color must be initialized
    }

    getColor() {
        return css`${Math.round(this.#color.R.value * 255)}, ${Math.round(this.#color.G.value * 255)}, ${Math.round(this.#color.B.value * 255)}`
    }

    getDraggableElement() {
        return this.element.querySelector(".ueb-node-top")
    }

    render() {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top"
                        .innerText="${Utility.encodeHTMLWhitespace(this.element.entity.NodeComment)}">
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
