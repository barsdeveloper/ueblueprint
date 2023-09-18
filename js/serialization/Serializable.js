import Parsimmon from "parsimmon"

const P = Parsimmon

export default class Serializable {

    static grammar = this.createGrammar()

    static createGrammar() {
        return /** @type {Parsimmon.Parser<Serializable>} */(P.fail(
            "Unimplemented createGrammar() method in " + this.name)
        )
    }
}
