import httpServer from "http-server"

export default class BlueprintFixture {

    #blueprintLocator
    get blueprintLocator() {
        return this.#blueprintLocator
    }

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }

    /** @param {import("playwright/test").Page} page */
    constructor(page) {
        this.page = page
        this.#blueprintLocator = page.locator("ueb-blueprint")
        // this.#blueprintLocator.evaluate(elem => /** @type {Blueprint} */(elem)).then(elem => this.#blueprint = elem)
    }

    getBlueprint() {
        return this.blueprint
    }

    async setup() {
        this.server = httpServer.createServer({
            "root": "./",
            "cors": true,
        })
        const port = Number(process.env.UEBLUEPRINT_TEST_SERVER_PORT ?? 8181)
        this.server.listen(port, "127.0.0.1")
        await this.page.goto(`http://127.0.0.1:${port}/empty.html`)
        this.#blueprintLocator = this.page.locator("ueb-blueprint")
        this.#blueprintLocator.click({ position: { x: 100, y: 300 } })
        this.#blueprint = await this.#blueprintLocator.evaluate(elem => /** @type {Blueprint} */(elem))
    }

    cleanup() {
        this.server.close()
    }
}
