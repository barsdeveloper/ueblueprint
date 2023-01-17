import { html } from "lit"
import PinTemplate from "./PinTemplate"

/**
 * @template T
 * @typedef {import("../../element/PinElement").default<T>} PinElement
 */

/**
 * @template T
 * @extends PinTemplate<PinElement<T>>
 */
export default class MinimalPinTemplate extends PinTemplate {

    render() {
        return html`<div class="ueb-pin-icon">${this.renderIcon()}</div>`
    }
}
