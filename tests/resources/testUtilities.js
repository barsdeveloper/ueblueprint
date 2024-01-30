import Configuration from "../../js/Configuration.js"
import { test, expect } from "../fixtures/test.js"

/** @param {String[]} words */
function getFirstWordOrder(words) {
    return new RegExp(/\s*/.source + words.join(/[^\n]+\n\s*/.source) + /\s*/.source)
}

/** @param {TestSpecifier} nodeTest */
function generateNodeTest(nodeTest) {
    test.describe(nodeTest.name, () => {

        /** @type {import("../fixtures/test.js").Locator} */
        let node
        if (nodeTest.title === undefined) {
            nodeTest.title = nodeTest.name
        }

        test.beforeAll(async ({ blueprintPage }) => {
            await blueprintPage.removeNodes()
            await blueprintPage.paste(nodeTest.value)
            node = blueprintPage.blueprintLocator.locator("ueb-node")
        })

        if (nodeTest.color) {
            test(
                "Has correct color",
                async () => expect(node.evaluate(node => /** @type {NodeElement} */(node).entity
                .nodeColor()))
                    .toEqual(nodeTest.color)
            )
        }
        test("Has correct delegate", async ({ page }) => {
            const delegate = node.locator('.ueb-node-top ueb-pin[data-type="delegate"]')
            if (nodeTest.delegate) {
                expect(delegate).toBeVisible()
            } else {
                expect(delegate).toBeHidden()
            }
        })
        if (nodeTest.title) {
            test(
                `Has title ${nodeTest.title}`,
                async () => expect(node.evaluate(node => /** @type {NodeElement} */(node).getNodeDisplayName()))
                    .toEqual(nodeTest.title)
            )
        }
        test(
            `Has expected subtitle ${nodeTest.subtitle}`,
            async () => expect(
                node
                    .locator(".ueb-node-subtitle-text")
                    .evaluate(element => /** @type {HTMLElement} */(element).innerText)
            ).toEqual(nodeTest.subtitle)
        )
        if (nodeTest.size) {
            test("Has approximately the expected size", async ({ page }) => {
                const expectedSize = await node.evaluate(element => {
                    const node =    /** @type {NodeElement} */(element)
                    const bounding = node.getBoundingClientRect()
                    const expectedSize = [
                        bounding.width / Configuration.gridSize,
                        bounding.height / Configuration.gridSize,
                    ]
                    return expectedSize
                })
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
        if (nodeTest.icon) {
            test(
                "Has the correct icon",
                async () => expect(node.evaluate(node => /** @type {NodeElement} */(node).entity.nodeIcon()))
                    .toEqual(nodeTest.icon)
            )
        } else if (nodeTest.icon === false) {
            test(
                "It does not have an icon",
                async () => expect(node.evaluate(node => /** @type {NodeElement} */(node).entity.nodeIcon()))
                    .toBeUndefined()
            )
        }
        if (nodeTest.pins) {
            test(
                `Has ${nodeTest.pins} pins`,
                async () => expect(
                    node.evaluate(node => /** @type {NodeElement} */(node).querySelectorAll("ueb-pin").length)
                )
                    .toEqual(nodeTest.pins))
        }
        if (nodeTest.pinNames) {
            test(
                "Has correct pin names",
                async () => {
                    const innerTexts = await node.locator(".ueb-pin-content .ueb-pin-name").allInnerTexts()
                    const pinNames = innerTexts.map(v => v.trim()).filter(v => v.length > 0)
                    expect(pinNames).toStrictEqual(nodeTest.pinNames)
                }
            )
        }
        test(
            "Expected development",
            async () => expect(node.evaluate(node => /** @type {NodeElement} */(node).entity.isDevelopmentOnly()))
                .toStrictEqual(nodeTest.development)
        )
        test(
            "Maintains the order of attributes",
            async ({ blueprintPage, page }) => {
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
                async () => {
                    const variadic = node.locator(".ueb-node-variadic")
                    expect(variadic).toBeVisible()
                    await variadic.click()
                    expect(node.locator("ueb-pin").all()).toHaveLength(nodeTest.pins + 1)
                }
            )
        }
        if (nodeTest.additionalTest) {
            test("Additional tests", async () => nodeTest.additionalTest(
                async (extractor, ...args) =>
                    await node.evaluate(
                        (element) => extractor(
                            /** @type {NodeElement} */(element),
                            ...args
                        ),
                    )
            ))
        }
    })
}

/** @param {TestSpecifier[]} tests */
export default function generateNodesTests(tests) {

    test.beforeAll(async ({ blueprintPage }) => {
        blueprintPage.setup()
    })

    test.afterAll(async ({ blueprintPage }) => {
        blueprintPage.cleanup()
    })

    tests.forEach(testObject => generateNodeTest(testObject))
}
