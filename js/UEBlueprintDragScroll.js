import UEBlueprintDrag from "./UEBlueprintDrag.js"

export default class UEBlueprintDragScroll extends UEBlueprintDrag {
    constructor(scrolledEntity, options) {
        super(scrolledEntity, options)
        this.scrolledDOMElement = scrolledEntity.getGridDOMElement()
        this.expandGridSize = options?.expandGridSize ?? 200
        this.initialExpandGridSize = this.expandGridSize
        this.minZoom = options?.minZoom ?? -12
        let self = this;
        this.mouseMoveHandler = function (e) {
            const scrollMaxX = self.scrolledDOMElement.parentElement.scrollWidth - self.scrolledDOMElement.parentElement.clientWidth
            const scrollMaxY = self.scrolledDOMElement.parentElement.scrollHeight - self.scrolledDOMElement.parentElement.clientHeight
            let expandX = self.scrolledDOMElement.parentElement.scrollLeft < self.expandGridSize * 0.5 ? -1 : 0
                + self.scrolledDOMElement.parentElement.scrollLeft > scrollMaxX - self.expandGridSize * 0.5 ? 1 : 0
            let expandY = self.scrolledDOMElement.parentElement.scrollTop < self.expandGridSize * 0.5 ? -1 : 0
                + self.scrolledDOMElement.parentElement.scrollTop > scrollMaxY - self.expandGridSize * 0.5 ? 1 : 0

            if (expandX != 0 || expandY != 0) {

                /* Managining infinite scrolling: when the scrollbar reaches the end, the grid is expanded and the elements inside translated to give the illusion that they stayed in the same position*/
                self.expandAndTranslate(expandX * self.expandGridSize, expandY * self.expandGridSize)
            }

            let mousePosition = self.snapToGrid(e.clientX, e.clientY)

            // How far the mouse has been moved
            const dx = mousePosition[0] - self.mousePosition[0]
            const dy = mousePosition[1] - self.mousePosition[1]

            self.scrolledDOMElement.parentElement.scrollLeft = self.scrolledDOMElement.parentElement.scrollLeft - dx
            self.scrolledDOMElement.parentElement.scrollTop = self.scrolledDOMElement.parentElement.scrollTop - dy

            // Reassign the position of mouse
            self.mousePosition = mousePosition
        };
        this.mouseWheelHandler = function (e) {
            let blueprintRoot = self.elem.parentElement.parentElement
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
            let scale = blueprintNode.getScale()
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

    scaledExpand(x, y, scale) {

    }

    clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

}