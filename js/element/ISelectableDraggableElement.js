import Configuration from "../Configuration"
import IElement from "./IElement"
import Utility from "../Utility"
import IDraggableElement from "./IDraggableElement"

/**
 * @typedef {import("../template/ISelectableDraggableTemplate").default} ISelectableDraggableTemplate
 * @typedef {import("../entity/IEntity").default} IEntity
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

    constructor(...args) {
        // @ts-expect-error
        super(...args)
        this.selected = false
        this.listeningDrag = false
        let self = this
        this.dragHandler = e => self.addLocation(e.detail.value)
    }

    connectedCallback() {
        super.connectedCallback()
        this.setSelected(this.selected)
    }

    disconnectedCallback() {
        super.disconnectedCallback()
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
