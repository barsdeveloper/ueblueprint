import UDrag from "./UDrag"

export default class UDragScroll extends UDrag {

    dragTo(e) {
        const mousePosition = this.snapToGrid(e.clientX, e.clientY)

        // How far the mouse has been moved
        const dx = mousePosition[0] - this.mousePosition[0]
        const dy = mousePosition[1] - this.mousePosition[1]

        this.blueprint.scrollDelta([-dx, -dy])

        // Reassign the position of mouse
        this.mousePosition = mousePosition
    }

}