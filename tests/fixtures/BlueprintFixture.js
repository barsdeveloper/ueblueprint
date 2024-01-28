import httpServer from "http-server"

export default class BlueprintFixture {

    #blueprintLocator
    get blueprintLocator() {
        return this.#blueprintLocator
    }

    /** @param {import("playwright/test").Page} page */
    constructor(page) {
        this.page = page
        this.#blueprintLocator = page.locator("ueb-blueprint")
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
        // To cause the blueprint to get the focus and start listining for input, see MouseClick::#mouseDownHandler
        this.#blueprintLocator.click({ position: { x: 100, y: 300 } })
    }

    removeNodes() {
        return this.#blueprintLocator.evaluate(/** @param {Blueprint} blueprint */ blueprint =>
            blueprint.removeGraphElement(...blueprint.getNodes())
        )
    }

    /** @param {String} text */
    paste(text) {
        return this.#blueprintLocator.evaluate(
            /** @param {Blueprint} blueprint */(blueprint, text) => {
                const event = new ClipboardEvent("paste", {
                    bubbles: true,
                    cancelable: true,
                    clipboardData: new DataTransfer(),
                })
                event.clipboardData.setData("text", text)
                blueprint.dispatchEvent(event)
            },
            text
        )
    }

    cleanup() {
        this.server.close()
    }
}
