import UEBlueprintDOMModel from "./UEBlueprintDOMModel.js";
import UEBlueprintDragScroll from "./UEBlueprintDragScroll.js";

export default class UEBlueprint extends UEBlueprintDOMModel {

    static domTemplate(obj) {
        return `
<div class="ueb">
    <div class="ueb-viewport-header">
        <div class="ueb-viewport-zoom">1:1</div>
    </div>
    <div class="ueb-viewport-overlay"></div>
    <div class="ueb-viewport-body">
        <div class="ueb-grid"
            style="--ueb-additional-x:${obj.additional[0]}; --ueb-additional-y:${obj.additional[1]}; --ueb-translate-x:${obj.translateValue[0]}; --ueb-translate-y:${obj.translateValue[1]}">
            <div class="ueb-grid-content">
                ${obj.nodes.forEach(node => node.getDOMElement()) ?? ''}
            </div>
        </div>
    </div>
</div>
`
    }

    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    constructor() {
        super()
        this.expandGridSize = 400
        this.gridDOMElement = null
        this.dragObject = null
        this.additional = [2 * this.expandGridSize, 2 * this.expandGridSize]
        this.translateValue = [this.expandGridSize, this.expandGridSize]
        this.scale = 1
        this.nodes = []
    }

    createDOMElement() {
        super.createDOMElement()
        this.gridDOMElement = this.domElement.querySelector('.ueb-grid')
        let contentElement = this.domElement.querySelector('.ueb-grid-content')
        if (!this.gridDOMElement || !contentElement) {
            console.error('Some expencted DOM elements not be found, please check domTemplate().')
        }
        // Populate the grid content with the node elements
        this.nodes.forEach(node => {
            contentElement.appendChild(node.getDOMElement())
        })
        this.dragObject = new UEBlueprintDragScroll(this, {
            'clickButton': 2,
            'stepSize': 1
        })
    }

    removeDOMElement() {
        if (this.domElement) {
            this.dragObject.unlistenDOMElement()
        }
        return super.removeDOMElement()
    }

    getGridDOMElement() {
        return this.gridDOMElement
    }

    setScroll(value, smooth = false) {
        this.scroll = value
        if (!smooth) {
            this.gridDOMElement.parentElement.scroll(value[0], value[1])
        } else {
            this.gridDOMElement.parentElement.scroll({
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
        let parentElement = this.gridDOMElement.parentElement
        return [parentElement.scrollLeft, parentElement.scrollTop]
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
        let parentElement = this.gridDOMElement.parentElement
        return [
            parentElement.clientWidth,
            parentElement.clientHeight
        ]
    }

    /**
     * Get the scroll limits
     * @return {array} The horizonal and vertical maximum scroll limits
     */
    getScrollMax() {
        let parentElement = this.gridDOMElement.parentElement
        return [
            parentElement.scrollWidth - parentElement.clientWidth,
            parentElement.scrollHeight - parentElement.clientHeight
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
        if (this.gridDOMElement) {
            this.gridDOMElement.style.setProperty('--ueb-additional-x', this.additional[0])
            this.gridDOMElement.style.setProperty('--ueb-additional-y', this.additional[1])
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
        if (this.gridDOMElement) {
            this.gridDOMElement.style.setProperty('--ueb-translate-x', this.translateValue[0])
            this.gridDOMElement.style.setProperty('--ueb-translate-y', this.translateValue[1])
        }
    }

    /**
     * Expand the grind indefinitely, the content will remain into position
     * @param {number} x - Horizontal expand value (negative means left, positive means right)
     * @param {number} y - Vertical expand value (negative means top, positive means bottom)
     */
    seamlessExpand(x, y) {
        // First expand the grid to contain the additional space
        this._expand(x, y)
        // If the expansion is towards the left or top, then scroll back to give the illusion that the content is in the same position and translate it accordingly
        this._translate(x < 0 ? -x : 0, y < 0 ? -y : 0)
        if (x < 0) {
            this.gridDOMElement.parentElement.scrollLeft -= x
        }
        if (y < 0) {
            this.gridDOMElement.parentElement.scrollTop -= y
        }
    }

    progressiveSnapToGrid(x) {
        return this.expandGridSize * Math.round(x / this.expandGridSize + 0.5 * Math.sign(x))
    }

    getScale() {
        return this.scale
    }

    addNode(...blueprintNode) {
        this.nodes.push(...blueprintNode)
    }
}