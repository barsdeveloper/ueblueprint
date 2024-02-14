import base from "@playwright/test"
import BlueprintFixture from "./BlueprintFixture.js"

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
