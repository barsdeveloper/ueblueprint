import Configuration from "../../Configuration.js"
import VariableManagementNodeTemplate from "./VariableMangementNodeTemplate.js"

export default class VariableAccessNodeTemplate extends VariableManagementNodeTemplate {

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        if (element.getType() === Configuration.paths.variableGet) {
            this.element.classList.add("ueb-node-style-getter")
        } else if (element.getType() === Configuration.paths.variableSet) {
            this.element.classList.add("ueb-node-style-setter")
        }
    }

    setupPins() {
        super.setupPins()
        let outputPin = this.element.getPinElements().find(p => !p.entity.isHidden() && !p.entity.isExecution())
        this.element.style.setProperty("--ueb-node-color", outputPin.getColor().cssText)
    }
}
