import MouseClickDrag from "../input/mouse/MouseClickDrag"
import NodeTemplate from "./NodeTemplate"

/** @typedef {import("../element/NodeElement").default} NodeElement */

export default class IResizeableTemplate extends NodeTemplate {

    #THandler = document.createElement("div")
    #RHandler = document.createElement("div")
    #BHandler = document.createElement("div")
    #LHandler = document.createElement("div")
    #TRHandler = document.createElement("div")
    #BRHandler = document.createElement("div")
    #BLHandler = document.createElement("div")
    #TLHandler = document.createElement("div")

    /** @param {NodeElement} element */
    constructed(element) {
        super.constructed(element)
        this.element.classList.add("ueb-resizeable")
    }

    /** @param {Map} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        if (this.element.sizeX >= 0 && changedProperties.has("sizeX")) {
            this.element.style.width = `${this.element.sizeX}px`
        }
        if (this.element.sizeY >= 0 && changedProperties.has("sizeY")) {
            this.element.style.height = `${this.element.sizeY}px`
        }
    }

    /** @param {Map} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        this.#THandler.classList.add("ueb-resizeable-top")
        this.#RHandler.classList.add("ueb-resizeable-right")
        this.#BHandler.classList.add("ueb-resizeable-bottom")
        this.#LHandler.classList.add("ueb-resizeable-left")
        this.#TRHandler.classList.add("ueb-resizeable-top-right")
        this.#BRHandler.classList.add("ueb-resizeable-bottom-right")
        this.#BLHandler.classList.add("ueb-resizeable-bottom-left")
        this.#TLHandler.classList.add("ueb-resizeable-top-left")
        this.element.append(
            this.#THandler,
            this.#RHandler,
            this.#BHandler,
            this.#LHandler,
            this.#TRHandler,
            this.#BRHandler,
            this.#BLHandler,
            this.#TLHandler
        )
    }

    createInputObjects() {
        return [
            ...super.createInputObjects(),
            new MouseClickDrag(this.#THandler, this.element.blueprint, {
                onDrag: (location, movement) => {
                    movement[1] = location[1] - this.element.topBoundary()
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation([0, movement[1]])
                    }
                }
            }),
            new MouseClickDrag(this.#RHandler, this.element.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary()
                    this.setSizeX(this.element.sizeX + movement[0])
                }
            }),
            new MouseClickDrag(this.#BHandler, this.element.blueprint, {
                onDrag: (location, movement) => {
                    movement[1] = location[1] - this.element.bottomBoundary()
                    this.setSizeY(this.element.sizeY + movement[1])
                }
            }),
            new MouseClickDrag(this.#LHandler, this.element.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary()
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation([movement[0], 0])
                    }
                }
            }),
            new MouseClickDrag(this.#TRHandler, this.element.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary()
                    movement[1] = location[1] - this.element.topBoundary()
                    this.setSizeX(this.element.sizeX + movement[0])
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation([0, movement[1]])
                    }
                }
            }),
            new MouseClickDrag(this.#BRHandler, this.element.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary()
                    movement[1] = location[1] - this.element.bottomBoundary()
                    this.setSizeX(this.element.sizeX + movement[0])
                    this.setSizeY(this.element.sizeY + movement[1])
                }
            }),
            new MouseClickDrag(this.#BLHandler, this.element.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary()
                    movement[1] = location[1] - this.element.bottomBoundary()
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation([movement[0], 0])
                    }
                    this.setSizeY(this.element.sizeY + movement[1])
                }
            }),
            new MouseClickDrag(this.#TLHandler, this.element.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary()
                    movement[1] = location[1] - this.element.topBoundary()
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation([movement[0], 0])
                    }
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation([0, movement[1]])
                    }
                }
            }),
        ]
    }

    /** @param {Number} value */
    setSizeX(value) {
        this.element.setNodeWidth(value)
        return true
    }

    /** @param {Number} value */
    setSizeY(value) {
        this.element.setNodeHeight(value)
        return true
    }
}
