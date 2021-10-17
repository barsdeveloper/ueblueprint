import Serializer from "./Serializer";

export default class ObjectSerializer extends Serializer {

    write(object) {
        let result = `Pin (${this.constructor.subWrite('', this)})`
        return result
    }
}