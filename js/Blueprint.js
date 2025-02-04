import Configuration from "./Configuration.js"
import Utility from "./Utility.js"
import IElement from "./element/IElement.js"
import LinkElement from "./element/LinkElement.js"
import NodeElement from "./element/NodeElement.js"
import BlueprintEntity from "./entity/BlueprintEntity.js"
import BooleanEntity from "./entity/BooleanEntity.js"
import NiagaraClipboardContent from "./entity/objects/NiagaraClipboardContent.js"
import BlueprintTemplate from "./template/BlueprintTemplate.js"

/** @extends {IElement<BlueprintEntity, BlueprintTemplate>} */
export default class Blueprint extends IElement {

    static properties = {
        selecting: {
            type: Boolean,
            attribute: "data-selecting",
            reflect: true,
            converter: BooleanEntity.booleanConverter,
        },
        scrolling: {
            type: Boolean,
            attribute: "data-scrolling",
            reflect: true,
            converter: BooleanEntity.booleanConverter,
        },
        focused: {
            type: Boolean,
            attribute: "data-focused",
            reflect: true,
            converter: BooleanEntity.booleanConverter,
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

    #xScrollingAnimationId = 0
    #yScrollingAnimationId = 0
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    /** @type {Map<String, NodeElement>} */
    nodesNames = new Map()
    /** @type {Coordinates} */
    mousePosition = [0, 0]

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
        super.initialize(new BlueprintEntity(), new BlueprintTemplate())
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

    /**
     * @param {Number} x
     * @param {Number} y
     */
    setScroll(x, y) {
        this.scrollX = x
        this.scrollY = y
    }

    scrollDelta(x = 0, y = 0, smooth = false, scrollTime = Configuration.smoothScrollTime) {
        if (smooth) {
            let previousScrollDelta = [0, 0]
            if (this.#xScrollingAnimationId) {
                cancelAnimationFrame(this.#xScrollingAnimationId)
            }
            if (this.#yScrollingAnimationId) {
                cancelAnimationFrame(this.#yScrollingAnimationId)
            }
            Utility.animate(
                0,
                x,
                scrollTime,
                x => {
                    this.scrollDelta(x - previousScrollDelta[0], 0, false)
                    previousScrollDelta[0] = x
                },
                id => this.#xScrollingAnimationId = id
            )
            Utility.animate(
                0,
                y,
                scrollTime,
                y => {
                    this.scrollDelta(0, y - previousScrollDelta[1], false)
                    previousScrollDelta[1] = y
                },
                id => this.#yScrollingAnimationId = id
            )
        } else {
            const maxScroll = [2 * Configuration.expandGridSize, 2 * Configuration.expandGridSize]
            let currentScroll = this.getScroll()
            let finalScroll = [
                currentScroll[0] + x,
                currentScroll[1] + y
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
                this.seamlessExpand(expand[0], expand[1])
            }
            currentScroll = this.getScroll()
            finalScroll = [
                currentScroll[0] + x,
                currentScroll[1] + y
            ]
            this.setScroll(finalScroll[0], finalScroll[1])
        }
    }

    scrollCenter(smooth = false) {
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
        this.scrollDelta(deltaOffset[0], deltaOffset[1], smooth)
    }

    getViewportSize() {
        return [
            this.template.viewportElement.clientWidth,
            this.template.viewportElement.clientHeight,
        ]
    }

    getScrollMax() {
        return [
            this.template.viewportElement.scrollWidth - this.template.viewportElement.clientWidth,
            this.template.viewportElement.scrollHeight - this.template.viewportElement.clientHeight,
        ]
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    snapToGrid(x, y) {
        return Utility.snapToGrid(x, y, Configuration.gridSize)
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    seamlessExpand(x, y) {
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
            center[0] += this.translateX
            center[1] += this.translateY
            let relativeScale = this.getScale() / initialScale
            let newCenter = [
                relativeScale * center[0],
                relativeScale * center[1],
            ]
            this.scrollDelta(
                (newCenter[0] - center[0]) * initialScale,
                (newCenter[1] - center[1]) * initialScale,
            )
        }
    }

    getScale() {
        return Configuration.scale[this.getZoom()]
    }

    /** @param {Number} value */
    scaleCorrect(value) {
        return value / this.getScale()
    }

    /** @param {Number} value */
    scaleCorrectReverse(value) {
        return value * this.getScale()
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {[Number, Number]}
     */
    compensateTranslation(x, y) {
        x -= this.translateX
        y -= this.translateY
        return [x, y]
    }

    getNodes(selected = false) {
        let result = this.nodes
        if (selected) {
            result = result.filter(n => n.selected)
        }
        return result
    }

    getCommentNodes(justSelected = false) {
        let result = /** @type {NodeElement[]} */([...this.template.getCommentNodes(justSelected)])
        if (result.length === 0) {
            result = this.nodes.filter(n =>
                n.getType() === Configuration.paths.comment && (!justSelected || n.selected)
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
     * @param {PinElement?} a
     * @param {PinElement?} b
     */
    getLinks(a = null, b = null) {
        if ((a == null) != (b == null)) {
            const pin = a ?? b
            return this.links.filter(link => link.origin == pin || link.target == pin)
        }
        if (a != null && b != null) {
            return this.links.filter(link =>
                link.origin == a && link.target == b
                || link.origin == b && link.target == a
            )
        }
        return this.links
    }

    /**
     * @param {PinElement} originPin
     * @param {PinElement} targetPin
     */
    getLink(originPin, targetPin, strictDirection = false) {
        return this.links.find(link =>
            link.origin == originPin && link.target == targetPin
            || !strictDirection && link.origin == targetPin && link.target == originPin
        )
    }

    selectAll() {
        this.getNodes().forEach(node => Blueprint.nodeSelectToggleFunction(node, true))
    }

    unselectAll() {
        this.getNodes().forEach(node => Blueprint.nodeSelectToggleFunction(node, false))
    }

    getSerializedText() {
        const nodes = this.blueprint.getNodes(true).map(n => n.entity)
        let exports = false
        let result = nodes
            .filter(n => {
                exports ||= n.exported
                return !n.exported
            })
            .reduce((acc, cur) => acc + cur.serialize(), "")
        if (exports) {
            const object = new NiagaraClipboardContent(this.blueprint.entity, nodes)
            result = object.serialize() + result
        }
        return result
    }

    /** @param  {...IElement} graphElements */
    addGraphElement(...graphElements) {
        /** @param {CustomEvent} event */
        const removeEventHandler = event => {
            const target = event.currentTarget
            target.removeEventListener(Configuration.removeEventName, removeEventHandler)
            const [graphElementsArray, entity] = target instanceof NodeElement
                ? [this.nodes, target.entity]
                : target instanceof LinkElement
                    ? [this.links]
                    : null
            // @ts-expect-error
            const index = graphElementsArray?.indexOf(target)
            if (index >= 0) {
                const last = graphElementsArray.pop()
                if (index < graphElementsArray.length) {
                    graphElementsArray[index] = last
                }
            }
            if (entity) {
                this.entity.removeObjectEntity(entity)
            }
        }
        for (const element of graphElements) {
            element.blueprint = this
            if (element instanceof NodeElement && !this.nodes.includes(element)) {
                const name = element.entity.getObjectName()
                this.entity.updateNameIndex(name)
                if (element.getType() == Configuration.paths.niagaraClipboardContent) {
                    this.entity = this.entity.mergeWith(element.entity)
                    const additionalSerialization = atob(element.entity.ExportedNodes?.toString() ?? "")
                    if (additionalSerialization) {
                        this.template.getPasteInputObject().pasted(additionalSerialization)
                            .forEach(node => node.entity.exported = true)
                    }
                    continue
                }
                const homonym = this.entity.getHomonymObjectEntity(element.entity)
                if (homonym) {
                    const newName = this.entity.takeFreeName(name)
                    // @ts-expect-error
                    homonym.Name = new (homonym.Name.constructor)(newName)
                }
                this.nodes.push(element)
                this.entity.addObjectEntity(element.entity)
                element.addEventListener(Configuration.removeEventName, removeEventHandler)
                this.template.nodesContainerElement?.appendChild(element)
            } else if (element instanceof LinkElement && !this.links.includes(element)) {
                this.links.push(element)
                element.addEventListener(Configuration.removeEventName, removeEventHandler)
                if (this.template.linksContainerElement && !this.template.linksContainerElement.contains(element)) {
                    this.template.linksContainerElement.appendChild(element)
                }
            }
        }
        graphElements.filter(element => element instanceof NodeElement).forEach(
            node => /** @type {NodeElement} */(node).sanitizeLinks(graphElements)
        )
        graphElements
            .filter(element => element instanceof NodeElement && element.getType() == Configuration.paths.comment)
            .forEach(element => element.updateComplete.then(() =>
                /** @type {CommentNodeTemplate} */(element.template).manageNodesBind()
            ))
    }

    /** @param  {...IElement} graphElements */
    removeGraphElement(...graphElements) {
        for (let element of graphElements) {
            if (element.closest("ueb-blueprint") !== this) {
                return
            }
            element.remove()
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
