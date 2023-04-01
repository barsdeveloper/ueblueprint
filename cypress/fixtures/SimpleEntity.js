import IEntity from "../../js/entity/IEntity"

export default class SimpleEntity extends IEntity {

    static attributes = {
        someNumber: {
            default: 567,
        },
        someString: {
            default: "alpha",
        },
        someString2: {
            default: "beta",
        },
        someBoolean: {
            default: true,
        },
        someBoolean2: {
            default: false,
        },
        someObjectString: {
            default: new String("gamma"),
        },
        someArray: {
            default: [400, 500, 600, 700, 800],
        },
        someSet: {
            default: new Set([10, 20, 30, 40, 50, 60, 70]),
        },
    }

    static {
        this.cleanupAttributes(this.attributes)
    }
}
