import PinEntity from "../entity/PinEntity"
import Serializer from "./Serializer"

export default class PinSerializer extends Serializer {

    getAttributes() {
        return PinEntity.attributes
    }

    read(value) {
        const parseResult = Serializer.grammar.Pin.parse(value)
        if (!parseResult.status) {
            console.error("Error when trying to parse the pin.")
            return parseResult
        }
        return parseResult.value
    }

    write(object) {
        let result = `Pin (${this.subWrite([], object, ",")})`
        return result
    }
}