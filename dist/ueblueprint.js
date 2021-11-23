/** @typedef {import("./graph/GraphNode").default} GraphNode */
class BlueprintData {

    constructor() {
        /** @type {GraphNode[]}" */
        this.nodes = new Array();
        this.expandGridSize = 400;
        /** @type {number[]} */
        this.additional = /*[2 * this.expandGridSize, 2 * this.expandGridSize]*/[0, 0];
        /** @type {number[]} */
        this.translateValue = /*[this.expandGridSize, this.expandGridSize]*/[0, 0];
        /** @type {number[]} */
        this.mousePosition = [0, 0];
    }
}

/**
 * @typedef {import(""../entity/Entity"").default} Entity
 */
class Template {

    /**
     * Computes the html content of the target element.
     * @param {Entity} entity Entity representing the element
     * @returns The computed html 
     */
    render(entity) {
        return ""
    }

    /**
     * Returns the html elements rendered by this template.
     * @param {Entity} entity Entity representing the element
     * @returns The rendered elements
     */
    getElements(entity) {
        let aDiv = document.createElement('div');
        aDiv.innerHTML = this.render(entity);
        return aDiv.childNodes
    }
}

class BlueprintTemplate extends Template {
    header(element) {
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

    /**
     * 
     * @param {import("../Blueprint").Blueprint} element 
     * @returns 
     */
    viewport(element) {
        return `
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="--ueb-additional-x:${element.additional[0]}; --ueb-additional-y:${element.additional[1]}; --ueb-translate-x:${element.translateValue[0]}; --ueb-translate-y:${element.translateValue[1]}">
                    <div class="ueb-grid-content" data-nodes></div>
                </div>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {HTMLElement} element Target element 
     * @returns The computed html 
     */
    render(element) {
        return `
            ${this.header(element)}
            ${this.overlay(element)}
            ${this.viewport(element)}
        `
    }
}

class Context {

    constructor(target, blueprint, options) {
        /** @type {HTMLElement} */
        this.target = target;
        /** @type {import("../Blueprint").default}" */
        this.blueprint = blueprint;
        this.options = options;
        if (options?.wantsFocusCallback ?? false) {
            let self = this;
            this.blueprintfocusHandler = _ => self.blueprintFocused();
            this.blueprintunfocusHandler = _ => self.blueprintUnfocused();
            this.blueprint.addEventListener("blueprintfocus", this.blueprintfocusHandler);
            this.blueprint.addEventListener("blueprintunfocus", this.blueprintunfocusHandler);
        }
    }

    unlistenDOMElement() {
        this.blueprint.removeEventListener("blueprintfocus", this.blueprintfocusHandler);
        this.blueprint.removeEventListener("blueprintunfocus", this.blueprintunfocusHandler);
    }

    blueprintFocused() {
    }

    blueprintUnfocused() {
    }
}

class Primitive {

    toString() {
        return "Unimplemented for " + this.constructor.name
    }
}

class Integer extends Primitive {

    constructor(value) {
        super();
        // Using constructor equality and not instanceof in order to consider both primitives and objects
        if (value?.constructor === String) {
            value = Number(value);
        }
        if (value?.constructor === Number) {
            value = Math.round(value);
        }
        /** @type {number} */
        this.value = value;
    }

    valueOf() {
        this.value;
    }

    toString() {
        return this.value.toString()
    }
}

class TypeInitialization {

    static sanitize(value) {
        if (!(value instanceof Object)) {
            return value // Is already primitive
        }
        if (value instanceof Boolean || value instanceof Integer || value instanceof Number) {
            return value.valueOf()
        }
        if (value instanceof String) {
            return value.toString()
        }
        return value
    }

    /**
     * 
     * @param {typeof Object} type 
     * @param {boolean} showDefault 
     * @param {*} value
     */
    constructor(type, showDefault = true, value = undefined) {
        if (value === undefined) {
            value = TypeInitialization.sanitize(new type());
        }
        this.value = value;
        this.showDefault = showDefault;
        this.type = type;
    }
}

class Utility {
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    static getScale(element) {
        return getComputedStyle(element).getPropertyValue('--ueb-scale')
    }

    /**
     * Sets a value in an object
     * @param {String[]} keys The chained keys to access from object in order to set the value
     * @param {any} value Value to be set
     * @param {Object} target Object holding the data 
     * @param {Boolean} create Whether to create or not the key in case it doesn't exist
     * @returns {Boolean} Returns true on succes, false otherwise
     */
    static objectSet(target, keys, value, create = false) {
        if (keys.constructor != Array) {
            console.error("Expected keys to be an array.");
        }
        if (keys.length == 1) {
            if (create || keys[0] in target) {
                target[keys[0]] = value;
                return true
            }
        } else if (keys.length > 0) {
            return Utility.objectSet(target[keys[0]], keys.slice(1), value, create)
        }
        return false
    }

    /**
     * Gets a value from an object, gives defaultValue in case of failure
     * @param {Object} source Object holding the data 
     * @param {String[]} keys The chained keys to access from object in order to get the value
     * @param {any} defaultValue Value to return in case from doesn't have it
     * @returns {any} The value in from corresponding to the keys or defaultValue otherwise
     */
    static objectGet(source, keys, defaultValue = null) {
        if (keys.constructor != Array) {
            console.error("Expected keys to be an array.");
        }
        if (keys.length == 0 || !(keys[0] in source)) {
            return defaultValue
        }
        if (keys.length == 1) {
            return source[keys[0]]
        }
        return Utility.objectGet(source[keys[0]], keys.slice(1), defaultValue)
    }

    static equals(a, b) {
        a = TypeInitialization.sanitize(a);
        b = TypeInitialization.sanitize(b);
        return a === b
    }

    /**
     * 
     * @param {String} value 
     */
    static FirstCapital(value) {
        return value.charAt(0).toUpperCase() + value.substring(1)
    }

    static getType(value) {
        let constructor = value?.constructor;
        switch (constructor) {
            case TypeInitialization:
                return value.type
            case Function:
                return value
            default:
                return constructor
        }
    }
}

class Pointing extends Context {

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.movementSpace = this.blueprint?.getGridDOMElement() ?? document.documentElement;
    }

    /**
     * 
     * @param {MouseEvent} mouseEvent 
     * @returns 
     */
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
class MouseClickDrag extends Pointing {

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

        this.mouseDownHandler = e => {
            this.blueprint.setFocused(true);
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

        this.mouseStartedMovingHandler = e => {
            e.preventDefault();
            e.stopPropagation();

            // Delegate from now on to self.mouseMoveHandler
            movementListenedElement.removeEventListener('mousemove', self.mouseStartedMovingHandler);
            movementListenedElement.addEventListener('mousemove', self.mouseMoveHandler);

            // Do actual actions
            self.startDrag();
            self.started = true;
        };

        this.mouseMoveHandler = e => {
            e.preventDefault();
            e.stopPropagation();
            const location = self.getLocation(e);
            const movement = [e.movementX, e.movementY];
            self.dragTo(location, movement);
        };

        this.mouseUpHandler = e => {
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
        super.unlistenDOMElement();
        this.target.removeEventListener('mousedown', this.mouseDownHandler);
        if (this.clickButton == 2) {
            this.target.removeEventListener('contextmenu', this.preventDefault);
        } blueprintunfocusHandler;
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

class DragScroll extends MouseClickDrag {

    dragTo(location, movement) {
        this.blueprint.scrollDelta([-movement[0], -movement[1]]);
    }
}

class GraphElement extends HTMLElement {

    /**
     * 
     * @param {import("../template/Template").default} template The template to render this node
     */
    constructor(entity, template) {
        super();
        /** @type {import("../Blueprint").default}" */
        this.blueprint = null;
        this.entity = entity;
        this.template = template;
    }

    connectedCallback() {
        this.blueprint = this.closest('u-blueprint');
        this.append(...this.template.getElements(this.entity));
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

class GraphSelector extends GraphElement {

    constructor() {
        super({}, new Template());
        /**
         * @type {import("./GraphSelector").default}
         */
        this.selectionModel = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('ueb-selector');
        this.dataset.selecting = "false";
    }

    /**
     * Create a selection rectangle starting from the specified position
     * @param {number[]} initialPosition - Selection rectangle initial position (relative to the .ueb-grid element)
     */
    startSelecting(initialPosition) {
        initialPosition = this.blueprint.compensateTranslation(initialPosition);
        // Set initial position
        this.style.setProperty('--ueb-select-from-x', initialPosition[0]);
        this.style.setProperty('--ueb-select-from-y', initialPosition[1]);
        // Final position coincide with the initial position, at the beginning of selection
        this.style.setProperty('--ueb-select-to-x', initialPosition[0]);
        this.style.setProperty('--ueb-select-to-y', initialPosition[1]);
        this.dataset.selecting = "true";
        this.selectionModel = new FastSelectionModel(initialPosition, this.blueprint.getNodes(), this.blueprint.nodeBoundariesSupplier, this.blueprint.nodeSelectToggleFunction);
    }

    /**
     * Move selection rectagle to the specified final position. The initial position was specified by startSelecting()
     * @param {number[]} finalPosition - Selection rectangle final position (relative to the .ueb-grid element)
     */
    doSelecting(finalPosition) {
        finalPosition = this.blueprint.compensateTranslation(finalPosition);
        this.style.setProperty('--ueb-select-to-x', finalPosition[0]);
        this.style.setProperty('--ueb-select-to-y', finalPosition[1]);
        this.selectionModel.selectTo(finalPosition);
    }

    finishSelecting() {
        this.dataset.selecting = "false";
        this.selectionModel = null;
    }
}

customElements.define('u-selector', GraphSelector);

class MouseTracking extends Pointing {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);

        let self = this;
        this.mousemoveHandler = e => {
            self.blueprint.entity.mousePosition = self.getLocation(e);
        };
    }

    blueprintFocused() {
        this.target.addEventListener("mousemove", this.mousemoveHandler);
    }

    blueprintUnfocused() {
        this.target.removeEventListener("mousemove", this.mousemoveHandler);
    }
}

class Entity {

    constructor(options = {}) {
        /**
         * 
         * @param {String[]} prefix 
         * @param {Object} target 
         * @param {Object} properties 
         */
        const defineAllAttributes = (prefix, target, properties) => {
            let fullKey = prefix.concat("");
            const last = fullKey.length - 1;
            for (let property in properties) {
                fullKey[last] = property;
                // Not instanceof because all objects are instenceof Object, exact match needed
                if (properties[property]?.constructor === Object) {
                    target[property] = {};
                    defineAllAttributes(fullKey, target[property], properties[property]);
                    continue
                }
                /*
                 * The value can either be:
                 *     - Array: can contain multiple values, its property is assigned multiple times like (X=1, X=4, X="Hello World") 
                 *     - TypeInitialization: contains the maximum amount of information about the attribute.
                 *     - A type: the default value will be default constructed object without arguments.
                 *     - A proper value.
                 */
                const value = Utility.objectGet(options, fullKey);
                if (value !== null) {
                    target[property] = value;
                    continue
                }
                let defaultValue = properties[property];
                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        continue
                    }
                    defaultValue = defaultValue.value;
                }
                if (defaultValue instanceof Array) {
                    target[property] = [];
                    continue
                }
                if (defaultValue instanceof Function) {
                    defaultValue = TypeInitialization.sanitize(new defaultValue());
                }
                target[property] = defaultValue;
            }
        };
        defineAllAttributes([], this, this.getAttributes());
    }
}

class Guid extends Primitive {

    static generateGuid(random) {
        let values = new Uint32Array(4);
        if (random === true) {
            crypto.getRandomValues(values);
        }
        let result = "";
        values.forEach(n => {
            result += ('00000000' + n.toString(16).toUpperCase()).slice(-8);
        });
        return result
    }

    constructor(guid) {
        super();
        // Using constructor equality and not instanceof in order to consider both primitives and objects
        if (guid?.constructor === Boolean) {
            guid = Guid.generateGuid(guid == true);
        }
        if (guid instanceof Guid) {
            guid = guid.value;
        }
        this.value = guid;
    }

    toString() {
        return this.value.toString()
    }
}

class LocalizedTextEntity extends Entity {

    static attributes = {
        namespace: String,
        key: String,
        value: String
    }

    getAttributes() {
        return LocalizedTextEntity.attributes
    }
}

class ObjectReferenceEntity extends Entity {

    static attributes = {
        type: String,
        path: String
    }

    getAttributes() {
        return ObjectReferenceEntity.attributes
    }
}

class PathSymbolEntity extends Entity {

    static attributes = {
        value: String
    }

    getAttributes() {
        return PathSymbolEntity.attributes
    }

    toString() {
        return this.value
    }
}

class PinReferenceEntity extends Entity {

    static attributes = {
        objectName: PathSymbolEntity,
        pinGuid: Guid
    }

    getAttributes() {
        return PinReferenceEntity.attributes
    }
}

class PinEntity extends Entity {

    static attributes = {
        PinId: Guid,
        PinName: "",
        PinFriendlyName: new TypeInitialization(LocalizedTextEntity, false, null),
        PinToolTip: "",
        Direction: new TypeInitialization(String, false, ""),
        PinType: {
            PinCategory: "",
            PinSubCategory: "",
            PinSubCategoryObject: ObjectReferenceEntity,
            PinSubCategoryMemberReference: null,
            PinValueType: null,
            ContainerType: ObjectReferenceEntity,
            bIsReference: false,
            bIsConst: false,
            bIsWeakPointer: false,
            bIsUObjectWrapper: false
        },
        LinkedTo: [PinReferenceEntity],
        DefaultValue: "",
        AutogeneratedDefaultValue: "",
        PersistentGuid: Guid,
        bHidden: false,
        bNotConnectable: false,
        bDefaultValueIsReadOnly: false,
        bDefaultValueIsIgnored: false,
        bAdvancedView: false,
        bOrphanedPin: false,
    }

    getAttributes() {
        return PinEntity.attributes
    }

    /**
     * 
     * @returns {String}
     */
    getPinDisplayName() {
        return this.PinName
    }

    isOutput() {
        if (this.Direction === "EGPD_Output") {
            return true
        }
    }
}

/**
 * @typedef {import("../entity/ObjectEntity").default} ObjectEntity
 */
class NodeTemplate extends Template {

    /**
     * Computes the html content of the target element.
     * @param {ObjectEntity} entity Entity representing the element 
     * @returns The computed html 
     */
    header(entity) {
        return `
            <div class="ueb-node-header">
                <span class="ueb-node-name">
                    <span class="ueb-node-symbol"></span>
                    <span class="ueb-node-text">${entity.getNodeDisplayName()}</span>
                </span>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {ObjectEntity} entity Entity representing the element 
     * @returns The computed html 
     */
    body(entity) {
        /** @type {PinEntity[]} */
        let inputs = entity.CustomProperties.filter(v => v instanceof PinEntity);
        let outputs = inputs.filter(v => v.isOutput());
        inputs = inputs.filter(v => !v.isOutput());
        return `
            <div class="ueb-node-body">
                <div class="ueb-node-inputs">
                    ${inputs.map((input, index) => `
                    <div class="ueb-node-input ueb-node-value-${input.type}">
                        <span class="ueb-node-value-icon ${inputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                        ${input.getPinDisplayName()}
                    </div>
                    `).join("") ?? ""}
                </div>
                <div class="ueb-node-outputs">
                    ${outputs.map((output, index) => `
                    <div class="ueb-node-output ueb-node-value-${output.type}">
                        ${output.getPinDisplayName()}
                        <span class="ueb-node-value-icon ${outputs[index].connected ? 'ueb-node-value-fill' : ''}"></span>
                    </div>
                    `).join("") ?? ''}
                </div>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {ObjectEntity} entity Entity representing the element 
     * @returns The computed html 
     */
    render(entity) {
        return `
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    ${this.header(entity)}
                    ${this.body(entity)}
                </div>
            </div>
        `
    }
}

class FunctionReferenceEntity extends Entity {

    static attributes = {
        MemberParent: ObjectReferenceEntity,
        MemberName: ""
    }

    getAttributes() {
        return FunctionReferenceEntity.attributes
    }
}

class VariableReferenceEntity extends Entity {

    static attributes = {
        MemberName: String,
        MemberGuid: Guid,
        bSelfContext: false
    }

    getAttributes() {
        return VariableReferenceEntity.attributes
    }
}

class ObjectEntity extends Entity {

    static attributes = {
        Class: ObjectReferenceEntity,
        Name: "",
        bIsPureFunc: new TypeInitialization(Boolean, false, false),
        VariableReference: new TypeInitialization(VariableReferenceEntity, false, null),
        FunctionReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        TargetType: new TypeInitialization(ObjectReferenceEntity, false, null),
        NodePosX: 0,
        NodePosY: 0,
        NodeGuid: Guid,
        CustomProperties: [PinEntity]
    }

    getAttributes() {
        return ObjectEntity.attributes
    }

    /**
     * 
     * @returns {String} The name of the node
     */
    getNodeDisplayName() {
        return this.Name
    }
}

class Drag extends MouseClickDrag {

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

        this.target.dispatchDragEvent(d);

        // Reassign the position of mouse
        this.mousePosition = mousePosition;
    }
}

class SelectableDraggable extends GraphElement {

    constructor(...args) {
        super(...args);
        this.dragObject = null;
        this.location = [0, 0];
        this.selected = false;

        let self = this;
        this.dragHandler = (e) => {
            self.addLocation(e.detail.value);
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.dragObject = new Drag(this, this.blueprint, {
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

    dispatchDragEvent(value) {
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

class SerializerFactory {

    static #serializers = new Map()

    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object);
    }

    static getSerializer(entity) {
        return SerializerFactory.#serializers.get(Utility.getType(entity))
    }
}

class DragLink extends MouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
    }

    startDrag() {
        //this.selectorElement.startSelecting(this.clickedPosition)
    }

    dragTo(location, movement) {
        //this.selectorElement.doSelecting(location)
    }

    endDrag() {
        if (this.started) ;
    }
}

class GraphNode extends SelectableDraggable {

    static fromSerializedObject(str) {
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str);
        return new GraphNode(entity)
    }

    /**
     * 
     * @param {ObjectEntity} entity 
     */
    constructor(entity) {
        super(entity, new NodeTemplate());
        this.graphNodeName = "n/a";
        this.dragLinkObjects = Array();
        super.setLocation([this.entity.NodePosX, this.entity.NodePosY]);
    }

    connectedCallback() {
        this.getAttribute("type")?.trim();
        super.connectedCallback();
        this.classList.add("ueb-node");
        if (this.selected) {
            this.classList.add("ueb-selected");
        }
        this.style.setProperty("--ueb-position-x", this.location[0]);
        this.style.setProperty("--ueb-position-y", this.location[1]);
        this.querySelectorAll(".ueb-node-input, .ueb-node-output").forEach(element => {
            this.dragLinkObjects.push(
                new DragLink(element, this.blueprint, {
                    clickButton: 0,
                    moveEverywhere: true,
                    exitAnyButton: true,
                    looseTarget: true
                })
            );
        });
    }

    setLocation(value = [0, 0]) {
        this.entity.NodePosX = value[0];
        this.entity.NodePosY = value[1];
        super.setLocation(value);
    }
}

customElements.define('u-node', GraphNode);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var parsimmon_umd_min = {exports: {}};

(function (module, exports) {
!function(n,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,function(){return function(n){var t={};function r(e){if(t[e])return t[e].exports;var u=t[e]={i:e,l:!1,exports:{}};return n[e].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e});},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0});},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){function e(n){if(!(this instanceof e))return new e(n);this._=n;}var u=e.prototype;function o(n,t){for(var r=0;r<n;r++)t(r);}function i(n,t,r){return function(n,t){o(t.length,function(r){n(t[r],r,t);});}(function(r,e,u){t=n(t,r,e,u);},r),t}function f(n,t){return i(function(t,r,e,u){return t.concat([n(r,e,u)])},[],t)}function a(n,t){var r={v:0,buf:t};return o(n,function(){var n;r={v:r.v<<1|(n=r.buf,n[0]>>7),buf:function(n){var t=i(function(n,t,r,e){return n.concat(r===e.length-1?Buffer.from([t,0]).readUInt16BE(0):e.readUInt16BE(r))},[],n);return Buffer.from(f(function(n){return (n<<1&65535)>>8},t))}(r.buf)};}),r}function c(){return "undefined"!=typeof Buffer}function s(){if(!c())throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")}function l(n){s();var t=i(function(n,t){return n+t},0,n);if(t%8!=0)throw new Error("The bits ["+n.join(", ")+"] add up to "+t+" which is not an even number of bytes; the total should be divisible by 8");var r,u=t/8,o=(r=function(n){return n>48},i(function(n,t){return n||(r(t)?t:n)},null,n));if(o)throw new Error(o+" bit range requested exceeds 48 bit (6 byte) Number max.");return new e(function(t,r){var e=u+r;return e>t.length?x(r,u.toString()+" bytes"):b(e,i(function(n,t){var r=a(t,n.buf);return {coll:n.coll.concat(r.v),buf:r.buf}},{coll:[],buf:t.slice(r,e)},n).coll)})}function p(n,t){return new e(function(r,e){return s(),e+t>r.length?x(e,t+" bytes for "+n):b(e+t,r.slice(e,e+t))})}function h(n,t){if("number"!=typeof(r=t)||Math.floor(r)!==r||t<0||t>6)throw new Error(n+" requires integer length in range [0, 6].");var r;}function d(n){return h("uintBE",n),p("uintBE("+n+")",n).map(function(t){return t.readUIntBE(0,n)})}function v(n){return h("uintLE",n),p("uintLE("+n+")",n).map(function(t){return t.readUIntLE(0,n)})}function g(n){return h("intBE",n),p("intBE("+n+")",n).map(function(t){return t.readIntBE(0,n)})}function m(n){return h("intLE",n),p("intLE("+n+")",n).map(function(t){return t.readIntLE(0,n)})}function y(n){return n instanceof e}function E(n){return "[object Array]"==={}.toString.call(n)}function w(n){return c()&&Buffer.isBuffer(n)}function b(n,t){return {status:!0,index:n,value:t,furthest:-1,expected:[]}}function x(n,t){return E(t)||(t=[t]),{status:!1,index:-1,value:null,furthest:n,expected:t}}function B(n,t){if(!t)return n;if(n.furthest>t.furthest)return n;var r=n.furthest===t.furthest?function(n,t){if(function(){if(void 0!==e._supportsSet)return e._supportsSet;var n="undefined"!=typeof Set;return e._supportsSet=n,n}()&&Array.from){for(var r=new Set(n),u=0;u<t.length;u++)r.add(t[u]);var o=Array.from(r);return o.sort(),o}for(var i={},f=0;f<n.length;f++)i[n[f]]=!0;for(var a=0;a<t.length;a++)i[t[a]]=!0;var c=[];for(var s in i)({}).hasOwnProperty.call(i,s)&&c.push(s);return c.sort(),c}(n.expected,t.expected):t.expected;return {status:n.status,index:n.index,value:n.value,furthest:t.furthest,expected:r}}var j={};function S(n,t){if(w(n))return {offset:t,line:-1,column:-1};n in j||(j[n]={});for(var r=j[n],e=0,u=0,o=0,i=t;i>=0;){if(i in r){e=r[i].line,0===o&&(o=r[i].lineStart);break}"\n"===n.charAt(i)&&(u++,0===o&&(o=i+1)),i--;}var f=e+u,a=t-o;return r[t]={line:f,lineStart:o},{offset:t,line:f+1,column:a+1}}function _(n){if(!y(n))throw new Error("not a parser: "+n)}function L(n,t){return "string"==typeof n?n.charAt(t):n[t]}function O(n){if("number"!=typeof n)throw new Error("not a number: "+n)}function k(n){if("function"!=typeof n)throw new Error("not a function: "+n)}function P(n){if("string"!=typeof n)throw new Error("not a string: "+n)}var q=2,A=3,I=8,F=5*I,M=4*I,z="  ";function R(n,t){return new Array(t+1).join(n)}function U(n,t,r){var e=t-n.length;return e<=0?n:R(r,e)+n}function W(n,t,r,e){return {from:n-t>0?n-t:0,to:n+r>e?e:n+r}}function D(n,t){var r,e,u,o,a,c=t.index,s=c.offset,l=1;if(s===n.length)return "Got the end of the input";if(w(n)){var p=s-s%I,h=s-p,d=W(p,F,M+I,n.length),v=f(function(n){return f(function(n){return U(n.toString(16),2,"0")},n)},function(n,t){var r=n.length,e=[],u=0;if(r<=t)return [n.slice()];for(var o=0;o<r;o++)e[u]||e.push([]),e[u].push(n[o]),(o+1)%t==0&&u++;return e}(n.slice(d.from,d.to).toJSON().data,I));o=function(n){return 0===n.from&&1===n.to?{from:n.from,to:n.to}:{from:n.from/I,to:Math.floor(n.to/I)}}(d),e=p/I,r=3*h,h>=4&&(r+=1),l=2,u=f(function(n){return n.length<=4?n.join(" "):n.slice(0,4).join(" ")+"  "+n.slice(4).join(" ")},v),(a=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(a=2);}else {var g=n.split(/\r\n|[\n\r\u2028\u2029]/);r=c.column-1,e=c.line-1,o=W(e,q,A,g.length),u=g.slice(o.from,o.to),a=o.to.toString().length;}var m=e-o.from;return w(n)&&(a=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(a=2),i(function(t,e,u){var i,f=u===m,c=f?"> ":z;return i=w(n)?U((8*(o.from+u)).toString(16),a,"0"):U((o.from+u+1).toString(),a," "),[].concat(t,[c+i+" | "+e],f?[z+R(" ",a)+" | "+U("",r," ")+R("^",l)]:[])},[],u).join("\n")}function N(n,t){return ["\n","-- PARSING FAILED "+R("-",50),"\n\n",D(n,t),"\n\n",(r=t.expected,1===r.length?"Expected:\n\n"+r[0]:"Expected one of the following: \n\n"+r.join(", ")),"\n"].join("");var r;}function G(n){return void 0!==n.flags?n.flags:[n.global?"g":"",n.ignoreCase?"i":"",n.multiline?"m":"",n.unicode?"u":"",n.sticky?"y":""].join("")}function C(){for(var n=[].slice.call(arguments),t=n.length,r=0;r<t;r+=1)_(n[r]);return e(function(r,e){for(var u,o=new Array(t),i=0;i<t;i+=1){if(!(u=B(n[i]._(r,e),u)).status)return u;o[i]=u.value,e=u.index;}return B(b(e,o),u)})}function J(){var n=[].slice.call(arguments);if(0===n.length)throw new Error("seqMap needs at least one argument");var t=n.pop();return k(t),C.apply(null,n).map(function(n){return t.apply(null,n)})}function T(){var n=[].slice.call(arguments),t=n.length;if(0===t)return Y("zero alternates");for(var r=0;r<t;r+=1)_(n[r]);return e(function(t,r){for(var e,u=0;u<n.length;u+=1)if((e=B(n[u]._(t,r),e)).status)return e;return e})}function V(n,t){return H(n,t).or(X([]))}function H(n,t){return _(n),_(t),J(n,t.then(n).many(),function(n,t){return [n].concat(t)})}function K(n){P(n);var t="'"+n+"'";return e(function(r,e){var u=e+n.length,o=r.slice(e,u);return o===n?b(u,o):x(e,t)})}function Q(n,t){!function(n){if(!(n instanceof RegExp))throw new Error("not a regexp: "+n);for(var t=G(n),r=0;r<t.length;r++){var e=t.charAt(r);if("i"!==e&&"m"!==e&&"u"!==e&&"s"!==e)throw new Error('unsupported regexp flag "'+e+'": '+n)}}(n),arguments.length>=2?O(t):t=0;var r=function(n){return RegExp("^(?:"+n.source+")",G(n))}(n),u=""+n;return e(function(n,e){var o=r.exec(n.slice(e));if(o){if(0<=t&&t<=o.length){var i=o[0],f=o[t];return b(e+i.length,f)}return x(e,"valid match group (0 to "+o.length+") in "+u)}return x(e,u)})}function X(n){return e(function(t,r){return b(r,n)})}function Y(n){return e(function(t,r){return x(r,n)})}function Z(n){if(y(n))return e(function(t,r){var e=n._(t,r);return e.index=r,e.value="",e});if("string"==typeof n)return Z(K(n));if(n instanceof RegExp)return Z(Q(n));throw new Error("not a string, regexp, or parser: "+n)}function $(n){return _(n),e(function(t,r){var e=n._(t,r),u=t.slice(r,e.index);return e.status?x(r,'not "'+u+'"'):b(r,null)})}function nn(n){return k(n),e(function(t,r){var e=L(t,r);return r<t.length&&n(e)?b(r+1,e):x(r,"a character/byte matching "+n)})}function tn(n,t){arguments.length<2&&(t=n,n=void 0);var r=e(function(n,e){return r._=t()._,r._(n,e)});return n?r.desc(n):r}function rn(){return Y("fantasy-land/empty")}u.parse=function(n){if("string"!=typeof n&&!w(n))throw new Error(".parse must be called with a string or Buffer as its argument");var t,r=this.skip(fn)._(n,0);return t=r.status?{status:!0,value:r.value}:{status:!1,index:S(n,r.furthest),expected:r.expected},delete j[n],t},u.tryParse=function(n){var t=this.parse(n);if(t.status)return t.value;var r=N(n,t),e=new Error(r);throw e.type="ParsimmonError",e.result=t,e},u.assert=function(n,t){return this.chain(function(r){return n(r)?X(r):Y(t)})},u.or=function(n){return T(this,n)},u.trim=function(n){return this.wrap(n,n)},u.wrap=function(n,t){return J(n,this,t,function(n,t){return t})},u.thru=function(n){return n(this)},u.then=function(n){return _(n),C(this,n).map(function(n){return n[1]})},u.many=function(){var n=this;return e(function(t,r){for(var e=[],u=void 0;;){if(!(u=B(n._(t,r),u)).status)return B(b(r,e),u);if(r===u.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");r=u.index,e.push(u.value);}})},u.tieWith=function(n){return P(n),this.map(function(t){if(function(n){if(!E(n))throw new Error("not an array: "+n)}(t),t.length){P(t[0]);for(var r=t[0],e=1;e<t.length;e++)P(t[e]),r+=n+t[e];return r}return ""})},u.tie=function(){return this.tieWith("")},u.times=function(n,t){var r=this;return arguments.length<2&&(t=n),O(n),O(t),e(function(e,u){for(var o=[],i=void 0,f=void 0,a=0;a<n;a+=1){if(f=B(i=r._(e,u),f),!i.status)return f;u=i.index,o.push(i.value);}for(;a<t&&(f=B(i=r._(e,u),f),i.status);a+=1)u=i.index,o.push(i.value);return B(b(u,o),f)})},u.result=function(n){return this.map(function(){return n})},u.atMost=function(n){return this.times(0,n)},u.atLeast=function(n){return J(this.times(n),this.many(),function(n,t){return n.concat(t)})},u.map=function(n){k(n);var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(b(u.index,n(u.value)),u):u})},u.contramap=function(n){k(n);var t=this;return e(function(r,e){var u=t.parse(n(r.slice(e)));return u.status?b(e+r.length,u.value):u})},u.promap=function(n,t){return k(n),k(t),this.contramap(n).map(t)},u.skip=function(n){return C(this,n).map(function(n){return n[0]})},u.mark=function(){return J(en,this,en,function(n,t,r){return {start:n,value:t,end:r}})},u.node=function(n){return J(en,this,en,function(t,r,e){return {name:n,value:r,start:t,end:e}})},u.sepBy=function(n){return V(this,n)},u.sepBy1=function(n){return H(this,n)},u.lookahead=function(n){return this.skip(Z(n))},u.notFollowedBy=function(n){return this.skip($(n))},u.desc=function(n){E(n)||(n=[n]);var t=this;return e(function(r,e){var u=t._(r,e);return u.status||(u.expected=n),u})},u.fallback=function(n){return this.or(X(n))},u.ap=function(n){return J(n,this,function(n,t){return n(t)})},u.chain=function(n){var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(n(u.value)._(r,u.index),u):u})},u.concat=u.or,u.empty=rn,u.of=X,u["fantasy-land/ap"]=u.ap,u["fantasy-land/chain"]=u.chain,u["fantasy-land/concat"]=u.concat,u["fantasy-land/empty"]=u.empty,u["fantasy-land/of"]=u.of,u["fantasy-land/map"]=u.map;var en=e(function(n,t){return b(t,S(n,t))}),un=e(function(n,t){return t>=n.length?x(t,"any character/byte"):b(t+1,L(n,t))}),on=e(function(n,t){return b(n.length,n.slice(t))}),fn=e(function(n,t){return t<n.length?x(t,"EOF"):b(t,null)}),an=Q(/[0-9]/).desc("a digit"),cn=Q(/[0-9]*/).desc("optional digits"),sn=Q(/[a-z]/i).desc("a letter"),ln=Q(/[a-z]*/i).desc("optional letters"),pn=Q(/\s*/).desc("optional whitespace"),hn=Q(/\s+/).desc("whitespace"),dn=K("\r"),vn=K("\n"),gn=K("\r\n"),mn=T(gn,vn,dn).desc("newline"),yn=T(mn,fn);e.all=on,e.alt=T,e.any=un,e.cr=dn,e.createLanguage=function(n){var t={};for(var r in n)({}).hasOwnProperty.call(n,r)&&function(r){t[r]=tn(function(){return n[r](t)});}(r);return t},e.crlf=gn,e.custom=function(n){return e(n(b,x))},e.digit=an,e.digits=cn,e.empty=rn,e.end=yn,e.eof=fn,e.fail=Y,e.formatError=N,e.index=en,e.isParser=y,e.lazy=tn,e.letter=sn,e.letters=ln,e.lf=vn,e.lookahead=Z,e.makeFailure=x,e.makeSuccess=b,e.newline=mn,e.noneOf=function(n){return nn(function(t){return n.indexOf(t)<0}).desc("none of '"+n+"'")},e.notFollowedBy=$,e.of=X,e.oneOf=function(n){for(var t=n.split(""),r=0;r<t.length;r++)t[r]="'"+t[r]+"'";return nn(function(t){return n.indexOf(t)>=0}).desc(t)},e.optWhitespace=pn,e.Parser=e,e.range=function(n,t){return nn(function(r){return n<=r&&r<=t}).desc(n+"-"+t)},e.regex=Q,e.regexp=Q,e.sepBy=V,e.sepBy1=H,e.seq=C,e.seqMap=J,e.seqObj=function(){for(var n,t={},r=0,u=(n=arguments,Array.prototype.slice.call(n)),o=u.length,i=0;i<o;i+=1){var f=u[i];if(!y(f)){if(E(f)&&2===f.length&&"string"==typeof f[0]&&y(f[1])){var a=f[0];if(Object.prototype.hasOwnProperty.call(t,a))throw new Error("seqObj: duplicate key "+a);t[a]=!0,r++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(0===r)throw new Error("seqObj expects at least one named parser, found zero");return e(function(n,t){for(var r,e={},i=0;i<o;i+=1){var f,a;if(E(u[i])?(f=u[i][0],a=u[i][1]):(f=null,a=u[i]),!(r=B(a._(n,t),r)).status)return r;f&&(e[f]=r.value),t=r.index;}return B(b(t,e),r)})},e.string=K,e.succeed=X,e.takeWhile=function(n){return k(n),e(function(t,r){for(var e=r;e<t.length&&n(L(t,e));)e++;return b(e,t.slice(r,e))})},e.test=nn,e.whitespace=hn,e["fantasy-land/empty"]=rn,e["fantasy-land/of"]=X,e.Binary={bitSeq:l,bitSeqObj:function(n){s();var t={},r=0,e=f(function(n){if(E(n)){var e=n;if(2!==e.length)throw new Error("["+e.join(", ")+"] should be length 2, got length "+e.length);if(P(e[0]),O(e[1]),Object.prototype.hasOwnProperty.call(t,e[0]))throw new Error("duplicate key in bitSeqObj: "+e[0]);return t[e[0]]=!0,r++,e}return O(n),[null,n]},n);if(r<1)throw new Error("bitSeqObj expects at least one named pair, got ["+n.join(", ")+"]");var u=f(function(n){return n[0]},e);return l(f(function(n){return n[1]},e)).map(function(n){return i(function(n,t){return null!==t[0]&&(n[t[0]]=t[1]),n},{},f(function(t,r){return [t,n[r]]},u))})},byte:function(n){if(s(),O(n),n>255)throw new Error("Value specified to byte constructor ("+n+"=0x"+n.toString(16)+") is larger in value than a single byte.");var t=(n>15?"0x":"0x0")+n.toString(16);return e(function(r,e){var u=L(r,e);return u===n?b(e+1,u):x(e,t)})},buffer:function(n){return p("buffer",n).map(function(n){return Buffer.from(n)})},encodedString:function(n,t){return p("string",t).map(function(t){return t.toString(n)})},uintBE:d,uint8BE:d(1),uint16BE:d(2),uint32BE:d(4),uintLE:v,uint8LE:v(1),uint16LE:v(2),uint32LE:v(4),intBE:g,int8BE:g(1),int16BE:g(2),int32BE:g(4),intLE:m,int8LE:m(1),int16LE:m(2),int32LE:m(4),floatBE:p("floatBE",4).map(function(n){return n.readFloatBE(0)}),floatLE:p("floatLE",4).map(function(n){return n.readFloatLE(0)}),doubleBE:p("doubleBE",8).map(function(n){return n.readDoubleBE(0)}),doubleLE:p("doubleLE",8).map(function(n){return n.readDoubleLE(0)})},n.exports=e;}])});
}(parsimmon_umd_min));

var Parsimmon = /*@__PURE__*/getDefaultExportFromCjs(parsimmon_umd_min.exports);

let P = Parsimmon;

class Grammar {
    // General
    InlineWhitespace = _ => P.regex(/[^\S\n]+/).desc("inline whitespace")
    InlineOptWhitespace = _ => P.regex(/[^\S\n]*/).desc("inline optional whitespace")
    WhitespaceNewline = _ => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")
    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(_ => null).desc("null: ()")
    None = _ => P.string("None").map(_ => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")
    Boolean = _ => P.alt(P.string("True"), P.string("False")).map(v => v === "True" ? true : false).desc("either True or False")
    Number = _ => P.regex(/[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")
    Integer = _ => P.regex(/[0-9]+/).map(v => new Integer(v)).desc("an integer")
    String = _ => P.regex(/(?:[^"\\]|\\")*/).wrap(P.string('"'), P.string('"')).desc('string (with possibility to escape the quote using \")')
    Word = _ => P.regex(/[a-zA-Z]+/).desc("a word")
    Guid = _ => P.regex(/[0-9a-zA-Z]{32}/).map(v => new Guid(v)).desc("32 digit hexadecimal (accepts all the letters for safety) value")
    PathSymbolEntity = _ => P.regex(/[0-9a-zA-Z_]+/).map(v => new PathSymbolEntity({ value: v }))
    ReferencePath = r => P.seq(P.string("/"), r.PathSymbolEntity.map(v => v.toString()).sepBy1(P.string(".")).tieWith("."))
        .tie()
        .atLeast(2)
        .tie()
        .desc('a path (words with possibly underscore, separated by ".", separated by "/")')
    Reference = r => P.alt(
        r.None,
        r.ReferencePath.map(path => new ObjectReferenceEntity({ type: "", path: path })),
        P.seqMap(
            r.Word,
            P.optWhitespace,
            P.alt(P.string(`"`), P.string(`'"`)).chain(
                result => r.ReferencePath.skip(
                    P.string(result.split("").reverse().join(""))
                )
            ),
            (referenceType, _, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        )
    )
    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc('words separated by ""')
    AttributeAnyValue = r => P.alt(r.Null, r.None, r.Boolean, r.Number, r.Integer, r.String, r.Guid, r.Reference, r.LocalizedText)
    LocalizedText = r => P.seqMap(
        P.string("NSLOCTEXT").skip(P.optWhitespace).skip(P.string("(")),
        r.String.trim(P.optWhitespace), // namespace
        P.string(","),
        r.String.trim(P.optWhitespace), // key
        P.string(","),
        r.String.trim(P.optWhitespace), // value
        P.string(")"),
        (_, namespace, __, key, ___, value, ____) => new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value
        })
    )
    PinReference = r => P.seqMap(
        r.PathSymbolEntity,
        P.whitespace,
        r.Guid,
        (objectName, _, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid
        })
    )
    static getGrammarForType(r, attributeType, defaultGrammar) {
        switch (Utility.getType(attributeType)) {
            case Boolean:
                return r.Boolean
            case Number:
                return r.Number
            case Integer:
                return r.Integer
            case String:
                return r.String
            case Guid:
                return r.Guid
            case ObjectReferenceEntity:
                return r.Reference
            case LocalizedTextEntity:
                return r.LocalizedText
            case PinReferenceEntity:
                return r.PinReference
            case FunctionReferenceEntity:
                return r.FunctionReference
            case PinEntity:
                return r.Pin
            case Array:
                return P.seqMap(
                    P.string("("),
                    attributeType
                        .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                        .reduce((accum, cur) =>
                            !cur || accum === r.AttributeAnyValue
                                ? r.AttributeAnyValue
                                : accum.or(cur)
                        )
                        .trim(P.optWhitespace)
                        .sepBy(P.string(","))
                        .skip(P.regex(/,?\s*/)),
                    P.string(")"),
                    (_, grammar, __) => grammar
                )
            default:
                return defaultGrammar
        }
    }
    // Meta grammar
    static CreateAttributeGrammar = (r, attributeGrammar, attributeSupplier, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
        attributeGrammar.skip(valueSeparator)
            .chain(attributeName => {
                const attributeKey = attributeName.split(".");
                const attribute = attributeSupplier(attributeKey);
                let attributeValueGrammar = Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue);
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                ) // returns attributeSetter:  a function called with an object as argument that will set the correct attribute value
            })
    // Meta grammar
    static CreateMultiAttributeGrammar = (r, keyGrammar, entityType, attributeSupplier) =>
        /**
         * Basically this creates a parser that looks for a string like 'Key (A=False,B="Something",)'
         * Then it populates an object of type EntityType with the attribute values found inside the parentheses.
         */
        P.seqMap(
            P.seq(keyGrammar, P.optWhitespace, P.string("(")),
            Grammar.CreateAttributeGrammar(r, r.AttributeName, attributeSupplier)
                .trim(P.optWhitespace)
                .sepBy(P.string(","))
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma
            P.string(')'),
            (_, attributes, __) => {
                let result = new entityType();
                attributes.forEach(attributeSetter => attributeSetter(result));
                return result
            })
    FunctionReference = r => Grammar.CreateMultiAttributeGrammar(
        r,
        P.succeed(),
        FunctionReferenceEntity,
        attributeKey => Utility.objectGet(FunctionReferenceEntity.attributes, attributeKey)
    )
    Pin = r => Grammar.CreateMultiAttributeGrammar(
        r,
        P.string("Pin"),
        PinEntity,
        attributeKey => Utility.objectGet(PinEntity.attributes, attributeKey)
    )
    CustomProperties = r =>
        P.string("CustomProperties")
            .then(P.whitespace)
            .then(r.Pin)
            .map(pin => entity => {
                /** @type {Array} */
                let properties = Utility.objectGet(entity, ["CustomProperties"], []);
                properties.push(pin);
                Utility.objectSet(entity, ["CustomProperties"], properties, true);
            })

    Object = r => P.seqMap(
        P.seq(P.string("Begin"), P.whitespace, P.string("Object"), P.whitespace),
        P
            .alt(
                r.CustomProperties,
                Grammar.CreateAttributeGrammar(r, r.AttributeName, attributeKey => Utility.objectGet(ObjectEntity.attributes, attributeKey))
            )
            .sepBy1(P.whitespace),
        P.seq(r.WhitespaceNewline, P.string("End"), P.whitespace, P.string("Object")),
        (_, attributes, __) => {
            let result = new ObjectEntity();
            attributes.forEach(attributeSetter => attributeSetter(result));
            return result
        }
    )
    MultipleObject = r => r.Object.sepBy1(P.whitespace).trim(P.optWhitespace)
}

class Serializer {

    static grammar = Parsimmon.createLanguage(new Grammar())

    constructor(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        this.entityType = entityType;
        this.prefix = prefix ?? "";
        this.separator = separator ?? ",";
        this.trailingSeparator = trailingSeparator ?? false;
        this.attributeValueConjunctionSign = attributeValueConjunctionSign ?? "=";
        this.attributeKeyPrinter = attributeKeyPrinter ?? (k => k.join("."));
    }

    writeValue(value) {
        if (value === null) {
            return "()"
        }
        const serialize = v => SerializerFactory.getSerializer(Utility.getType(v)).write(v);
        // This is an exact match (and not instanceof) to hit also primitive types (by accessing value.constructor they are converted to objects automatically)
        switch (value?.constructor) {
            case Function:
                return this.writeValue(value())
            case Boolean:
                return Utility.FirstCapital(value.toString())
            case Number:
                return value.toString()
            case String:
                return `"${value}"`
        }
        if (value instanceof Array) {
            return `(${value.map(v => serialize(v) + ",")})`
        }
        if (value instanceof Entity) {
            return serialize(value)
        }
        if (value instanceof Primitive) {
            return value.toString()
        }
    }

    subWrite(key, object) {
        let result = "";
        let fullKey = key.concat("");
        const last = fullKey.length - 1;
        for (const property in object) {
            fullKey[last] = property;
            const value = object[property];
            if (object[property]?.constructor === Object) {
                // Recursive call when finding an object
                result += (result.length ? this.separator : "")
                    + this.subWrite(fullKey, value);
            } else if (this.showProperty(fullKey, value)) {
                result += (result.length ? this.separator : "")
                    + this.prefix
                    + this.attributeKeyPrinter(fullKey)
                    + this.attributeValueConjunctionSign
                    + this.writeValue(value);
            }
        }
        if (this.trailingSeparator && result.length && fullKey.length === 0) {
            // append separator at the end if asked and there was printed content
            result += this.separator;
        }
        return result
    }

    showProperty(attributeKey, attributeValue) {
        const attributes = this.entityType.attributes;
        const attribute = Utility.objectGet(attributes, attributeKey);
        if (attribute instanceof TypeInitialization) {
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}

class ObjectSerializer extends Serializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false);
    }

    showProperty(attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately
                return false
        }
        return super.showProperty(attributeKey, attributeValue)
    }

    read(value) {
        const parseResult = Serializer.grammar.Object.parse(value);
        if (!parseResult.status) {
            console.error("Error when trying to parse the object.");
            return parseResult
        }
        return parseResult.value
    }

    /**
     * 
     * @param {String} value 
     * @returns {ObjectEntity[]}
     */
    readMultiple(value) {
        const parseResult = Serializer.grammar.MultipleObject.parse(value);
        if (!parseResult.status) {
            console.error("Error when trying to parse the object.");
            return parseResult
        }
        return parseResult.value
    }

    /**
     * 
     * @param {ObjectEntity} object 
     * @returns 
     */
    write(object) {
        let result = `Begin Object Class=${this.writeValue(object.Class)} Name=${this.writeValue(object.Name)}
${this.subWrite([], object)
            + object
                .CustomProperties.map(pin => this.separator + this.prefix + "CustomProperties " + SerializerFactory.getSerializer(PinEntity).write(pin))
                .join("")}
End Object`;
        return result
    }
}

class Paste extends Context {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);
        this.serializer = new ObjectSerializer();
        let self = this;
        this.pasteHandle = e => self.pasted(e.clipboardData.getData("Text"));
    }

    blueprintFocused() {
        document.body.addEventListener("paste", this.pasteHandle);
    }

    blueprintUnfocused() {
        document.body.removeEventListener("paste", this.pasteHandle);
    }

    pasted(value) {
        let top = Number.MAX_SAFE_INTEGER;
        let left = Number.MAX_SAFE_INTEGER;
        let nodes = this.serializer.readMultiple(value).map(entity => {
            let node = new GraphNode(entity);
            top = Math.min(top, node.location[1]);
            left = Math.min(left, node.location[0]);
            return node
        });
        let mousePosition = this.blueprint.entity.mousePosition;
        nodes.forEach(node => {
            const locationOffset = [
                mousePosition[0] - left,
                mousePosition[1] - top
            ];
            node.addLocation(locationOffset);
        });
        this.blueprint.addNode(...nodes);
    }
}

class Select extends MouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.selectorElement = this.blueprint.selectorElement;
    }

    startDrag() {
        this.selectorElement.startSelecting(this.clickedPosition);
    }

    dragTo(location, movement) {
        this.selectorElement.doSelecting(location);
    }

    endDrag() {
        if (this.started) {
            this.selectorElement.finishSelecting();
        } else {
            this.blueprint.unselectAll();
        }
    }
}

class Unfocus extends Context {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);

        let self = this;
        this.clickHandler = e => self.clickedSomewhere(e);
        if (this.blueprint.focuse) {
            document.addEventListener("click", this.clickHandler);
        }
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    clickedSomewhere(e) {
        // If target is inside the blueprint grid
        if (e.target.closest("u-blueprint")) {
            return
        }
        this.blueprint.setFocused(false);
    }

    blueprintFocused() {
        document.addEventListener("click", this.clickHandler);
    }

    blueprintUnfocused() {
        document.removeEventListener("click", this.clickHandler);
    }
}

class MouseWheel extends Pointing {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../Blueprint").default} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);
        this.looseTarget = options?.looseTarget ?? true;
        let self = this;

        this.mouseWheelHandler = e => {
            e.preventDefault();
            const location = self.getLocation(e);
            self.wheel(Math.sign(e.deltaY), location);
        };
        this.mouseParentWheelHandler = e => e.preventDefault();

        if (this.blueprint.focused) {
            this.movementSpace.addEventListener('wheel', this.mouseWheelHandler, false);
        }
    }

    blueprintFocused() {
        this.movementSpace.addEventListener('wheel', this.mouseWheelHandler, false);
        this.movementSpace.parentElement?.addEventListener('wheel', this.mouseParentWheelHandler);
    }

    blueprintUnfocused() {
        this.movementSpace.removeEventListener('wheel', this.mouseWheelHandler, false);
        this.movementSpace.parentElement?.removeEventListener('wheel', this.mouseParentWheelHandler);
    }

    /* Subclasses will override the following method */
    wheel(variation, location) {
    }
}

class Zoom extends MouseWheel {

    wheel(variation, location) {
        let zoomLevel = this.blueprint.getZoom();
        zoomLevel -= variation;
        this.blueprint.setZoom(zoomLevel, location);
    }
}

class Copy extends Context {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);
        this.serializer = new ObjectSerializer();
        let self = this;
        this.copyHandle = _ => self.copied();
    }

    blueprintFocused() {
        document.body.addEventListener("copy", this.copyHandle);
    }

    blueprintUnfocused() {
        document.body.removeEventListener("copy", this.copyHandle);
    }

    copied() {
        const value = this.blueprint.getNodes(true).map(node => this.serializer.write(node.entity)).join("\n");
        navigator.clipboard.writeText(value);
    }
}

/** @typedef {import("./graph/GraphNode").default} GraphNode */
class Blueprint extends GraphElement {

    constructor() {
        super(new BlueprintData(), new BlueprintTemplate());
        /** @type {HTMLElement} */
        this.gridElement = null;
        /** @type {HTMLElement} */
        this.viewportElement = null;
        /** @type {HTMLElement} */
        this.overlayElement = null;
        /** @type {GraphSelector} */
        this.selectorElement = null;
        /** @type {HTMLElement} */
        this.nodesContainerElement = null;
        this.dragObject = null;
        this.selectObject = null;
        /** @type {number} */
        this.zoom = 0;
        /** @type {HTMLElement} */
        this.headerElement = null;
        this.focused = false;
        /** @type {(node: GraphNode) => BoundariesInfo} */
        this.nodeBoundariesSupplier = node => {
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
        /** @type {(node: GraphNode, selected: bool) => void}} */
        this.nodeSelectToggleFunction = (node, selected) => {
            node.setSelected(selected);
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.classList.add('ueb', `ueb-zoom-${this.zoom}`);

        this.headerElement = this.querySelector('.ueb-viewport-header');
        console.assert(this.headerElement, "Header element not provided by the template.");
        this.overlayElement = this.querySelector('.ueb-viewport-overlay');
        console.assert(this.overlayElement, "Overlay element not provided by the template.");
        this.viewportElement = this.querySelector('.ueb-viewport-body');
        console.assert(this.viewportElement, "Viewport element not provided by the template.");
        this.gridElement = this.viewportElement.querySelector('.ueb-grid');
        console.assert(this.gridElement, "Grid element not provided by the template.");
        this.selectorElement = new GraphSelector();
        this.nodesContainerElement = this.querySelector('[data-nodes]');
        console.assert(this.nodesContainerElement, "Nodes container element not provided by the template.");
        this.nodesContainerElement.append(this.selectorElement);
        this.querySelector('[data-nodes]').append(...this.entity.nodes);


        this.copyObject = new Copy(this.getGridDOMElement(), this);
        this.pasteObject = new Paste(this.getGridDOMElement(), this);

        this.dragObject = new DragScroll(this.getGridDOMElement(), this, {
            clickButton: 2,
            moveEverywhere: true,
            exitAnyButton: false
        });

        this.zoomObject = new Zoom(this.getGridDOMElement(), this, {
            looseTarget: true
        });

        this.selectObject = new Select(this.getGridDOMElement(), this, {
            clickButton: 0,
            moveEverywhere: true,
            exitAnyButton: true
        });

        this.unfocusObject = new Unfocus(this.getGridDOMElement(), this);
        this.mouseTrackingObject = new MouseTracking(this.getGridDOMElement(), this);
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        setSelected(false);
        this.dragObject.unlistenDOMElement();
        this.selectObject.unlistenDOMElement();
        this.pasteObject.unlistenDOMElement();
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
            if (delta[i] < 0 && finalScroll[i] < 0.25 * this.entity.expandGridSize) {
                // Expand if scrolling is diminishing and the remainig space is less that a quarter of an expansion step
                expand[i] = finalScroll[i];
                if (expand[i] > 0) {
                    // Final scroll is still in rage (more than zero) but we want to expand to negative (left or top)
                    expand[i] = -this.entity.expandGridSize;
                }
            } else if (delta[i] > 0 && finalScroll[i] > scrollMax[i] - 0.25 * this.entity.expandGridSize) {
                // Expand if scrolling is increasing and the remainig space is less that a quarter of an expansion step
                expand[i] = finalScroll[i] - scrollMax[i];
                if (expand[i] < 0) {
                    // Final scroll is still in rage (less than the maximum scroll) but we want to expand to positive (right or bottom)
                    expand[i] = this.entity.expandGridSize;
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
            this.entity.translateValue[0] - scroll[0],
            this.entity.translateValue[1] - scroll[1]
        ];
        const targetOffset = this.getViewportSize().map(size => size / 2);
        const deltaOffset = [
            offset[0] - targetOffset[0],
            offset[1] - targetOffset[1]
        ];
        this.scrollDelta(deltaOffset, true);
    }

    getExpandGridSize() {
        return this.entity.expandGridSize
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
        this.entity.additional = [this.entity.additional[0] + x, this.entity.additional[1] + y];
        if (this.gridElement) {
            this.gridElement.style.setProperty('--ueb-additional-x', this.entity.additional[0]);
            this.gridElement.style.setProperty('--ueb-additional-y', this.entity.additional[1]);
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
        this.entity.translateValue = [this.entity.translateValue[0] + x, this.entity.translateValue[1] + y];
        if (this.gridElement) {
            this.gridElement.style.setProperty('--ueb-translate-x', this.entity.translateValue[0]);
            this.gridElement.style.setProperty('--ueb-translate-y', this.entity.translateValue[1]);
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
        return this.entity.expandGridSize * Math.round(x / this.entity.expandGridSize + 0.5 * Math.sign(x))
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
        position[0] -= this.entity.translateValue[0];
        position[1] -= this.entity.translateValue[1];
        return position
    }

    /**
     * 
     * @returns {GraphNode[]} Nodes
     */
    getNodes(selected = false) {
        if (selected) {
            return this.entity.nodes.filter(
                /**
                 * 
                 * @param {GraphNode} node 
                 */
                node => node.selected
            )
        } else {
            return this.entity.nodes
        }
    }

    /**
     * Unselect all nodes
     */
    unselectAll() {
        this.entity.nodes.forEach(node => this.nodeSelectToggleFunction(node, false));
    }

    /**
     * 
     * @param  {...GraphNode} graphNodes 
     */
    addNode(...graphNodes) {
        [...graphNodes].reduce(
            (s, e) => {
                s.push(e);
                return s
            },
            this.entity.nodes);
        if (this.nodesContainerElement) {
            this.nodesContainerElement.append(...graphNodes);
        }
    }

    setFocused(value = true) {
        if (this.focused == value) {
            return;
        }
        let event = new CustomEvent(value ? "blueprintfocus" : "blueprintunfocus");
        this.focused = value;
        this.dataset.focused = this.focused;
        if (!this.focused) {
            this.unselectAll();
        }
        this.dispatchEvent(event);
    }
}

customElements.define('u-blueprint', Blueprint);

class GeneralSerializer extends Serializer {

    constructor(wrap, entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        super(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter);
        this.wrap = wrap ?? (v => `(${v})`);
    }

    read(value) {
        let grammar = Grammar.getGrammarForType(Serializer.grammar, this.entityType);
        const parseResult = grammar.parse(value);
        if (!parseResult.status) {
            console.error("Error when trying to parse the entity " + this.entityType.prototype.constructor.name);
            return parseResult
        }
        return parseResult.value
    }

    write(object) {
        let result = this.wrap(this.subWrite([], object));
        return result
    }
}

class CustomSerializer extends GeneralSerializer {

    constructor(objectWriter, entityType) {
        super(undefined, entityType);
        this.objectWriter = objectWriter;
    }

    write(object) {
        let result = this.objectWriter(object);
        return result
    }
}

class GraphLink extends GraphElement {

    /**
     * 
     * @typedef {{
     *      node: String,
     *      pin: String
     * }} PinReference
     * @param {?PinReference} source 
     * @param {?PinReference} destination 
     */
    constructor(source, destination) {
        super();
        this.source = source;
        this.destination = destination;
    }

    render() {
        return `
            <svg viewBox="0 0 100 100">
                <line x1="0" y1="80" x2="100" y2="20" stroke="black" />
            </svg>
        `
    }
}

customElements.define('u-link', GraphLink);

class ToStringSerializer extends GeneralSerializer {

    constructor(entityType) {
        super(undefined, entityType);
    }

    write(object) {
        let result = object.toString();
        return result
    }
}

SerializerFactory.registerSerializer(
    ObjectEntity,
    new ObjectSerializer()
);
SerializerFactory.registerSerializer(
    PinEntity,
    new GeneralSerializer(v => `Pin (${v})`, PinEntity, "", ",", true)
);
SerializerFactory.registerSerializer(
    FunctionReferenceEntity,
    new GeneralSerializer(v => `(${v})`, FunctionReferenceEntity, "", ",", false)
);
SerializerFactory.registerSerializer(
    LocalizedTextEntity,
    new GeneralSerializer(v => `NSLOCTEXT(${v})`, LocalizedTextEntity, "", ",", false, "", _ => "")
);
SerializerFactory.registerSerializer(
    PinReferenceEntity,
    new GeneralSerializer(v => v, PinReferenceEntity, "", " ", false, "", _ => "")
);
SerializerFactory.registerSerializer(
    ObjectReferenceEntity,
    new CustomSerializer(
        /** @param {ObjectReferenceEntity} objectReference */
        objectReference => (objectReference.type ?? "") + (
            objectReference.path
                ? objectReference.type ? `'"${objectReference.path}"'` : objectReference.path
                : ""
        ))
);
SerializerFactory.registerSerializer(PathSymbolEntity, new ToStringSerializer(PathSymbolEntity));

export { Blueprint, GraphLink, GraphNode };
