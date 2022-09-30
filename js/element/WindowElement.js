import ColorPickerWindowTemplate from "../template/ColorPickerWindowTemplate"
import Configuration from "../Configuration"
import IDraggableElement from "./IDraggableElement"
import WindowTemplate from "../template/WindowTemplate"

/** @extends {ISelectableDraggableElement<Object, WindowTemplate>} */
export default class WindowElement extends IDraggableElement {

    static #typeTemplateMap = {
        "window": WindowTemplate,
        "color-picker": ColorPickerWindowTemplate,
    }

    static properties = {
        ...IDraggableElement.properties,
        type: {
            type: WindowTemplate,
            attribute: "data-type",
            reflect: true,
            converter: {
                fromAttribute: (value, type) => WindowElement.#typeTemplateMap[value],
                toAttribute: (value, type) =>
                    Object.entries(WindowElement.#typeTemplateMap).find(([k, v]) => value == v)[0]
            },
        },
    }

    constructor(properties = {}) {
        if (properties.type.constructor == String) {
            properties.type = WindowElement.#typeTemplateMap[properties.type]
        }
        properties.type ??= WindowTemplate
        super({}, new properties.type())
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
