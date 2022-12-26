import ColorPickerWindowTemplate from "../template/ColorPickerWindowTemplate"
import Configuration from "../Configuration"
import IDraggableElement from "./IDraggableElement"
import WindowTemplate from "../template/WindowTemplate"

/** @typedef {typeof WindowElement} WindowElementConstructor */

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

    setup() {
        super.setup()
        this.locationX = this.blueprint.mousePosition[0]
        this.locationY = this.blueprint.mousePosition[1]
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
