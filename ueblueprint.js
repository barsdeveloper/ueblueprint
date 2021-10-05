class Utility {
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    static getScale(element) {
        return getComputedStyle(element).getPropertyValue('--ueb-scale')
    }
}

class UPointing {

    constructor(target, blueprint, options) {
        /** @type {HTMLElement} */
        this.target = target;
        /** @type {import("../UEBlueprint").default}" */
        this.blueprint = blueprint;
        this.movementSpace = this.blueprint?.getGridDOMElement() ?? document.documentElement;
    }

    getLocation(mouseEvent) {
        const scaleCorrection = 1 / Utility.getScale(this.target);
        const targetOffset = this.movementSpace.getBoundingClientRect();
        let location = [
            (mouseEvent.clientX - targetOffset.x) * scaleCorrection,
            (mouseEvent.clientY - targetOffset.y) * scaleCorrection
        ];
        return location
    }
}

/**
 * This class manages the ui gesture of mouse click and drag. Tha actual operations are implemented by the subclasses.
 */
class UMouseClickDrag extends UPointing {
    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.clickButton = options?.clickButton ?? 0;
        this.exitAnyButton = options?.exitAnyButton ?? true;
        this.moveEverywhere = options?.moveEverywhere ?? false;
        this.looseTarget = options?.looseTarget ?? false;
        this.started = false;
        this.clickedPosition = [0, 0];
        const movementListenedElement = this.moveEverywhere ? document.documentElement : this.movementSpace;
        let self = this;

        this.mouseDownHandler = function (e) {
            switch (e.button) {
                case self.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.looseTarget || e.target == e.currentTarget) {
                        e.stopPropagation();
                        self.started = false;
                        // Attach the listeners
                        movementListenedElement.addEventListener('mousemove', self.mouseStartedMovingHandler);
                        document.addEventListener('mouseup', self.mouseUpHandler);
                        self.clickedPosition = self.getLocation(e);
                        self.clicked(self.clickedPosition);
                    }
                    break
                default:
                    if (!self.exitAnyButton) {
                        self.mouseUpHandler(e);
                    }
                    break
            }
        };

        this.mouseStartedMovingHandler = function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Delegate from now on to self.mouseMoveHandler
            movementListenedElement.removeEventListener('mousemove', self.mouseStartedMovingHandler);
            movementListenedElement.addEventListener('mousemove', self.mouseMoveHandler);

            // Do actual actions
            self.startDrag();
            self.started = true;
        };

        this.mouseMoveHandler = function (e) {
            e.preventDefault();
            e.stopPropagation();
            const location = self.getLocation(e);
            const movement = [e.movementX, e.movementY];
            self.dragTo(location, movement);
        };

        this.mouseUpHandler = function (e) {
            if (!self.exitAnyButton || e.button == self.clickButton) {
                // Remove the handlers of "mousemove" and "mouseup"
                movementListenedElement.removeEventListener('mousemove', self.mouseStartedMovingHandler);
                movementListenedElement.removeEventListener('mousemove', self.mouseMoveHandler);
                document.removeEventListener('mouseup', self.mouseUpHandler);
                self.endDrag();
            }
        };

        this.target.addEventListener('mousedown', this.mouseDownHandler);
        if (this.clickButton == 2) {
            this.target.addEventListener('contextmenu', this.preventDefault);
        }
    }

    preventDefault(e) {
        e.preventDefault();
    }

    unlistenDOMElement() {
        this.target.removeEventListener('mousedown', this.mouseDownHandler);
        if (this.clickButton == 2) {
            this.target.removeEventListener('contextmenu', this.preventDefault);
        }
    }

    /* Subclasses will override the following methods */
    clicked(location) {
    }

    startDrag() {
    }

    dragTo(location, movement) {
    }

    endDrag() {
    }
}

class UDragScroll extends UMouseClickDrag {

    dragTo(location, movement) {
        this.blueprint.scrollDelta([-movement[0], -movement[1]]);
    }

}

class USelect extends UMouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.stepSize = options?.stepSize;
        this.mousePosition = [0, 0];
    }

    startDrag() {
        this.blueprint.startSelecting(this.clickedPosition);
    }

    dragTo(location, movement) {
        this.blueprint.doSelecting(location);
    }

    endDrag() {
        if (this.started) {
            this.blueprint.finishSelecting();
        } else {
            this.blueprint.unselectAll();
        }
    }
}

class UMouseWheel extends UPointing {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../UEBlueprint").default} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.looseTarget = options?.looseTarget ?? true;
        let self = this;

        this.mouseWheelHandler = function (e) {
            e.preventDefault();
            const location = self.getLocation(e);
            self.wheel(Math.sign(e.deltaY), location);
        };

