class UEBlueprintDrag {
    constructor(blueprintNode, options) {
        this.blueprintNode = blueprintNode;
        this.mousePosition = [0, 0];
        this.stepSize = options?.stepSize;
        this.clickButton = options?.clickButton ?? 0;
        this.exitGrabSameButtonOnly = options?.exitGrabSameButtonOnly ?? false;
        let self = this;
        this.mouseDownHandler = function (e) {
            switch (e.button) {
                case self.clickButton:
                    self.clicked(e.clientX, e.clientY);
                    break;
                default:
                    if (!self.exitGrabSameButtonOnly) {
                        self.mouseUpHandler(e);
                    }
                    break;
            }
        };
        this.mouseMoveHandler = function (e) {
            let mousePosition = self.snapToGrid(e.clientX, e.clientY);
            const d = [mousePosition[0] - self.mousePosition[0], mousePosition[1] - self.mousePosition[1]];

            if (d[0] == 0 && d[1] == 0) {
                return;
            }

            self.blueprintNode.addLocation(d);

            // Reassign the position of mouse
            self.mousePosition = mousePosition;
        };
        this.mouseUpHandler = function (e) {
            if (!self.exitGrabSameButtonOnly || e.button == self.clickButton) {
                // Remove the handlers of `mousemove` and `mouseup`
                document.removeEventListener('mousemove', self.mouseMoveHandler);
                document.removeEventListener('mouseup', self.mouseUpHandler);
            }
        };
        let element = this.blueprintNode;
        element.addEventListener('mousedown', this.mouseDownHandler);
        element.addEventListener('contextmenu', e => e.preventDefault());
    }

    unlistenDOMElement() {
        this.blueprintNode.removeEventListener('mousedown', this.mouseDownHandler);
    }

    snapToGrid(posX, posY) {
        return [
            this.stepSize * Math.round(posX / this.stepSize),
            this.stepSize * Math.round(posY / this.stepSize)
        ]
    }

    clicked(x, y) {
        if (!this.stepSize) {
            this.stepSize = parseInt(getComputedStyle(this.blueprintNode).getPropertyValue('--ueb-grid-snap'));
        }
        // Get the current mouse position
        this.mousePosition = this.snapToGrid(x, y);
        // Attach the listeners to `document`
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }
}

class UEBlueprintDragScroll extends UEBlueprintDrag {
    constructor(scrolledEntity, options) {
        super(scrolledEntity, options);
        this.minZoom = options?.minZoom ?? -12;
        let self = this;
        this.mouseMoveHandler = function (e) {
            let mousePosition = self.snapToGrid(e.clientX, e.clientY);

            // How far the mouse has been moved
            const dx = mousePosition[0] - self.mousePosition[0];
            const dy = mousePosition[1] - self.mousePosition[1];

            self.blueprintNode.scrollDelta([-dx, -dy]);

            // Reassign the position of mouse
            self.mousePosition = mousePosition;
        };
        this.mouseWheelHandler = function (e) {
            e.preventDefault();
            let zoomLevel = self.blueprintNode.getZoom();
            zoomLevel -= Math.sign(e.deltaY);
            self.blueprintNode.getScale();
            const targetOffset = e.target.getBoundingClientRect();
            const currentTargetOffset = e.currentTarget.getBoundingClientRect();
            let offset = [e.offsetX + targetOffset.x - currentTargetOffset.x, e.offsetY + targetOffset.y - currentTargetOffset.y];
            console.log([offset[0] - e.x, offset[1] - e.y]);
            self.blueprintNode.setZoom(zoomLevel, offset);

        };
        this.blueprintNode.getGridDOMElement().addEventListener('wheel', this.mouseWheelHandler, false);
        this.blueprintNode.getGridDOMElement().parentElement.addEventListener('wheel', e => e.preventDefault());
    }

    expandAndTranslate(x, y) {
        this.blueprintNode.expand(x, y);
        this.blueprintNode.translate(-x, -y);
    }

}

class UEBlueprint extends HTMLElement {

    header() {
        return `
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
        `
    }

    overlay() {
        return `
            <div class="ueb-viewport-overlay"></div>
        `
    }

    viewport() {
        return `
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x:${this.additional[0]}; --ueb-additional-y:${this.additional[1]}; --ueb-translate-x:${this.translateValue[0]}; --ueb-translate-y:${this.translateValue[1]}">
                    <div class="ueb-grid-content" data-nodes>
                    </div>
                </div>
            </div>
        `
    }

    insertChildren() {
        this.querySelector('[data-nodes]').append(...this.nodes);
    }

    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    constructor() {
        super();
        this.nodes = new Set();
        this.expandGridSize = 400;
        this.gridElement = null;
        this.viewportElement = null;
        this.overlayElement = null;
        this.dragObject = null;
        this.additional = /*[2 * this.expandGridSize, 2 * this.expandGridSize]*/[0, 0];
        this.translateValue = /*[this.expandGridSize, this.expandGridSize]*/[0, 0];
        this.zoom = 0;
        this.headerElement = null;
    }

