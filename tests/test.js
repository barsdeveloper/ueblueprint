import base from "@playwright/test"
import BlueprintFixture from "./fixtures/BlueprintFixture.js"

export default /** @type {typeof base.extend<{blueprintPage: BlueprintFixture}>} */(base.extend)({
    blueprintPage: async ({ page }, use) => {
        const blueprintPage = new BlueprintFixture(page)
        await use(blueprintPage)
    }
})