        this.movementSpace.addEventListener('wheel', this.mouseWheelHandler, false);
        // Prevent movement space from being scrolled
        this.movementSpace.parentElement?.addEventListener('wheel', e => e.preventDefault());
    }

    /* Subclasses will override the following method */
    wheel(variation, location) {

    }
}

class UZoom extends UMouseWheel {
    wheel(variation, location) {
        let zoomLevel = this.blueprint.getZoom();
        zoomLevel -= variation;
        this.blueprint.setZoom(zoomLevel, location);
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
        this.currentPosition = 0;
    }

    /**
     * 
     * @param {number} index The index of the value to return
     * @returns The element of the array
     */
    get(index) {
        if (index >= 0 && index < this.length) {
            return this.array[index]
        }
        return null
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
        let r = this.length;
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

    reserve(length) {
        if (this.array.length < length) {
            let newArray = new Uint32Array(length);
            newArray.set(this.array);
            this.array = newArray;
        }
    }

    /** 
     * Inserts the element in the array.
     * @param element {number} The value to insert into the array.
     * @returns {number} The position into occupied by value into the array.
     */
    insert(element, comparisonValue = null) {
        let position = this.getPosition(this.comparisonValueSupplier(element));
        if (
            position < this.currentPosition
            || comparisonValue != null && position == this.currentPosition && this.comparisonValueSupplier(element) < comparisonValue) {
            ++this.currentPosition;
        }
        /*
        let newArray = new Uint32Array(this.array.length + 1)
        newArray.set(this.array.subarray(0, position), 0)
        newArray[position] = element
        newArray.set(this.array.subarray(position), position + 1)
        this.array = newArray
        */
        this.shiftRight(position);
        this.array[position] = element;
        ++this.length;
        return position
    }

    /**
     * Removes the element from the array.
     * @param {number} value The value of the element to be remove.
     */
    remove(element) {
        let position = this.getPosition(this.comparisonValueSupplier(element));
        if (this.array[position] == element) {
            this.removeAt(position);
        }
    }

    /**
     * Removes the element into the specified position from the array.
     * @param {number} position The index of the element to be remove.
     */
    removeAt(position) {
        if (position < this.currentPosition) {
            --this.currentPosition;
        }
        /*
        let newArray = new Uint32Array(this.array.length - 1)
        newArray.set(this.array.subarray(0, position), 0)
        newArray.set(this.array.subarray(position + 1), position)
        this.array = newArray
        */
        this.shiftLeft(position);
        --this.length;
        return position
    }

    getNext() {
        if (this.currentPosition >= 0 && this.currentPosition < this.length) {
            return this.get(this.currentPosition)
        }
        return null
    }

    getNextValue() {
        if (this.currentPosition >= 0 && this.currentPosition < this.length) {
            return this.comparisonValueSupplier(this.get(this.currentPosition))
        } else {
            return Number.MAX_SAFE_INTEGER
        }
    }

    getPrev() {
        if (this.currentPosition > 0) {
            return this.get(this.currentPosition - 1)
        }
        return null
    }

    getPrevValue() {
        if (this.currentPosition > 0) {
            return this.comparisonValueSupplier(this.get(this.currentPosition - 1))
        } else {
            return Number.MIN_SAFE_INTEGER
        }
    }

    shiftLeft(leftLimit, steps = 1) {
        this.array.set(this.array.subarray(leftLimit + steps), leftLimit);
    }

    shiftRight(leftLimit, steps = 1) {
        this.array.set(this.array.subarray(leftLimit, -steps), leftLimit + steps);
    }
}

class FastSelectionModel {

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
     * @param {(rect: Rectangle, selected: bool) => void} selectFunc A function that selects or deselects individual rectangles.
     */
    constructor(initialPosition, rectangles, boundariesFunc, selectFunc) {
        this.initialPosition = initialPosition;
        this.finalPosition = initialPosition;
        /** @type Metadata[] */
        this.metadata = new Array(rectangles.length);
        this.primaryOrder = new OrderedIndexArray((element) => this.metadata[element].primaryBoundary);
        this.secondaryOrder = new OrderedIndexArray((element) => this.metadata[element].secondaryBoundary);
        this.selectFunc = selectFunc;
        this.rectangles = rectangles;
        this.primaryOrder.reserve(this.rectangles.length);
        this.secondaryOrder.reserve(this.rectangles.length);
        rectangles.forEach((rect, index) => {
            /** @type Metadata */
            let rectangleMetadata = {
                primaryBoundary: this.initialPosition[0],
                secondaryBoundary: this.initialPosition[1],
                rectangle: index, // used to move both expandings inside the this.metadata array
                onSecondaryAxis: false
            };
            this.metadata[index] = rectangleMetadata;
            selectFunc(rect, false); // Initially deselected (Eventually)
            const rectangleBoundaries = boundariesFunc(rect);

            // Secondary axis first because it may be inserted in this.secondaryOrder during the primary axis check
            if (this.initialPosition[1] < rectangleBoundaries.secondaryInf) { // Initial position is before the rectangle
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondaryInf;
            } else if (rectangleBoundaries.secondarySup < this.initialPosition[1]) { // Initial position is after the rectangle
                rectangleMetadata.secondaryBoundary = rectangleBoundaries.secondarySup;
            } else {
                rectangleMetadata.onSecondaryAxis = true;
            }

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
                    selectFunc(rect, true);
                }
            }
        });
        this.primaryOrder.currentPosition = this.primaryOrder.getPosition(this.initialPosition[0]);
        this.secondaryOrder.currentPosition = this.secondaryOrder.getPosition(this.initialPosition[1]);
        this.computeBoundaries(this.initialPosition);
    }

    computeBoundaries() {
        this.boundaries = {
            // Primary axis negative expanding 
            primaryN: {
                v: this.primaryOrder.getPrevValue(),
                i: this.primaryOrder.getPrev()
            },
            primaryP: {
                v: this.primaryOrder.getNextValue(),
                i: this.primaryOrder.getNext()
            },
            // Secondary axis negative expanding
            secondaryN: {
                v: this.secondaryOrder.getPrevValue(),
                i: this.secondaryOrder.getPrev()
            },
            // Secondary axis positive expanding
            secondaryP: {
                v: this.secondaryOrder.getNextValue(),
                i: this.secondaryOrder.getNext()
            }
        };
    }

    selectTo(finalPosition) {
        const direction = [
            Math.sign(finalPosition[0] - this.initialPosition[0]),
            Math.sign(finalPosition[1] - this.initialPosition[1])
        ];
        const primaryBoundaryCrossed = (index, added) => {
            if (this.metadata[index].onSecondaryAxis) {
                this.selectFunc(this.rectangles[index], added);
            } else {
                if (added) {
                    this.secondaryOrder.insert(index, finalPosition[1]);
                    const secondaryBoundary = this.metadata[index].secondaryBoundary;
                    if (
                        // If inserted before the current position
                        Math.sign(finalPosition[1] - secondaryBoundary) == direction[1]
                        // And after initial position
                        && Math.sign(secondaryBoundary - this.initialPosition[1]) == direction[1]
                    ) {
                        // Secondary axis is already satisfied then
                        this.selectFunc(this.rectangles[index], true);
                    }
                } else {
                    this.selectFunc(this.rectangles[index], false);
                    this.secondaryOrder.remove(index);
                }
            }
            this.computeBoundaries(finalPosition);
            this.selectTo(finalPosition);
        };

        if (finalPosition[0] < this.boundaries.primaryN.v) {
            --this.primaryOrder.currentPosition;
            primaryBoundaryCrossed(
                this.boundaries.primaryN.i,
                this.initialPosition[0] > this.boundaries.primaryN.v && finalPosition[0] < this.initialPosition[0]);
        } else if (finalPosition[0] > this.boundaries.primaryP.v) {
            ++this.primaryOrder.currentPosition;
            primaryBoundaryCrossed(
                this.boundaries.primaryP.i,
                this.initialPosition[0] < this.boundaries.primaryP.v && this.initialPosition[0] < finalPosition[0]);
        }


        const secondaryBoundaryCrossed = (index, added) => {
            this.selectFunc(this.rectangles[index], added);
            this.computeBoundaries(finalPosition);
            this.selectTo(finalPosition);
        };

        if (finalPosition[1] < this.boundaries.secondaryN.v) {
            --this.secondaryOrder.currentPosition;
            secondaryBoundaryCrossed(
                this.boundaries.secondaryN.i,
                this.initialPosition[1] > this.boundaries.secondaryN.v && finalPosition[1] < this.initialPosition[1]);
        } else if (finalPosition[1] > this.boundaries.secondaryP.v) {
            ++this.secondaryOrder.currentPosition;
            secondaryBoundaryCrossed(
                this.boundaries.secondaryP.i,
                this.initialPosition[1] < this.boundaries.secondaryP.v && this.initialPosition[1] < finalPosition[1]);
        }
        this.finalPosition = finalPosition;
    }

}

