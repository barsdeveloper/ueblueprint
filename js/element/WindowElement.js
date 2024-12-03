import ColorPickerWindowTemplate from "../template/window/ColorPickerWindowTemplate.js"
import Configuration from "../Configuration.js"
import IDraggableElement from "./IDraggableElement.js"
import WindowTemplate from "../template/window/WindowTemplate.js"

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
                    Object.entries(WindowElement.#typeTemplateMap).find(([k, v]) => value.constructor === v)?.[0],
            },
        },
    }

    static newObject(entity = {}, template = entity.type ?? new WindowTemplate()) {
        const result = new WindowElement()
        result.initialize(entity, template)
        return result
    }

    initialize(entity = {}, template = entity.type ?? new WindowTemplate()) {
        entity.windowOptions ??= {}
        this.type = entity.type
        this.windowOptions = entity.windowOptions
        super.initialize(entity, template)
    }

    computeSizes() {
        const bounding = this.getBoundingClientRect()
        this.sizeX = bounding.width
        this.sizeY = bounding.height
    }

    cleanup() {
        super.cleanup()
        this.acknowledgeClose()
    }

    acknowledgeClose() {
        let deleteEvent = new CustomEvent(Configuration.windowCloseEventName)
        this.dispatchEvent(deleteEvent)
    }
}
