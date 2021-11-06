import Context from "./Context"
import Utility from "../Utility"

export default class KeyboardShortcut extends Context {

    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        /** @type {String[]} */
        this.keys = this.options?.keys ?? []
        /** @type Numeric */
        this.currentKey = 0


        let self = this
        this.keyDownHandler = e => {
            e.preventDefault()
            if (Utility.equals(e.keys[self.currentKey], e.key)) {
                if (++self.currentKey == this.keys.length) {
                    self.fire()
                }
            }
        }
        this.keyUpHandler = e => {
            e.preventDefault()
            for (let i = 0; i < self.currentKey; ++i) {
                if (Utility.equals(e.keys[self.currentKey], e.key)) {
                    self.currentKey = i
                    break
                }
            }
        }
        if (this.keys.length > 0) {
            this.target.addEventListener("keydown", this.keyDownHandler)
            this.target.addEventListener("keyup", this.keyUpHandler)
        }
    }

    unlistenDOMElement() {
        this.target.removeEventListener('keydown', this.keyDownHandler)
        this.target.removeEventListener('keyup', this.keyUpHandler)
    }

    fire() {
    }

}
