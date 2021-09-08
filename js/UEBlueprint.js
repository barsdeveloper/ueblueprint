import UEBlueprintDragScroll from "./UEBlueprintDragScroll.js"
import UEBlueprintSelect from "./UEBlueprintSelect.js"

export default class UEBlueprint extends HTMLElement {

    headerTemplate() {
        return `
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
        `
    }

    overlayTemplate() {
        return `
            <div class="ueb-viewport-overlay"></div>
        `
    }

    viewportTemplate() {
        return `
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x:${this.additional[0]}; --ueb-additional-y:${this.additional[1]}; --ueb-translate-x:${this.translateValue[0]}; --ueb-translate-y:${this.translateValue[1]}">
                    <div class="ueb-grid-content" data-nodes>
                    </div>
                </div>
            </div>
        `
    }

    selectorTemplate() {
        return `<div class="ueb-selector"></div>`
    }

    static getElement(template) {
        let div = document.createElement('div');
        div.innerHTML = template
        return div.firstElementChild
    }

    insertChildren() {
        this.querySelector('[data-nodes]').append(...this.nodes)
    }

    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    constructor() {
        super()
        this.nodes = new Set()
        this.expandGridSize = 400
        this.gridElement = null
        this.viewportElement = null
        this.overlayElement = null
        this.selectorElement = null
        this.dragObject = null
        this.selectObject = null
        this.additional = /*[2 * this.expandGridSize, 2 * this.expandGridSize]*/[0, 0]
        this.translateValue = /*[this.expandGridSize, this.expandGridSize]*/[0, 0]
        this.zoom = 0
        this.headerElement = null
        this.selectFrom = null
        this.selectTo = null
    }

    connectedCallback() {
        this.classList.add('ueb', `ueb-zoom-${this.zoom}`)

        this.headerElement = this.constructor.getElement(this.headerTemplate())
        this.appendChild(this.headerElement)

        this.overlayElement = this.constructor.getElement(this.overlayTemplate())
        this.appendChild(this.overlayElement)

        this.viewportElement = this.constructor.getElement(this.viewportTemplate())
        this.appendChild(this.viewportElement)

        this.gridElement = this.viewportElement.querySelector('.ueb-grid')
        this.insertChildren()

        this.dragObject = new UEBlueprintDragScroll(this, {
            'clickButton': 2,
            'stepSize': 1,
            'exitDragAnyButton': false
        })

        this.selectObject = new UEBlueprintSelect(this, {
            'clickButton': 0,
            'exitSelectAnyButton': true
        })
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.dragObject.unlistenDOMElement()
        this.selectObject.unlistenDOMElement()
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
            if (delta[i] < 0 && finalScroll[i] < 0.25 * this.expandGridSize) {
                // Expand if scrolling is diminishing and the remainig space is less that a quarter of an expansion step
                expand[i] = finalScroll[i]
                if (expand[i] > 0) {
                    // Final scroll is still in rage (more than zero) but we want to expand to negative (left or top)
                    expand[i] = -this.expandGridSize
                }
            } else if (delta[i] > 0 && finalScroll[i] > scrollMax[i] - 0.25 * this.expandGridSize) {
                // Expand if scrolling is increasing and the remainig space is less that a quarter of an expansion step
                expand[i] = finalScroll[i] - scrollMax[i]
                if (expand[i] < 0) {
                    // Final scroll is still in rage (less than the maximum scroll) but we want to expand to positive (right or bottom)
                    expand[i] = this.expandGridSize
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

    getScroll() {
        return [this.viewportElement.scrollLeft, this.viewportElement.scrollTop]
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
        this.additional = [this.additional[0] + x, this.additional[1] + y]
        if (this.gridElement) {
            this.gridElement.style.setProperty('--ueb-additional-x', this.additional[0])
            this.gridElement.style.setProperty('--ueb-additional-y', this.additional[1])
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
        this.translateValue = [this.translateValue[0] + x, this.translateValue[1] + y]
        if (this.gridElement) {
            this.gridElement.style.setProperty('--ueb-translate-x', this.translateValue[0])
            this.gridElement.style.setProperty('--ueb-translate-y', this.translateValue[1])
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
        return this.expandGridSize * Math.round(x / this.expandGridSize + 0.5 * Math.sign(x))
    }

    getZoom() {
        return this.zoom
    }

    setZoom(zoom, center) {
        zoom = this.constructor.clamp(zoom, -12, 0)
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
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue('--ueb-grid-scale'))
    }

    startSelecting(x, y) {
        if (this.selectorElement) {
            this.finishSelecting()
        }
        this.selectorElement = this.constructor.getElement(this.selectorTemplate())
        this.querySelector('[data-nodes]').appendChild(this.selectorElement)
        this.selectorElement.style.setProperty('--ueb-select-from-x', x)
        this.selectorElement.style.setProperty('--ueb-select-from-y', y)
    }

    finishSelecting() {
        if (this.selectorElement) {
            this.selectorElement.remove()
            this.selectorElement = null
        }
    }

    doSelecting(x, y) {
        this.selectorElement.style.setProperty('--ueb-select-to-x', x)
        this.selectorElement.style.setProperty('--ueb-select-to-y', y)
    }

    addNode(...blueprintNodes) {
        [...blueprintNodes].reduce((s, e) => s.add(e), this.nodes)
        let nodesDestination = this.querySelector('[data-nodes]')
        if (nodesDestination) {
            nodesDestination.append(...blueprintNodes)
        }
    }
}

customElements.define('u-blueprint', UEBlueprint)
