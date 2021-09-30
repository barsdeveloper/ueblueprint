class Utility {
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }
}

class UEBlueprintDrag {
    constructor(blueprintNode, options) {
        this.blueprintNode = blueprintNode;
        this.mousePosition = [0, 0];
        this.stepSize = options?.stepSize;
        this.clickButton = options?.clickButton ?? 0;
        this.exitDragAnyButton = options?.exitDragAnyButton ?? true;
        let self = this;
        this.mouseDownHandler = function (e) {
            switch (e.button) {
                case self.clickButton:
                    self.clicked(e.clientX, e.clientY);
                    break;
                default:
                    if (!self.exitDragAnyButton) {
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
            if (!self.exitDragAnyButton || e.button == self.clickButton) {
                // Remove the handlers of `mousemove` and `mouseup`
                document.removeEventListener('mousemove', self.mouseMoveHandler);
                document.removeEventListener('mouseup', self.mouseUpHandler);
            }
        };
        this.blueprintNode.addEventListener('mousedown', this.mouseDownHandler);
        this.blueprintNode.addEventListener('contextmenu', e => e.preventDefault());
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
            let scaleCorrection = 1 / self.blueprintNode.getScale();
            const targetOffset = e.target.getBoundingClientRect();
            const currentTargetOffset = e.currentTarget.getBoundingClientRect();
            let offset = [
                e.offsetX + targetOffset.x * scaleCorrection - currentTargetOffset.x * scaleCorrection,
                e.offsetY + targetOffset.y * scaleCorrection - currentTargetOffset.y * scaleCorrection
            ];
            self.blueprintNode.setZoom(zoomLevel, offset);
        };

        this.blueprintNode.getGridDOMElement().addEventListener('wheel', this.mouseWheelHandler, false);
        this.blueprintNode.getGridDOMElement().parentElement.addEventListener('wheel', e => e.preventDefault());
    }

}

class UEBlueprintSelect {
    constructor(blueprintNode, options) {
        /** @type {import("./UEBlueprint.js").default;}" */
        this.blueprintNode = blueprintNode;
        this.mousePosition = [0, 0];
        this.clickButton = options?.clickButton ?? 0;
        this.exitSelectAnyButton = options?.exitSelectAnyButton ?? true;
        let self = this;

        this.mouseDownHandler = function (e) {
            switch (e.button) {
                case self.clickButton:
                    self.clicked([e.offsetX, e.offsetY]);
                    break
                default:
                    if (!self.exitSelectAnyButton) {
                        self.mouseUpHandler(e);
                    }
                    break
            }
        };

        this.mouseMoveHandler = function (e) {
            e.preventDefault();
            let scaleCorrection = 1 / self.blueprintNode.getScale();
            const targetOffset = e.target.getBoundingClientRect();
            const currentTargetOffset = e.currentTarget.getBoundingClientRect();
            let offset = [
                e.offsetX + targetOffset.x * scaleCorrection - currentTargetOffset.x * scaleCorrection,
                e.offsetY + targetOffset.y * scaleCorrection - currentTargetOffset.y * scaleCorrection
            ];
            self.blueprintNode.doSelecting(offset);
        };

        this.mouseUpHandler = function (e) {
            if (!self.exitSelectAnyButton || e.button == self.clickButton) {
                // Remove the handlers of `mousemove` and `mouseup`
                self.blueprintNode.getGridDOMElement().removeEventListener('mousemove', self.mouseMoveHandler);
                self.blueprintNode.finishSelecting();
                document.removeEventListener('mouseup', self.mouseUpHandler);
            }
        };

        let gridElement = this.blueprintNode.getGridDOMElement();
        gridElement.addEventListener('mousedown', this.mouseDownHandler);
        gridElement.addEventListener('contextmenu', e => e.preventDefault());
    }

    unlistenDOMElement() {
        this.blueprintNode.removeEventListener('mousedown', this.mouseDownHandler);
    }

    clicked(position) {
        // Attach the listeners to `document`
        this.blueprintNode.getGridDOMElement().addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
        // Start selecting
        this.blueprintNode.startSelecting(position);
    }
}

class OrderedIndexArray {

