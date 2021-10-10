import Template from "./Template"

export default class NodeTemplate extends Template {

    /**
     * Computes the html content of the target element.
     * @param {HTMLElement} element Target element 
     * @returns The computed html 
     */
    header(element) {
        return `
            <div class="ueb-node-header">
                <span class="ueb-node-name">
                    <span class="ueb-node-symbol"></span>
                    <span class="ueb-node-text">${element.graphNodeName}</span>
                </span>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {HTMLElement} element Target element 
     * @returns The computed html 
     */
    body(element) {
        return `
            <div class="ueb-node-body">
                <div class="ueb-node-inputs">
                    ${element.inputs.forEach((input, index) => `
                    <div class="ueb-node-input ueb-node-value-${input.type}">
                        <span class="ueb-node-value-icon ${element.inputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                        ${input.name}
                    </div>
                    `) ?? ''}
                </div>
                <div class="ueb-node-outputs">
                    ${element.outputs.forEach((output, index) => `
                    <div class="ueb-node-output ueb-node-value-${output.type}">
                        ${output.name}
                        <span class="ueb-node-value-icon ${element.outputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                    </div>
                    `) ?? ''}
                </div>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {HTMLElement} element Target element 
     * @returns The computed html 
     */
    render(element) {
        return `
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    ${this.header(element)}
                    ${this.body(element)}
                </div>
            </div>
        `
    }
}