import Parsimmon from "parsimmon"
import PinEntity from "../entity/PinEntity"
import Utility from "../Utility"
import ReferenceTypeName from "./ReferenceTypeName"

let P = Parsimmon

export default class PinGrammar {
    static pinEntity = new PinEntity()
    Null = _ => P.string("()").map(() => null).desc("null value.")
    None = _ => P.string("None").map(() => new ReferenceTypeName("None")).desc('None value')
    ReferencePath = _ => P.regex(/[a-zA-Z_]/).sepBy1(P.string(".")).tieWith(".").sepBy1(Parsimmon.string("/")).tieWith("/")
    Reference = r => r.Word.skip(P.optWhitespace).then(r.ReferencePath)
    Word = _ => P.regex(/[a-zA-Z]+/)
    Guid = _ => P.regex(/[0-9a-zA-Z]{32}/).desc("a 32 digit hexadecimal value")
    String = _ => P.regex(/(?:[^"\\]|\\")*/).wrap(P.string('"'), P.string('"')).desc('a string value, with possibility to escape the quote symbol (") using \"')
    Boolean = _ => P.string("True").or(P.string("False")).map(v => v === "True" ? true : false).desc("either True or False")
    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".")
    AttributeValue = r => P.alt(r.Null, r.None, r.Boolean, Reference, r.String, r.Guid)
    Attribute = r => P.seqMap(
        r.AttributeName,
        P.string("=").trim(P.optWhitespace),
        r.AttributeValue,
        /**
         * 
         * @param {String} name The key PinEntity
         * @param {*} _ 
         * @param {*} value 
         * @returns 
         */
        (name, _, value) =>
            /**
             * Sets the property name name in the object pinEntity to the value provided
             * @param {PinEntity} pinEntity
             */
            (pinEntity) => Utility.objectSet(name.split('.'), value, pinEntity)
    )
    Pin = r => {
        return P.seqObj(
            P.string("Pin"),
            P.optWhitespace,
            P.string("("),
            [
                "attributes",
                r.Attribute
                    .trim(P.optWhitespace)
                    .sepBy(P.string(","))
                    .skip(P.regex(/,?/).then(P.optWhitespace)) // Optional trailing comma
            ],
            P.string(')')
        ).map(object => {
            let result = new PinEntity()
            object.attributes.forEach(attributeSetter => attributeSetter(result))
            return result
        })
    }
}