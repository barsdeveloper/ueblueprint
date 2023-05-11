import { html } from "lit"
import PinTemplate from "./PinTemplate.js"
import SVGIcon from "../../SVGIcon.js"
import Utility from "../../Utility.js"

export default class ExecPinTemplate extends PinTemplate {

    renderIcon() {
        return SVGIcon.execPin
    }

    renderName() {
        let pinName = this.element.entity.PinName
        if (this.element.entity.PinFriendlyName) {
            pinName = this.element.entity.PinFriendlyName.toString()
        } else if (pinName === "execute" || pinName === "then") {
            return html``
        }
        return html`<span class="ueb-pin-name ueb-ellipsis-nowrap-text">${this.element.getPinDisplayName()}</span>`
    }
}
