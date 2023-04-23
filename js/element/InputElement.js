import IElement from "./IElement.js"
import InputTemplate from "../template/pin/InputTemplate.js"
import Utility from "../Utility.js"

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
        super()
        this.singleLine = false
        this.selectOnFocus = true
        this.blurOnEnter = true
        super.initialize({}, new InputTemplate())
    }

    static newObject() {
        return new InputElement()
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }
}