    /**
     * @param {(arrayElement: number) => number} compareFunction A function that, given acouple of elements of the array telles what order are they on.
     * @param {(number|array)} value Initial length or array to copy from
     */
    constructor(comparisonValueSupplier = (a) => a, value = null) {
        this.array = new Uint32Array(value);
        this.comparisonValueSupplier = comparisonValueSupplier;
        this.length = 0;
        this.current = 0;
    }

    /**
     * 
     * @param {number} index The index of the value to return
     * @returns The element of the array
     */
    get(index) {
        return this.array[index]
    }

    /**
     * Returns the array used by this object.
     * @returns The array.
     */
    getArray() {
        return this.array
    }

    /**
     * Get the position that the value supplied should (or does) occupy in the aray.
     * @param {number} value The value to look for (it doesn't have to be part of the array).
     * @returns The position index.
     */
    getPosition(value) {
        let l = 0;
        let r = this.array.length;
        while (l < r) {
            let m = Math.floor((l + r) / 2);
            if (this.comparisonValueSupplier(this.array[m]) < value) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l
    }

    currentIsInside() {
        return this.current > 0 && this.current < this.array.length
    }

    /** 
     * Inserts the element in the array.
     * @param array {number[]} The array to insert into.
     * @param value {number} The value to insert into the array.
     * @returns {number} The position into occupied by value into the array.
     */
    insert(element, comparisonValue = null) {
        let position = this.getPosition(element);
        if (position < this.current || comparisonValue != null && position == this.current && this.comparisonValueSupplier(element) < comparisonValue) {
            ++this.current;
        }
        let newArray = new Uint32Array(this.array.length + 1);
        newArray.set(this.array.subarray(0, position), 0);
        newArray[position] = element;
        newArray.set(this.array.subarray(position), position + 1);
        this.array = newArray;
        this.length = this.array.length;
        return position
    }

    /**
     * Removes the element from the array.
     * @param {number} value The value of the element to be remove.
     */
    remove(element) {
        let position = this.getPosition(element);
        if (this.array[position] == element) {
            this.removeAt(position);
        }
    }

    /**
     * Removes the element into the specified position from the array.
     * @param {number} position The index of the element to be remove.
     */
    removeAt(position) {
        if (position < this.current) {
            --this.current;
        }
        let newArray = new Uint32Array(this.array.length - 1);
        newArray.set(this.array.subarray(0, position), 0);
        newArray.set(this.array.subarray(position + 1), position);
        this.array = newArray;
        this.length = this.array.length;
    }

    getNext() {
        if (this.current >= 0 && this.current < this.array.length) {
            return this.comparisonValueSupplier(this.get(this.current))
        } else {
            return Number.MAX_SAFE_INTEGER
        }
    }

    getPrev() {
        if (this.current > 0) {
            return this.comparisonValueSupplier(this.get(this.current - 1))
        } else {
            return Number.MIN_SAFE_INTEGER
        }
    }
}

class SelectionModel {

