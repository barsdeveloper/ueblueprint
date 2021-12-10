import html from "./html"
import PinEntity from "../entity/PinEntity"
import SelectableDraggableTemplate from "./SelectableDraggableTemplate"

/**
 * @typedef {import("../graph/GraphNode").default} GraphNode
 */
export default class NodeTemplate extends SelectableDraggableTemplate {

    /**
     * Computes the html content of the target element.
     * @param {GraphNode} node Graph node element 
     * @returns The result html 
     */
    header(node) {
        return html`
            <div class="ueb-node-header">
                <span class="ueb-node-name">
                    <span class="ueb-node-symbol"></span>
                    <span class="ueb-node-text">${node.entity.getNodeDisplayName()}</span>
                </span>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {GraphNode} node Graph node element 
     * @returns The result html 
     */
    body(node) {
        /** @type {PinEntity[]} */
        let inputs = node.entity.CustomProperties.filter(v => v instanceof PinEntity)
        let outputs = inputs.filter(v => v.isOutput())
        inputs = inputs.filter(v => v.isInput())
        return html`
            <div class="ueb-node-body">
                <div class="ueb-node-inputs">
                    ${inputs.map((input, index) => html`
                    <div class="ueb-node-input ueb-node-value-${input.type}">
                        <span class="ueb-node-value-icon ${inputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                        ${input.getPinDisplayName()}
                    </div>
                    `).join("") ?? ""}
                </div>
                <div class="ueb-node-outputs">
                    ${outputs.map((output, index) => html`
                    <div class="ueb-node-output ueb-node-value-${output.type}">
                        ${output.getPinDisplayName()}
                        <span class="ueb-node-value-icon ${outputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                    </div>
                    `).join('') ?? ''}
                </div>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {GraphNode} node Graph node element 
     * @returns The result html 
     */
    render(node) {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    ${this.header(node)}
                    ${this.body(node)}
                </div>
            </div>
        `
    }

    /**
     * Returns the html elements rendered from this template.
     * @param {GraphNode} node Element of the graph
     */
    apply(node) {
        super.apply(node)
        node.classList.add("ueb-node")
        if (node.selected) {
            node.classList.add("ueb-selected")
        }
        node.style.setProperty("--ueb-position-x", node.location[0])
        node.style.setProperty("--ueb-position-y", node.location[1])
    }
}
