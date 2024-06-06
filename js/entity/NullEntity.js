import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class NullEntity extends IEntity {

    // @ts-expect-error
    static grammar = P.reg(new RegExp(String.raw`\(${P.whitespaceInlineOpt.getParser().regexp.source}\)`))
        .map(v => new this())

    toString(
        insideString = false,
        indentation = "",
        printKey = this.Self().printKey,
    ) {
        return "()"
    }
}
