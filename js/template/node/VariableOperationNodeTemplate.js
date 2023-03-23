import VariableManagementNodeTemplate from "./VariableMangementNodeTemplate.js"

/** @typedef {import("../../element/NodeElement").default} NodeElement */

export default class VariableOperationNodeTemplate extends VariableManagementNodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-operation"]
}
