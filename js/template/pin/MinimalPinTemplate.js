import { html } from "lit"
import PinTemplate from "./PinTemplate"

export default class MinimalPinTemplate extends PinTemplate {

    render() {
        return html`<div class="ueb-pin-icon">${this.renderIcon()}</div>`
    }
}
