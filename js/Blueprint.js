import BlueprintTemplate from "./template/BlueprintTemplate"
import Configuration from "./Configuration"
import IElement from "./element/IElement"
import LinkElement from "./element/LinkElement"
import NodeElement from "./element/NodeElement"
import Utility from "./Utility"

/**
 * @typedef {import("./element/PinElement").default} PinElement
 * @typedef {import("./entity/GuidEntity").default} GuidEntity
 * @typedef {import("./entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {import("./template/node/CommentNodeTemplate").default} CommentNodeTemplate
 * @typedef {import("lit").PropertyValues} PropertyValues
 * @typedef {typeof Blueprint} BlueprintConstructor
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
    /** @param {NodeElement} node */
    static nodeBoundariesSupplier = node => {
        return {
            primaryInf: node.leftBoundary(true),
            primarySup: node.rightBoundary(true),
            // Counter intuitive here: the y (secondary axis is positive towards the bottom, therefore upper bound "sup" is bottom)
            secondaryInf: node.topBoundary(true),
            secondarySup: node.bottomBoundary(true),
        }
    }
    /** @type {(node: NodeElement, selected: Boolean) => void}} */
    static nodeSelectToggleFunction = (node, selected) => {
        node.setSelected(selected)
    }

    #avoidScrolling = false
    /** @type {Map<String, Number>} */
    #nodeNameCounter = new Map()
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    /** @type {Number[]} */
    mousePosition = [0, 0]
    waitingExpandUpdate = false

    constructor() {
        super()
        this.selecting = false
        this.scrolling = false
        this.focused = false
        this.zoom = 0
        this.scrollX = Configuration.expandGridSize
        this.scrollY = Configuration.expandGridSize
        this.translateX = Configuration.expandGridSize
        this.translateY = Configuration.expandGridSize
        super.initialize({}, new BlueprintTemplate())
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }

    getGridDOMElement() {
        return this.template.gridElement
    }

    getScroll() {
        return [this.scrollX, this.scrollY]
    }

    /** @param {Number[]} param0 */
    setScroll([x, y]) {
        this.scrollX = x
        this.scrollY = y
    }

    /** @param {Number[]} delta */
    scrollDelta(delta, smooth = false) {
        if (smooth) {
            let previousScrollDelta = [0, 0]
            Utility.animate(0, delta[0], Configuration.smoothScrollTime, x => {
                this.scrollDelta([x - previousScrollDelta[0], 0], false)
                previousScrollDelta[0] = x
            })
            Utility.animate(0, delta[1], Configuration.smoothScrollTime, y => {
                this.scrollDelta([0, y - previousScrollDelta[1]], false)
                previousScrollDelta[1] = y
            })
        } else {
            const maxScroll = [2 * Configuration.expandGridSize, 2 * Configuration.expandGridSize]
            let currentScroll = this.getScroll()
            let finalScroll = [
                currentScroll[0] + delta[0],
                currentScroll[1] + delta[1]
            ]
            let expand = [0, 0]
            for (let i = 0; i < 2; ++i) {
                if (finalScroll[i] < Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                    // Expand left/top
                    expand[i] = -1
                } else if (
                    finalScroll[i]
                    > maxScroll[i] - Configuration.gridExpandThreshold * Configuration.expandGridSize
                ) {
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
            this.setScroll(finalScroll)
        }
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
            this.template.viewportElement.clientWidth,
            this.template.viewportElement.clientHeight
        ]
    }

    getScrollMax() {
        return [
            this.template.viewportElement.scrollWidth - this.template.viewportElement.clientWidth,
            this.template.viewportElement.scrollHeight - this.template.viewportElement.clientHeight
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
            //requestAnimationFrame(_ => {
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
            //})
        }
    }

    getScale() {
        return Configuration.scale[this.getZoom()]
    }

    /** @param {Number[]} param0 */
    compensateTranslation([x, y]) {
        x -= this.translateX
        y -= this.translateY
        return [x, y]
    }

    getNodes(
        selected = false,
        [t, r, b, l] = [
            Number.MIN_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MAX_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER,
        ]
    ) {
        let result = this.nodes
        if (selected) {
            result = result.filter(n => n.selected)
        }
        if (
            t > Number.MIN_SAFE_INTEGER
            || r < Number.MAX_SAFE_INTEGER
            || b < Number.MAX_SAFE_INTEGER
            || l > Number.MIN_SAFE_INTEGER
        ) {
            result = result.filter(n => {
                return n.topBoundary() >= t && n.rightBoundary() <= r && n.bottomBoundary() <= b && n.leftBoundary() >= l
            })
        }
        return result
    }

    getCommentNodes(justSelected = false) {
        let result = /** @type {NodeElement[]} */([...this.template.getCommentNodes(justSelected)])
        if (result.length === 0) {
            result = this.nodes.filter(n =>
                n.getType() === Configuration.nodeType.comment && (!justSelected || n.selected)
            )
        }
        return result
    }

    /** @param {PinReferenceEntity} pinReference */
    getPin(pinReference) {
        let result = this.template.getPin(pinReference)
        // Remember could be renamed in the meantime and DOM not yet updated
        if (!result || result.nodeElement.getNodeName() != pinReference.objectName.toString()) {
            // Slower fallback
            result = [... this.nodes
                .find(n => pinReference.objectName.toString() == n.getNodeName())
                ?.getPinElements() ?? []]
                .find(p => pinReference.pinGuid.toString() == p.getPinId().toString())
        }
        return result
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
        this.getNodes().forEach(node => Blueprint.nodeSelectToggleFunction(node, true))
    }

    unselectAll() {
        this.getNodes().forEach(node => Blueprint.nodeSelectToggleFunction(node, false))
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
                this.template.nodesContainerElement?.appendChild(element)
            } else if (element instanceof LinkElement && !this.links.includes(element)) {
                this.links.push(element)
                if (this.template.linksContainerElement && !this.template.linksContainerElement.contains(element)) {
                    this.template.linksContainerElement.appendChild(element)
                }
            }
        }
        graphElements.filter(element => element instanceof NodeElement).forEach(
            node => /** @type {NodeElement} */(node).sanitizeLinks(graphElements)
        )
        graphElements
            .filter(element => element instanceof NodeElement && element.getType() == Configuration.nodeType.comment)
            .forEach(element => element.updateComplete.then(() =>
                /** @type {CommentNodeTemplate} */(element.template).manageNodesBind()
            ))
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
        let event = new CustomEvent(value ? Configuration.focusEventName.begin : Configuration.focusEventName.end)
        this.focused = value
        if (!this.focused) {
            this.unselectAll()
        }
        this.dispatchEvent(event)
    }

    /** @param {Boolean} begin */
    acknowledgeEditText(begin) {
        const event = new CustomEvent(
            begin
                ? Configuration.editTextEventName.begin
                : Configuration.editTextEventName.end
        )
        this.dispatchEvent(event)
    }
}

customElements.define("ueb-blueprint", Blueprint)
