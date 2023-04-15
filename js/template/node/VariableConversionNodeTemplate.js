import VariableManagementNodeTemplate from "./VariableMangementNodeTemplate.js"

export default class VariableConversionNodeTemplate extends VariableManagementNodeTemplate {

    static nodeStyleClasses = [...super.nodeStyleClasses, "ueb-node-style-conversion"]
}
