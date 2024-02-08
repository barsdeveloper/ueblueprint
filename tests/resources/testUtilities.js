import Configuration from "../../js/Configuration.js"
import { test, expect } from "../fixtures/test.js"

/**
 * @typedef {import("@playwright/test").Locator} Locator
 */

/**
 * @typedef {(
 *     extract: <T, Args extends any[]>(
 *         v: (node: NodeElement, ...args: Args) => T,
 *         ...args: Args
 *     ) => Promise<T>,
 *     locator: import("@playwright/test").Locator
 * ) => void} AdditionalTest
 */

/**
 * @typedef {{
 *     name: String,
 *     title?: String,
 *     subtitle?: String,
 *     value: String,
 *     size?: Coordinates,
 *     color?: CSSResult,
 *     icon?: TemplateResult,
 *     pins?: Number,
 *     pinNames?: String[],
 *     delegate: Boolean,
 *     development: Boolean,
 *     variadic?: Boolean,
 *     additionalTest?: AdditionalTest,
 * }} TestSpecifier
 */


/** @param {String[]} words */
function getFirstWordOrder(words) {
    return new RegExp(/\s*/.source + words.join(/[^\n]+\n\s*/.source) + /\s*/.source)
}

/** @param {TestSpecifier} nodeTest */
function generateNodeTest(nodeTest) {
    test.describe(nodeTest.name, () => {

        test.beforeAll(async ({ blueprintPage }) => {
            await blueprintPage.removeNodes()
            await blueprintPage.paste(nodeTest.value)
        })

        if (nodeTest.color) {
            test(
                "Has correct color",
                async ({ blueprintPage }) => {
                    expect(
                        await blueprintPage.node.evaluate(node => /** @type {NodeElement} */(node).entity.nodeColor().toString())
                    ).toBe(nodeTest.color.toString())
                })
        }
        test(
            "Has correct delegate",
            async ({ blueprintPage }) => {
                const delegate = blueprintPage.blueprintLocator.locator(
                    'ueb-node .ueb-node-top ueb-pin[data-type="delegate"]'
                )
                if (nodeTest.delegate) {
                    await expect(delegate).toBeVisible()
                } else {
                    await expect(delegate).toBeHidden()
                }
            })
        if (nodeTest.title) {
            test(
                `Has title ${nodeTest.title}`,
                async ({ blueprintPage }) => expect(
                    await blueprintPage.node.evaluate(node => /** @type {NodeElement} */(node).getNodeDisplayName())
                ).toBe(nodeTest.title)
            )
        }
        if (nodeTest.subtitle) {
            test(
                `Has expected subtitle ${nodeTest.subtitle}`,
                async ({ blueprintPage }) => await expect(blueprintPage.node.locator(".ueb-node-subtitle-text"))
                    .toHaveText(nodeTest.subtitle, { useInnerText: true })
            )
        }
        if (nodeTest.size) {
            test(
                "Has approximately the expected size",
                async ({ blueprintPage }) => {
                    const expectedSize = await blueprintPage.node.evaluate(
                        (element, gridSize) => {
                            const node =    /** @type {NodeElement} */(element)
                            const bounding = node.getBoundingClientRect()
                            const expectedSize = [bounding.width / gridSize, bounding.height / gridSize]
                            return expectedSize
                        },
                        Configuration.gridSize
                    )
                    expect(Math.abs(nodeTest.size[0] - expectedSize[0])).toBeLessThan(1.5)
                    expect(Math.abs(nodeTest.size[1] - expectedSize[1])).toBeLessThan(1.5)
                    if (
                        Math.abs(nodeTest.size[0] - expectedSize[0]) > 0.6
                        || Math.abs(nodeTest.size[1] - expectedSize[1]) > 0.6
                    ) {
                        console.error(`Node "${nodeTest.name}" size does not match`)
                    }
                })
        }
        if (nodeTest.icon !== undefined) {
            test(
                "Has the correct icon",
                async ({ blueprintPage }) => expect(
                    await blueprintPage.node.evaluate(
                        node => /** @type {NodeElement} */(node).entity.nodeIcon().strings.join("")
                    )
                ).toBe(nodeTest.icon.strings.join(""))
            )
        } else {
            test(
                "It does not have an icon",
                async ({ blueprintPage }) => expect(
                    await blueprintPage.node.evaluate(node => /** @type {NodeElement} */(node).entity.nodeIcon())
                ).toBeUndefined()
            )
        }
        if (nodeTest.pins !== undefined) {
            test(
                `Has ${nodeTest.pins} pins`,
                async ({ blueprintPage }) => expect(
                    await blueprintPage.node.evaluate(
                        node => /** @type {NodeElement} */(node).querySelectorAll("ueb-pin").length
                    )
                ).toBe(nodeTest.pins)
            )
        }
        if (nodeTest.pinNames) {
            test(
                "Has correct pin names",
                async ({ blueprintPage }) => {
                    const innerTexts = await blueprintPage.node.locator(".ueb-pin-content .ueb-pin-name").allInnerTexts()
                    const pinNames = innerTexts.map(v => v.trim()).filter(v => v.length > 0)
                    expect(pinNames).toStrictEqual(nodeTest.pinNames)
                }
            )
        }
        test(
            "Expected development",
            async ({ blueprintPage }) => expect(
                await blueprintPage.node.evaluate(node => /** @type {NodeElement} */(node).entity.isDevelopmentOnly())
            ).toBe(nodeTest.development)
        )
        test(
            "Maintains the order of attributes",
            async ({ blueprintPage }) => {
                const blueprint = blueprintPage.blueprintLocator
                await blueprint.evaluate(/** @param {Blueprint} blueprint */ blueprint => blueprint.selectAll())
                const value = await blueprint.evaluate(/** @param {Blueprint} blueprint */ blueprint =>
                    blueprint.template.getCopyInputObject().getSerializedText()
                )
                const words = value
                    .split("\n")
                    .map(row => row.match(/\s*("?\w+(\s+\w+)*).+/)?.[1])
                    .filter(v => v?.length > 0)
                expect(value).toMatch(getFirstWordOrder(words))
            }
        )
        if (nodeTest.variadic) {
            test(
                "Can add new pins",
                async ({ blueprintPage }) => {
                    const variadic = blueprintPage.node.getByText("Add pin")
                    await expect(variadic).toBeVisible()
                    await variadic.click()
                    expect(await blueprintPage.node.locator("ueb-pin").all()).toHaveLength(nodeTest.pins + 1)
                }
            )
        }
        if (nodeTest.additionalTest) {
            test(
                "Additional tests",
                async ({ blueprintPage }) => nodeTest.additionalTest(
                    async (extractor, ...args) =>
                        await blueprintPage.node.evaluate(
                            element => extractor(
                            /** @type {NodeElement} */(element),
                                ...args
                            ),
                            ...args
                        ),
                    blueprintPage.node
                )
            )
        }
    })
}

/** @param {TestSpecifier[]} tests */
export default function generateNodesTests(tests) {
    tests.forEach(testObject => generateNodeTest(testObject))
}
