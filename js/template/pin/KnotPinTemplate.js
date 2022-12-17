import { html } from "lit"
import PinTemplate from "./PinTemplate"
import Utility from "../../Utility"

/** @typedef {import("./../KnotNodeTemplate").default} KnotNodeTemplate */

export default class KnotPinTemplate extends PinTemplate {

    render() {
        return this.element.isOutput() ? html`<div class="ueb-pin-icon">${this.renderIcon()}</div>` : html``
    }

    getLinkLocation() {
        const rect = (
            this.element.isInput()
                ? /** @type {KnotNodeTemplate} */ (this.element.nodeElement.template).outputPin.template
                : this
        )
            .iconElement.getBoundingClientRect()
        const location = Utility.convertLocation(
            [
                this.element.isInput() ? rect.left + 1 : rect.right + 2,
                (rect.top + rect.bottom) / 2,
            ],
            this.element.blueprint.gridElement
        )
        return this.element.blueprint.compensateTranslation(location)
    }
}
