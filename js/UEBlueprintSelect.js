export default class UEBlueprintSelect {
    constructor(blueprintNode, options) {
        /** @type {import("./UEBlueprint.js").default;}" */
        this.blueprintNode = blueprintNode;
        this.mousePosition = [0, 0];
        this.clickButton = options?.clickButton ?? 0
        this.exitSelectAnyButton = options?.exitSelectAnyButton ?? true
        let self = this

        this.mouseDownHandler = function (e) {
            switch (e.button) {
                case self.clickButton:
                    self.clicked([e.offsetX, e.offsetY])
                    break
                default:
                    if (!self.exitSelectAnyButton) {
                        self.mouseUpHandler(e)
                    }
                    break
            }
        }

        this.mouseMoveHandler = function (e) {
            e.preventDefault()
            let scaleCorrection = 1 / self.blueprintNode.getScale()
            const targetOffset = e.target.getBoundingClientRect()
            const currentTargetOffset = e.currentTarget.getBoundingClientRect()
            let offset = [
                e.offsetX + targetOffset.x * scaleCorrection - currentTargetOffset.x * scaleCorrection,
                e.offsetY + targetOffset.y * scaleCorrection - currentTargetOffset.y * scaleCorrection
            ]
            self.blueprintNode.doSelecting(offset)
        }

        this.mouseUpHandler = function (e) {
            if (!self.exitSelectAnyButton || e.button == self.clickButton) {
                // Remove the handlers of `mousemove` and `mouseup`
                self.blueprintNode.getGridDOMElement().removeEventListener('mousemove', self.mouseMoveHandler)
                document.removeEventListener('mouseup', self.mouseUpHandler)
            }
        }

        let gridElement = this.blueprintNode.getGridDOMElement()
        gridElement.addEventListener('mousedown', this.mouseDownHandler)
        gridElement.addEventListener('contextmenu', e => e.preventDefault())
    }

    unlistenDOMElement() {
        this.blueprintNode.removeEventListener('mousedown', this.mouseDownHandler)
    }

    clicked(position) {
        // Attach the listeners to `document`
        this.blueprintNode.getGridDOMElement().addEventListener('mousemove', this.mouseMoveHandler)
        document.addEventListener('mouseup', this.mouseUpHandler)
        // Start selecting
        this.blueprintNode.startSelecting(position)
    }
}