    connectedCallback() {
        this.classList.add('ueb', `ueb-zoom-${this.zoom}`);
        let aDiv = document.createElement('div');
        // Add header
        aDiv.innerHTML = this.header();
        this.headerElement = aDiv.firstElementChild;
        this.appendChild(this.headerElement);

        // Add overlay
        aDiv.innerHTML = this.overlay();
        this.overlayElement = aDiv.firstElementChild;
        this.appendChild(this.overlayElement);

        // Add viewport
        aDiv.innerHTML = this.viewport();
        this.viewportElement = aDiv.firstElementChild;
        this.appendChild(this.viewportElement);

        this.gridElement = this.viewportElement.querySelector('.ueb-grid');
        this.insertChildren();

        this.dragObject = new UEBlueprintDragScroll(this, {
            'clickButton': 2,
            'stepSize': 1
        });
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dragObject.unlistenDOMElement();
    }

    setScroll(value, smooth = false) {
        this.scroll = value;
        if (!smooth) {
            this.viewportElement.scroll(value[0], value[1]);
        } else {
            this.viewportElement.scroll({
                left: value[0],
                top: value[1],
                behavior: 'smooth'
            });
        }
    }

    scrollDelta(delta, smooth = false) {
        const scrollMax = this.getScrollMax();
        let currentScroll = this.getScroll();
        let finalScroll = [
            currentScroll[0] + delta[0],
            currentScroll[1] + delta[1]
        ];
        let expand = [0, 0];
        for (let i = 0; i < 2; ++i) {
            if (delta[i] < 0 && finalScroll[i] < 0.25 * this.expandGridSize) {
                // Expand if scrolling is diminishing and the remainig space is less that a quarter of an expansion step
                expand[i] = finalScroll[i];
                if (expand[i] > 0) {
                    // Final scroll is still in rage (more than zero) but we want to expand to negative (left or top)
                    expand[i] = -this.expandGridSize;
                }
            } else if (delta[i] > 0 && finalScroll[i] > scrollMax[i] - 0.25 * this.expandGridSize) {
                // Expand if scrolling is increasing and the remainig space is less that a quarter of an expansion step
                expand[i] = finalScroll[i] - scrollMax[i];
                if (expand[i] < 0) {
                    // Final scroll is still in rage (less than the maximum scroll) but we want to expand to positive (right or bottom)
                    expand[i] = this.expandGridSize;
                }
            }
        }
        if (expand[0] != 0 || expand[1] != 0) {
            this.seamlessExpand(this.progressiveSnapToGrid(expand[0]), this.progressiveSnapToGrid(expand[1]));
            currentScroll = this.getScroll();
            finalScroll = [
                currentScroll[0] + delta[0],
                currentScroll[1] + delta[1]
            ];
        }
        this.setScroll(finalScroll, smooth);
    }

    getScroll() {
        return [this.viewportElement.scrollLeft, this.viewportElement.scrollTop]
    }

    scrollCenter() {
        const scroll = this.getScroll();
        const offset = [
            this.translateValue[0] - scroll[0],
            this.translateValue[1] - scroll[1]
        ];
        const targetOffset = this.getViewportSize().map(size => size / 2);
        const deltaOffset = [
            offset[0] - targetOffset[0],
            offset[1] - targetOffset[1]
        ];
        this.scrollDelta(deltaOffset, true);
    }

    getExpandGridSize() {
        return this.expandGridSize
    }

    getViewportSize() {
        return [
            this.viewportElement.clientWidth,
            this.viewportElement.clientHeight
        ]
    }

    /**
     * Get the scroll limits
     * @return {array} The horizonal and vertical maximum scroll limits
     */
    getScrollMax() {
        return [
            this.viewportElement.scrollWidth - this.viewportElement.clientWidth,
            this.viewportElement.scrollHeight - this.viewportElement.clientHeight
        ]
    }

    /**
     * Expand the grid, considers the absolute value of params
     * @param {number} x - Horizontal expansion value
     * @param {number} y - Vertical expansion value
     */
    _expand(x, y) {
        x = Math.round(Math.abs(x));
        y = Math.round(Math.abs(y));
        this.additional = [this.additional[0] + x, this.additional[1] + y];
        if (this.gridElement) {
            this.gridElement.style.setProperty('--ueb-additional-x', this.additional[0]);
            this.gridElement.style.setProperty('--ueb-additional-y', this.additional[1]);
        }
    }

    /**
     * Moves the content of the grid according to the coordinates
     * @param {number} x - Horizontal translation value
     * @param {number} y - Vertical translation value
     */
    _translate(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        this.translateValue = [this.translateValue[0] + x, this.translateValue[1] + y];
        if (this.gridElement) {
            this.gridElement.style.setProperty('--ueb-translate-x', this.translateValue[0]);
            this.gridElement.style.setProperty('--ueb-translate-y', this.translateValue[1]);
        }
    }

