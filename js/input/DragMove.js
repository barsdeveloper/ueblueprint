import MouseClickDrag from "./MouseClickDrag"

export default class DragMove extends MouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.stepSize = parseInt(options?.stepSize)
        this.mousePosition = [0, 0]
    }

    snapToGrid(location) {
        return [
            this.stepSize * Math.round(location[0] / this.stepSize),
            this.stepSize * Math.round(location[1] / this.stepSize)
        ]
    }

    startDrag() {
        if (isNaN(this.stepSize) || this.stepSize <= 0) {
            this.stepSize = parseInt(getComputedStyle(this.target).getPropertyValue("--ueb-grid-snap"))
            if (isNaN(this.stepSize) || this.stepSize <= 0) {
                this.stepSize = 1
            }
        }
        // Get the current mouse position
        this.mousePosition = this.stepSize != 1 ? this.snapToGrid(this.clickedPosition) : this.clickedPosition
    }

    dragTo(location, movement) {
        const mousePosition = this.stepSize != 1 ? this.snapToGrid(location) : location
        const d = [mousePosition[0] - this.mousePosition[0], mousePosition[1] - this.mousePosition[1]]

        if (d[0] == 0 && d[1] == 0) {
            return
        }

        this.target.dispatchDragEvent(d)

        // Reassign the position of mouse
        this.mousePosition = mousePosition
    }
}
