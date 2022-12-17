import InputTemplate from "../template/pin/InputTemplate"
import Utility from "../Utility"
import IElement from "./IElement"

export default class InputElement extends IElement {

    static properties = {
        ...super.properties,
        singleLine: {
            type: Boolean,
            attribute: "data-single-line",
            converter: Utility.booleanConverter,
            reflect: true,
        },
        selectOnFocus: {
            type: Boolean,
            attribute: "data-select-focus",
            converter: Utility.booleanConverter,
            reflect: true,
        },
        blurOnEnter: {
            type: Boolean,
            attribute: "data-blur-enter",
            converter: Utility.booleanConverter,
            reflect: true,
        },
    }

    constructor() {
        super({}, new InputTemplate())
        this.singleLine = false
        this.selectOnFocus = true
        this.blurOnEnter = true
    }
}
