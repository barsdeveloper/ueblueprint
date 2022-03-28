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
export default class Blueprint extends IElement {

    static tagName = "ueb-blueprint"
    /** @type {number} */
    gridSize = Configuration.gridSize
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    expandGridSize = Configuration.expandGridSize
    /** @type {number[]} */
    additional = [2 * this.expandGridSize, 2 * this.expandGridSize]
    /** @type {number[]} */
    translateValue = [this.expandGridSize, this.expandGridSize]
    /** @type {number[]} */
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
    /** @type {number} */
    zoom = 0
    /** @type {HTMLElement} */
    headerElement = null
    focused = false
    /** @type {(node: NodeElement) => BoundariesInfo} */
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
    /** @type {(node: NodeElement, selected: bool) => void}} */
    nodeSelectToggleFunction = (node, selected) => {
        node.setSelected(selected)
    }

    constructor() {
        super({}, new BlueprintTemplate())
        /** @type {BlueprintTemplate} */
        this.template
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    #expand(x, y) {
        this.additional = [this.additional[0] + x, this.additional[1] + y]
        this.template.applyExpand(this)
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    #translate(x, y) {
        x = Math.round(x)
        y = Math.round(y)
        this.translateValue = [this.translateValue[0] + x, this.translateValue[1] + y]
        this.template.applyTranlate(this)
    }

    createInputObjects() {
        return [
            new Copy(this.getGridDOMElement(), this),
            new Paste(this.getGridDOMElement(), this),
            new KeyboardCanc(this.getGridDOMElement(), this),
            new KeyboardSelectAll(this.getGridDOMElement, this),
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
        setSelected(false)
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
            if (delta[i] < 0 && finalScroll[i] < Configuration.gridExpandThreshold * this.expandGridSize) {
                // Expand left/top
                expand[i] = this.expandGridSize
                direction[i] = -1
                if (maxScroll[i] - finalScroll[i] > Configuration.gridShrinkThreshold * this.expandGridSize) {
                    shrink[i] = -this.expandGridSize
                }
            } else if (delta[i] > 0 && finalScroll[i]
                > maxScroll[i] - Configuration.gridExpandThreshold * this.expandGridSize) {
                // Expand right/bottom
                expand[i] = this.expandGridSize
                direction[i] = 1
                if (finalScroll[i] > Configuration.gridShrinkThreshold * this.expandGridSize) {
                    shrink[i] = -this.expandGridSize
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
        return this.expandGridSize
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
        const translate = [
            directionX < 0 ? scaledX : 0,
            directionY < 0 ? scaledY : 0
        ]
        this.#translate(translate[0], translate[1])
        this.viewportElement.scrollLeft = initialScroll[0] + translate[0]
        this.viewportElement.scrollTop = initialScroll[1] + translate[1]
    }

    progressiveSnapToGrid(x) {
        return this.expandGridSize * Math.round(x / this.expandGridSize + 0.5 * Math.sign(x))
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
            return this.links.filter(link => link.getSourcePin() == pin || link.getDestinationPin() == pin)
        }
        if (a != null && b != null) {
            return this.links.filter(link =>
                link.getSourcePin() == a && link.getDestinationPin() == b
                || link.getSourcePin() == b && link.getDestinationPin() == a)
        }
        return this.links
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
        const intoArray = element => {
            if (element instanceof NodeElement) {
                this.nodes.push(element)
            } else if (element instanceof LinkElement) {
                this.links.push(element)
            }
        }
        if (this.nodesContainerElement) {
            graphElements.forEach(element => {
                if (element.closest(Blueprint.tagName) != this) {
                    // If not already the in target DOM position
                    this.nodesContainerElement.appendChild(element)
                    intoArray(element)
                }
            })
        } else {
            graphElements
                .filter(element => {
                    if (element instanceof NodeElement) {
                        return !this.nodes.includes(element)
                    } else if (element instanceof LinkElement) {
                        return !this.links.includes(element)
                    }
                    return false
                })
                .forEach(intoArray)
        }
    }

    /**
     * @param  {...IElement} graphElements
     */
    removeGraphElement(...graphElements) {
        let removed = false
        graphElements.forEach(element => {
            if (element.closest(Blueprint.tagName) == this) {
                element.remove()
                removed = false
            }
        })
        if (removed) {
            this.nodes = [...this.querySelectorAll(NodeElement.tagName)]
            this.links = [...this.querySelectorAll(LinkElement.tagName)]
        }
    }

    setFocused(value = true) {
        if (this.focused == value) {
            return
        }
        let event = new CustomEvent(value ? "blueprint-focus" : "blueprint-unfocus")
        this.focused = value
        this.dataset.focused = this.focused
        if (!this.focused) {
            this.unselectAll()
        }
        this.dispatchEvent(event)
    }
}

customElements.define(Blueprint.tagName, Blueprint)
