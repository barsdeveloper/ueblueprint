/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {typeof import("../Blueprint").default.nodeBoundariesSupplier} BoundariesFunction
 * @typedef {typeof import("../Blueprint").default.nodeSelectToggleFunction} SelectionFunction
 * @typedef {{
*     primaryBoundary: Number,
*     secondaryBoundary: Number,
*     insertionPosition?: Number,
*     rectangle: Number
*     onSecondaryAxis: Boolean
* }} Metadata
*/

export default class SimpleSelectionModel {

    /**
     * @param {Number[]} initialPosition
     * @param {NodeElement[]} rectangles
     * @param {BoundariesFunction} boundariesFunc
     * @param {SelectionFunction} selectToggleFunction
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
