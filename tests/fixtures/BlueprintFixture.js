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

    /** 
     * @param {Locator<HTMLElement>} draggable
     * @param {Coordinates} offset
     */
    async move(draggable, offset) {
        const { x: x1, y: y1 } = await draggable.boundingBox()
        await draggable.dragTo(this.blueprintLocator, {
            sourcePosition: {
                x: 1,
                y: 1,
            },
            targetPosition: {
                x: x1 + offset[0] + 1,
                y: y1 + offset[1] + 1,
            }
        })
        const { x: x2, y: y2 } = await draggable.boundingBox()
        return {
            before: [x1, y1],
            after: [x2, y2],
        }
    }

    createServer() {
        return new Promise((resolve, reject) => {
            const webserver = httpServer.createServer({
                root: "./",
                cors: true,
                logFn: (req, res, error) => error && console.error(`Http server: ${error}`)
            })
            webserver.server.addListener("error", error => {
                if (error.code === "EADDRINUSE") {
                    console.log(`Port ${this.#port} is already in use, assuming server is already running`)
                    resolve(webserver)
                } else {
                    resolve(null)
                }
            })
            webserver.listen(this.#port, "127.0.0.1", () => resolve(webserver))
            process.addListener("SIGTERM", () => {
                console.log("SIGTERM signal received: closing HTTP server")
                webserver.close()
            })
            BlueprintFixture.server = webserver
        })
    }

    async setup() {
        const url = `http://127.0.0.1:${this.#port}/empty.html`
        try {
            await this.page.goto(url)
        } catch (e) {
            if (e.message.includes("ERR_CONNECTION_REFUSED")) {
                await this.createServer()
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

    blur() {
        return this.page.evaluate(() => /** @type {HTMLElement} */(document.activeElement).blur())
    }

    getSerializedNodes() {
        return this.blueprintLocator.evaluate(blueprint => {
            blueprint.selectAll()
            return blueprint.template.getCopyInputObject().getSerializedText()
        })
    }
}
