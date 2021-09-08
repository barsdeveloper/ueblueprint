export default class UEBlueprintSelect {
    constructor(blueprintNode, options) {
        this.blueprintNode = blueprintNode;
        this.mousePosition = [0, 0];
        this.clickButton = options?.clickButton ?? 0
        this.exitSelectAnyButton = options?.exitSelectAnyButton ?? true
        let self = this;
        this.mouseDownHandler = function (e) {
            switch (e.button) {
                case self.clickButton:
                    self.clicked(e.clientX, e.clientY)
                    break
                default:
                    if (!self.exitSelectAnyButton) {
                        self.mouseUpHandler(e)
                    }
                    break
            }
        };
        this.mouseMoveHandler = function (e) {
            self.blueprintNode.doSelecting(e.clientX, e.clientY)
        }
        this.mouseUpHandler = function (e) {
            if (!self.exitSelectAnyButton || e.button == self.clickButton) {
                // Remove the handlers of `mousemove` and `mouseup`
                document.removeEventListener('mousemove', self.mouseMoveHandler)
                document.removeEventListener('mouseup', self.mouseUpHandler)
            }
        }
        this.blueprintNode.addEventListener('mousedown', this.mouseDownHandler)
        this.blueprintNode.addEventListener('contextmenu', e => e.preventDefault())
    }

    unlistenDOMElement() {
        this.blueprintNode.removeEventListener('mousedown', this.mouseDownHandler)
    }

    clicked(x, y) {
        // Attach the listeners to `document`
        document.addEventListener('mousemove', this.mouseMoveHandler)
        document.addEventListener('mouseup', this.mouseUpHandler)
        // Start selecting
        this.blueprintNode.startSelecting(x, y)
    }
}