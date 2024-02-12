import httpServer from "http-server"


export default class BlueprintFixture {

    #port = 8181


    /** @type {Locator<Blueprint>} */
    #blueprintLocator
    get blueprintLocator() {
        return this.#blueprintLocator
    }

    /** @type {Locator<NodeElement>} */
    #node
    get node() {
        return this.#node
    }

    /** @type {ReturnType<httpServer.createServer>} */
    static server

    /** @param {import("playwright/test").Page} page */
    constructor(page) {
        this.page = page
        this.#blueprintLocator = page.locator("ueb-blueprint")
        this.#node = this.#blueprintLocator.locator("ueb-node").first()
        if (process.env.UEBLUEPRINT_TEST_SERVER_PORT) {
            this.#port = Number(process.env.UEBLUEPRINT_TEST_SERVER_PORT)
        }
    }

    createServer() {
        return new Promise((resolve, reject) => {
            const server = httpServer.createServer({
                root: "./",
                cors: true,
                logFn: (req, res, error) => error && console.error("Http server: " + error)
            })
            process.on("SIGTERM", () => {
                console.log("SIGTERM signal received: closing HTTP server")
                server.close()
            })
            server.listen(this.#port, "127.0.0.1", () => resolve(server))
            BlueprintFixture.server = server
        })
    }

    async setup() {
        const url = `http://127.0.0.1:${this.#port}/empty.html`
        try {
            await this.page.goto(url)
        } catch (e) {
            if (e.message.includes("ERR_CONNECTION_REFUSED")) {
                try {
                    await this.createServer()
                } catch (e) {
                    let a = 123
                }
                await this.page.goto(url)
            }
        }
        this.#blueprintLocator = this.page.locator("ueb-blueprint")
        // To cause the blueprint to get the focus and start listining for input, see MouseClick::#mouseDownHandler
        await this.#blueprintLocator.click({ position: { x: 100, y: 300 } })
    }

    async removeNodes() {
        return await this.#blueprintLocator.evaluate(blueprint =>
            blueprint.removeGraphElement(...blueprint.getNodes())
        )
    }

    /** @param {String} text */
    async paste(text) {
        return await this.#blueprintLocator.evaluate(
            (blueprint, text) => {
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

    async cleanup() {
    }
}
