/**
 * @typedef {{
 *     name: String,
 *     title?: String,
 *     subtitle?: String,
 *     value: String,
 *     size?: Number[],
 *     color?: CSSResult,
 *     icon?: TemplateResult,
 *     pins?: Number,
 *     pinNames?: String[],
 *     delegate: Boolean,
 *     development: Boolean,
 *     variadic?: Boolean,
 *     additionalTest?: (node: Locator<NodeElement>, pins: Locator<PinElement>[]) => void,
 * }} TestData
 */

export default class NodeTests {
    /** @type {TestData[]} */
    static testsData

    /** @param {TestData[]} testsData */
    static set(testsData) {
        this.testsData = testsData
    }
    static get() {
        return this.testsData
    }
}
