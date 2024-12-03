import Action from "./Actions"

export default class RemoveAllNodes extends Action {

    fire() {
        this.blueprint.removeGraphElement(...this.blueprint.getNodes(true))
    }
}
