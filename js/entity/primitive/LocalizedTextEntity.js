import Primitive from "./Primitive"

export default class LocalizedTextEntity extends Primitive {

    /**
     * 
     * @param {String} namespace 
     * @param {String} key 
     * @param {String} value 
     */
    constructor(namespace, key, value) {
        super()
        this.namespace = namespace
        this.key = key
        this.value = value
    }

    toString() {
        "NSLOCTEXT(" + `"${this.namespace}"` + ", " + `"${this.key}"` + ", " + `"${this.value}"` + ")"
    }

}