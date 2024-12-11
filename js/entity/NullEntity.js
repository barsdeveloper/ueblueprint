import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class NullEntity extends IEntity {

    static grammar = this.createGrammar()

    /** @returns {P<NullEntity>} */
    static createGrammar() {
        // @ts-expect-error
        return P.reg(new RegExp(String.raw`\(${P.whitespaceInlineOpt.getParser().regexp.source}\)`))
            .map(v => new this())
            .label("NullEntity")
    }

    serialize(
        insideString = false,
        indentation = "",
        Self = /** @type {typeof IEntity} */(this.constructor)
    ) {
        let result = "()"
        if (Self.serialized) {
            result = `"${result}"`
        }
        return result
    }
}
