import { html } from "lit"
import MinimalPinTemplate from "./MinimalPinTemplate.js"

/** @extends MinimalPinTemplate<KnotEntity> */
export default class KnotPinTemplate extends MinimalPinTemplate {

    render() {
        return this.element.isOutput() ? super.render() : html``
    }

    oppositePin() {
        const nodeTemplate = /** @type {KnotNodeTemplate} */(this.element.nodeElement.template)
        return this.element.isOutput() ? nodeTemplate.inputPin : nodeTemplate.outputPin
    }

    getLinkLocation() {
        if (this.element.isInput()) {
            return this.oppositePin().getLinkLocation()
        }
        return super.getLinkLocation()
    }
}
