// @ts-check

import html from "./html"
import PinTemplate from "./PinTemplate"

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

export default class ExecPinTemplate extends PinTemplate {

    /**
     * @param {PinElement} pin
     */
    renderIcon(pin) {
        return html`
            <svg class="ueb-pin-icon-exec" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="
                    M 2 1
                    a 2 2 0 0 0 -2 2
                    v 10
                    a 2 2 0 0 0 2 2
                    h 7.08
                    a 2 2 0 0 0 1.519 -.698
                    l 4.843 -5.651
                    a 1 1 0 0 0 0 -1.302
                    L 10.6 1.7
                    A 2 2 0 0 0 9.08 1
                    H 2
                    z
                    m 7.08 1
                    a 1 1 0 0 1 .76 .35
                    L 14.682 8
                    l -4.844 5.65
                    a 1 1 0 0 1 -.759 .35
                    H 2
                    a 1 1 0 0 1 -1 -1
                    V 3
                    a 1 1 0 0 1 1 -1
                    h 7.08
                    z
                " />
            </svg>
        `
    }
}
