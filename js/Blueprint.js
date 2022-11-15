import BlueprintTemplate from "./template/BlueprintTemplate"
import Configuration from "./Configuration"
import IElement from "./element/IElement"
import LinkElement from "./element/LinkElement"
import NodeElement from "./element/NodeElement"
import SelectorElement from "./element/SelectorElement"
import Utility from "./Utility"

/**
 * @typedef {import("./element/PinElement").default} PinElement
 * @typedef {import("./entity/GuidEntity").default} GuidEntity
 * @typedef {import("./entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {{
 *     primaryInf: Number,
 *     primarySup: Number,
 *     secondaryInf: Number,
 *     secondarySup: Number,
 * }} BoundariesInfo
 */

/** @extends {IElement<Object, BlueprintTemplate>} */
export default class Blueprint extends IElement {

    static properties = {
        selecting: {
            type: Boolean,
            attribute: "data-selecting",
            reflect: true,
            converter: Utility.booleanConverter,
        },
        scrolling: {
            type: Boolean,
            attribute: "data-scrolling",
            reflect: true,
            converter: Utility.booleanConverter,
        },
        focused: {
            type: Boolean,
            attribute: "data-focused",
            reflect: true,
            converter: Utility.booleanConverter,
        },
        zoom: {
            type: Number,
            attribute: "data-zoom",
            reflect: true,
        },
        scrollX: {
            type: Number,
            attribute: false,
        },
        scrollY: {
            type: Number,
            attribute: false,
        },
        additionalX: {
            type: Number,
            attribute: false,
        },
        additionalY: {
            type: Number,
            attribute: false,
        },
        translateX: {
            type: Number,
            attribute: false,
        },
        translateY: {
            type: Number,
            attribute: false,
        },
    }

    static styles = BlueprintTemplate.styles

