import IEntity from "./IEntity.js"

export default class IPrintableEntity extends IEntity {

    print() {
        return this.toString()
    }
}
