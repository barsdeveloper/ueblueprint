import IEntity from "./IEntity"

export default class ObjectReferenceEntity extends IEntity {

    static attributes = {
        type: String,
        path: String
    }
}
