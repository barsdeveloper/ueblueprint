import base from "@playwright/test"
import BlueprintFixture from "./BlueprintFixture.js"

export const test = /** @type {typeof base.extend<{blueprintPage: BlueprintFixture}>} */(base.extend)({
    blueprintPage: async ({ page }, use) => {
        const blueprintPage = new BlueprintFixture(page)
        await blueprintPage.setup()
        await use(blueprintPage)
        await blueprintPage.cleanup()
    }
})

export const expect = base.expect
export * from "@playwright/test"
