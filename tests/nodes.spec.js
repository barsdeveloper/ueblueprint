import Utility from "../js/Utility.js"
import Configuration from "./../js/Configuration.js"
import { expect, test } from "./fixtures/test.js"
import EventNodes from "./resources/EventNodes.js"
import FlowControlNodes from "./resources/FlowControlNodes.js"
import InputNodes from "./resources/InputNodes.js"
import IssuesNodes1 from "./resources/IssuesNodes1.js"
import LegacyNodes from "./resources/LegacyNodes.js"
import MaterialNodes from "./resources/MaterialNodes.js"
import NiagaraNodes from "./resources/NiagaraNodes.js"
import OperationsNodes from "./resources/OperationsNodes.js"
import OtherNodes from "./resources/OtherNodes.js"
import PCGNodes from "./resources/PCGNodes.js"

const nodeTests = [
    ...EventNodes.get(),
    ...FlowControlNodes.get(),
    ...InputNodes.get(),
    ...IssuesNodes1.get(),
    ...LegacyNodes.get(),
    ...MaterialNodes.get(),
    ...NiagaraNodes.get(),
    ...OperationsNodes.get(),
    ...OtherNodes.get(),
    ...PCGNodes.get(),
]

const batchSize = 16

let i = 0
while (i < nodeTests.length) {

    test.describe("Batch " + Math.floor(i / batchSize), () => {
        test.describe.configure({ mode: "parallel" })
        do {
            const nodeTest = nodeTests[i]
            test.describe(nodeTest.name, () => {

                test.describe.configure({ mode: "serial" })
                test.beforeAll(async ({ blueprintPage }) => {
                    await blueprintPage.removeNodes()
                    await blueprintPage.paste(nodeTest.value)
                })

                nodeTest.title ??= nodeTest.name

                if (nodeTest.color) {
                    test(
                        `${nodeTest.name}: Has correct color`,
                        async ({ blueprintPage }) => {
                            expect(
                                await blueprintPage.node.evaluate(node => node.entity.nodeColor().toString())
                            ).toBe(nodeTest.color.toString())
                        }
                    )
                }

                test(
                    `${nodeTest.name}: Has correct delegate`,
                    async ({ blueprintPage }) => {
                        const delegate = blueprintPage.blueprintLocator.locator(
                            'ueb-node .ueb-node-top ueb-pin[data-type="delegate"]'
                        )
                        if (nodeTest.delegate) {
                            await expect(delegate).toBeVisible()
                        } else {
                            await expect(delegate).toBeHidden()
                        }
                    }
                )

                test(
                    `${nodeTest.name}: Has title ${nodeTest.title}`,
                    async ({ blueprintPage }) => expect(
                        await blueprintPage.node.evaluate(node => node.nodeDisplayName)
                    ).toBe(nodeTest.title)
                )

                if (nodeTest.subtitle) {
                    test(
                        `${nodeTest.name}: Has expected subtitle ${nodeTest.subtitle}`,
                        async ({ blueprintPage }) => await expect(blueprintPage.node.locator(".ueb-node-subtitle-text"))
                            .toHaveText(nodeTest.subtitle, { useInnerText: true })
                    )
                }

                if (nodeTest.size) {
                    test(
                        `${nodeTest.name}: Has approximately the expected size`,
                        async ({ blueprintPage }) => {
                            const expectedSize = await blueprintPage.node.evaluate(
                                (node, gridSize) => {
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
                        }
                    )
                }

                if (nodeTest.icon !== undefined) {
                    test(
                        `${nodeTest.name}: Has the correct icon`,
                        async ({ blueprintPage }) => expect(
                            await blueprintPage.node.evaluate(
                                node => node.entity.nodeIcon()?.strings.join("")
                            )
                        ).toBe(nodeTest.icon?.strings.join(""))
                    )
                }

                if (nodeTest.pins !== undefined) {
                    test(
                        `${nodeTest.name}: Has ${nodeTest.pins} pins`,
                        async ({ blueprintPage }) => expect(
                            await blueprintPage.node.evaluate(
                                node => node.querySelectorAll("ueb-pin").length
                            )
                        ).toBe(nodeTest.pins)
                    )
                }

                if (nodeTest.pinNames) {
                    test(
                        `${nodeTest.name}: Has correct pin names`,
                        async ({ blueprintPage }) => {
                            const innerTexts = await blueprintPage.node.locator(".ueb-pin-content .ueb-pin-name").allInnerTexts()
                            const pinNames = innerTexts.map(v => v.trim()).filter(v => v.length > 0)
                            expect(pinNames).toStrictEqual(nodeTest.pinNames)
                        }
                    )
                }

                test(
                    `${nodeTest.name}: Expected development`,
                    async ({ blueprintPage }) => expect(
                        await blueprintPage.node.evaluate(node => node.entity.isDevelopmentOnly())
                    ).toBe(nodeTest.development)
                )

                test(
                    `${nodeTest.name}: Maintains the order of attributes`,
                    async ({ blueprintPage }) => {
                        const actualSerialization = await blueprintPage.getSerializedNodes()
                        const expectedWords = nodeTest.value
                            .split("\n")
                            .map(row => row.match(/\s*("?\w+(\s+\w+)*).+/)?.[1])
                            .filter(v => v?.length > 0)
                        expect(actualSerialization).toMatch(Utility.getFirstWordOrder(expectedWords))
                    }
                )

                if (nodeTest.variadic) {
                    test(
                        `${nodeTest.name}: Can add new pins`,
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
                        `${nodeTest.name}: Additional tests`,
                        async ({ blueprintPage }) =>
                            nodeTest.additionalTest(
                                blueprintPage.node,
                                await blueprintPage.node.locator("ueb-pin").all(),
                                blueprintPage,
                            )
                    )
                }
            })
            ++i
        } while (i < nodeTests.length && i % batchSize !== 0)
    })
}
