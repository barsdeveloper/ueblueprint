import BlueprintTemplate from "./template/BlueprintTemplate"
import DragScroll from "./input/DragScroll"
import GraphElement from "./graph/GraphElement"
import GraphSelector from "./graph/GraphSelector"
import Select from "./input/Select"
import Utility from "./Utility"
import Zoom from "./input/Zoom"
import BlueprintData from "./BlueprintData"
import Paste from "./input/Paste"
import Unfocus from "./input/Unfocus"

/** @typedef {import("./graph/GraphNode").default} GraphNode */
export default class Blueprint extends GraphElement {

    constructor() {
        super(new BlueprintData(), new BlueprintTemplate())
        /** @type {HTMLElement} */
        this.gridElement = null
        /** @type {HTMLElement} */
        this.viewportElement = null
        /** @type {HTMLElement} */
        this.overlayElement = null
        /** @type {GraphSelector} */
        this.selectorElement = null
        /** @type {HTMLElement} */
        this.nodesContainerElement = null
        this.dragObject = null
        this.selectObject = null
        /** @type {number} */
        this.zoom = 0
        /** @type {HTMLElement} */
        this.headerElement = null
        this.focused = false
        /** @type {(node: GraphNode) => BoundariesInfo} */
        this.nodeBoundariesSupplier = node => {
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
        /** @type {(node: GraphNode, selected: bool) => void}} */
        this.nodeSelectToggleFunction = (node, selected) => {
            node.setSelected(selected)
        }
    }

    connectedCallback() {
        super.connectedCallback()
        this.classList.add('ueb', `ueb-zoom-${this.zoom}`)

        this.headerElement = this.querySelector('.ueb-viewport-header')
        console.assert(this.headerElement, "Header element not provided by the template.")
        this.overlayElement = this.querySelector('.ueb-viewport-overlay')
        console.assert(this.overlayElement, "Overlay element not provided by the template.")
        this.viewportElement = this.querySelector('.ueb-viewport-body')
        console.assert(this.viewportElement, "Viewport element not provided by the template.")
        this.gridElement = this.viewportElement.querySelector('.ueb-grid')
        console.assert(this.gridElement, "Grid element not provided by the template.")
        this.selectorElement = new GraphSelector()
        this.nodesContainerElement = this.querySelector('[data-nodes]')
        console.assert(this.nodesContainerElement, "Nodes container element not provided by the template.")
        this.nodesContainerElement.append(this.selectorElement)
        this.querySelector('[data-nodes]').append(...this.entity.nodes)

        this.pasteObject = new Paste(this.getGridDOMElement(), this)

        this.dragObject = new DragScroll(this.getGridDOMElement(), this, {
            clickButton: 2,
            moveEverywhere: true,
            exitAnyButton: false
        })

        this.zoomObject = new Zoom(this.getGridDOMElement(), this, {
            looseTarget: true
        })

        this.selectObject = new Select(this.getGridDOMElement(), this, {
            clickButton: 0,
            moveEverywhere: true,
            exitAnyButton: true
        })

        this.unfocusObject = new Unfocus(this.getGridDOMElement(), this)
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dragObject.unlistenDOMElement()
        this.selectObject.unlistenDOMElement()
        this.pasteObject.unlistenDOMElement()
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
                behavior: 'smooth'
            })
        }
    }

    scrollDelta(delta, smooth = false) {
        const scrollMax = this.getScrollMax()
        let currentScroll = this.getScroll()
        let finalScroll = [
            currentScroll[0] + delta[0],
            currentScroll[1] + delta[1]
        ]
        let expand = [0, 0]
        for (let i = 0; i < 2; ++i) {
            if (delta[i] < 0 && finalScroll[i] < 0.25 * this.entity.expandGridSize) {
                // Expand if scrolling is diminishing and the remainig space is less that a quarter of an expansion step
                expand[i] = finalScroll[i]
                if (expand[i] > 0) {
                    // Final scroll is still in rage (more than zero) but we want to expand to negative (left or top)
                    expand[i] = -this.entity.expandGridSize
                }
            } else if (delta[i] > 0 && finalScroll[i] > scrollMax[i] - 0.25 * this.entity.expandGridSize) {
                // Expand if scrolling is increasing and the remainig space is less that a quarter of an expansion step
                expand[i] = finalScroll[i] - scrollMax[i]
                if (expand[i] < 0) {
                    // Final scroll is still in rage (less than the maximum scroll) but we want to expand to positive (right or bottom)
                    expand[i] = this.entity.expandGridSize
                }
            }
        }
        if (expand[0] != 0 || expand[1] != 0) {
            this.seamlessExpand(this.progressiveSnapToGrid(expand[0]), this.progressiveSnapToGrid(expand[1]))
            currentScroll = this.getScroll()
            finalScroll = [
                currentScroll[0] + delta[0],
                currentScroll[1] + delta[1]
            ]
        }
        this.setScroll(finalScroll, smooth)
    }

    scrollCenter() {
        const scroll = this.getScroll()
        const offset = [
            this.entity.translateValue[0] - scroll[0],
            this.entity.translateValue[1] - scroll[1]
        ]
        const targetOffset = this.getViewportSize().map(size => size / 2)
        const deltaOffset = [
            offset[0] - targetOffset[0],
            offset[1] - targetOffset[1]
        ]
        this.scrollDelta(deltaOffset, true)
    }

    getExpandGridSize() {
        return this.entity.expandGridSize
    }

    getViewportSize() {
        return [
            this.viewportElement.clientWidth,
            this.viewportElement.clientHeight
        ]
    }

    /**
     * Get the scroll limits
     * @return {array} The horizonal and vertical maximum scroll limits
     */
    getScrollMax() {
        return [
            this.viewportElement.scrollWidth - this.viewportElement.clientWidth,
            this.viewportElement.scrollHeight - this.viewportElement.clientHeight
        ]
    }

    /**
     * Expand the grid, considers the absolute value of params
     * @param {number} x - Horizontal expansion value
     * @param {number} y - Vertical expansion value
     */
    _expand(x, y) {
        x = Math.round(Math.abs(x))
        y = Math.round(Math.abs(y))
        this.entity.additional = [this.entity.additional[0] + x, this.entity.additional[1] + y]
        if (this.gridElement) {
            this.gridElement.style.setProperty('--ueb-additional-x', this.entity.additional[0])
            this.gridElement.style.setProperty('--ueb-additional-y', this.entity.additional[1])
        }
    }

    /**
     * Moves the content of the grid according to the coordinates
     * @param {number} x - Horizontal translation value
     * @param {number} y - Vertical translation value
     */
    _translate(x, y) {
        x = Math.round(x)
        y = Math.round(y)
        this.entity.translateValue = [this.entity.translateValue[0] + x, this.entity.translateValue[1] + y]
        if (this.gridElement) {
            this.gridElement.style.setProperty('--ueb-translate-x', this.entity.translateValue[0])
            this.gridElement.style.setProperty('--ueb-translate-y', this.entity.translateValue[1])
        }
    }

    /**
     * Expand the grind indefinitely, the content will remain into position
     * @param {number} x - Horizontal expand value (negative means left, positive means right)
     * @param {number} y - Vertical expand value (negative means top, positive means bottom)
     */
    seamlessExpand(x, y) {
        let scale = this.getScale()
        let scaledX = x / scale
        let scaledY = y / scale
        // First expand the grid to contain the additional space
        this._expand(scaledX, scaledY)
        // If the expansion is towards the left or top, then scroll back to give the illusion that the content is in the same position and translate it accordingly
        this._translate(scaledX < 0 ? -scaledX : 0, scaledY < 0 ? -scaledY : 0)
        if (x < 0) {
            this.viewportElement.scrollLeft -= x
        }
        if (y < 0) {
            this.viewportElement.scrollTop -= y
        }
    }

    progressiveSnapToGrid(x) {
        return this.entity.expandGridSize * Math.round(x / this.entity.expandGridSize + 0.5 * Math.sign(x))
    }

    getZoom() {
        return this.zoom
    }

    setZoom(zoom, center) {
        zoom = Utility.clamp(zoom, -12, 0)
        if (zoom == this.zoom) {
            return
        }
        let initialScale = this.getScale()
        this.classList.remove(`ueb-zoom-${this.zoom}`)
        this.classList.add(`ueb-zoom-${zoom}`)
        this.zoom = zoom


        if (center) {
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
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue('--ueb-scale'))
    }

    compensateTranslation(position) {
        position[0] -= this.entity.translateValue[0]
        position[1] -= this.entity.translateValue[1]
        return position
    }

    /**
     * 
     * @returns {GraphNode[]} Nodes
     */
    getNodes() {
        return this.entity.nodes
    }

    /**
     * Unselect all nodes
     */
    unselectAll() {
        this.entity.nodes.forEach(node => this.nodeSelectToggleFunction(node, false))
    }

    /**
     * 
     * @param  {...GraphNode} graphNodes 
     */
    addNode(...graphNodes) {
        [...graphNodes].reduce(
            (s, e) => {
                s.push(e)
                return s
            },
            this.entity.nodes)
        if (this.nodesContainerElement) {
            this.nodesContainerElement.append(...graphNodes)
        }
    }

    setFocused(value = true) {
        if (this.focused == value) {
            return;
        }
        let event = new CustomEvent(value ? "blueprintfocus" : "blueprintunfocus")
        this.focused = value
        this.dataset.focused = this.focused
        if (!this.focused) {
            this.unselectAll()
        }
        this.dispatchEvent(event)
    }
}

customElements.define('u-blueprint', Blueprint)
