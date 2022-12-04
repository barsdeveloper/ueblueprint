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
        }
        // Dimming the colors to 2/3
        const factor = 2 / 3
        this.#color.setFromRGBA(
            this.#color.R.value,
            this.#color.G.value,
            this.#color.B.value,
        )
        element.classList.add("ueb-node-style-comment", "ueb-node-resizeable")
        super.constructed(element) // Keep it at the end because it calls this.getColor() where this.#color must be initialized
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
                    <div class="ueb-node-top">
                        ${this.element.entity.NodeComment}
                    </div>
                </div>
            </div>
        `
    }

    /** @param {Number} value */
    setSizeX(value) {
        if (value >= Configuration.gridSet * Configuration.gridSize) {
            this.element.sizeX = value
            return true
        }
        return false
    }

    /** @param {Number} value */
    setSizeY(value) {
        if (value >= 3 * Configuration.gridSize) {
            this.element.sizeY = Math.max(value, 3 * Configuration.gridSize)
            return true
        }
        return false
    }
}
