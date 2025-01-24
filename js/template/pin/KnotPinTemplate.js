import { html } from "lit"
import MinimalPinTemplate from "./MinimalPinTemplate.js"

/** @extends MinimalPinTemplate<KnotEntity> */
export default class KnotPinTemplate extends MinimalPinTemplate {

    render() {
        return this.element.isOutput() ? super.render() : html``
    }

    getoppositePin() {
        const nodeTemplate = /** @type {KnotNodeTemplate} */(this.element.nodeElement.template)
        return this.element.isOutput() ? nodeTemplate.inputPin : nodeTemplate.outputPin
    }

    /** Location on the grid of a link connecting to this pin */
    getLinkLocation() {
        if (this.element.isInput()) {
            return this.getoppositePin().getLinkLocation()
        }
        return super.getLinkLocation()
    }
}
