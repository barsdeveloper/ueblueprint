import Configuration from "../Configuration"
import Utility from "../Utility"
import IDraggableElement from "./IDraggableElement"

/**
 * @typedef {import("../element/IDraggableElement").DragEvent} DragEvent
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../template/ISelectableDraggableTemplate").default} ISelectableDraggableTemplate
 */

/**
 * @template {IEntity} T
 * @template {ISelectableDraggableTemplate} U
 * @extends {IDraggableElement<T, U>}
 */
export default class ISelectableDraggableElement extends IDraggableElement {

    static properties = {
        ...super.properties,
        selected: {
            type: Boolean,
            attribute: "data-selected",
            reflect: true,
            converter: Utility.booleanConverter,
        },
    }

    /** @param {DragEvent} e */
    dragHandler = e => this.addLocation(...e.detail.value)

    constructor() {
        super()
        this.selected = false
        this.listeningDrag = false
    }

    setup() {
        super.setup()
        this.setSelected(this.selected)
    }

    cleanup() {
        super.cleanup()
        this.blueprint.removeEventListener(Configuration.nodeDragGeneralEventName, this.dragHandler)
    }

    setSelected(value = true) {
        this.selected = value
        if (this.blueprint) {
            if (this.selected) {
                this.listeningDrag = true
                this.blueprint.addEventListener(Configuration.nodeDragGeneralEventName, this.dragHandler)
            } else {
                this.blueprint.removeEventListener(Configuration.nodeDragGeneralEventName, this.dragHandler)
                this.listeningDrag = false
            }
        }
    }
}
