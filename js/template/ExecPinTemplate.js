import { html } from "lit"
import PinTemplate from "./PinTemplate"
import SVGIcon from "../SVGIcon"
import Utility from "../Utility"

/** @typedef {import("../element/PinElement").default} PinElement */

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
        return html`${Utility.formatStringName(pinName)}`
    }
}
