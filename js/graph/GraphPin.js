import GraphElement from "./GraphElement"
import PinTemplate from "../template/PinTemplate"

export default class GraphPin extends GraphElement {

    constructor() {
        super({}, new PinTemplate())
    }

    /*connectedCallback() {
        super.connectedCallback()
    }*/
}

customElements.define("u-pin", GraphPin)
