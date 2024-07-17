import P from "parsernostrum"
import IEntity from "./IEntity.js"

export default class NullEntity extends IEntity {

    static grammar = /** @type {P<NullEntity>} */(
        // @ts-expect-error
        P.reg(new RegExp(String.raw`\(${P.whitespaceInlineOpt.getParser().regexp.source}\)`))
            .map(v => new this())
    )

    toString() {
        return "()"
    }
}