    /**
     * @typedef {{
     *      primaryInf: number,
     *      primarySup: number,
     *      secondaryInf: number,
     *      secondarySup: number
     * }} BoundariesInfo
     * @typedef {{
     *      primaryBoundary: number,
     *      secondaryBoundary: number,
     *      insertionPosition: number,
     *      rectangle: number
     *      onSecondaryAxis: Boolean
     * }} Metadata
     * @typedef {numeric} Rectangle
     * @param {number[]} initialPosition Coordinates of the starting point of selection [primaryAxisValue, secondaryAxisValue].
     * @param {Rectangle[]} rectangles Rectangles that can be selected by this object.
     * @param {(rect: Rectangle) => BoundariesInfo} boundariesFunc A function that, given a rectangle, it provides the boundaries of such rectangle.
     * @param {(rect: Rectangle, selected: bool) => void} selectToggleFunction A function that selects or deselects individual rectangles.
     */
    constructor(initialPosition, rectangles, boundariesFunc, selectToggleFunction) {
        this.initialPosition = initialPosition;
        this.finalPosition = initialPosition;
        /** @type Metadata[] */
        this.metadata = new Array(rectangles.length);
        this.primaryOrder = new OrderedIndexArray((element) => this.metadata[element].primaryBoundary);
        this.secondaryOrder = new OrderedIndexArray((element) => this.metadata[element].secondaryBoundary);
        this.selectToggleFunction = selectToggleFunction;
        this.rectangles = rectangles;
        rectangles.forEach((rect, index) => {
            /** @type Metadata */
            let rectangleMetadata = {
                primaryBoundary: this.initialPosition[0],
                secondaryBoundary: this.initialPosition[1],
                rectangle: index, // used to move both directions inside the this.metadata array
                onSecondaryAxis: false
            };
            selectToggleFunction(rect, false); // Initially deselected (Eventually)
            const rectangleBoundaries = boundariesFunc(rect);
            if (this.initialPosition[0] < rectangleBoundaries.primaryInf) { // Initial position is before the rectangle
                rectangleMetadata.primaryBoundary = rectangleBoundaries.primaryInf;
                this.primaryOrder.insert(index);
            } else if (rectangleBoundaries.primarySup < this.initialPosition[0]) { // Initial position is after the rectangle
                rectangleMetadata.primaryBoundary = rectangleBoundaries.primarySup;
                this.primaryOrder.insert(index);
            } else { // Initial lays inside the rectangle (considering just this axis)
                // Secondary order depends on primary order, if primary boundaries are not satisfied, the element is not watched for secondary ones
                if (rectangleBoundaries.secondarySup < this.initialPosition[1] || this.initialPosition[1] < rectangleBoundaries.secondaryInf) {
                    this.secondaryOrder.insert(index);
                } else {
                    selectToggleFunction(rect, true);
                }
            }
            if (this.initialPosition[1] < rectangleBoundaries.secondaryInf) { // Initial position is before the rectangle
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondaryInf;
            } else if (rectangleBoundaries.secondarySup < this.initialPosition[1]) { // Initial position is after the rectangle
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondarySup;
            } else {
                rectangleMetadata.onSecondaryAxis = true;
            }
            this.metadata[index] = rectangleMetadata;
        });
        this.primaryOrder.current = this.primaryOrder.getPosition(this.initialPosition[0]);
        this.secondaryOrder.current = this.secondaryOrder.getPosition(this.initialPosition[1]);
        this.computeBoundaries(this.initialPosition);
    }

    computeBoundaries() {
        this.boundaries = {
            // Primary axis negative direction 
            primaryN: {
                'value': this.primaryOrder.getPrev(),
                'index': this.primaryOrder.current - 1
            },
            primaryP: {
                'value': this.primaryOrder.getNext(),
                'index': this.primaryOrder.current
            },
            // Secondary axis negative direction
            secondaryN: {
                'value': this.secondaryOrder.getPrev(),
                'index': this.secondaryOrder.current - 1
            },
            // Secondary axis positive direction
            secondaryP: {
                'value': this.secondaryOrder.getNext(),
                'index': this.secondaryOrder.current
            }
        };
    }

    selectTo(finalPosition) {
        const primaryBoundaryCrossed = (index, extended) => {
            if (extended) {
                this.primaryOrder.current += Math.sign(finalPosition[0] - this.initialPosition[0]);
                if (this.metadata[index].onSecondaryAxis) {
                    this.selectToggleFunction(this.rectangles[index], true);
                } else {
                    this.secondaryOrder.insert(index, this.initialPosition[1]);
                }
            } else {
                this.primaryOrder.current -= Math.sign(finalPosition[0] - this.initialPosition[0]);
                this.secondaryOrder.remove(index);
                this.selectToggleFunction(this.rectangles[index], false);
            }
            this.computeBoundaries(finalPosition);
            this.selectTo(finalPosition);
        };

        if (finalPosition[0] < this.boundaries.primaryN.value) {
            primaryBoundaryCrossed(this.boundaries.primaryN.index, finalPosition[0] < this.initialPosition[0]);
        } else if (finalPosition[0] > this.boundaries.primaryP.value) {
            primaryBoundaryCrossed(this.boundaries.primaryP.index, this.initialPosition[0] < finalPosition[0]);
        }


        const secondaryBoundaryCrossed = (index, extended) => {
            if (extended) {
                this.secondaryOrder.current += Math.sign(finalPosition[1] - this.initialPosition[1]);
            } else {
                this.secondaryOrder.current -= Math.sign(finalPosition[1] - this.initialPosition[1]);
            }
            this.selectToggleFunction(this.rectangles[index], extended);
            this.computeBoundaries(finalPosition);
            this.selectTo(finalPosition);
        };

        if (finalPosition[1] < this.boundaries.secondaryN.value) {
            secondaryBoundaryCrossed(this.boundaries.secondaryN.index, finalPosition[1] < this.initialPosition[1]);
        } else if (finalPosition[1] > this.boundaries.secondaryP.value) {
            secondaryBoundaryCrossed(this.boundaries.secondaryP.index, this.initialPosition[1] < finalPosition[1]);
        }
        this.finalPosition = finalPosition;
    }

}

/**
 * @typedef {import("./UEBlueprintObject.js").default} UEBlueprintObject
 */
class UEBlueprint extends HTMLElement {

