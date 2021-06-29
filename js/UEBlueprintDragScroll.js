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
            let blueprintRoot = self.scrolledDOMElement.parentElement.parentElement
            let zoomLevel = 0
            let zoomLevelClass = "ueb-zoom-0"
            let classes = blueprintRoot.classList.values()
            for (let className of classes) {
                let v = className.match(/ueb\-zoom\-(\-?\d+)/)
                if (v) {
                    zoomLevelClass = v[0]
                    zoomLevel = parseInt(v[1])
                    break
                }
            }
            zoomLevel -= Math.round(e.deltaY / 50)
            zoomLevel = self.clamp(zoomLevel, -12, 0)
            blueprintRoot.classList.remove(zoomLevelClass)
            blueprintRoot.classList.add("ueb-zoom-" + zoomLevel)
            let scale = self.blueprintNode.getScale()
            let additionalX = Math.ceil(self.scrolledDOMElement.clientWidth * (1 - 1 / scale))
            let additionalY = Math.ceil(self.scrolledDOMElement.clientHeight * (1 - 1 / scale))
            self.blueprintNode.expand(additionalX, additionalY)

        }
        this.blueprintNode.getGridDOMElement().addEventListener('wheel', this.mouseWheelHandler)
        this.blueprintNode.getGridDOMElement().addEventListener('wheel', e => e.preventDefault())
        this.blueprintNode.getGridDOMElement().parentElement.addEventListener('wheel', e => e.preventDefault())
    }

    expandAndTranslate(x, y) {
        this.blueprintNode.expand(x, y)
        this.blueprintNode.translate(-x, -y)
    }

    clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

}