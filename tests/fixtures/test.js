import base from "@playwright/test"
import Configuration from "../../js/Configuration.js"
import Utility from "../../js/Utility.js"
import BlueprintFixture from "./BlueprintFixture.js"

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
 *     additionalTest?: (node: Locator<NodeElement>, pins: Locator<PinElement>[], blueprintPage: BlueprintFixture) => void,
 * }} TestData
 */

export const test = /**
@type {typeof base.extend<{}, {
    sharedContext: import("@playwright/test").BrowserContext,
    blueprintPage: BlueprintFixture,
}>}
*/(base.extend)(
    {
        sharedContext: [async ({ browser }, use) => {
            const context = await browser.newContext()
            await use(context)
            await context.close()
        }, { scope: "worker" }],
        blueprintPage: [async ({ sharedContext }, use) => {
            const page = await sharedContext.newPage()
            const blueprintPage = new BlueprintFixture(page)
            await blueprintPage.setup()
            await use(blueprintPage)
        }, { scope: "worker" }]
    }
)

export const expect = base.expect
export * from "@playwright/test"

/** @param {TestData} testData */
export function testNode(testData) {

    test.beforeAll(async ({ blueprintPage }) => {
        await blueprintPage.removeNodes()
        await blueprintPage.paste(testData.value)
    })

    testData.title ??= testData.name

    if (testData.color) {
        test(
            `${testData.name}: Has correct color`,
            async ({ blueprintPage }) => {
                expect(
                    await blueprintPage.node.evaluate(node => node.entity.nodeColor().toString())
                ).toBe(testData.color.toString())
            }
        )
    }

    test(
        `${testData.name}: Has correct delegate`,
        async ({ blueprintPage }) => {
            const delegate = blueprintPage.blueprintLocator.locator(
                'ueb-node .ueb-node-top ueb-pin[data-type="delegate"]'
            )
            if (testData.delegate) {
                await expect(delegate).toBeVisible()
            } else {
                await expect(delegate).toBeHidden()
            }
        }
    )

    test(
        `${testData.name}: Has title ${testData.title}`,
        async ({ blueprintPage }) => expect(
            await blueprintPage.node.evaluate(node => node.nodeDisplayName)
        ).toBe(testData.title)
    )

    if (testData.subtitle) {
        test(
            `${testData.name}: Has expected subtitle ${testData.subtitle}`,
            async ({ blueprintPage }) => await expect(blueprintPage.node.locator(".ueb-node-subtitle-text"))
                .toHaveText(testData.subtitle, { useInnerText: true })
        )
    } else {
        test(
            `${testData.name}: Has no subtitle`,
            async ({ blueprintPage }) => await expect(blueprintPage.node.locator(".ueb-node-subtitle-text"))
                .toBeHidden()
        )
    }

    if (testData.size) {
        test(
            `${testData.name}: Has approximately the expected size`,
            async ({ blueprintPage }) => {
                const expectedSize = await blueprintPage.node.evaluate(
                    (node, gridSize) => {
                        const bounding = node.getBoundingClientRect()
                        const expectedSize = [bounding.width / gridSize, bounding.height / gridSize]
                        return expectedSize
                    },
                    Configuration.gridSize
                )
                expect(Math.abs(testData.size[0] - expectedSize[0])).toBeLessThanOrEqual(1.5)
                expect(Math.abs(testData.size[1] - expectedSize[1])).toBeLessThanOrEqual(1.5)
                if (
                    Math.abs(testData.size[0] - expectedSize[0]) > 0.6
                    || Math.abs(testData.size[1] - expectedSize[1]) > 0.6
                ) {
                    console.error(`Node "${testData.name}" size does not match`)
                }
            }
        )
    }

    if (testData.icon) {
        test(
            `${testData.name}: Has the correct icon`,
            async ({ blueprintPage }) => expect(
                await blueprintPage.node.evaluate(
                    node => node.entity.nodeIcon()?.strings.join("")
                )
            ).toBe(testData.icon?.strings.join(""))
        )
    } else if (testData.icon === null) {
        test(
            `${testData.name}: Has no icon`,
            async ({ blueprintPage }) => expect(
                await blueprintPage.node.evaluate(
                    node => node.entity.nodeIcon()
                )
            ).toBeNull()
        )
    }

    if (testData.pins !== undefined) {
        test(
            `${testData.name}: Has ${testData.pins} pins`,
            async ({ blueprintPage }) => expect(
                await blueprintPage.node.evaluate(
                    node => node.querySelectorAll("ueb-pin").length
                )
            ).toBe(testData.pins)
        )
    }

    if (testData.pinNames) {
        test(
            `${testData.name}: Has correct pin names`,
            async ({ blueprintPage }) => {
                const innerTexts = await blueprintPage.node.locator(".ueb-pin-content .ueb-pin-name").allInnerTexts()
                const pinNames = innerTexts.map(v => v.trim()).filter(v => v.length > 0)
                expect(pinNames).toStrictEqual(testData.pinNames)
            }
        )
    }

    test(
        `${testData.name}: Expected development`,
        async ({ blueprintPage }) => expect(
            await blueprintPage.node.evaluate(node => node.entity.isDevelopmentOnly())
        ).toBe(testData.development)
    )

    test(
        `${testData.name}: Maintains the order of attributes`,
        async ({ blueprintPage }) => {
            const actualSerialization = await blueprintPage.getSerializedNodes()
            const expectedWords = testData.value
                .split("\n")
                .map(row => row.match(/\s*("?\w+(\s+\w+)*).+/)?.[1])
                .filter(v => v?.length > 0)
            expect(actualSerialization).toMatch(Utility.getFirstWordOrder(expectedWords))
        }
    )

    if (testData.variadic) {
        test(
            `${testData.name}: Can add new pins`,
            async ({ blueprintPage }) => {
                const variadic = blueprintPage.node.getByText("Add pin")
                await expect(variadic).toBeVisible()
                await variadic.hover()
                await variadic.click()
                expect(await blueprintPage.node.locator("ueb-pin").all()).toHaveLength(testData.pins + 1)
                await variadic.blur()
            }
        )
    }

    if (testData.additionalTest) {
        test(
            `${testData.name}: Additional tests`,
            async ({ blueprintPage }) =>
                testData.additionalTest(
                    blueprintPage.node,
                    await blueprintPage.node.locator("ueb-pin").all(),
                    blueprintPage,
                )
        )
    }
}
