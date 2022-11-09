import ColorPickerWindowTemplate from "../template/ColorPickerWindowTemplate"
import Configuration from "../Configuration"
import IDraggableElement from "./IDraggableElement"
import WindowTemplate from "../template/WindowTemplate"

/**
 * @template {WindowTemplate} T
 * @extends {IDraggableElement<Object, T>}
 */
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

    constructor(options = {}) {
        if (options.type.constructor == String) {
            options.type = WindowElement.#typeTemplateMap[options.type]
        }
        options.type ??= WindowTemplate
        options.windowOptions ??= {}
        super({}, new options.type())
        this.type = options.type
        this.windowOptions = options.windowOptions
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dispatchCloseEvent()
    }

    dispatchCloseEvent() {
        let deleteEvent = new CustomEvent(Configuration.windowCloseEventName)
        this.dispatchEvent(deleteEvent)
    }
}
