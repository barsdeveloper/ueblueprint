import DropdownTemplate from "../template/pin/DropdownTemplate.js"
import IElement from "./IElement.js"

/** @extends {IElement<Object, DropdownTemplate>} */
export default class DropdownElement extends IElement {

    static properties = {
        ...super.properties,
        options: {
            type: Object,
        },
        selected: {
            type: String,
        },
    }

    constructor() {
        super()
        super.initialize({}, new DropdownTemplate())
        this.options = /** @type {[String, String][]} */([])
        this.selected = ""
    }

    /** @param {[String, String][]} options */
    static newObject(options) {
        const result = new DropdownElement()
        return result
    }

    initialize() {
        // Initialized in the constructor, this method does nothing
    }

    getValue() {
        return this.template.getSelectedValue()
    }
}
