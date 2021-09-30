import OrderedIndexArray from "./OrderedIndexArray.js"

export default class SelectionModel {

    /**
     * @typedef {{
     *      primaryInf: number,
     *      primarySup: number,
     *      secondaryInf: number,
     *      secondarySup: number
     * }} BoundariesInfo
     * @typedef {{
     *      primaryBoundary: number,
     *      secondaryBoundary: number,
     *      insertionPosition: number,
     *      rectangle: number
     *      onSecondaryAxis: Boolean
     * }} Metadata
     * @typedef {numeric} Rectangle
     * @param {number[]} initialPosition Coordinates of the starting point of selection [primaryAxisValue, secondaryAxisValue].
     * @param {Rectangle[]} rectangles Rectangles that can be selected by this object.
     * @param {(rect: Rectangle) => BoundariesInfo} boundariesFunc A function that, given a rectangle, it provides the boundaries of such rectangle.
     * @param {(rect: Rectangle, selected: bool) => void} selectToggleFunction A function that selects or deselects individual rectangles.
     */
    constructor(initialPosition, rectangles, boundariesFunc, selectToggleFunction) {
        this.initialPosition = initialPosition
        this.finalPosition = initialPosition
        /** @type Metadata[] */
        this.metadata = new Array(rectangles.length)
        this.primaryOrder = new OrderedIndexArray((element) => this.metadata[element].primaryBoundary)
        this.secondaryOrder = new OrderedIndexArray((element) => this.metadata[element].secondaryBoundary)
        this.selectToggleFunction = selectToggleFunction
        this.rectangles = rectangles
        rectangles.forEach((rect, index) => {
            /** @type Metadata */
            let rectangleMetadata = {
                primaryBoundary: this.initialPosition[0],
                secondaryBoundary: this.initialPosition[1],
                rectangle: index, // used to move both directions inside the this.metadata array
                onSecondaryAxis: false
            }
            selectToggleFunction(rect, false) // Initially deselected (Eventually)
            const rectangleBoundaries = boundariesFunc(rect)
            if (this.initialPosition[0] < rectangleBoundaries.primaryInf) { // Initial position is before the rectangle
                rectangleMetadata.primaryBoundary = rectangleBoundaries.primaryInf
                this.primaryOrder.insert(index)
            } else if (rectangleBoundaries.primarySup < this.initialPosition[0]) { // Initial position is after the rectangle
                rectangleMetadata.primaryBoundary = rectangleBoundaries.primarySup
                this.primaryOrder.insert(index)
            } else { // Initial lays inside the rectangle (considering just this axis)
                // Secondary order depends on primary order, if primary boundaries are not satisfied, the element is not watched for secondary ones
                if (rectangleBoundaries.secondarySup < this.initialPosition[1] || this.initialPosition[1] < rectangleBoundaries.secondaryInf) {
                    this.secondaryOrder.insert(index)
                } else {
                    selectToggleFunction(rect, true)
                }
            }
            if (this.initialPosition[1] < rectangleBoundaries.secondaryInf) { // Initial position is before the rectangle
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondaryInf
            } else if (rectangleBoundaries.secondarySup < this.initialPosition[1]) { // Initial position is after the rectangle
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondarySup
            } else {
                rectangleMetadata.onSecondaryAxis = true
            }
            this.metadata[index] = rectangleMetadata
        })
        this.primaryOrder.current = this.primaryOrder.getPosition(this.initialPosition[0])
        this.secondaryOrder.current = this.secondaryOrder.getPosition(this.initialPosition[1])
        this.computeBoundaries(this.initialPosition)
    }

    computeBoundaries() {
        this.boundaries = {
            // Primary axis negative direction 
            primaryN: {
                'value': this.primaryOrder.getPrev(),
                'index': this.primaryOrder.current - 1
            },
            primaryP: {
                'value': this.primaryOrder.getNext(),
                'index': this.primaryOrder.current
            },
            // Secondary axis negative direction
            secondaryN: {
                'value': this.secondaryOrder.getPrev(),
                'index': this.secondaryOrder.current - 1
            },
            // Secondary axis positive direction
            secondaryP: {
                'value': this.secondaryOrder.getNext(),
                'index': this.secondaryOrder.current
            }
        }
    }

    selectTo(finalPosition) {
        const primaryBoundaryCrossed = (index, extended) => {
            if (extended) {
                this.primaryOrder.current += Math.sign(finalPosition[0] - this.initialPosition[0])
                if (this.metadata[index].onSecondaryAxis) {
                    this.selectToggleFunction(this.rectangles[index], true)
                } else {
                    this.secondaryOrder.insert(index, this.initialPosition[1])
                }
            } else {
                this.primaryOrder.current -= Math.sign(finalPosition[0] - this.initialPosition[0])
                this.secondaryOrder.remove(index)
                this.selectToggleFunction(this.rectangles[index], false)
            }
            this.computeBoundaries(finalPosition)
            this.selectTo(finalPosition)
        }

        if (finalPosition[0] < this.boundaries.primaryN.value) {
            primaryBoundaryCrossed(this.boundaries.primaryN.index, finalPosition[0] < this.initialPosition[0])
        } else if (finalPosition[0] > this.boundaries.primaryP.value) {
            primaryBoundaryCrossed(this.boundaries.primaryP.index, this.initialPosition[0] < finalPosition[0])
        }


        const secondaryBoundaryCrossed = (index, extended) => {
            if (extended) {
                this.secondaryOrder.current += Math.sign(finalPosition[1] - this.initialPosition[1])
            } else {
                this.secondaryOrder.current -= Math.sign(finalPosition[1] - this.initialPosition[1])
            }
            this.selectToggleFunction(this.rectangles[index], extended)
            this.computeBoundaries(finalPosition)
            this.selectTo(finalPosition)
        }

        if (finalPosition[1] < this.boundaries.secondaryN.value) {
            secondaryBoundaryCrossed(this.boundaries.secondaryN.index, finalPosition[1] < this.initialPosition[1]);
        } else if (finalPosition[1] > this.boundaries.secondaryP.value) {
            secondaryBoundaryCrossed(this.boundaries.secondaryP.index, this.initialPosition[1] < finalPosition[1]);
        }
        this.finalPosition = finalPosition
    }

}