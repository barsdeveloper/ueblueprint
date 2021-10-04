import UPointing from "./UPointing"

export default class UMouseWheel extends UPointing {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../UEBlueprint").default} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options) {
        super(target, blueprint, options)
        this.looseTarget = options?.looseTarget ?? true
        let self = this

        this.mouseWheelHandler = function (e) {
            e.preventDefault()
            const location = self.getLocation(e)
            self.wheel(Math.sign(e.deltaY), location)
        }

        this.movementSpace.addEventListener('wheel', this.mouseWheelHandler, false)
        // Prevent movement space from being scrolled
        this.movementSpace.parentElement?.addEventListener('wheel', e => e.preventDefault())
    }

    /* Subclasses will override the following method */
    wheel(variation, location) {

    }
}