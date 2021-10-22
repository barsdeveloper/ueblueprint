import Entity from "./Entity"

export default class LocalizedTextEntity extends Entity {

    static attributes = {
        namespace: "",
        key: "",
        value: ""
    }

    getAttributes() {
        return LocalizedTextEntity.attributes
    }

}