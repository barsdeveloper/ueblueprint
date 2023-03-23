import Configuration from "../../Configuration.js"
import VariableManagementNodeTemplate from "./VariableMangementNodeTemplate.js"

/** @typedef {import("../../element/NodeElement").default} NodeElement */

export default class VariableAccessNodeTemplate extends VariableManagementNodeTemplate {

    /** @param {NodeElement} element */
    initialize(element) {
        super.initialize(element)
        if (element.getType() === Configuration.nodeType.variableGet) {
            this.element.classList.add("ueb-node-style-getter")
        } else if (element.getType() === Configuration.nodeType.variableSet) {
            this.element.classList.add("ueb-node-style-setter")
        }
    }

    setupPins() {
        super.setupPins()
        let outputPin = this.element.getPinElements().find(p => !p.entity.isHidden() && !p.entity.isExecution())
        this.element.style.setProperty("--ueb-node-color", outputPin.getColor().cssText)
    }
}
