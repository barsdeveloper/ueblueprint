// @ts-check

import IContext from "../IContext"
import ObjectSerializer from "../../serialization/ObjectSerializer"

export default class Copy extends IContext {

    #copyHandler

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)
        this.serializer = new ObjectSerializer()
        let self = this
        this.#copyHandler = _ => self.copied()
    }

    listenEvents() {
        document.body.addEventListener("copy", this.#copyHandler)
    }

    unlistenEvents() {
        document.body.removeEventListener("copy", this.#copyHandler)
    }

    copied() {
        const value = this.blueprint.getNodes(true).map(node => this.serializer.write(node.entity)).join("\n")
        navigator.clipboard.writeText(value)
    }
}
