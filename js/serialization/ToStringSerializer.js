import GeneralSerializer from "./GeneralSerializer"

export default class ToStringSerializer extends GeneralSerializer {

    constructor(entityType) {
        super(undefined, entityType)
    }

    write(object) {
        let result = object.toString()
        return result
    }
}
