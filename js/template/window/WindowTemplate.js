import { html } from "lit"
import Configuration from "../../Configuration.js"
import IDraggablePositionedTemplate from "../IDraggablePositionedTemplate.js"
import MouseMoveDraggable from "../../input/mouse/MouseMoveDraggable.js"
import SVGIcon from "../../SVGIcon.js"

/** @typedef {import("../../element/WindowElement").default} WindowElement */

/** @extends {IDraggablePositionedTemplate<WindowElement>} */
export default class WindowTemplate extends IDraggablePositionedTemplate {

    toggleAdvancedDisplayHandler

    getDraggableElement() {
        return /** @type {WindowElement} */(this.element.querySelector(".ueb-window-top"))
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.blueprint, {
            draggableElement: this.getDraggableElement(),
            ignoreScale: true,
            ignoreTranslateCompensate: false,
            movementSpace: this.blueprint,
            stepSize: 1,
        })
    }

    setup() {
        const leftBoundary = this.blueprint.template.gridLeftVisibilityBoundary()
        const topBoundary = this.blueprint.template.gridTopVisibilityBoundary()
        this.element.locationX = this.blueprint.scaleCorrectReverse(this.blueprint.mousePosition[0] - leftBoundary)
        this.element.locationY = this.blueprint.scaleCorrectReverse(this.blueprint.mousePosition[1] - topBoundary)
        this.element.updateComplete.then(() => {
            const bounding = this.blueprint.getBoundingClientRect()
            if (this.element.locationX + this.element.sizeX > bounding.width) {
                this.element.locationX = bounding.width - this.element.sizeX
            }
            this.element.locationX = Math.max(0, this.element.locationX)
            if (this.element.locationY + this.element.sizeY > bounding.height) {
                this.element.locationY = bounding.height - this.element.sizeY
            }
            this.element.locationY = Math.max(0, this.element.locationY)
        })
    }

    render() {
        return html`
            <div class="ueb-window">
                <div class="ueb-window-top">
                    <div class="ueb-window-name ueb-ellipsis-nowrap-text">${this.renderWindowName()}</div>
                    <div class="ueb-window-close" @click="${() => this.element.remove()}">
                        ${SVGIcon.close}
                    </div>
                </div>
                <div class="ueb-window-content">
                    ${this.renderContent()}
                </div>
            </div>
        `
    }

    renderWindowName() {
        return html`Window`
    }

    renderContent() {
        return html``
    }

    apply() {
        this.element.dispatchEvent(new CustomEvent(Configuration.windowApplyEventName))
        this.element.remove()
    }

    cancel() {
        this.element.dispatchEvent(new CustomEvent(Configuration.windowCancelEventName))
        this.element.remove()
    }
}
