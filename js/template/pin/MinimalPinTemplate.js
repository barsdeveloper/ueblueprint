import { html } from "lit"
import PinTemplate from "./PinTemplate.js"

/** @typedef {import("../../entity/IEntity.js").AnyValue} AnyValue */
/**
 * @template {AnyValue} T
 * @typedef {import("../../element/PinElement.js").default<T>} PinElement
 */

/**
 * @template {AnyValue} T
 * @extends PinTemplate<PinElement<T>>
 */
export default class MinimalPinTemplate extends PinTemplate {

    render() {
        return html`
            <div class="ueb-pin-wrapper">
                <div class="ueb-pin-icon">${this.renderIcon()}</div>
            </div>
        `
    }
}
