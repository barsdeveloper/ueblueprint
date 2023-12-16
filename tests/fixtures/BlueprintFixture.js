import httpServer from "http-server"

export default class BlueprintFixture {

    /** @param {import("playwright/test").Page} page */
    constructor(page) {
        this.page = page
    }

    getBlueprint() {
        return this.blueprint
    }

    async setup() {
        this.server = httpServer.createServer({
            "root": "../../",
            "cors": true,
        })
        this.server.listen(process.env.UEBLUEPRINT_TEST_SERVER_PORT)
        await this.page.goto(`http://127.0.0.1:${process.env.UEBLUEPRINT_TEST_SERVER_PORT}/empty.html`)
        const blueprintLocator = this.page.locator("ueb-blueprint")
        blueprintLocator.click({ position: { x: 100, y: 300 } })
        this.blueprint = await blueprintLocator.evaluate(elem => /** @type {Blueprint} */(elem))
    }

    cleanup() {
        this.server.close()
    }
}
