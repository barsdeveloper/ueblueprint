import { css, html } from "lit"
import LinearColorEntity from "../entity/LinearColorEntity"
import NodeTemplate from "./NodeTemplate"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class CommentNodeTemplate extends NodeTemplate {

    #color = LinearColorEntity.getWhite()

    /** @param {NodeElement} element */
    constructed(element) {
        if (element.entity.CommentColor) {
            this.#color.setFromRGBANumber(element.entity.CommentColor.toNumber())
        }
        // Dimming the colors to 2/3
        const factor = 2 / 3
        this.#color.setFromRGBA(
            this.#color.R.value * factor,
            this.#color.G.value * factor,
            this.#color.B.value * factor,
        )
        element.classList.add("ueb-node-style-comment", "ueb-node-resizeable")
        super.constructed(element) // Keep it at the end
    }

    getColor() {
        return css`${Math.round(this.#color.R.value * 255)}, ${Math.round(this.#color.G.value * 255)}, ${Math.round(this.#color.B.value * 255)}`
    }

    getDraggableElement() {
        return this.element.querySelector(".ueb-node-top")
    }

    render() {
        const width = this.element.entity.getNodeWidth()
        const height = this.element.entity.getNodeHeight()
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-handler-top"></div>
                <div class="ueb-node-handler-right"></div>
                <div class="ueb-node-handler-bottom"></div>
                <div class="ueb-node-handler-left"></div>
                <div class="ueb-node-wrapper">
                    <div class="ueb-node-top">
                        ${this.element.entity.NodeComment}
                    </div>
                    <div class="ueb-node-content"
                        style="${`width: ${width}px; height: ${height}px;`}">
                    </div>
                </div>
            </div>
        `
    }


}
