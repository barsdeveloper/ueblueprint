export default class UEBlueprintDOMModel {
    static dummyDiv = document.createElement('div')

    static domTemplate(obj) {
        return ``
    }

    constructor() {
        this.domElement = null
    }

    createDOMElement() {
        if (this.domElement) {
            this.removeDOMElement()
        }
        this.constructor.dummyDiv.innerHTML = this.constructor.domTemplate(this)
        this.domElement = this.constructor.dummyDiv.removeChild(this.constructor.dummyDiv.firstElementChild)
    }

    getDOMElement() {
        if (!this.domElement) {
            this.createDOMElement()
        }
        return this.domElement
    }

    removeDOMElement() {
        if (!this.domElement) {
            return false
        }
        this.domElement.parentElement.removeChild(this.domElement)
        this.domElement = null
        return true
    }
}