/**
 * @typedef {import("./UEBlueprintObject").default} UEBlueprintObject
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
        /** @type {FastSelectionModel} */
        this.selectionModel = null;
        /** @type {(node: UEBlueprintObject) => BoundariesInfo} */
        this.nodeBoundariesSupplier = (node) => {
            let rect = node.getBoundingClientRect();
            let gridRect = this.nodesContainerElement.getBoundingClientRect();
            const scaleCorrection = 1 / this.getScale();
            return {
                primaryInf: (rect.left - gridRect.left) * scaleCorrection,
                primarySup: (rect.right - gridRect.right) * scaleCorrection,
                // Counter intuitive here: the y (secondary axis is positive towards the bottom, therefore upper bound "sup" is bottom)
                secondaryInf: (rect.top - gridRect.top) * scaleCorrection,
                secondarySup: (rect.bottom - gridRect.bottom) * scaleCorrection
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

        this.dragObject = new UDragScroll(this.getGridDOMElement(), this, {
            clickButton: 2,
            moveEverywhere: true,
            exitAnyButton: false
        });

        this.zoomObject = new UZoom(this.getGridDOMElement(), this, {
            looseTarget: true
        });

        this.selectObject = new USelect(this.getGridDOMElement(), this, {
            clickButton: 0,
            moveEverywhere: true,
            exitAnyButton: true
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
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue('--ueb-scale'))
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
        this.selectionModel = new FastSelectionModel(initialPosition, this.nodes, this.nodeBoundariesSupplier, this.nodeSelectToggleFunction);
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
     * Unselect all nodes
     */
    unselectAll() {
        this.nodes.forEach(node => this.nodeSelectToggleFunction(node, false));
    }

    /**
     * 
     * @param  {...UEBlueprintObject} blueprintNodes 
     */
    addNode(...blueprintNodes) {
        [...blueprintNodes].reduce(
            (s, e) => {
                s.push(e);
                return s
            },
            this.nodes);
        if (this.nodesContainerElement) {
            this.nodesContainerElement.append(...blueprintNodes);
        }
    }
}

customElements.define('u-blueprint', UEBlueprint);

class UDrag extends UMouseClickDrag {
    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.stepSize = parseInt(options?.stepSize);
        this.mousePosition = [0, 0];
    }

    snapToGrid(location) {
        return [
            this.stepSize * Math.round(location[0] / this.stepSize),
            this.stepSize * Math.round(location[1] / this.stepSize)
        ]
    }

    startDrag() {
        if (isNaN(this.stepSize) || this.stepSize <= 0) {
            this.stepSize = parseInt(getComputedStyle(this.target).getPropertyValue('--ueb-grid-snap'));
            if (isNaN(this.stepSize) || this.stepSize <= 0) {
                this.stepSize = 1;
            }
        }
        // Get the current mouse position
        this.mousePosition = this.stepSize != 1 ? this.snapToGrid(this.clickedPosition) : this.clickedPosition;
    }

    dragTo(location, movement) {
        const mousePosition = this.stepSize != 1 ? this.snapToGrid(location) : location;
        const d = [mousePosition[0] - this.mousePosition[0], mousePosition[1] - this.mousePosition[1]];

        if (d[0] == 0 && d[1] == 0) {
            return
        }

        this.target.dragDispatch(d);

        // Reassign the position of mouse
        this.mousePosition = mousePosition;
    }
}

class USelectableDraggable extends HTMLElement {

    constructor() {
        super();
        /** @type {import("./UEBlueprint").default}" */
        this.blueprint = null;
        this.dragObject = null;
        this.location = [0, 0];
        this.selected = false;

        let self = this;
        this.dragHandler = (e) => {
            self.addLocation(e.detail.value);
        };
    }

    connectedCallback() {
        this.blueprint = this.closest('u-blueprint');
        this.dragObject = new UDrag(this, null, { // UDrag doesn't need blueprint
            looseTarget: true
        });
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

    dragDispatch(value) {
        if (!this.selected) {
            this.blueprint.unselectAll();
            this.setSelected(true);
        }
        let dragEvent = new CustomEvent('uDragSelected', {
            detail: {
                instigator: this,
                value: value
            },
            bubbles: false,
            cancelable: true,
            composed: false,
        });
        this.blueprint.dispatchEvent(dragEvent);
    }

    setSelected(value = true) {
        if (this.selected == value) {
            return
        }
        this.selected = value;
        if (this.selected) {
            this.classList.add('ueb-selected');
            this.blueprint.addEventListener('uDragSelected', this.dragHandler);
        } else {
            this.classList.remove('ueb-selected');
            this.blueprint.removeEventListener('uDragSelected', this.dragHandler);
        }
    }

}

class UEBlueprintObject extends USelectableDraggable {
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
}

customElements.define('u-object', UEBlueprintObject);

export { UEBlueprint, UEBlueprintObject };
