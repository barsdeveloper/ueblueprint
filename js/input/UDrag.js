import UMouseClickDrag from "./UMouseClickDrag"

export default class UDrag extends UMouseClickDrag {
    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.stepSize = options?.stepSize
        this.mousePosition = [0, 0]
    }

    snapToGrid(posX, posY) {
        return [
            this.stepSize * Math.round(posX / this.stepSize),
            this.stepSize * Math.round(posY / this.stepSize)
        ]
    }

    startDrag(e) {
        if (!this.stepSize) {
            this.stepSize = parseInt(getComputedStyle(this.target).getPropertyValue('--ueb-grid-snap'))
        }
        // Get the current mouse position
        this.mousePosition = this.snapToGrid(e.clientX, e.clientY)
    }

    dragTo(e) {
        let mousePosition = this.snapToGrid(e.clientX, e.clientY)
        const d = [mousePosition[0] - this.mousePosition[0], mousePosition[1] - this.mousePosition[1]]

        if (d[0] == 0 && d[1] == 0) {
            return
        }

        this.target.addLocation(d)

        // Reassign the position of mouse
        this.mousePosition = mousePosition
    }
}