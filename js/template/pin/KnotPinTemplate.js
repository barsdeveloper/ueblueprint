import { html } from "lit"
import MinimalPinTemplate from "./MinimalPinTemplate"
import Utility from "../../Utility"

/**
 * @typedef {import("../node/KnotNodeTemplate").default} KnotNodeTemplate
 * @typedef {import("../../entity/PinEntity").default} KnotEntity
 */

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
        const boundingLocation = [this.element.isInput() ? rect.left : rect.right, (rect.top + rect.bottom) / 2]
        const location = Utility.convertLocation(boundingLocation, this.blueprint.template.gridElement)
        return this.blueprint.compensateTranslation(location[0], location[1])
    }
}
