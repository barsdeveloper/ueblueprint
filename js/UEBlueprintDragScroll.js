import UEBlueprintDrag from "./UEBlueprintDrag.js"

export default class UEBlueprintDragScroll extends UEBlueprintDrag {
    constructor(scrolledEntity, options) {
        super(scrolledEntity, options)
        this.minZoom = options?.minZoom ?? -12
        let self = this;
        this.mouseMoveHandler = function (e) {
            let mousePosition = self.snapToGrid(e.clientX, e.clientY)

            // How far the mouse has been moved
            const dx = mousePosition[0] - self.mousePosition[0]
            const dy = mousePosition[1] - self.mousePosition[1]

            self.blueprintNode.scrollDelta([-dx, -dy])

            // Reassign the position of mouse
            self.mousePosition = mousePosition
        };
        this.mouseWheelHandler = function (e) {
            e.preventDefault()
            let zoomLevel = self.blueprintNode.getZoom()
            zoomLevel -= Math.sign(e.deltaY)
            let scale = self.blueprintNode.getScale()
            const targetOffset = e.target.getBoundingClientRect()
            const currentTargetOffset = e.currentTarget.getBoundingClientRect()
            let offset = [e.offsetX + targetOffset.x - currentTargetOffset.x, e.offsetY + targetOffset.y - currentTargetOffset.y]
            console.log([offset[0] - e.x, offset[1] - e.y])
            self.blueprintNode.setZoom(zoomLevel, offset)

        }
        this.blueprintNode.getGridDOMElement().addEventListener('wheel', this.mouseWheelHandler, false)
        this.blueprintNode.getGridDOMElement().parentElement.addEventListener('wheel', e => e.preventDefault())
    }

    expandAndTranslate(x, y) {
        this.blueprintNode.expand(x, y)
        this.blueprintNode.translate(-x, -y)
    }

}