    /** @type {Map<String, Number>} */
    #nodeNameCounter = new Map()
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    /** @type {Number[]} */
    mousePosition = [0, 0]
    /** @type {HTMLElement} */
    gridElement
    /** @type {HTMLElement} */
    viewportElement
    /** @type {HTMLElement} */
    overlayElement
    /** @type {SelectorElement} */
    selectorElement
    /** @type {HTMLElement} */
    linksContainerElement
    /** @type {HTMLElement} */
    nodesContainerElement
    /** @type {HTMLElement} */
    headerElement
    focused = false
    waitingExpandUpdate = false
    nodeBoundariesSupplier = node => {
        let rect = node.getBoundingClientRect()
        let gridRect = this.nodesContainerElement.getBoundingClientRect()
        const scaleCorrection = 1 / this.getScale()
        return /** @type {BoundariesInfo} */ {
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

    /** @param {Configuration} settings */
    constructor(settings = new Configuration()) {
        super({}, new BlueprintTemplate())
        this.selecting = false
        this.scrolling = false
        this.focused = false
        this.zoom = 0
        this.scrollX = Configuration.expandGridSize
        this.scrollY = Configuration.expandGridSize
        this.translateX = Configuration.expandGridSize
        this.translateY = Configuration.expandGridSize
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback()
    }

    getScroll() {
        return [this.scrollX, this.scrollY]
    }

    /** @param {Number[]} param0 */
    setScroll([x, y], smooth = false) {
        this.scrollX = x
        this.scrollY = y
    }

    /** @param {Number[]} delta */
    scrollDelta(delta, smooth = false) {
        const maxScroll = [2 * Configuration.expandGridSize, 2 * Configuration.expandGridSize]
        let currentScroll = this.getScroll()
        let finalScroll = [
            currentScroll[0] + delta[0],
            currentScroll[1] + delta[1]
        ]
        let expand = [0, 0]
        for (let i = 0; i < 2; ++i) {
            if (delta[i] < 0 && finalScroll[i] < Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                // Expand left/top
                expand[i] = -1
            } else if (delta[i] > 0 && finalScroll[i]
                > maxScroll[i] - Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                // Expand right/bottom
                expand[i] = 1
            }
        }
        if (expand[0] != 0 || expand[1] != 0) {
            this.seamlessExpand(expand)
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
            this.translateX - scroll[0],
            this.translateY - scroll[1]
        ]
        const targetOffset = this.getViewportSize().map(size => size / 2)
        const deltaOffset = [
            offset[0] - targetOffset[0],
            offset[1] - targetOffset[1]
        ]
        this.scrollDelta(deltaOffset, true)
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
        return Utility.snapToGrid(location, Configuration.gridSize)
    }

    /** @param {Number[]} param0 */
    seamlessExpand([x, y]) {
        x = Math.round(x)
        y = Math.round(y)
        let scale = this.getScale()
        {
            // If the expansion is towards the left or top, then scroll back to give the illusion that the content is in the same position and translate it accordingly
            [x, y] = [-x * Configuration.expandGridSize, -y * Configuration.expandGridSize]
            if (x != 0) {
                this.scrollX += x
                x /= scale
            }
            if (y != 0) {
                this.scrollY += y
                y /= scale
            }
        }
        this.translateX += x
        this.translateY += y
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
        this.zoom = zoom

        if (center) {
            requestAnimationFrame(_ => {
                center[0] += this.translateX
                center[1] += this.translateY
                let relativeScale = this.getScale() / initialScale
                let newCenter = [
                    relativeScale * center[0],
                    relativeScale * center[1],
                ]
                this.scrollDelta([
                    (newCenter[0] - center[0]) * initialScale,
                    (newCenter[1] - center[1]) * initialScale,
                ])
            })
        }
    }

    getScale() {
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue("--ueb-scale"))
    }

    /** @param {Number[]} param0 */
    compensateTranslation([x, y]) {
        x -= this.translateX
        y -= this.translateY
        return [x, y]
    }

    getNodes(selected = false) {
        if (selected) {
            return this.nodes.filter(
                node => node.selected
            )
        } else {
            return this.nodes
        }
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        let result = this.template.getPin(pinReference)
        if (result
            // Make sure it wasn't renamed in the meantime
            && result.nodeElement.getNodeName() == pinReference.objectName.toString()) {
            return result
        }
        // Slower fallback
        return [... this.nodes
            .find(n => pinReference.objectName.toString() == n.getNodeName())
            ?.getPinElements() ?? []]
            .find(p => pinReference.pinGuid.toString() == p.getPinId().toString())
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
                || link.sourcePin == b && link.destinationPin == a
            )
        }
        return this.links
    }

    /**
     * @param {PinElement} sourcePin
     * @param {PinElement} destinationPin
     */
    getLink(sourcePin, destinationPin, ignoreDirection = false) {
        return this.links.find(link =>
            link.sourcePin == sourcePin && link.destinationPin == destinationPin
            || ignoreDirection && link.sourcePin == destinationPin && link.destinationPin == sourcePin
        )
    }

    selectAll() {
        this.getNodes().forEach(node => this.nodeSelectToggleFunction(node, true))
    }

    unselectAll() {
        this.getNodes().forEach(node => this.nodeSelectToggleFunction(node, false))
    }

    /** @param  {...IElement} graphElements */
    addGraphElement(...graphElements) {
        let nodeElements = []
        for (let element of graphElements) {
            element.blueprint = this
            if (element instanceof NodeElement && !this.nodes.includes(element)) {
                const nodeName = element.entity.getObjectName()
                const homonymNode = this.nodes.find(node => node.entity.getObjectName() == nodeName)
                if (homonymNode) {
                    // Inserted node keeps tha name and the homonym nodes is renamed
                    let name = homonymNode.entity.getObjectName(true)
                    this.#nodeNameCounter[name] = this.#nodeNameCounter[name] ?? -1
                    do {
                        ++this.#nodeNameCounter[name]
                    } while (this.nodes.find(node =>
                        node.entity.getObjectName() == Configuration.nodeName(name, this.#nodeNameCounter[name])
                    ))
                    homonymNode.rename(Configuration.nodeName(name, this.#nodeNameCounter[name]))
                }
                this.nodes.push(element)
                nodeElements.push(element)
                this.nodesContainerElement?.appendChild(element)
            } else if (element instanceof LinkElement && !this.links.includes(element)) {
                this.links.push(element)
                if (this.linksContainerElement && !this.linksContainerElement.contains(element)) {
                    this.linksContainerElement.appendChild(element)
                }
            }
        }
        graphElements.filter(element => element instanceof NodeElement).forEach(
            node => /** @type {NodeElement} */(node).sanitizeLinks(graphElements)
        )
    }

    /** @param  {...IElement} graphElements */
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
        if (!this.focused) {
            this.unselectAll()
        }
        this.dispatchEvent(event)
    }

    /** @param {Boolean} begin */
    dispatchEditTextEvent(begin) {
        const event = new CustomEvent(
            begin
                ? Configuration.editTextEventName.begin
                : Configuration.editTextEventName.end
        )
        this.dispatchEvent(event)
    }
}

customElements.define("ueb-blueprint", Blueprint)
