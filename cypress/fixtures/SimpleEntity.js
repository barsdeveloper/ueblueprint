import IEntity from "../../js/entity/IEntity"

export default class SimpleEntity extends IEntity {

    static attributes = {
        someNumber: 567,
        someString: "alpha",
        someString2: "beta",
        someBoolean: true,
        someBoolean2: false,
        someObjectString: new String("gamma"),
        someArray: [400, 500, 600, 700, 800],
        someSet: new Set([10, 20, 30, 40, 50, 60, 70]),
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