    headerTemplate() {
        return `
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
        `
    }

    overlayTemplate() {
        return `
            <div class="ueb-viewport-overlay"></div>
        `
    }

    viewportTemplate() {
        return `
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x:${this.additional[0]}; --ueb-additional-y:${this.additional[1]}; --ueb-translate-x:${this.translateValue[0]}; --ueb-translate-y:${this.translateValue[1]}">
                    <div class="ueb-grid-content" data-nodes>
                        <div class="ueb-selector" data-selecting="false"></div>
                    </div>
                </div>
            </div>
        `
    }

    static getElement(template) {
        let div = document.createElement('div');
        div.innerHTML = template;
        return div.firstElementChild
    }

    insertChildren() {
        this.querySelector('[data-nodes]').append(...this.nodes);
    }

    constructor() {
        super();
        /** @type {UEBlueprintObject[]}" */
        this.nodes = new Array();
        this.expandGridSize = 400;
        /** @type {HTMLElement} */
        this.gridElement = null;
        /** @type {HTMLElement} */
        this.viewportElement = null;
        /** @type {HTMLElement} */
        this.overlayElement = null;
        /** @type {HTMLElement} */
        this.selectorElement = null;
        /** @type {HTMLElement} */
        this.nodesContainerElement = null;
        /** @type {IntersectionObserver} */
        this.selectorObserver = null;
        this.dragObject = null;
        this.selectObject = null;
        /** @type {Array<number>} */
        this.additional = /*[2 * this.expandGridSize, 2 * this.expandGridSize]*/[0, 0];
        /** @type {Array<number>} */
        this.translateValue = /*[this.expandGridSize, this.expandGridSize]*/[0, 0];
        /** @type {number} */
        this.zoom = 0;
        /** @type {HTMLElement} */
        this.headerElement = null;
        /** @type {SelectionModel} */
        this.selectionModel = null;
        /** @type {(node: UEBlueprintObject) => BoundariesInfo} */
        this.nodeBoundariesSupplier = (node) => {
            let rect = node.getBoundingClientRect();
            let gridRect = this.nodesContainerElement.getBoundingClientRect();
            return {
                primaryInf: rect.left - gridRect.left,
                primarySup: rect.right - gridRect.right,
                // Counter intuitive here: the y (secondary axis is positive towards the bottom, therefore upper bound "sup" is bottom)
                secondaryInf: rect.top - gridRect.top,
                secondarySup: rect.bottom - gridRect.bottom
            }
        };
        /** @type {(node: UEBlueprintObject, selected: bool) => void}} */
        this.nodeSelectToggleFunction = (node, selected) => {
            node.setSelected(selected);
        };
    }

