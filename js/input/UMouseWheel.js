export default class UMouseWheel {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../UEBlueprint").default} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options) {
        this.target = target
        this.blueprint = blueprint
        this.looseTarget = options?.looseTarget ?? true
        this.movementSpace = this.blueprint?.getGridDOMElement() ?? document
        let self = this

        this.mouseWheelHandler = function (e) {
            e.preventDefault()
            if (!self.looseTarget && e.target != e.currentTarget) {
                return
            }
            let scaleCorrection = 1 / self.blueprint.getScale()
            let offset = [e.offsetX, e.offsetY]
            if (self.looseTarget) {
                /*
                 * Compensating for having used the mouse wheel over a descendant of the target (the element listened for the 'wheel' event).
                 * We are interested to get the location relative to the listened target, not the descendant target that caused the event.
                 */
                const targetOffset = e.target.getBoundingClientRect()
                const currentTargetOffset = e.currentTarget.getBoundingClientRect()
                offset = [
                    offset[0] + targetOffset.x * scaleCorrection - currentTargetOffset.x * scaleCorrection,
                    offset[1] + targetOffset.y * scaleCorrection - currentTargetOffset.y * scaleCorrection
                ]
            }
            self.wheel(Math.sign(e.deltaY), offset)
        }

        this.movementSpace.addEventListener('wheel', this.mouseWheelHandler, false)
        // Prevent movement space from being scrolled
        this.movementSpace.parentElement?.addEventListener('wheel', e => e.preventDefault())
    }

    /* Subclasses will override the following method */
    wheel(location, variation) {

    }
}