export default class Action {

    #blueprint
    get blueprint() {
        return this.#blueprint
    }

    constructor(blueprint) {
        this.#blueprint = blueprint
    }

    fire() {
    }
}
