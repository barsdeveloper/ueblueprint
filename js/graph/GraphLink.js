import GraphElement from "./GraphElement"
import LinkTemplate from "../template/LinkTemplate"

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
        super(this, new LinkTemplate())
        this.source = source
        this.destination = destination
    }
}

customElements.define("ueb-link", GraphLink)
