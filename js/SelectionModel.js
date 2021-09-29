class OrderedIndexArray {

    /**
     * @param {(arrayElement: number) => number} compareFunction A function that, given acouple of elements of the array telles what order are they on.
     * @param {(number|array)} value Initial length or array to copy from
     */
    constructor(comparisonValueSupplier = (a) => a, value = null) {
        this.array = new Uint32Array(value)
        this.comparisonValueSupplier = comparisonValueSupplier
        this.length = 0
    }

    /**
     * 
     * @param {number} index The index of the value to return
     * @returns The element of the array
     */
    get(index) {
        return this.array[index]
    }

    /**
     * Returns the array used by this object.
     * @returns The array.
     */
    getArray() {
        return this.array
    }

    /**
     * Get the position that the value supplied should (or does) occupy in the aray.
     * @param {number} value The value to look for (it doesn't have to be part of the array).
     * @returns The position index.
     */
    getPosition(value) {
        let l = 0
        let r = this.array.length
        while (l < r) {
            let m = Math.floor((l + r) / 2)
            if (this.comparisonValueSupplier(this.array[m]) < value) {
                l = m + 1
            } else {
                r = m
            }
        }
        return l
    }

    /** 
     * Inserts the element in the array.
     * @param array {number[]} The array to insert into.
     * @param value {number} The value to insert into the array.
     * @returns {number} The position into occupied by value into the array.
     */
    insert(value) {
        let position = this.getPosition(value)
        let newArray = new Uint32Array(this.array.length + 1)
        newArray.set(this.array.subarray(0, position), 0)
        newArray[position] = value
        newArray.set(this.array.subarray(position), position + 1)
        this.array = newArray
        this.length = this.array.length
        return position
    }

    /**
     * Removes the element from the array.
     * @param {number} value The value of the element to be remove.
     */
    remove(value) {
        let position = this.getPosition(value)
        if (this.array[position] == value) {
            this.removeAt(position)
        }
    }

    /**
     * Removes the element into the specified position from the array.
     * @param {number} position The index of the element to be remove.
     */
    removeAt(position) {
        let newArray = new Uint32Array(this.array.length - 1)
        newArray.set(this.array.subarray(0, position), 0)
        newArray.set(this.array.subarray(position + 1), position)
        this.array = newArray
        this.length = this.array.length
    }
}

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
                primaryBoundary: this.initialPosition,
                secondaryBoundary: this.initialPosition,
                rectangle: index // used to move both directions inside the this.metadata array
            }
            const rectangleBoundaries = boundariesFunc(rect)
            if (rectangleBoundaries.primarySup < this.initialPosition[0]) { // rectangle is before position on the main axis
                rectangleMetadata.primaryBoundary = rectangleBoundaries.primarySup
            } else if (position < rectangleBoundaries.primaryInf) { // rectangle is after position on the main axis
                rectangleMetadata.primaryBoundary = rectangleBoundaries.primaryInf
            } else {
                // Secondary order depends on primary order, if primary boundaries are not satisfied, the element is not watched for secondary ones
                if (rectangleBoundaries.secondarySup < this.initialPosition[1] || this.initialPosition[1] < rectangleBoundaries.secondaryInf) {
                    this.secondaryOrder.insert(index)
                } else {
                    selectToggleFunction(rect)
                }
            }
            if (rectangleBoundaries.secondarySup < this.initialPosition[1]) {
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondarySup
            } else if (this.initialPosition[1] < rectangleBoundaries.secondaryInf) {
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondaryInf
            }
            this.primaryOrder.insert(index)
            this.metadata[index] = rectangleMetadata
        })
        this.computeBoundaries(this.initialPosition)
    }

    computeBoundaries(position) {
        const primaryPosition = this.primaryOrder.getPosition(position[0])
        const secondaryPosition = this.secondaryOrder.getPosition(position[1])
        this.boundaries = {
            // Primary axis negative direction 
            primaryN: primaryPosition > 0
                ? {
                    'value': this.metadata[this.primaryOrder.get(primaryPosition - 1)].primaryBoundary,
                    'index': primaryPosition - 1
                }
                : {
                    'value': Number.MIN_SAFE_INTEGER,
                    'index': null
                },
            // Primary axis positive direction
            primaryP: primaryPosition < this.primaryOrder.length
                ? {
                    'value': this.metadata[this.primaryOrder.get(primaryPosition)].primaryBoundary,
                    'index': primaryPosition
                }
                : {
                    'value': Number.MAX_SAFE_INTEGER,
                    'index': null
                },
            // Secondary axis negative direction
            secondaryN: secondaryPosition > 0
                ? {
                    'value': this.metadata[this.secondaryOrder.get(secondaryPosition - 1)].secondaryBoundary,
                    'index': secondaryPosition - 1
                }
                : {
                    'value': Number.MIN_SAFE_INTEGER,
                    'index': null
                },
            // Secondary axis positive direction
            secondaryP: secondaryPosition < this.secondaryOrder.length
                ? {
                    'value': this.metadata[this.secondaryOrder.get(secondaryPosition)].secondaryBoundary,
                    'index': secondaryPosition
                }
                : {
                    'value': Number.MAX_SAFE_INTEGER,
                    'index': null
                }
        }
    }

    selectTo(finalPosition) {
        const primaryBoundaryCrossed = (index, extended) => {
            if (extended) {
                this.secondaryOrder.insert(index)
            } else {
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