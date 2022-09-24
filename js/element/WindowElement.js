import Configuration from "../Configuration"
import ISelectableDraggableElement from "./ISelectableDraggableElement"
import WindowTemplate from "../template/WindowTemplate"

/** @extends {ISelectableDraggableElement<Object, WindowTemplate>} */
export default class WindowElement extends ISelectableDraggableElement {

    static #typeTemplateMap = {
        "window": WindowTemplate,
    }

    static properties = {
        ...ISelectableDraggableElement.properties,
        type: {
            type: String,
            attribute: "data-type",
            reflect: true,
        },
    }

    constructor(properties = {}) {
        properties.type ??= "window"
        super({}, new WindowElement.#typeTemplateMap[properties.type]())
        this.type = properties.type
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dispatchCloseEvent()
    }

    dispatchCloseEvent(value) {
        let deleteEvent = new CustomEvent(Configuration.windowCloseEventName, {
            bubbles: true,
            cancelable: true,
        })
        this.dispatchEvent(deleteEvent)
    }
}

customElements.define("ueb-window", WindowElement)
