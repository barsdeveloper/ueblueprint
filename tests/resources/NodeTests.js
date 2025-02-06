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

async function highlightClickPosition(page, x, y) {
    await page.evaluate((elem, { x, y }) => {
        const highlightElement = document.createElement('div')
        highlightElement.style.position = 'absolute'
        highlightElement.style.border = '2px solid red'
        highlightElement.style.borderRadius = '50%'
        highlightElement.style.width = '10px'
        highlightElement.style.height = '10px'
        highlightElement.style.transform = 'translate(-50%, -50%)'
        highlightElement.style.pointerEvents = 'none' // Ensures click-through
        highlightElement.style.zIndex = '9999'
        highlightElement.style.left = `${x}px`
        highlightElement.style.top = `${y}px`

        document.body.appendChild(highlightElement)

        // Automatically remove the highlight after a delay
        setTimeout(() => document.body.removeChild(highlightElement), 100000) // Adjust delay as needed
    }, { x, y })
}

/**
 * @param {import("@playwright/test").Mouse} mouse
 * @param {Locator<HTMLElement>} element
 * @param {Coordinates} offset
 */
export async function dragAndDrop(mouse, element, offset) {
    let { x, y } = await element.boundingBox()
    x += 5
    y += 5
    await mouse.move(x, y)
    await element.hover({ position: { x: 5, y: 5 } })
    await highlightClickPosition(element, x, y)
    await mouse.down()
    x += offset[0]
    y += offset[1]
    await mouse.move(x, y, { steps: 10 })
    await highlightClickPosition(element, x, y)
    await mouse.up()
}
