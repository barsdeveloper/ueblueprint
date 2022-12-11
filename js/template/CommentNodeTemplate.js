import { css, html } from "lit"
import Configuration from "../Configuration"
import IResizeableTemplate from "./IResizeableTemplate"
import LinearColorEntity from "../entity/LinearColorEntity"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class CommentNodeTemplate extends IResizeableTemplate {

    #color = LinearColorEntity.getWhite()

    /** @param {NodeElement} element */
    constructed(element) {
        if (element.entity.CommentColor) {
            this.#color.setFromRGBANumber(element.entity.CommentColor.toNumber())
            this.#color.setFromHSVA(this.#color.H.value, this.#color.S.value, Math.pow(this.#color.V.value, 0.45) * 0.67)
        }
        element.classList.add("ueb-node-style-comment", "ueb-node-resizeable")
        element.sizeX ??= 25 * Configuration.gridSize
        element.sizeY ??= 6 * Configuration.gridSize
        super.constructed(element) // Keep it at the end because it calls this.getColor() where this.#color must be initialized
    }

    getColor() {
        return css`${Math.round(this.#color.R.value * 255)}, ${Math.round(this.#color.G.value * 255)}, ${Math.round(this.#color.B.value * 255)}`
    }

    getDraggableElement() {
        return this.element.querySelector(".ueb-node-top")
    }

    /** @param {Map} changedProperties */
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties)
        if (changedProperties.has("sizeX") || changedProperties.has("sizeY")) {
            this.manageNodesBind()
        }
    }

    render() {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">
                        ${this.element.entity.NodeComment}
                    </div>
                </div>
            </div>
        `
    }

    manageNodesBind() {
        this.element.blueprint
            .getNodes(false, [
                this.element.topBoundary(),
                this.element.rightBoundary(),
                this.element.bottomBoundary(),
                this.element.leftBoundary(),
            ])
            .filter(node => !node.boundComments.includes(this.element))
            .forEach(node => node.bindToComment(this.element))
    }

    /** @param {Number} value */
    setSizeX(value) {
        value = Math.round(value)
        if (value >= Configuration.gridSet * Configuration.gridSize) {
            this.element.setNodeWidth(value)
            return true
        }
        return false
    }

    /** @param {Number} value */
    setSizeY(value) {
        value = Math.round(value)
        if (value >= 3 * Configuration.gridSize) {
            this.element.setNodeHeight(value)
            return true
        }
        return false
    }
}
