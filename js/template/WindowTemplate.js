import { html } from "lit"
import Configuration from "../Configuration"
import IDraggablePositionedTemplate from "./IDraggablePositionedTemplate"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable"
import SVGIcon from "../SVGIcon"

/** @typedef {import("../element/WindowElement").default} WindowElement */

/** @extends {IDraggablePositionedTemplate<WindowElement>} */
export default class WindowTemplate extends IDraggablePositionedTemplate {

    toggleAdvancedDisplayHandler

    getDraggableElement() {
        return /** @type {WindowElement} */(this.element.querySelector(".ueb-window-top"))
    }

    createDraggableObject() {
        return new MouseMoveDraggable(this.element, this.element.blueprint, {
            draggableElement: this.getDraggableElement(),
            ignoreTranslateCompensate: true,
            movementSpace: this.element.blueprint,
            stepSize: 1,
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
