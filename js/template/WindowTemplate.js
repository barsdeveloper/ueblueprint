import { html } from "lit"
import IDraggableTemplate from "./IDraggableTemplate"
import MouseMoveDraggable from "../input/mouse/MouseMoveDraggable"

/** @typedef {import("../element/WindowElement").default} WindowElement */

/** @extends {SelectableDraggableTemplate<WindowElement>} */
export default class WindowTemplate extends IDraggableTemplate {

    static windowName = html`Window`

    toggleAdvancedDisplayHandler

    /** @param {WindowElement} element */
    getDraggableElement(element) {
        return element.querySelector(".ueb-window-top")
    }

    createDraggableObject(element) {
        return new MouseMoveDraggable(element, element.blueprint, {
            draggableElement: this.getDraggableElement(element),
            looseTarget: true,
            stepSize: 1,
        })
    }

    /** @param {WindowElement} element */
    render(element) {
        return html`
            <div class="ueb-window">
                <div class="ueb-window-top">
                    <div class="ueb-window-name">${this.constructor.windowName}</div>
                    <div class="ueb-window-close">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <line x1="2" y1="2" x2="30" y2="30" stroke="currentColor" stroke-width="4" />
                            <line x1="30" y1="2" x2="2" y2="30" stroke="currentColor" stroke-width="4" />
                        </svg>
                    </div>
                </div>
                <div class="ueb-window-content">
                    Content
                </div>
            </div>
        `
    }
}
