import SelectableDraggable from "./SelectableDraggable"

export default class UEBlueprintObject extends SelectableDraggable {
    static classInputs = [/*
        {
            name: "Input Example",
            type: 'integer'
        }
    */]
    static classOutputs = [/*
        {
            name: "Return Value",
            type: 'string'
        }*/
    ]
    static classInFlow = false
    static classOutFlow = false
    static className = 'Empty node'

    header() {
        return `
            <div class="ueb-node-header">
                <span class="ueb-node-name">
                    <span class="ueb-node-symbol"></span>
                    <span class="ueb-node-text">${this.constructor.className}</span>
                </span>
            </div>
        `
    }

    body() {
        return `
            <div class="ueb-node-body">
                <div class="ueb-node-inputs">
                    ${this.constructor.classInputs.forEach((input, index) => `
                    <div class="ueb-node-input ueb-node-value-${input.type}">
                        <span class="ueb-node-value-icon ${this.inputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                        ${input.name}
                    </div>
                    `) ?? ''}
                </div>
                <div class="ueb-node-outputs">
                    ${this.constructor.classOutputs.forEach((output, index) => `
                    <div class="ueb-node-output ueb-node-value-${output.type}">
                        ${output.name}
                        <span class="ueb-node-value-icon ${this.outputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                    </div>
                    `) ?? ''}
                </div>
            </div>
        `
    }

    render() {
        return `
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    ${this.header()}
                    ${this.body()}
                </div>
            </div>
`
    }

    constructor() {
        super()
        this.inputs = this.constructor.classInputs.map(value => {
            return {
                connected: null
            }
        })
        this.outputs = this.constructor.classOutputs.map(value => {
            return {
                connected: null
            }
        })
    }

    connectedCallback() {
        super.connectedCallback()
        this.classList.add('ueb-node')
        if (this.selected) {
            this.classList.add('ueb-selected')
        }
        this.style.setProperty('--ueb-position-x', this.location[0])
        this.style.setProperty('--ueb-position-y', this.location[1])
    }
}

customElements.define('u-object', UEBlueprintObject)
