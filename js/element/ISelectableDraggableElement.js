import Configuration from "../Configuration.js"
import IDraggableElement from "./IDraggableElement.js"
import Utility from "../Utility.js"

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
