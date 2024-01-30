/**
 * @typedef {(
 *     extract: <T, Args extends any[]>(
 *         v: (node: NodeElement, ...args: Args) => T,
 *         ...args: Args
 *     ) => Promise<T>
 * ) => void} AdditionalTest
 */

/**
 * @typedef {{
 *     name: String,
 *     title?: String,
 *     subtitle?: String,
 *     value: String,
 *     size?: [Number, Number],
 *     color: CSSResult,
 *     icon: TemplateResult | Boolean,
 *     pins: Number,
 *     pinNames: String[],
 *     delegate: Boolean,
 *     development: Boolean,
 *     variadic?: Boolean,
 *     additionalTest?: AdditionalTest,
 * }} TestSpecifier
 */
