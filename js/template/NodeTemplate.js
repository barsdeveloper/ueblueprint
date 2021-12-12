import html from "./html"
import PinEntity from "../entity/PinEntity"
import SelectableDraggableTemplate from "./SelectableDraggableTemplate"
import GraphPin from "../graph/GraphPin"

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
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {GraphNode} node Graph node element 
     * @returns The result html 
     */
    body(node) {
        let inputs = node.entity.CustomProperties.filter(v => v instanceof PinEntity)
        let outputs = inputs.filter(v => v.isOutput())
        inputs = inputs.filter(v => v.isInput())
        return html`
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
                    <div class="ueb-node-header">
                        <span class="ueb-node-name">
                            <span class="ueb-node-symbol"></span>
                            <span class="ueb-node-text">${node.entity.getNodeDisplayName()}</span>
                        </span>
                    </div>
                    <div class="ueb-node-body">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
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
        if (node.selected) {
            node.classList.add("ueb-selected")
        }
        node.style.setProperty("--ueb-position-x", node.location[0])
        node.style.setProperty("--ueb-position-y", node.location[1])
        /** @type {HTMLElement} */
        let inputContainer = node.querySelector(".ueb-node-inputs")
        /** @type {HTMLElement} */
        let outputContainer = node.querySelector(".ueb-node-outputs")
        let pins = node.getPinEntities()
        pins.filter(v => v.isInput()).forEach(v => inputContainer.appendChild(new GraphPin(v)))
        pins.filter(v => v.isOutput()).forEach(v => outputContainer.appendChild(new GraphPin(v)))
    }
}
