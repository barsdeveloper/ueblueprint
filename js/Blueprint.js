// @ts-check

import BlueprintTemplate from "./template/BlueprintTemplate"
import Configuration from "./Configuration"
import Copy from "./input/common/Copy"
import IElement from "./element/IElement"
import KeyboardCanc from "./input/keybaord/KeyboardCanc"
import KeyboardEnableZoom from "./input/keybaord/KeyboardEnableZoom"
import KeyboardSelectAll from "./input/keybaord/KeyboardSelectAll"
import LinkElement from "./element/LinkElement"
import MouseScrollGraph from "./input/mouse/MouseScrollGraph"
import MouseTracking from "./input/mouse/MouseTracking"
import NodeElement from "./element/NodeElement"
import Paste from "./input/common/Paste"
import Select from "./input/mouse/Select"
import SelectorElement from "./element/SelectorElement"
import Unfocus from "./input/mouse/Unfocus"
import Utility from "./Utility"
import Zoom from "./input/mouse/Zoom"

/**
 * @typedef {import("./element/PinElement").default} PinElement
 * @typedef {import("./entity/GuidEntity").default} GuidEntity
 * @typedef {import("./entity/PinReferenceEntity").default} PinReferenceEntity
 */

/**
 * @extends {IElement<Object, BlueprintTemplate>}
 */
export default class Blueprint extends IElement {

    /** @type {Number[]} */
    #additional
    get additional() {
        return this.#additional
    }
    set additional(value) {
        value[0] = Math.abs(value[0])
        value[1] = Math.abs(value[1])
    }
    /** @type {Number[]} */
    #translateValue
    get translateValue() {
        return this.#translateValue
    }
    set translateValue(value) {
        this.#translateValue = value
    }
    /** @type {Map<String, Number>} */
    #nodeNameCounter = new Map()
    /** @type {Number} */
    gridSize
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    /** @type {Number[]} */
    mousePosition = [0, 0]
    /** @type {HTMLElement} */
    gridElement = null
    /** @type {HTMLElement} */
    viewportElement = null
    /** @type {HTMLElement} */
    overlayElement = null
    /** @type {SelectorElement} */
    selectorElement = null
    /** @type {HTMLElement} */
    nodesContainerElement = null
    /** @type {Number} */
    zoom = 0
    /** @type {HTMLElement} */
    headerElement = null
    focused = false
    nodeBoundariesSupplier = node => {
        let rect = node.getBoundingClientRect()
        let gridRect = this.nodesContainerElement.getBoundingClientRect()
        const scaleCorrection = 1 / this.getScale()
        return {
            primaryInf: (rect.left - gridRect.left) * scaleCorrection,
            primarySup: (rect.right - gridRect.right) * scaleCorrection,
            // Counter intuitive here: the y (secondary axis is positive towards the bottom, therefore upper bound "sup" is bottom)
            secondaryInf: (rect.top - gridRect.top) * scaleCorrection,
            secondarySup: (rect.bottom - gridRect.bottom) * scaleCorrection
        }
    }
    /** @type {(node: NodeElement, selected: Boolean) => void}} */
    nodeSelectToggleFunction = (node, selected) => {
        node.setSelected(selected)
    }

    /**
     * @param {Configuration} settings
     */
    constructor(settings = new Configuration()) {
        super({}, new BlueprintTemplate())
        /** @type {Number} */
        this.gridSize = Configuration.gridSize
        /** @type {Number[]} */
        this.#additional = [2 * Configuration.expandGridSize, 2 * Configuration.expandGridSize]
        /** @type {Number[]} */
        this.#translateValue = [Configuration.expandGridSize, Configuration.expandGridSize]
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    #expand(x, y) {
        x = Math.round(x)
        y = Math.round(y)
        this.additional[0] += x
        this.additional[1] += y
        this.template.applyExpand(this)
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    #translate(x, y) {
        x = Math.round(x)
        y = Math.round(y)
        this.translateValue[0] += x
        this.translateValue[1] += y
        this.template.applyTranlate(this)
    }

