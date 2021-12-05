import Context from "./Context"
import ObjectSerializer from "../serialization/ObjectSerializer"

export default class Copy extends Context {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)
        this.serializer = new ObjectSerializer()
        let self = this
        this.copyHandle = _ => self.copied()
    }

    blueprintFocused() {
        document.body.addEventListener("copy", this.copyHandle)
    }

    blueprintUnfocused() {
        document.body.removeEventListener("copy", this.copyHandle)
    }

    copied() {
        const value = this.blueprint.getNodes(true).map(node => this.serializer.write(node.entity)).join("\n")
        navigator.clipboard.writeText(value)
    }
}
