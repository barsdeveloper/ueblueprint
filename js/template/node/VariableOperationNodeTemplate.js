import VariableManagementNodeTemplate from "./VariableMangementNodeTemplate.js"

export default class VariableOperationNodeTemplate extends VariableManagementNodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-operation"]
}
