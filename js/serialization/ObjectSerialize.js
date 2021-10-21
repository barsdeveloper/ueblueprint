import Serializer from "./Serializer";

export default class ObjectSerializer extends Serializer {

    showProperty(attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
                // Serielized separately
                return false
        }
        return super.showProperty(attributeKey, attributeValue)
    }

    read(value) {
        const parseResult = Serializer.grammar.Object.parse(value)
        if (!parseResult.status) {
            console.error("Error when trying to parse the object.")
            return parseResult
        }
        return parseResult.value
    }

    write(object) {
        let result = `
Begin Object Class=${object.Class} Name=${object.Name}
${this.subWrite([], object, "\n", "   ")}
End Object
`
        return result
    }
}