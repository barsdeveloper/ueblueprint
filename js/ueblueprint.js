import UEBlueprintDOMModel from "./UEBlueprintDOMModel.js";
import UEBlueprintDragScroll from "./UEBlueprintDragScroll.js";

export default class UEBlueprint extends UEBlueprintDOMModel {

    static domTemplate(obj) {
        return `
<div class="ueb" style="--ueb-grid-scale:${obj.scale}">
    <div class="ueb-viewport-header">
        <div class="ueb-viewport-zoom">1:1</div>
    </div>
    <div class="ueb-viewport-overlay"></div>
    <div class="ueb-viewport-body">
        <div class="ueb-grid"
            style="--ueb-additional-x:${obj.additional[0]}; --ueb-additional-y:${obj.additional[1]}; --ueb-translate-x:${obj.translate[0]}; --ueb-translate-y:${obj.translate[1]}">
            <div class="ueb-grid-content">
                ${obj.nodes.forEach(node => node.getDOMElement()) ?? ''}
            </div>
        </div>
    </div>
</div>
`
    }

    constructor() {
        super()
        this.gridDOMElement = null
        this.dragObject = null
        this.additional = [0, 0]
        this.translateValue = [0, 0]
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
            'clickButton': 2
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

    setScroll(value = [0, 0]) {
        this.scroll = value
    }

    addScroll(value) {
        this.setLocation([this.scroll[0] + value[0], this.scroll[1] + value[1]])
    }

    getScroll() {
        return this.scroll
    }

    expand(x, y) {
        x = Math.round(x)
        y = Math.round(y)
        this.additional = [this.additional[0] + Math.abs(x), this.additional[1] + Math.abs(y)]
        if (this.domElement) {
            this.domElement.style.setProperty('--ueb-additional-x', this.additional[0])
            this.domElement.style.setProperty('--ueb-additional-y', this.additional[1])
            this.domElement.parentElement.scrollLeft -= x
            this.domElement.parentElement.scrollTop -= y
        }
    }

    translate(x, y) {
        x = Math.round(x)
        y = Math.round(y)
        this.translateValue = [this.translateValue[0] + x, this.translateValue[1] + y]
        if (this.domElement) {
            this.domElement.style.setProperty('--ueb-translate-x', this.translateValue[0])
            this.domElement.style.setProperty('--ueb-translate-y', this.translateValue[1])
        }
    }

    getScale() {
        return this.scale
    }

    addNode(...blueprintNode) {
        this.nodes.push(...blueprintNode)
    }
}