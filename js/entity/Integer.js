import Entity from "./Entity"

export default class Integer extends Entity {
    constructor(value) {
        super()
        this.value = Math.round(new Number(value).valueOf())
    }
}