    /**
     * Expand the grind indefinitely, the content will remain into position
     * @param {number} x - Horizontal expand value (negative means left, positive means right)
     * @param {number} y - Vertical expand value (negative means top, positive means bottom)
     */
    seamlessExpand(x, y) {
        let scale = this.getScale();
        let scaledX = x / scale;
        let scaledY = y / scale;
        // First expand the grid to contain the additional space
        this._expand(scaledX, scaledY);
        // If the expansion is towards the left or top, then scroll back to give the illusion that the content is in the same position and translate it accordingly
        this._translate(scaledX < 0 ? -scaledX : 0, scaledY < 0 ? -scaledY : 0);
        if (x < 0) {
            this.viewportElement.scrollLeft -= x;
        }
        if (y < 0) {
            this.viewportElement.scrollTop -= y;
        }
    }

    progressiveSnapToGrid(x) {
        return this.expandGridSize * Math.round(x / this.expandGridSize + 0.5 * Math.sign(x))
    }

    getZoom() {
        return this.zoom
    }

    setZoom(zoom, center) {
        zoom = this.constructor.clamp(zoom, -12, 0);
        if (zoom == this.zoom) {
            return
        }
        let initialScale = this.getScale();
        this.classList.remove(`ueb-zoom-${this.zoom}`);
        this.classList.add(`ueb-zoom-${zoom}`);
        this.zoom = zoom;


        if (center) {

            let point = document.createElement('div');
            point.style.width = '2px';
            point.style.height = '2px';
            point.style.background = 'red';
            point.style.position = 'absolute';
            document.querySelector('.ueb-grid').appendChild(point);
            let relativeScale = this.getScale() / initialScale;
            let newCenter = [
                relativeScale * center[0],
                relativeScale * center[1]
            ];
            this.scrollDelta([
                (newCenter[0] - center[0]) * initialScale,
                (newCenter[1] - center[1]) * initialScale
            ]);
            point.style.left = `${center[0]}px`;
            point.style.top = `${center[1]}px`;
        }
    }

    getScale() {
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue('--ueb-grid-scale'))
    }

    addNode(...blueprintNodes) {
        [...blueprintNodes].reduce((s, e) => s.add(e), this.nodes);
        let nodesDestination = this.querySelector('[data-nodes]');
        if (nodesDestination) {
            nodesDestination.append(...blueprintNodes);
        }
    }
}

customElements.define('u-blueprint', UEBlueprint);

class UEBlueprintDraggableObject extends HTMLElement {

    constructor() {
        super();
        this.dragObject = null;
        this.location = [0, 0];
    }

    connectedCallback() {
        this.dragObject = new UEBlueprintDrag(this);
    }

    disconnectedCallback() {
        this.dragObject.unlistenDOMElement();
    }

    setLocation(value = [0, 0]) {
        this.location = value;
        this.style.setProperty('--ueb-position-x', this.location[0]);
        this.style.setProperty('--ueb-position-y', this.location[1]);
    }

    addLocation(value) {
        this.setLocation([this.location[0] + value[0], this.location[1] + value[1]]);
    }

    getLocation() {
        return this.location
    }

}

class UEBlueprintObject extends UEBlueprintDraggableObject {
    static classInputs = [/*
        {
            name: "Input Example",
            type: 'integer'
        }
    */]
    static classOutputs = [/*
        {
            name: "Return Value",
            type: 'string'
        }*/
    ]
    static classInFlow = false
    static classOutFlow = false
    static className = 'Empty node'

    header() {
        return `
            <div class="ueb-node-header">
                <span class="ueb-node-name">
                    <span class="ueb-node-symbol"></span>
                    <span class="ueb-node-text">${this.constructor.className}</span>
                </span>
            </div>
        `
    }

    body() {
        return `
            <div class="ueb-node-body">
                <div class="ueb-node-inputs">
                    ${this.constructor.classInputs.forEach((input, index) => `
                    <div class="ueb-node-input ueb-node-value-${input.type}">
                        <span class="ueb-node-value-icon ${this.inputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                        ${input.name}
                    </div>
                    `) ?? ''}
                </div>
                <div class="ueb-node-outputs">
                    ${this.constructor.classOutputs.forEach((output, index) => `
                    <div class="ueb-node-output ueb-node-value-${output.type}">
                        ${output.name}
                        <span class="ueb-node-value-icon ${this.outputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                    </div>
                    `) ?? ''}
                </div>
            </div>
        `
    }

    render() {
        return `
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    ${this.header()}
                    ${this.body()}
                </div>
            </div>
`
    }

    constructor() {
        super();
        this.selected = false;
        this.inputs = this.constructor.classInputs.map(value => {
            return {
                connected: null
            }
        });
        this.outputs = this.constructor.classOutputs.map(value => {
            return {
                connected: null
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('ueb-node');
        if (this.selected) {
            this.classList.add('ueb-selected');
        }
        this.style.setProperty('--ueb-position-x', this.location[0]);
        this.style.setProperty('--ueb-position-y', this.location[1]);

        let aDiv = document.createElement('div');
        aDiv.innerHTML = this.render();
        this.appendChild(aDiv.firstElementChild);
    }

    isSelected() {
        return this.selected
    }

    setSelected(value = true) {
        this.selected = value;
    }
}

customElements.define('u-object', UEBlueprintObject);

export { UEBlueprint, UEBlueprintObject };
