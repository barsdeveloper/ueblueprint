import { html } from "lit"
import Utility from "../../Utility.js"
import MinimalPinTemplate from "./MinimalPinTemplate.js"

/** @extends MinimalPinTemplate<KnotEntity> */
export default class KnotPinTemplate extends MinimalPinTemplate {

    render() {
        return this.element.isOutput() ? super.render() : html``
    }

    getOppositePin() {
        const nodeTemplate = /** @type {KnotNodeTemplate} */(this.element.nodeElement.template)
        return this.element.isOutput() ? nodeTemplate.inputPin : nodeTemplate.outputPin
    }

    getLinkLocation() {
        const rect = (
            this.element.isInput()
                ? /** @type {KnotNodeTemplate} */(this.element.nodeElement.template).outputPin.template
                : this
        )
            .iconElement.getBoundingClientRect()
        /** @type {Coordinates} */
        const boundingLocation = [this.element.isInput() ? rect.left : rect.right + 1, (rect.top + rect.bottom) / 2]
        const location = Utility.convertLocation(boundingLocation, this.blueprint.template.gridElement)
        return this.blueprint.compensateTranslation(location[0], location[1])
    }
}
