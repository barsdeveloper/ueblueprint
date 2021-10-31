/** @typedef {import("./graph/GraphNode").default} GraphNode */
export default class BlueprintData {

    constructor() {
        /** @type {GraphNode[]}" */
        this.nodes = new Array()
        this.expandGridSize = 400
        /** @type {Array<number>} */
        this.additional = /*[2 * this.expandGridSize, 2 * this.expandGridSize]*/[0, 0]
        /** @type {Array<number>} */
        this.translateValue = /*[this.expandGridSize, this.expandGridSize]*/[0, 0]
    }
}