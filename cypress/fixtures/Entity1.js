import IEntity from "../../js/entity/IEntity.js"

export default class Entity1 extends IEntity {

    static attributes = {
        a: {
            type: Number,
            default: 8,
        },
        b: {
            type: Number,
            default: 9,
        },
    }

    constructor(values = {}) {
        super(values)
    }
}
