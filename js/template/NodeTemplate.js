import PinEntity from "../entity/PinEntity"
import Template from "./Template"

/**
 * @typedef {import("../entity/ObjectEntity").default} ObjectEntity
 */
export default class NodeTemplate extends Template {

    /**
     * Computes the html content of the target element.
     * @param {ObjectEntity} entity Entity representing the element 
     * @returns The computed html 
     */
    header(entity) {
        return `
            <div class="ueb-node-header">
                <span class="ueb-node-name">
                    <span class="ueb-node-symbol"></span>
                    <span class="ueb-node-text">${entity.getNodeDisplayName()}</span>
                </span>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {ObjectEntity} entity Entity representing the element 
     * @returns The computed html 
     */
    body(entity) {
        /** @type {PinEntity[]} */
        let inputs = entity.CustomProperties.filter(v => v instanceof PinEntity)
        let outputs = inputs.filter(v => v.isOutput())
        inputs = inputs.filter(v => !v.isOutput())
        return `
            <div class="ueb-node-body">
                <div class="ueb-node-inputs">
                    ${inputs.map((input, index) => `
                    <div class="ueb-node-input ueb-node-value-${input.type}">
                        <span class="ueb-node-value-icon ${inputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                        ${input.getPinDisplayName()}
                    </div>
                    `).join("") ?? ""}
                </div>
                <div class="ueb-node-outputs">
                    ${outputs.map((output, index) => `
                    <div class="ueb-node-output ueb-node-value-${output.type}">
                        ${output.getPinDisplayName()}
                        <span class="ueb-node-value-icon ${outputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                    </div>
                    `).join("") ?? ''}
                </div>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {ObjectEntity} entity Entity representing the element 
     * @returns The computed html 
     */
    render(entity) {
        return `
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    ${this.header(entity)}
                    ${this.body(entity)}
                </div>
            </div>
        `
    }
}
