import UDrag from "./input/UDrag"

export default class USelectableDraggableObject extends HTMLElement {

    constructor() {
        super()
        /** @type {import("./UEBlueprint").default}" */
        this.blueprint = null
        this.dragObject = null
        this.location = [0, 0]
        this.selected = false

        let self = this
        this.dragHandler = (e) => {
            self.addLocation(e.detail.value)
        }
    }

    connectedCallback() {
        this.blueprint = this.closest('u-blueprint')
        this.dragObject = new UDrag(this, null, { // UDrag doesn't need blueprint
            looseTarget: true
        })
    }

    disconnectedCallback() {
        this.dragObject.unlistenDOMElement()
    }

    setLocation(value = [0, 0]) {
        this.location = value
        this.style.setProperty('--ueb-position-x', this.location[0])
        this.style.setProperty('--ueb-position-y', this.location[1])
    }

    addLocation(value) {
        this.setLocation([this.location[0] + value[0], this.location[1] + value[1]])
    }

    dragDispatch(value) {
        if (!this.selected) {
            this.blueprint.unselectAll()
            this.setSelected(true)
        }
        let dragEvent = new CustomEvent('uDragSelected', {
            detail: {
                instigator: this,
                value: value
            },
            bubbles: false,
            cancelable: true,
            composed: false,
        })
        this.blueprint.dispatchEvent(dragEvent)
    }

    setSelected(value = true) {
        if (this.selected == value) {
            return
        }
        this.selected = value
        if (this.selected) {
            this.classList.add('ueb-selected')
            this.blueprint.addEventListener('uDragSelected', this.dragHandler)
        } else {
            this.classList.remove('ueb-selected')
            this.blueprint.removeEventListener('uDragSelected', this.dragHandler)
        }
    }

}