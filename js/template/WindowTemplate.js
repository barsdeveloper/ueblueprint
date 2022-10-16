import { html } from "lit"
import IDraggableTemplate from "./IDraggableTemplate"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable"

/** @typedef {import("../element/WindowElement").default} WindowElement */

/** @extends {IDraggableTemplate<WindowElement>} */
export default class WindowTemplate extends IDraggableTemplate {

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
                    <div class="ueb-window-close">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <line x1="2" y1="2" x2="30" y2="30" stroke="currentColor" stroke-width="4" />
                            <line x1="30" y1="2" x2="2" y2="30" stroke="currentColor" stroke-width="4" />
                        </svg>
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
}
