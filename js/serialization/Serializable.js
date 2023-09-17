import Parsimmon from "parsimmon"

const P = Parsimmon

export default class Serializable {
    static getGrammar() {
        return /** @type {Parsimmon.Parser<Serializable>} */(P.fail(
            "Unimplemented getGrammar() method in " + this.name)
        )
    }
}
