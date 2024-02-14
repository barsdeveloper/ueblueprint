import Parsernostrum from "parsernostrum"

export default class Serializable {

    static grammar = this.createGrammar()

    /** @protected */
    static createGrammar() {
        return /** @type {Parsernostrum<any>} */(Parsernostrum.failure())
    }
}
