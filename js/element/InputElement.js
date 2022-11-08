import InputTemplate from "../template/InputTemplate"
import IElement from "./IElement"

export default class InputElement extends IElement {

    static elementName = "ueb-input"

    constructor() {
        super({}, new InputTemplate())
    }
}

customElements.define(InputElement.elementName, InputElement)
