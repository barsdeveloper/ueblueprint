import VariableManagementNodeTemplate from "./VariableMangementNodeTemplate"

/** @typedef {import("../../element/NodeElement").default} NodeElement */

export default class VariableConversionNodeTemplate extends VariableManagementNodeTemplate {


    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        this.element.classList.add("ueb-node-style-conversion")
    }
}
