import InputTemplate from "../template/InputTemplate"
import IElement from "./IElement"

export default class InputElement extends IElement {

    constructor() {
        super({}, new InputTemplate())
    }
}
