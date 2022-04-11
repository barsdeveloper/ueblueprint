// @ts-check

import Configuration from "../Configuration"
import IElement from "./IElement"
import MouseMoveNodes from "../input/mouse/MouseMoveNodes"
import Utility from "../Utility"

/**
 * @typedef {import("../template/SelectableDraggableTemplate").default} SelectableDraggableTemplate
 * @typedef {import("../entity/IEntity").default} IEntity  
 */

/**
 * @template {IEntity} T
 * @template {SelectableDraggableTemplate} U
 * @extends {IElement<T, U>}
 */
export default class ISelectableDraggableElement extends IElement {

    constructor(...args) {
        // @ts-expect-error
        super(...args)
        this.dragObject = null
        this.location = [0, 0]
        this.selected = false

        let self = this
        this.dragHandler = (e) => {
            self.addLocation(e.detail.value)
        }
    }

    #setSelected(value = true) {
        this.selected = value
        if (this.blueprint) {
            if (this.selected) {
                this.blueprint.addEventListener(Configuration.nodeDragEventName, this.dragHandler)
            } else {
                this.blueprint.removeEventListener(Configuration.nodeDragEventName, this.dragHandler)
            }
        }
        this.template.applySelected(this)
    }

    connectedCallback() {
        super.connectedCallback()
        this.#setSelected(this.selected)
    }

    createInputObjects() {
        return [
            new MouseMoveNodes(this, this.blueprint, {
                looseTarget: true
            }),
        ]
    }

    /**
     * @param {Number[]} value 
     */
    setLocation(value = [0, 0]) {
        const d = [value[0] - this.location[0], value[1] - this.location[1]]
        this.location = value
        this.template.applyLocation(this)
        if (this.blueprint) {
            const dragLocalEvent = new CustomEvent(Configuration.nodeDragLocalEventName, {
                detail: {
                    value: d
                },
                bubbles: false,
                cancelable: true
            })
            this.dispatchEvent(dragLocalEvent)
        }
    }

    addLocation(value) {
        this.setLocation([this.location[0] + value[0], this.location[1] + value[1]])
    }

    setSelected(value = true) {
        if (this.selected != value) {
            this.#setSelected(value)
        }
    }

    dispatchDragEvent(value) {
        const dragEvent = new CustomEvent(Configuration.nodeDragEventName, {
            detail: {
                value: value
            },
            bubbles: true,
            cancelable: true
        })
        this.dispatchEvent(dragEvent)
    }

    snapToGrid() {
        let snappedLocation = Utility.snapToGrid(this.location, Configuration.gridSize)
        if (this.location[0] != snappedLocation[0] || this.location[1] != snappedLocation[1]) {
            this.setLocation(snappedLocation)
        }
    }
}
