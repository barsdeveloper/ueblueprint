import MouseClickDrag from "../input/mouse/MouseClickDrag.js"
import NodeTemplate from "./node/NodeTemplate.js"

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
    initialize(element) {
        super.initialize(element)
        this.element.classList.add("ueb-resizeable")
        this.#THandler.classList.add("ueb-resizeable-top")
        this.#RHandler.classList.add("ueb-resizeable-right")
        this.#BHandler.classList.add("ueb-resizeable-bottom")
        this.#LHandler.classList.add("ueb-resizeable-left")
        this.#TRHandler.classList.add("ueb-resizeable-top-right")
        this.#BRHandler.classList.add("ueb-resizeable-bottom-right")
        this.#BLHandler.classList.add("ueb-resizeable-bottom-left")
        this.#TLHandler.classList.add("ueb-resizeable-top-left")
    }

    /** @param {PropertyValues} changedProperties */
    update(changedProperties) {
        super.update(changedProperties)
        if (this.element.sizeX >= 0 && changedProperties.has("sizeX")) {
            this.element.style.width = `${this.element.sizeX}px`
        }
        if (this.element.sizeY >= 0 && changedProperties.has("sizeY")) {
            this.element.style.height = `${this.element.sizeY}px`
        }
    }

    /** @param {PropertyValues} changedProperties */
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
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
            new MouseClickDrag(this.#THandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[1] = location[1] - this.element.topBoundary()
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation(0, movement[1], false)
                    }
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#RHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary()
                    this.setSizeX(this.element.sizeX + movement[0])
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#BHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[1] = location[1] - this.element.bottomBoundary()
                    this.setSizeY(this.element.sizeY + movement[1])
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#LHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary()
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation(movement[0], 0, false)
                    }
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#TRHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary()
                    movement[1] = location[1] - this.element.topBoundary()
                    this.setSizeX(this.element.sizeX + movement[0])
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation(0, movement[1], false)
                    }
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#BRHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.rightBoundary()
                    movement[1] = location[1] - this.element.bottomBoundary()
                    this.setSizeX(this.element.sizeX + movement[0])
                    this.setSizeY(this.element.sizeY + movement[1])
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#BLHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary()
                    movement[1] = location[1] - this.element.bottomBoundary()
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation(movement[0], 0, false)
                    }
                    this.setSizeY(this.element.sizeY + movement[1])
                },
                onEndDrag: () => this.endResize(),
            }),
            new MouseClickDrag(this.#TLHandler, this.blueprint, {
                onDrag: (location, movement) => {
                    movement[0] = location[0] - this.element.leftBoundary()
                    movement[1] = location[1] - this.element.topBoundary()
                    if (this.setSizeX(this.element.sizeX - movement[0])) {
                        this.element.addLocation(movement[0], 0, false)
                    }
                    if (this.setSizeY(this.element.sizeY - movement[1])) {
                        this.element.addLocation(0, movement[1], false)
                    }
                },
                onEndDrag: () => this.endResize(),
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

    endResize() {
    }
}
