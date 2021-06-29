import UEBlueprintDraggableObject from "./UEBlueprintDraggableObject.js"

export default class UEBlueprintObject extends UEBlueprintDraggableObject {
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
    static domTemplate(obj) {
        return `
<div class="ueb-node ${obj.selected ? 'ueb-selected' : ''}"
    style="--ueb-position-x:${obj.location[0]}; --ueb-position-y:${obj.location[1]}">
    <div class="ueb-node-border">
        <div class="ueb-node-content">
            <div class="ueb-node-header">
                <span class="ueb-node-name">
                    <span class="ueb-node-symbol"></span>
                    <span class="ueb-node-text">${obj.constructor.className}</span>
                </span>
            </div>
            <div class="ueb-node-body">
                <div class="ueb-node-inputs">
                    ${obj.constructor.classInputs.forEach((input, index) => `
                    <div class="ueb-node-input ueb-node-value-${input.type}">
                        <span class="ueb-node-value-icon ${obj.inputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                        ${input.name}
                    </div>
                    `) ?? ''}
                </div>
                <div class="ueb-node-outputs">
                    ${obj.constructor.classOutputs.forEach((output, index) => `
                    <div class="ueb-node-output ueb-node-value-${output.type}">
                        ${output.name}
                        <span class="ueb-node-value-icon ${obj.outputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                    </div>
                    `) ?? ''}
                </div>
            </div>
        </div>
    </div>
</div>
`
    }

    constructor() {
        super()
        this.selected = false
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

    isSelected() {
        return this.selected
    }

    setSelected(value = true) {
        this.selected = value
    }
}
