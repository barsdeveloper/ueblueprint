import UEBlueprintDrag from "./UEBlueprintDrag.js"

export default class UEBlueprintDragScroll extends UEBlueprintDrag {
    constructor(scrolledEntity, options) {
        super(scrolledEntity, options)
        this.scrolledDOMElement = scrolledEntity.getGridDOMElement()
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
            let zoomLevel = self.blueprintNode.getZoom()
            zoomLevel -= Math.round(e.deltaY / 50)
            self.blueprintNode.setZoom(zoomLevel)

        }
        this.blueprintNode.getGridDOMElement().addEventListener('wheel', this.mouseWheelHandler)
        this.blueprintNode.getGridDOMElement().addEventListener('wheel', e => e.preventDefault())
        this.blueprintNode.getGridDOMElement().parentElement.addEventListener('wheel', e => e.preventDefault())
    }

    expandAndTranslate(x, y) {
        this.blueprintNode.expand(x, y)
        this.blueprintNode.translate(-x, -y)
    }

}