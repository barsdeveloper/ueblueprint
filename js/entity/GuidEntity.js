import Entity from "./Entity";

export default class GuidEntity extends Entity {

    static attributes = {
        value: String
    }

    static generateGuid(random) {
        let values = new Uint32Array(4);
        if (random === true) {
            crypto.getRandomValues(values)
        }
        let result = ""
        values.forEach(n => {
            result += ('00000000' + n.toString(16).toUpperCase()).slice(-8)
        })
        return result
    }

    constructor(guid) {
        if (guid?.constructor === String) {
            guid = {
                value: guid
            }
        } else if (guid?.constructor === Boolean) {
            guid = {
                value: GuidEntity.generateGuid(guid == true)
            }
        }
        super(guid)
    }

    getAttributes() {
        return GuidEntity.attributes
    }
}