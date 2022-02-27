import PinElement from "../element/PinElement"
import html from "./html"
import PinEntity from "../entity/PinEntity"
import sanitizeText from "./sanitizeText"
import SelectableDraggableTemplate from "./SelectableDraggableTemplate"

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 */
export default class NodeTemplate extends SelectableDraggableTemplate {

    /**
     * Computes the html content of the target element.
     * @param {NodeElement} node Graph node element 
     * @returns The result html 
     */
    render(node) {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    <div class="ueb-node-header">
                        <span class="ueb-node-name">
                            <span class="ueb-node-symbol"></span>
                            <span class="ueb-node-text">${sanitizeText(node.entity.getNodeDisplayName())}</span>
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
     * Applies the style to the element.
     * @param {NodeElement} node Element of the graph
     */
    apply(node) {
        super.apply(node)
        if (node.selected) {
            node.classList.add("ueb-selected")
        }
        node.style.setProperty("--ueb-position-x", sanitizeText(node.location[0]))
        node.style.setProperty("--ueb-position-y", sanitizeText(node.location[1]))
        /** @type {HTMLElement} */
        let inputContainer = node.querySelector(".ueb-node-inputs")
        /** @type {HTMLElement} */
        let outputContainer = node.querySelector(".ueb-node-outputs")
        let pins = node.getPinEntities()
        pins.filter(v => v.isInput()).forEach(v => inputContainer.appendChild(new PinElement(v)))
        pins.filter(v => v.isOutput()).forEach(v => outputContainer.appendChild(new PinElement(v)))
    }
}
