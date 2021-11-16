import GeneralSerializer from "./GeneralSerializer"

export default class CustomSerializer extends GeneralSerializer {

    constructor(objectWriter, entityType) {
        super(undefined, entityType)
        this.objectWriter = objectWriter
    }

    write(object) {
        let result = this.objectWriter(object)
        return result
    }
}