import http from "http"
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

    async clone() {
        const result = new BlueprintFixture(await this.page.context().newPage())
        await result.setup()
        return result
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

    async checkServerReady(url) {
        return new Promise((resolve, reject) => {
            const request = http.get(url, res => {
                if (res.statusCode === 200) {
                    resolve()
                } else {
                    reject(new Error(`Server not ready, status code: ${res.statusCode}`))
                }
            })

            request.on("error", error => reject(error))
            request.end()
        })
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
            webserver.listen(this.#port, "127.0.0.1", async () => {
                console.log(`Server started on http://127.0.0.1:${this.#port}`)
                const url = `http://127.0.0.1:${this.#port}/debug.html`
                try {
                    await this.checkServerReady(url)
                    BlueprintFixture.server = webserver
                    resolve(webserver)
                } catch (error) {
                    console.error("Server failed readiness check:", error)
                    reject(error)
                }
            })
            process.addListener("SIGTERM", () => {
                console.log("SIGTERM signal received: closing HTTP server")
                webserver.close()
            })
        })
    }

    async setup() {
        const url = `http://127.0.0.1:${this.#port}/debug.html`
        for (let i = 0; i < 1E4; ++i) {
            try {
                await this.page.goto(url, { waitUntil: "domcontentloaded" })
                break
            } catch (e) {
                if (e.message.includes("ERR_CONNECTION_REFUSED")) {
                    await this.createServer()
                }
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
        await this.#blueprintLocator.evaluate(
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
        await this.#blueprintLocator.evaluate(b => b.template.centerContentInViewport(false))
    }

    async cleanup() {
        await this.page.close()
    }

    blur() {
        return this.page.evaluate(() => /** @type {HTMLElement} */(document.activeElement).blur())
    }

    getSerializedNodes() {
        return this.blueprintLocator.evaluate(blueprint => {
            blueprint.selectAll()
            return blueprint.getSerializedText()
        })
    }
}
