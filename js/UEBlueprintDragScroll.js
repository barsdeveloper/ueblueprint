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
            let scaleCorrection = 1 / self.blueprintNode.getScale()
            const targetOffset = e.target.getBoundingClientRect()
            const currentTargetOffset = e.currentTarget.getBoundingClientRect()
            let offset = [e.offsetX + targetOffset.x * scaleCorrection - currentTargetOffset.x * scaleCorrection, e.offsetY + targetOffset.y * scaleCorrection - currentTargetOffset.y * scaleCorrection]
            self.blueprintNode.setZoom(zoomLevel, offset)

        }
        this.blueprintNode.getGridDOMElement().addEventListener('wheel', this.mouseWheelHandler, false)
        this.blueprintNode.getGridDOMElement().parentElement.addEventListener('wheel', e => e.preventDefault())
    }

}