import VariableManagementNodeTemplate from "./VariableMangementNodeTemplate.js"

/** @typedef {import("../../element/NodeElement").default} NodeElement */

export default class VariableConversionNodeTemplate extends VariableManagementNodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-conversion"]
}
