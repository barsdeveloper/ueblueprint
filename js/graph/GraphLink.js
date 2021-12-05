import GraphElement from "./GraphElement"

export default class GraphLink extends GraphElement {

    /**
     * 
     * @typedef {{
     *      node: String,
     *      pin: String
     * }} PinReference
     * @param {?PinReference} source 
     * @param {?PinReference} destination 
     */
    constructor(source, destination) {
        super()
        this.source = source
        this.destination = destination
    }

    render() {
        return `
            <svg viewBox="0 0 100 100">
                <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
            </svg>
        `
    }
}

customElements.define("u-link", GraphLink)
