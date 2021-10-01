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
                rectangle: index, // used to move both expandings inside the this.metadata array
                onSecondaryAxis: false
            }
            this.metadata[index] = rectangleMetadata
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
        })
        this.primaryOrder.currentPosition = this.primaryOrder.getPosition(this.initialPosition[0])
        this.secondaryOrder.currentPosition = this.secondaryOrder.getPosition(this.initialPosition[1])
        this.computeBoundaries(this.initialPosition)
    }

    computeBoundaries() {
        this.boundaries = {
            // Primary axis negative expanding 
            primaryN: {
                'value': this.primaryOrder.getPrevValue(),
                'index': this.primaryOrder.getPrev()
            },
            primaryP: {
                'value': this.primaryOrder.getNextValue(),
                'index': this.primaryOrder.getNext()
            },
            // Secondary axis negative expanding
            secondaryN: {
                'value': this.secondaryOrder.getPrevValue(),
                'index': this.secondaryOrder.getPrev()
            },
            // Secondary axis positive expanding
            secondaryP: {
                'value': this.secondaryOrder.getNextValue(),
                'index': this.secondaryOrder.getNext()
            }
        }
    }

    selectTo(finalPosition) {
        const direction = [
            Math.sign(finalPosition[0] - this.initialPosition[0]),
            Math.sign(finalPosition[1] - this.initialPosition[1])
        ]
        const primaryBoundaryCrossed = (index, expanding) => {
            this.primaryOrder.currentPosition += direction[0] * (expanding ? 1 : -1)
            if (this.metadata[index].onSecondaryAxis) {
                this.selectToggleFunction(this.rectangles[index], expanding)
            } else {
                if (expanding) {
                    this.secondaryOrder.insert(index, finalPosition[1])
                    const secondaryBoundary = this.metadata[index].secondaryBoundary
                    if (
                        // If inserted before the current position
                        Math.sign(finalPosition[1] - secondaryBoundary) == direction[1]
                        // And after initial position
                        && Math.sign(secondaryBoundary - this.initialPosition[1]) == direction[1]
                    ) {
                        // Secondary axis is already satisfied then
                        this.selectToggleFunction(this.rectangles[index], true)
                    }
                } else {
                    this.selectToggleFunction(this.rectangles[index], false)
                    this.secondaryOrder.remove(index)
                }
            }
            this.computeBoundaries(finalPosition)
            this.selectTo(finalPosition)
        }

        if (finalPosition[0] < this.boundaries.primaryN.value) {
            primaryBoundaryCrossed(this.boundaries.primaryN.index, finalPosition[0] < this.initialPosition[0])
        } else if (finalPosition[0] > this.boundaries.primaryP.value) {
            primaryBoundaryCrossed(this.boundaries.primaryP.index, this.initialPosition[0] < finalPosition[0])
        }


        const secondaryBoundaryCrossed = (index, expanding) => {
            this.secondaryOrder.currentPosition += direction[1] * (expanding ? 1 : -1)
            this.selectToggleFunction(this.rectangles[index], expanding)
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