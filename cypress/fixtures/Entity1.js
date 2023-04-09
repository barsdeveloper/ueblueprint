import IEntity from "../../js/entity/IEntity.js"

export default class Entity1 extends IEntity {

    static attributes = {
        a: {
            type: Number,
        },
        b: {
            type: Number,
        },
    }

    constructor(values = {}) {
        values.a ??= 8
        values.b ??= 9
        super(values)
    }
}
