import Parsimmon from "parsimmon"
import PinGrammar from "./PinGrammar"
import Serializer from "./Serializer"

export default class PinSerializer extends Serializer {

    static pinGrammar = Parsimmon.createLanguage(new PinGrammar())

    read(value) {
        const parseResult = PinSerializer.pinGrammar.Pin.parse(value)
        if (!parseResult.status) {
            console.error("Error when trying to parse the pin.")
            return parseResult
        }
        return parseResult.value
    }

    write(object) {
        let result = `Pin (${Serializer.subWrite('', object)})`
        return result
    }
}