    connectedCallback() {
        this.classList.add('ueb', `ueb-zoom-${this.zoom}`);

        this.headerElement = this.constructor.getElement(this.headerTemplate());
        this.appendChild(this.headerElement);
        this.overlayElement = this.constructor.getElement(this.overlayTemplate());
        this.appendChild(this.overlayElement);
        this.viewportElement = this.constructor.getElement(this.viewportTemplate());
        this.appendChild(this.viewportElement);
        this.gridElement = this.viewportElement.querySelector('.ueb-grid');
        this.selectorElement = this.viewportElement.querySelector('.ueb-selector');
        this.nodesContainerElement = this.querySelector('[data-nodes]');
        this.insertChildren();

        this.selectorObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.map(entry => {
                    /** @type {import("./UEBlueprintObject.js").default;}" */
                    let target = entry.target;
                    target.setSelected(entry.isIntersecting);
                });
            }, {
            threshold: [0.01],
            root: this.selectorElement
        });
        this.nodes.forEach(element => this.selectorObserver.observe(element));

        this.dragObject = new UEBlueprintDragScroll(this, {
            'clickButton': 2,
            'stepSize': 1,
            'exitDragAnyButton': false
        });

        this.selectObject = new UEBlueprintSelect(this, {
            'clickButton': 0,
            'exitSelectAnyButton': true
        });
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dragObject.unlistenDOMElement();
        this.selectObject.unlistenDOMElement();
    }

    getScroll() {
        return [this.viewportElement.scrollLeft, this.viewportElement.scrollTop]
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
        zoom = Utility.clamp(zoom, -12, 0);
        if (zoom == this.zoom) {
            return
        }
        let initialScale = this.getScale();
        this.classList.remove(`ueb-zoom-${this.zoom}`);
        this.classList.add(`ueb-zoom-${zoom}`);
        this.zoom = zoom;


        if (center) {
            let relativeScale = this.getScale() / initialScale;
            let newCenter = [
                relativeScale * center[0],
                relativeScale * center[1]
            ];
            this.scrollDelta([
                (newCenter[0] - center[0]) * initialScale,
                (newCenter[1] - center[1]) * initialScale
            ]);
        }
    }

    getScale() {
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue('--ueb-grid-scale'))
    }

    compensateTranslation(position) {
        position[0] -= this.translateValue[0];
        position[1] -= this.translateValue[1];
        return position
    }

    /**
     * Create a selection rectangle starting from the specified position
     * @param {number[]} initialPosition - Selection rectangle initial position (relative to the .ueb-grid element)
     */
    startSelecting(initialPosition) {
        initialPosition = this.compensateTranslation(initialPosition);
        // Set initial position
        this.selectorElement.style.setProperty('--ueb-select-from-x', initialPosition[0]);
        this.selectorElement.style.setProperty('--ueb-select-from-y', initialPosition[1]);
        // Final position coincide with the initial position, at the beginning of selection
        this.selectorElement.style.setProperty('--ueb-select-to-x', initialPosition[0]);
        this.selectorElement.style.setProperty('--ueb-select-to-y', initialPosition[1]);
        this.selectorElement.dataset.selecting = "true";
        this.selectionModel = new SelectionModel(initialPosition, this.nodes, this.nodeBoundariesSupplier, this.nodeSelectToggleFunction);
    }

    finishSelecting() {
        this.selectorElement.dataset.selecting = "false";
        this.selectionModel = null;
    }

    /**
     * Move selection rectagle to the specified final position. The initial position was specified by startSelecting()
     * @param {number[]} finalPosition - Selection rectangle final position (relative to the .ueb-grid element)
     */
    doSelecting(finalPosition) {
        finalPosition = this.compensateTranslation(finalPosition);
        this.selectorElement.style.setProperty('--ueb-select-to-x', finalPosition[0]);
        this.selectorElement.style.setProperty('--ueb-select-to-y', finalPosition[1]);
        this.selectionModel.selectTo(finalPosition);
    }

    /**
     * 
     * @param  {...UEBlueprintObject} blueprintNodes 
     */
    addNode(...blueprintNodes) {
        [...blueprintNodes].reduce((s, e) => s.push(e), this.nodes);
        if (this.nodesContainerElement) {
            this.nodesContainerElement.append(...blueprintNodes);
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
        if (value) {
            this.classList.add('ueb-selected');
        } else {
            this.classList.remove('ueb-selected');
        }
    }
}

customElements.define('u-object', UEBlueprintObject);

export { UEBlueprint, UEBlueprintObject };
