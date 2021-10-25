import Primitive from "./Primitive"

export default class ObjectReference extends Primitive {

    /**
     * 
     * @param {String} type 
     * @param {String} path 
     */
    constructor(type, path) {
        super()
        this.type = type
        this.path = path
    }

    toString() {
        return (this.type ?? "") + (
            this.path
                ? this.type ? `'"${this.path}"'` : this.path
                : ""
        )
    }
}