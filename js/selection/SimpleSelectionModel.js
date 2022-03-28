// @ts-check

export default class SimpleSelectionModel {

    /**
     * @typedef {{
     *      primaryInf: number,
     *      primarySup: number,
     *      secondaryInf: number,
     *      secondarySup: number
     * }} BoundariesInfo
     * @typedef {numeric} Rectangle
     * @param {number[]} initialPosition Coordinates of the starting point of selection [primaryAxisValue, secondaryAxisValue].
     * @param {Rectangle[]} rectangles Rectangles that can be selected by this object.
     * @param {(rect: Rectangle) => BoundariesInfo} boundariesFunc A function that, given a rectangle, it provides the boundaries of such rectangle.
     * @param {(rect: Rectangle, selected: bool) => void} selectToggleFunction A function that selects or deselects individual rectangles.
     */
    constructor(initialPosition, rectangles, boundariesFunc, selectToggleFunction) {
        this.initialPosition = initialPosition
        this.finalPosition = initialPosition
        this.boundariesFunc = boundariesFunc
        this.selectToggleFunction = selectToggleFunction
        this.rectangles = rectangles
    }

    selectTo(finalPosition) {
        let primaryInf = Math.min(finalPosition[0], this.initialPosition[0])
        let primarySup = Math.max(finalPosition[0], this.initialPosition[0])
        let secondaryInf = Math.min(finalPosition[1], this.initialPosition[1])
        let secondarySup = Math.max(finalPosition[1], this.initialPosition[1])
        this.finalPosition = finalPosition
        this.rectangles.forEach(rect => {
            let boundaries = this.boundariesFunc(rect)
            if (
                Math.max(boundaries.primaryInf, primaryInf) < Math.min(boundaries.primarySup, primarySup)
                && Math.max(boundaries.secondaryInf, secondaryInf) < Math.min(boundaries.secondarySup, secondarySup)
            ) {
                this.selectToggleFunction(rect, true)
            } else {

                this.selectToggleFunction(rect, false)
            }
        })
    }

}