    createInputObjects() {
        return [
            new Copy(this.getGridDOMElement(), this),
            new Paste(this.getGridDOMElement(), this),
            new KeyboardCanc(this.getGridDOMElement(), this),
            new KeyboardSelectAll(this.getGridDOMElement(), this),
            new Zoom(this.getGridDOMElement(), this, {
                looseTarget: true,
            }),
            new Select(this.getGridDOMElement(), this, {
                clickButton: 0,
                exitAnyButton: true,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(this.getGridDOMElement(), this, {
                clickButton: 2,
                exitAnyButton: false,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new Unfocus(this.getGridDOMElement(), this),
            new MouseTracking(this.getGridDOMElement(), this),
            new KeyboardEnableZoom(this.getGridDOMElement(), this),
        ]
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

    getScroll() {
        return [this.viewportElement.scrollLeft, this.viewportElement.scrollTop]
    }

    setScroll(value, smooth = false) {
        this.scroll = value
        if (!smooth) {
            this.viewportElement.scroll(value[0], value[1])
        } else {
            this.viewportElement.scroll({
                left: value[0],
                top: value[1],
                behavior: "smooth"
            })
        }
    }

    scrollDelta(delta, smooth = false) {
        const maxScroll = this.getScrollMax()
        let currentScroll = this.getScroll()
        let finalScroll = [
            currentScroll[0] + delta[0],
            currentScroll[1] + delta[1]
        ]
        let expand = [0, 0]
        let shrink = [0, 0]
        let direction = [0, 0]
        for (let i = 0; i < 2; ++i) {
            if (delta[i] < 0 && finalScroll[i] < Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                // Expand left/top
                expand[i] = Configuration.expandGridSize
                direction[i] = -1
                if (maxScroll[i] - finalScroll[i] > Configuration.gridShrinkThreshold * Configuration.expandGridSize) {
                    shrink[i] = -Configuration.expandGridSize
                }
            } else if (delta[i] > 0 && finalScroll[i]
                > maxScroll[i] - Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                // Expand right/bottom
                expand[i] = Configuration.expandGridSize
                direction[i] = 1
                if (finalScroll[i] > Configuration.gridShrinkThreshold * Configuration.expandGridSize) {
                    shrink[i] = -Configuration.expandGridSize
                }
            }
        }
        if (expand[0] != 0 || expand[1] != 0) {
            this.seamlessExpand(expand, direction)
            direction = [
                -direction[0],
                -direction[1]
            ]
            this.seamlessExpand(shrink, direction)
        }
        currentScroll = this.getScroll()
        finalScroll = [
            currentScroll[0] + delta[0],
            currentScroll[1] + delta[1]
        ]
        this.setScroll(finalScroll, smooth)
    }

    scrollCenter() {
        const scroll = this.getScroll()
        const offset = [
            this.translateValue[0] - scroll[0],
            this.translateValue[1] - scroll[1]
        ]
        const targetOffset = this.getViewportSize().map(size => size / 2)
        const deltaOffset = [
            offset[0] - targetOffset[0],
            offset[1] - targetOffset[1]
        ]
        this.scrollDelta(deltaOffset, true)
    }

    getExpandGridSize() {
        return Configuration.expandGridSize
    }

    getViewportSize() {
        return [
            this.viewportElement.clientWidth,
            this.viewportElement.clientHeight
        ]
    }

    /**
     * Get the scroll limits
     * @return {Array} The horizonal and vertical maximum scroll limits
     */
    getScrollMax() {
        return [
            this.viewportElement.scrollWidth - this.viewportElement.clientWidth,
            this.viewportElement.scrollHeight - this.viewportElement.clientHeight
        ]
    }

    snapToGrid(location) {
        return Utility.snapToGrid(location, this.gridSize)
    }

    /**
     * @param {Number} x - Horizontal 
     * @param {Number} y - Vertical expand value (negative means top, positive means bottom)
     * @param {Number} factor - Either 1 (expand) or -1 (shrink)
     */

    /**
     * Expand or shrink the grind indefinitely, the content will remain into position
     * @param {Number[]} param0 - Expand value (negative means shrink, positive means expand)
     * @param {Number[]} param1 - Direction of expansion (negative: left/top, position: right/bottom)
     */
    seamlessExpand([x, y], [directionX, directionY] = [1, 1]) {
        const initialScroll = [
            this.viewportElement.scrollLeft,
            this.viewportElement.scrollTop
        ]
        let scale = this.getScale()
        let scaledX = x / scale
        let scaledY = y / scale
        // First expand the grid to contain the additional space
        this.#expand(scaledX, scaledY)
        // If the expansion is towards the left or top, then scroll back to give the illusion that the content is in the same position and translate it accordingly
        const translate = [0, 0]
        if (directionX < 0) {
            this.viewportElement.scrollLeft += x
            translate[0] = scaledX
        }
        if (directionY < 0) {
            this.viewportElement.scrollTop += y
            translate[1] = scaledY
        }
        this.#translate(translate[0], translate[1])
    }

    progressiveSnapToGrid(x) {
        return Configuration.expandGridSize * Math.round(x / Configuration.expandGridSize + 0.5 * Math.sign(x))
    }

    getZoom() {
        return this.zoom
    }

    setZoom(zoom, center) {
        zoom = Utility.clamp(zoom, Configuration.minZoom, Configuration.maxZoom)
        if (zoom == this.zoom) {
            return
        }
        let initialScale = this.getScale()
        this.template.applyZoom(this, zoom)
        this.zoom = zoom

        if (center) {
            center[0] += this.translateValue[0]
            center[1] += this.translateValue[1]
            let relativeScale = this.getScale() / initialScale
            let newCenter = [
                relativeScale * center[0],
                relativeScale * center[1]
            ]
            this.scrollDelta([
                (newCenter[0] - center[0]) * initialScale,
                (newCenter[1] - center[1]) * initialScale
            ])
        }
    }

    getScale() {
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue("--ueb-scale"))
    }

    /**
     * @param {Number[]} position
     */
    compensateTranslation(position) {
        position[0] -= this.translateValue[0]
        position[1] -= this.translateValue[1]
        return position
    }

    /**
     * Returns the list of nodes in this blueprint. It can filter the list providing just the selected ones.
     */
    getNodes(selected = false) {
        if (selected) {
            return this.nodes.filter(
                node => node.selected
            )
        } else {
            return this.nodes
        }
    }

    /**
     * @param {PinReferenceEntity} pinReference
     */
    getPin(pinReference) {
        return this.template.getPin(this, pinReference)
    }

    /**
     * Returns the list of links in this blueprint.
     * @returns {LinkElement[]} Nodes
     */
    getLinks([a, b] = []) {
        if (a == null != b == null) {
            const pin = a ?? b
            return this.links.filter(link => link.sourcePin == pin || link.destinationPin == pin)
        }
        if (a != null && b != null) {
            return this.links.filter(link =>
                link.sourcePin == a && link.destinationPin == b
                || link.sourcePin == b && link.destinationPin == a)
        }
        return this.links
    }

    /**
     * @param {PinElement} sourcePin 
     * @param {PinElement} destinationPin 
     * @returns 
     */
    getLink(sourcePin, destinationPin, ignoreDirection = false) {
        return this.links.find(link =>
            link.sourcePin == sourcePin && link.destinationPin == destinationPin
            || ignoreDirection && link.sourcePin == destinationPin && link.destinationPin == sourcePin
        )
    }

    /**
     * Select all nodes
     */
    selectAll() {
        this.getNodes().forEach(node => this.nodeSelectToggleFunction(node, true))
    }

    /**
     * Unselect all nodes
     */
    unselectAll() {
        this.getNodes().forEach(node => this.nodeSelectToggleFunction(node, false))
    }

    /**
     * @param  {...IElement} graphElements
     */
    addGraphElement(...graphElements) {
        let nodeElements = []
        for (let element of graphElements) {
            if (element instanceof NodeElement && !this.nodes.includes(element)) {
                const nodeName = element.entity.getFullName()
                const homonymNode = this.nodes.find(node => node.entity.getFullName() == nodeName)
                if (homonymNode) {
                    // Inserted node keeps tha name and the homonym nodes is renamed
                    let name = homonymNode.entity.getDisplayName()
                    this.#nodeNameCounter[name] = this.#nodeNameCounter[name] ?? -1
                    do {
                        ++this.#nodeNameCounter[name]
                    } while (this.nodes.find(node =>
                        node.entity.getFullName() == Configuration.nodeName(name, this.#nodeNameCounter[name])
                    ))
                    homonymNode.rename(Configuration.nodeName(name, this.#nodeNameCounter[name]))
                }
                this.nodes.push(element)
                nodeElements.push(element)
                this.nodesContainerElement?.appendChild(element)
            } else if (element instanceof LinkElement && !this.links.includes(element)) {
                this.links.push(element)
                this.nodesContainerElement?.appendChild(element)
            }
        }
        graphElements.filter(element => element instanceof NodeElement).forEach(
            node => /** @type {NodeElement} */(node).sanitizeLinks()
        )
    }

    /**
     * @param  {...IElement} graphElements
     */
    removeGraphElement(...graphElements) {
        for (let element of graphElements) {
            if (element.closest("ueb-blueprint") == this) {
                element.remove()
                let elementsArray = element instanceof NodeElement
                    ? this.nodes
                    : element instanceof LinkElement
                        ? this.links
                        : null
                elementsArray?.splice(
                    elementsArray.findIndex(v => v === element),
                    1
                )
            }
        }
    }

    setFocused(value = true) {
        if (this.focused == value) {
            return
        }
        let event = new CustomEvent(value ? "blueprint-focus" : "blueprint-unfocus")
        this.focused = value
        this.dataset.focused = this.focused ? "true" : "false"
        if (!this.focused) {
            this.unselectAll()
        }
        this.dispatchEvent(event)
    }

    dispatchEditTextEvent(value) {
        const event = new CustomEvent(
            value
                ? Configuration.editTextEventName.begin
                : Configuration.editTextEventName.end
        )
        this.dispatchEvent(event)
    }
}

customElements.define("ueb-blueprint", Blueprint)
