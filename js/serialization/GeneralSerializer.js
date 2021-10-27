import Grammar from "./Grammar"
import Serializer from "./Serializer"

export default class GeneralSerializer extends Serializer {

    constructor(keyword = "", entityType, prefix = "", separator = ",", trailingSeparator = false) {
        super(entityType, prefix, separator, trailingSeparator)
        this.keyword = keyword
    }

    read(value) {
        let grammar = Grammar.getGrammarForType(Serializer.grammar, this.entityType)
        const parseResult = grammar.parse(value)
        if (!parseResult.status) {
            console.error("Error when trying to parse the entity " + this.entityType.prototype.constructor.name)
            return parseResult
        }
        return parseResult.value
    }

    write(object) {
        let result = `${this.key ?? ""}(${this.subWrite([], object)})`
        return result
    }
}
