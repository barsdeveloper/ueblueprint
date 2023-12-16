import { expect } from "@playwright/test"
import Configuration from "../../js/Configuration.js"
import NodeElement from "../../js/element/NodeElement.js"
import test from "../test.js"
import Utility from "../../js/Utility.js"

/** @param {String[]} words */
function getFirstWordOrder(words) {
    return new RegExp("\\s*" + words.join("[^\\n]+\\n\\s*") + "\\s*")
}

function generateNodeTest(nodeTest) {
    test.describe(nodeTest.name, () => {
        test.beforeAll(async ({ blueprintPage }) => {
            const blueprint = blueprintPage.getBlueprint()
            blueprint.removeGraphElement(...blueprint.getNodes())
            Utility.paste(blueprint, nodeTest.value)
            node = blueprint.querySelector("ueb-node")
        })

        /** @type {NodeElement} */
        let node
        if (nodeTest.title === undefined) {
            nodeTest.title = nodeTest.name
        }

        if (nodeTest.color) {
            test("Has correct color", async ({ page }) => expect(node.entity.nodeColor()).toEqual(nodeTest.color))
        }
        test("Has correct delegate", async ({ page }) => {
            const delegate = node.querySelector('.ueb-node-top ueb-pin[data-type="delegate"]')
            if (nodeTest.delegate) {
                expect(delegate).toBeTruthy()
            } else {
                expect(delegate).toBeFalsy()
            }
        })
        if (nodeTest.title) {
            test(`Has title ${nodeTest.title}`, async ({ page }) => expect(node.getNodeDisplayName()).toEqual(nodeTest.title))
        }
        test(
            `Has expected subtitle ${nodeTest.subtitle}`,
            async ({ page }) => expect(
                /** @type {HTMLElement} */(node.querySelector(".ueb-node-subtitle-text"))?.innerText
            ).toEqual(nodeTest.subtitle)
        )
        if (nodeTest.size) {
            test("Has approximately the expected size", async ({ page }) => {
                const bounding = node.getBoundingClientRect()
                const expectedSize = [
                    bounding.width / Configuration.gridSize,
                    bounding.height / Configuration.gridSize,
                ]
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
            test("Has the correct icon", async ({ page }) => expect(node.entity.nodeIcon()).toEqual(nodeTest.icon))
        } else if (nodeTest.icon === false) {
            test("It does not have an icon", async ({ page }) => expect(node.entity.nodeIcon()).toBeUndefined())
        }
        if (nodeTest.pins) {
            test(`Has ${nodeTest.pins} pins`, async ({ page }) => expect(node.querySelectorAll("ueb-pin"))
                .toHaveLength(nodeTest.pins))
        }
        if (nodeTest.pinNames) {
            test(
                "Has correct pin names",
                async ({ page }) => expect(
                    [...node.querySelectorAll(".ueb-pin-content")]
                        .map(elem =>
                            /** @type {HTMLElement} */(elem.querySelector(".ueb-pin-name") ?? elem).innerText.trim()
                        )
                        .filter(name => name.length)
                )
                    .toEqual(nodeTest.pinNames)
            )
        }
        test("Expected development", async ({ page }) => expect(node.entity.isDevelopmentOnly()).toStrictEqual(nodeTest.development))
        test("Maintains the order of attributes", async ({ blueprintPage, page }) => {
            blueprintPage.getBlueprint().selectAll()
            const value = blueprintPage.getBlueprint().template.getCopyInputObject().getSerializedText()
            const words = value.split("\n").map(row => row.match(/\s*("?\w+(\s+\w+)*).+/)?.[1]).filter(v => v?.length > 0)
            expect(value).toMatch(getFirstWordOrder(words))
        })
        if (nodeTest.additionalTest) {
            test("Additional tests", async ({ page }) => nodeTest.additionalTest(node))
        }
        if (nodeTest.variadic) {
            test(
                "Can add new pins",
                async ({ page }) => {
                    const variadic = /** @type {HTMLElement} */(node.querySelector(".ueb-node-variadic"))
                    expect(variadic).toBeUndefined()
                    variadic.click()
                    expect(node.querySelectorAll("ueb-pin")).toHaveLength(nodeTest.pins + 1)
                }
            )
        }
    })
}

export default function generateNodesTests(tests) {

    test.beforeAll(async ({ blueprintPage, page }) => {
        blueprintPage.setup()
    })

    test.afterAll(async ({ blueprintPage, page }) => {
        blueprintPage.cleanup()
    })

    tests.forEach(testObject => generateNodeTest(testObject))
}
