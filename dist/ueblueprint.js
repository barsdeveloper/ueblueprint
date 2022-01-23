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
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/Entity").default} Entity
 * @typedef {import("../input/Context").default} Context
 * @typedef {import("../template/Template").default} Template
 */

class GraphElement extends HTMLElement {

    /**
     * 
     * @param {Entity} entity The entity containing blueprint related data for this graph element
     * @param {Template} template The template to render this node
     */
    constructor(entity, template) {
        super();
        /** @type {Blueprint} */
        this.blueprint = null;
        /** @type {Entity} */
        this.entity = entity;
        /** @type {Template} */
        this.template = template;
        /** @type {Context[]} */
        this.inputObjects = [];
    }

    getTemplate() {
        return this.template
    }

    connectedCallback() {
        this.blueprint = this.closest("ueb-blueprint");
        this.template.apply(this);
        this.inputObjects = this.createInputObjects();
    }

    disconnectedCallback() {
        this.inputObjects.forEach(v => v.unlistenDOMElement());
    }

    createInputObjects() {
        return []
    }
}

document.createElement("div");

const tagReplacement = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
};

function sanitizeText(value) {
    if (value.constructor === String) {
        return value.replace(/[&<>'"]/g, tag => tagReplacement[tag])
    }
    return value
}

/**
 * @typedef {import("../graph/GraphElement").default} GraphElement
 */
class Template {

    /**
     * Computes the html content of the target element.
     * @param {GraphElement} entity Element of the graph
     * @returns The result html 
     */
    render(entity) {
        return ""
    }

    /**
     * Applies the style to the element.
     * @param {GraphElement} element Element of the graph
     */
    apply(element) {
        // TODO replace with the safer element.setHTML(...) when it will be available
        element.innerHTML = this.render(element);
    }
}

/**
 * @typedef {import("../graph/GraphSelector").default} GraphSelector
 */
class SelectorTemplate extends Template {

    /**
     * Applies the style to the element.
     * @param {GraphSelector} selector Selector element
     */
    apply(selector) {
        super.apply(selector);
        this.applyFinishSelecting(selector);
    }

    /**
     * Applies the style relative to selection beginning.
     * @param {GraphSelector} selector Selector element
     */
    applyStartSelecting(selector, initialPosition) {
        // Set initial position
        selector.style.setProperty("--ueb-from-x", sanitizeText(initialPosition[0]));
        selector.style.setProperty("--ueb-from-y", sanitizeText(initialPosition[1]));
        // Final position coincide with the initial position, at the beginning of selection
        selector.style.setProperty("--ueb-to-x", sanitizeText(initialPosition[0]));
        selector.style.setProperty("--ueb-to-y", sanitizeText(initialPosition[1]));
        selector.dataset.selecting = "true";
    }

    /**
     * Applies the style relative to selection.
     * @param {GraphSelector} selector Selector element
     */
    applyDoSelecting(selector, finalPosition) {
        selector.style.setProperty("--ueb-to-x", sanitizeText(finalPosition[0]));
        selector.style.setProperty("--ueb-to-y", sanitizeText(finalPosition[1]));
    }

    /**
     * Applies the style relative to selection finishing.
     * @param {GraphSelector} selector Selector element
     */
    applyFinishSelecting(selector) {
        selector.dataset.selecting = "false";
    }
}

class GraphSelector extends GraphElement {

    constructor() {
        super({}, new SelectorTemplate());
        this.selectionModel = null;
        /** @type {SelectorTemplate} */
        this.template;
    }

    /**
     * Create a selection rectangle starting from the specified position
     * @param {number[]} initialPosition - Selection rectangle initial position (relative to the .ueb-grid element)
     */
    startSelecting(initialPosition) {
        initialPosition = this.blueprint.compensateTranslation(initialPosition);
        this.template.applyStartSelecting(this, initialPosition);
        this.selectionModel = new FastSelectionModel(initialPosition, this.blueprint.getNodes(), this.blueprint.nodeBoundariesSupplier, this.blueprint.nodeSelectToggleFunction);
    }

    /**
     * Move selection rectagle to the specified final position. The initial position was specified by startSelecting()
     * @param {number[]} finalPosition - Selection rectangle final position (relative to the .ueb-grid element)
     */
    doSelecting(finalPosition) {
        finalPosition = this.blueprint.compensateTranslation(finalPosition);
        this.template.applyDoSelecting(this, finalPosition);
        this.selectionModel.selectTo(finalPosition);
    }

    finishSelecting() {
        this.template.applyFinishSelecting(this);
        this.selectionModel = null;
    }
}

customElements.define("ueb-selector", GraphSelector);

/**
 * This solves the sole purpose of providing compression capability for html inside template literals strings. Check rollup.config.js function minifyHTML()
 */
const html = String.raw;

/** @typedef {import("../Blueprint").default} Blueprint */
class BlueprintTemplate extends Template {
    header(element) {
        return html`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
        `
    }

    overlay() {
        return html`
            <div class="ueb-viewport-overlay"></div>
        `
    }

    /**
     * 
     * @param {Blueprint} element 
     * @returns 
     */
    viewport(element) {
        return html`
            <div class="ueb-viewport-body">
                <div class="ueb-grid"
                    style="
                        --ueb-additional-x:${sanitizeText(element.additional[0])};
                        --ueb-additional-y:${sanitizeText(element.additional[1])};
                        --ueb-translate-x:${sanitizeText(element.translateValue[0])};
                        --ueb-translate-y:${sanitizeText(element.translateValue[1])};
                    ">
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
        return html`
            ${this.header(element)}
            ${this.overlay(element)}
            ${this.viewport(element)}
        `
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    apply(blueprint) {
        super.apply(blueprint);
        blueprint.classList.add("ueb", `ueb-zoom-${blueprint.zoom}`);
        blueprint.headerElement = blueprint.querySelector('.ueb-viewport-header');
        blueprint.overlayElement = blueprint.querySelector('.ueb-viewport-overlay');
        blueprint.viewportElement = blueprint.querySelector('.ueb-viewport-body');
        blueprint.gridElement = blueprint.viewportElement.querySelector(".ueb-grid");
        blueprint.nodesContainerElement = blueprint.querySelector("[data-nodes]");
        blueprint.selectorElement = new GraphSelector();
        blueprint.nodesContainerElement.append(blueprint.selectorElement, ...blueprint.nodes);
        this.applyEndDragScrolling(blueprint);
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyZoom(blueprint, newZoom) {
        blueprint.classList.remove("ueb-zoom-" + sanitizeText(blueprint.zoom));
        blueprint.classList.add("ueb-zoom-" + sanitizeText(newZoom));
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyExpand(blueprint) {
        blueprint.gridElement.style.setProperty("--ueb-additional-x", sanitizeText(blueprint.additional[0]));
        blueprint.gridElement.style.setProperty("--ueb-additional-y", sanitizeText(blueprint.additional[1]));
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyTranlate(blueprint) {
        blueprint.gridElement.style.setProperty("--ueb-translate-x", sanitizeText(blueprint.translateValue[0]));
        blueprint.gridElement.style.setProperty("--ueb-translate-y", sanitizeText(blueprint.translateValue[1]));
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyStartDragScrolling(blueprint) {
        blueprint.gridElement.dataset.dragScrolling = true;
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyEndDragScrolling(blueprint) {
        blueprint.gridElement.dataset.dragScrolling = false;
    }
}

class Configuration {

    static deleteNodesKeyboardKey = "Delete"
    static expandGridSize = 400
    static gridSize = 16
    static selectAllKeyboardKey = "Ctrl+A"
    static keysSeparator = "+"
    static ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta"
    ]
    static Keys = {
        "Backspace": "Backspace",
        "Tab": "Tab",
        "Enter": "Enter",
        "Pause": "Pause",
        "CapsLock": "CapsLock",
        "Escape": "Escape",
        "Space": "Space",
        "PageUp": "PageUp",
        "PageDown": "PageDown",
        "End": "End",
        "Home": "Home",
        "ArrowLeft": "ArrowLeft",
        "ArrowUp": "ArrowUp",
        "ArrowRight": "ArrowRight",
        "ArrowDown": "ArrowDown",
        "PrintScreen": "PrintScreen",
        "Insert": "Insert",
        "Delete": "Delete",
        "Digit0": "Digit0",
        "Digit1": "Digit1",
        "Digit2": "Digit2",
        "Digit3": "Digit3",
        "Digit4": "Digit4",
        "Digit5": "Digit5",
        "Digit6": "Digit6",
        "Digit7": "Digit7",
        "Digit8": "Digit8",
        "Digit9": "Digit9",
        "A": "KeyA",
        "B": "KeyB",
        "C": "KeyC",
        "D": "KeyD",
        "E": "KeyE",
        "F": "KeyF",
        "G": "KeyG",
        "H": "KeyH",
        "I": "KeyI",
        "K": "KeyK",
        "L": "KeyL",
        "M": "KeyM",
        "N": "KeyN",
        "O": "KeyO",
        "P": "KeyP",
        "Q": "KeyQ",
        "R": "KeyR",
        "S": "KeyS",
        "T": "KeyT",
        "U": "KeyU",
        "V": "KeyV",
        "W": "KeyW",
        "X": "KeyX",
        "Y": "KeyY",
        "Z": "KeyZ",
        "Numpad0": "Numpad0",
        "Numpad1": "Numpad1",
        "Numpad2": "Numpad2",
        "Numpad3": "Numpad3",
        "Numpad4": "Numpad4",
        "Numpad5": "Numpad5",
        "Numpad6": "Numpad6",
        "Numpad7": "Numpad7",
        "Numpad8": "Numpad8",
        "Numpad9": "Numpad9",
        "NumpadMultiply": "NumpadMultiply",
        "NumpadAdd": "NumpadAdd",
        "NumpadSubtract": "NumpadSubtract",
        "NumpadDecimal": "NumpadDecimal",
        "NumpadDivide": "NumpadDivide",
        "F1": "F1",
        "F2": "F2",
        "F3": "F3",
        "F4": "F4",
        "F5": "F5",
        "F6": "F6",
        "F7": "F7",
        "F8": "F8",
        "F9": "F9",
        "F10": "F10",
        "F11": "F11",
        "F12": "F12",
        "NumLock": "NumLock",
        "ScrollLock": "ScrollLock",
    }
}

class Context {

    constructor(target, blueprint, options) {
        /** @type {HTMLElement} */
        this.target = target;
        /** @type {import("../Blueprint").default}" */
        this.blueprint = blueprint;
        this.options = options;
        let self = this;
        this.blueprintFocusHandler = _ => self.blueprintFocused();
        this.blueprintUnfocusHandler = _ => self.blueprintUnfocused();
        if (options?.wantsFocusCallback ?? false) {
            this.blueprint.addEventListener("blueprint-focus", this.blueprintFocusHandler);
            this.blueprint.addEventListener("blueprint-unfocus", this.blueprintUnfocusHandler);
        }
    }

    unlistenDOMElement() {
        this.blueprintUnfocused();
        this.blueprint.removeEventListener("blueprint-focus", this.blueprintFocusHandler);
        this.blueprint.removeEventListener("blueprint-unfocus", this.blueprintUnfocusHandler);
    }


    /* Subclasses will probabily override the following methods */
    blueprintFocused() {
    }

    blueprintUnfocused() {
    }
}

class TypeInitialization {

    static sanitize(value) {
        if (!(value instanceof Object)) {
            return value // Is already primitive
        }
        if (value instanceof Boolean || value instanceof Number || value instanceof String) {
            return value.valueOf()
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
        return getComputedStyle(element).getPropertyValue("--ueb-scale")
    }

    static convertLocation(viewportLocation, movementElement) {
        const scaleCorrection = 1 / Utility.getScale(movementElement);
        const targetOffset = movementElement.getBoundingClientRect();
        let location = [
            Math.round((viewportLocation[0] - targetOffset.x) * scaleCorrection),
            Math.round((viewportLocation[1] - targetOffset.y) * scaleCorrection)
        ];
        return location
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

    /**
     * 
     * @param {Number[]} location 
     * @param {Number} gridSize 
     */
    static snapToGrid(location, gridSize = Configuration.gridSize) {
        if (gridSize === 1) {
            return location
        }
        return [
            gridSize * Math.round(location[0] / gridSize),
            gridSize * Math.round(location[1] / gridSize)
        ]
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

class ObjectReferenceEntity extends Entity {

    static attributes = {
        type: String,
        path: String
    }

    getAttributes() {
        return ObjectReferenceEntity.attributes
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

class GuidEntity extends Entity {

    static attributes = {
        value: String
    }

    static generateGuid(random = true) {
        let values = new Uint32Array(4);
        if (random === true) {
            crypto.getRandomValues(values);
        }
        let guid = "";
        values.forEach(n => {
            guid += ("0".repeat(8) + n.toString(16).toUpperCase()).slice(-8);
        });
        return new GuidEntity({ valud: guid })
    }

    getAttributes() {
        return GuidEntity.attributes
    }

    toString() {
        return this.value
    }
}

class IntegerEntity extends Entity {

    static attributes = {
        value: Number
    }

    getAttributes() {
        return IntegerEntity.attributes
    }

    constructor(options = {}) {
        if (options.constructor === Number || options.constructor === String) {
            options = {
                value: options
            };
        }
        super(options);
        this.value = Math.round(this.value);
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value.toString()
    }
}

class LocalizedTextEntity extends Entity {

    static lookbehind = "NSLOCTEXT"
    static attributes = {
        namespace: String,
        key: String,
        value: String
    }

    getAttributes() {
        return LocalizedTextEntity.attributes
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
        pinGuid: GuidEntity
    }

    getAttributes() {
        return PinReferenceEntity.attributes
    }
}

class PinEntity$1 extends Entity {

    static lookbehind = "Pin"
    static attributes = {
        PinId: GuidEntity,
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
        PersistentGuid: GuidEntity,
        bHidden: false,
        bNotConnectable: false,
        bDefaultValueIsReadOnly: false,
        bDefaultValueIsIgnored: false,
        bAdvancedView: false,
        bOrphanedPin: false,
    }

    getAttributes() {
        return PinEntity$1.attributes
    }

    isInput() {
        return !this.bHidden && this.Direction !== "EGPD_Output"
    }

    isOutput() {
        return !this.bHidden && this.Direction === "EGPD_Output"
    }

    isConnected() {
        return this.LinkedTo.length > 0
    }

    getType() {
        return this.PinType.PinCategory ?? "object"
    }
}

class VariableReferenceEntity extends Entity {

    static attributes = {
        MemberName: String,
        MemberGuid: GuidEntity,
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
        EventReference: new TypeInitialization(FunctionReferenceEntity, false, null,),
        TargetType: new TypeInitialization(ObjectReferenceEntity, false, null),
        NodePosX: IntegerEntity,
        NodePosY: IntegerEntity,
        NodeGuid: GuidEntity,
        ErrorType: new TypeInitialization(IntegerEntity, false),
        ErrorMsg: new TypeInitialization(String, false, ""),
        CustomProperties: [PinEntity$1]
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var parsimmon_umd_min = {exports: {}};

(function (module, exports) {
!function(n,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,function(){return function(n){var t={};function r(e){if(t[e])return t[e].exports;var u=t[e]={i:e,l:!1,exports:{}};return n[e].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e});},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0});},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){function e(n){if(!(this instanceof e))return new e(n);this._=n;}var u=e.prototype;function o(n,t){for(var r=0;r<n;r++)t(r);}function i(n,t,r){return function(n,t){o(t.length,function(r){n(t[r],r,t);});}(function(r,e,u){t=n(t,r,e,u);},r),t}function f(n,t){return i(function(t,r,e,u){return t.concat([n(r,e,u)])},[],t)}function a(n,t){var r={v:0,buf:t};return o(n,function(){var n;r={v:r.v<<1|(n=r.buf,n[0]>>7),buf:function(n){var t=i(function(n,t,r,e){return n.concat(r===e.length-1?Buffer.from([t,0]).readUInt16BE(0):e.readUInt16BE(r))},[],n);return Buffer.from(f(function(n){return (n<<1&65535)>>8},t))}(r.buf)};}),r}function c(){return "undefined"!=typeof Buffer}function s(){if(!c())throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")}function l(n){s();var t=i(function(n,t){return n+t},0,n);if(t%8!=0)throw new Error("The bits ["+n.join(", ")+"] add up to "+t+" which is not an even number of bytes; the total should be divisible by 8");var r,u=t/8,o=(r=function(n){return n>48},i(function(n,t){return n||(r(t)?t:n)},null,n));if(o)throw new Error(o+" bit range requested exceeds 48 bit (6 byte) Number max.");return new e(function(t,r){var e=u+r;return e>t.length?x(r,u.toString()+" bytes"):b(e,i(function(n,t){var r=a(t,n.buf);return {coll:n.coll.concat(r.v),buf:r.buf}},{coll:[],buf:t.slice(r,e)},n).coll)})}function p(n,t){return new e(function(r,e){return s(),e+t>r.length?x(e,t+" bytes for "+n):b(e+t,r.slice(e,e+t))})}function h(n,t){if("number"!=typeof(r=t)||Math.floor(r)!==r||t<0||t>6)throw new Error(n+" requires integer length in range [0, 6].");var r;}function d(n){return h("uintBE",n),p("uintBE("+n+")",n).map(function(t){return t.readUIntBE(0,n)})}function v(n){return h("uintLE",n),p("uintLE("+n+")",n).map(function(t){return t.readUIntLE(0,n)})}function g(n){return h("intBE",n),p("intBE("+n+")",n).map(function(t){return t.readIntBE(0,n)})}function m(n){return h("intLE",n),p("intLE("+n+")",n).map(function(t){return t.readIntLE(0,n)})}function y(n){return n instanceof e}function E(n){return "[object Array]"==={}.toString.call(n)}function w(n){return c()&&Buffer.isBuffer(n)}function b(n,t){return {status:!0,index:n,value:t,furthest:-1,expected:[]}}function x(n,t){return E(t)||(t=[t]),{status:!1,index:-1,value:null,furthest:n,expected:t}}function B(n,t){if(!t)return n;if(n.furthest>t.furthest)return n;var r=n.furthest===t.furthest?function(n,t){if(function(){if(void 0!==e._supportsSet)return e._supportsSet;var n="undefined"!=typeof Set;return e._supportsSet=n,n}()&&Array.from){for(var r=new Set(n),u=0;u<t.length;u++)r.add(t[u]);var o=Array.from(r);return o.sort(),o}for(var i={},f=0;f<n.length;f++)i[n[f]]=!0;for(var a=0;a<t.length;a++)i[t[a]]=!0;var c=[];for(var s in i)({}).hasOwnProperty.call(i,s)&&c.push(s);return c.sort(),c}(n.expected,t.expected):t.expected;return {status:n.status,index:n.index,value:n.value,furthest:t.furthest,expected:r}}var j={};function S(n,t){if(w(n))return {offset:t,line:-1,column:-1};n in j||(j[n]={});for(var r=j[n],e=0,u=0,o=0,i=t;i>=0;){if(i in r){e=r[i].line,0===o&&(o=r[i].lineStart);break}"\n"===n.charAt(i)&&(u++,0===o&&(o=i+1)),i--;}var f=e+u,a=t-o;return r[t]={line:f,lineStart:o},{offset:t,line:f+1,column:a+1}}function _(n){if(!y(n))throw new Error("not a parser: "+n)}function L(n,t){return "string"==typeof n?n.charAt(t):n[t]}function O(n){if("number"!=typeof n)throw new Error("not a number: "+n)}function k(n){if("function"!=typeof n)throw new Error("not a function: "+n)}function P(n){if("string"!=typeof n)throw new Error("not a string: "+n)}var q=2,A=3,I=8,F=5*I,M=4*I,z="  ";function R(n,t){return new Array(t+1).join(n)}function U(n,t,r){var e=t-n.length;return e<=0?n:R(r,e)+n}function W(n,t,r,e){return {from:n-t>0?n-t:0,to:n+r>e?e:n+r}}function D(n,t){var r,e,u,o,a,c=t.index,s=c.offset,l=1;if(s===n.length)return "Got the end of the input";if(w(n)){var p=s-s%I,h=s-p,d=W(p,F,M+I,n.length),v=f(function(n){return f(function(n){return U(n.toString(16),2,"0")},n)},function(n,t){var r=n.length,e=[],u=0;if(r<=t)return [n.slice()];for(var o=0;o<r;o++)e[u]||e.push([]),e[u].push(n[o]),(o+1)%t==0&&u++;return e}(n.slice(d.from,d.to).toJSON().data,I));o=function(n){return 0===n.from&&1===n.to?{from:n.from,to:n.to}:{from:n.from/I,to:Math.floor(n.to/I)}}(d),e=p/I,r=3*h,h>=4&&(r+=1),l=2,u=f(function(n){return n.length<=4?n.join(" "):n.slice(0,4).join(" ")+"  "+n.slice(4).join(" ")},v),(a=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(a=2);}else {var g=n.split(/\r\n|[\n\r\u2028\u2029]/);r=c.column-1,e=c.line-1,o=W(e,q,A,g.length),u=g.slice(o.from,o.to),a=o.to.toString().length;}var m=e-o.from;return w(n)&&(a=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(a=2),i(function(t,e,u){var i,f=u===m,c=f?"> ":z;return i=w(n)?U((8*(o.from+u)).toString(16),a,"0"):U((o.from+u+1).toString(),a," "),[].concat(t,[c+i+" | "+e],f?[z+R(" ",a)+" | "+U("",r," ")+R("^",l)]:[])},[],u).join("\n")}function N(n,t){return ["\n","-- PARSING FAILED "+R("-",50),"\n\n",D(n,t),"\n\n",(r=t.expected,1===r.length?"Expected:\n\n"+r[0]:"Expected one of the following: \n\n"+r.join(", ")),"\n"].join("");var r;}function G(n){return void 0!==n.flags?n.flags:[n.global?"g":"",n.ignoreCase?"i":"",n.multiline?"m":"",n.unicode?"u":"",n.sticky?"y":""].join("")}function C(){for(var n=[].slice.call(arguments),t=n.length,r=0;r<t;r+=1)_(n[r]);return e(function(r,e){for(var u,o=new Array(t),i=0;i<t;i+=1){if(!(u=B(n[i]._(r,e),u)).status)return u;o[i]=u.value,e=u.index;}return B(b(e,o),u)})}function J(){var n=[].slice.call(arguments);if(0===n.length)throw new Error("seqMap needs at least one argument");var t=n.pop();return k(t),C.apply(null,n).map(function(n){return t.apply(null,n)})}function T(){var n=[].slice.call(arguments),t=n.length;if(0===t)return Y("zero alternates");for(var r=0;r<t;r+=1)_(n[r]);return e(function(t,r){for(var e,u=0;u<n.length;u+=1)if((e=B(n[u]._(t,r),e)).status)return e;return e})}function V(n,t){return H(n,t).or(X([]))}function H(n,t){return _(n),_(t),J(n,t.then(n).many(),function(n,t){return [n].concat(t)})}function K(n){P(n);var t="'"+n+"'";return e(function(r,e){var u=e+n.length,o=r.slice(e,u);return o===n?b(u,o):x(e,t)})}function Q(n,t){!function(n){if(!(n instanceof RegExp))throw new Error("not a regexp: "+n);for(var t=G(n),r=0;r<t.length;r++){var e=t.charAt(r);if("i"!==e&&"m"!==e&&"u"!==e&&"s"!==e)throw new Error('unsupported regexp flag "'+e+'": '+n)}}(n),arguments.length>=2?O(t):t=0;var r=function(n){return RegExp("^(?:"+n.source+")",G(n))}(n),u=""+n;return e(function(n,e){var o=r.exec(n.slice(e));if(o){if(0<=t&&t<=o.length){var i=o[0],f=o[t];return b(e+i.length,f)}return x(e,"valid match group (0 to "+o.length+") in "+u)}return x(e,u)})}function X(n){return e(function(t,r){return b(r,n)})}function Y(n){return e(function(t,r){return x(r,n)})}function Z(n){if(y(n))return e(function(t,r){var e=n._(t,r);return e.index=r,e.value="",e});if("string"==typeof n)return Z(K(n));if(n instanceof RegExp)return Z(Q(n));throw new Error("not a string, regexp, or parser: "+n)}function $(n){return _(n),e(function(t,r){var e=n._(t,r),u=t.slice(r,e.index);return e.status?x(r,'not "'+u+'"'):b(r,null)})}function nn(n){return k(n),e(function(t,r){var e=L(t,r);return r<t.length&&n(e)?b(r+1,e):x(r,"a character/byte matching "+n)})}function tn(n,t){arguments.length<2&&(t=n,n=void 0);var r=e(function(n,e){return r._=t()._,r._(n,e)});return n?r.desc(n):r}function rn(){return Y("fantasy-land/empty")}u.parse=function(n){if("string"!=typeof n&&!w(n))throw new Error(".parse must be called with a string or Buffer as its argument");var t,r=this.skip(fn)._(n,0);return t=r.status?{status:!0,value:r.value}:{status:!1,index:S(n,r.furthest),expected:r.expected},delete j[n],t},u.tryParse=function(n){var t=this.parse(n);if(t.status)return t.value;var r=N(n,t),e=new Error(r);throw e.type="ParsimmonError",e.result=t,e},u.assert=function(n,t){return this.chain(function(r){return n(r)?X(r):Y(t)})},u.or=function(n){return T(this,n)},u.trim=function(n){return this.wrap(n,n)},u.wrap=function(n,t){return J(n,this,t,function(n,t){return t})},u.thru=function(n){return n(this)},u.then=function(n){return _(n),C(this,n).map(function(n){return n[1]})},u.many=function(){var n=this;return e(function(t,r){for(var e=[],u=void 0;;){if(!(u=B(n._(t,r),u)).status)return B(b(r,e),u);if(r===u.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");r=u.index,e.push(u.value);}})},u.tieWith=function(n){return P(n),this.map(function(t){if(function(n){if(!E(n))throw new Error("not an array: "+n)}(t),t.length){P(t[0]);for(var r=t[0],e=1;e<t.length;e++)P(t[e]),r+=n+t[e];return r}return ""})},u.tie=function(){return this.tieWith("")},u.times=function(n,t){var r=this;return arguments.length<2&&(t=n),O(n),O(t),e(function(e,u){for(var o=[],i=void 0,f=void 0,a=0;a<n;a+=1){if(f=B(i=r._(e,u),f),!i.status)return f;u=i.index,o.push(i.value);}for(;a<t&&(f=B(i=r._(e,u),f),i.status);a+=1)u=i.index,o.push(i.value);return B(b(u,o),f)})},u.result=function(n){return this.map(function(){return n})},u.atMost=function(n){return this.times(0,n)},u.atLeast=function(n){return J(this.times(n),this.many(),function(n,t){return n.concat(t)})},u.map=function(n){k(n);var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(b(u.index,n(u.value)),u):u})},u.contramap=function(n){k(n);var t=this;return e(function(r,e){var u=t.parse(n(r.slice(e)));return u.status?b(e+r.length,u.value):u})},u.promap=function(n,t){return k(n),k(t),this.contramap(n).map(t)},u.skip=function(n){return C(this,n).map(function(n){return n[0]})},u.mark=function(){return J(en,this,en,function(n,t,r){return {start:n,value:t,end:r}})},u.node=function(n){return J(en,this,en,function(t,r,e){return {name:n,value:r,start:t,end:e}})},u.sepBy=function(n){return V(this,n)},u.sepBy1=function(n){return H(this,n)},u.lookahead=function(n){return this.skip(Z(n))},u.notFollowedBy=function(n){return this.skip($(n))},u.desc=function(n){E(n)||(n=[n]);var t=this;return e(function(r,e){var u=t._(r,e);return u.status||(u.expected=n),u})},u.fallback=function(n){return this.or(X(n))},u.ap=function(n){return J(n,this,function(n,t){return n(t)})},u.chain=function(n){var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(n(u.value)._(r,u.index),u):u})},u.concat=u.or,u.empty=rn,u.of=X,u["fantasy-land/ap"]=u.ap,u["fantasy-land/chain"]=u.chain,u["fantasy-land/concat"]=u.concat,u["fantasy-land/empty"]=u.empty,u["fantasy-land/of"]=u.of,u["fantasy-land/map"]=u.map;var en=e(function(n,t){return b(t,S(n,t))}),un=e(function(n,t){return t>=n.length?x(t,"any character/byte"):b(t+1,L(n,t))}),on=e(function(n,t){return b(n.length,n.slice(t))}),fn=e(function(n,t){return t<n.length?x(t,"EOF"):b(t,null)}),an=Q(/[0-9]/).desc("a digit"),cn=Q(/[0-9]*/).desc("optional digits"),sn=Q(/[a-z]/i).desc("a letter"),ln=Q(/[a-z]*/i).desc("optional letters"),pn=Q(/\s*/).desc("optional whitespace"),hn=Q(/\s+/).desc("whitespace"),dn=K("\r"),vn=K("\n"),gn=K("\r\n"),mn=T(gn,vn,dn).desc("newline"),yn=T(mn,fn);e.all=on,e.alt=T,e.any=un,e.cr=dn,e.createLanguage=function(n){var t={};for(var r in n)({}).hasOwnProperty.call(n,r)&&function(r){t[r]=tn(function(){return n[r](t)});}(r);return t},e.crlf=gn,e.custom=function(n){return e(n(b,x))},e.digit=an,e.digits=cn,e.empty=rn,e.end=yn,e.eof=fn,e.fail=Y,e.formatError=N,e.index=en,e.isParser=y,e.lazy=tn,e.letter=sn,e.letters=ln,e.lf=vn,e.lookahead=Z,e.makeFailure=x,e.makeSuccess=b,e.newline=mn,e.noneOf=function(n){return nn(function(t){return n.indexOf(t)<0}).desc("none of '"+n+"'")},e.notFollowedBy=$,e.of=X,e.oneOf=function(n){for(var t=n.split(""),r=0;r<t.length;r++)t[r]="'"+t[r]+"'";return nn(function(t){return n.indexOf(t)>=0}).desc(t)},e.optWhitespace=pn,e.Parser=e,e.range=function(n,t){return nn(function(r){return n<=r&&r<=t}).desc(n+"-"+t)},e.regex=Q,e.regexp=Q,e.sepBy=V,e.sepBy1=H,e.seq=C,e.seqMap=J,e.seqObj=function(){for(var n,t={},r=0,u=(n=arguments,Array.prototype.slice.call(n)),o=u.length,i=0;i<o;i+=1){var f=u[i];if(!y(f)){if(E(f)&&2===f.length&&"string"==typeof f[0]&&y(f[1])){var a=f[0];if(Object.prototype.hasOwnProperty.call(t,a))throw new Error("seqObj: duplicate key "+a);t[a]=!0,r++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(0===r)throw new Error("seqObj expects at least one named parser, found zero");return e(function(n,t){for(var r,e={},i=0;i<o;i+=1){var f,a;if(E(u[i])?(f=u[i][0],a=u[i][1]):(f=null,a=u[i]),!(r=B(a._(n,t),r)).status)return r;f&&(e[f]=r.value),t=r.index;}return B(b(t,e),r)})},e.string=K,e.succeed=X,e.takeWhile=function(n){return k(n),e(function(t,r){for(var e=r;e<t.length&&n(L(t,e));)e++;return b(e,t.slice(r,e))})},e.test=nn,e.whitespace=hn,e["fantasy-land/empty"]=rn,e["fantasy-land/of"]=X,e.Binary={bitSeq:l,bitSeqObj:function(n){s();var t={},r=0,e=f(function(n){if(E(n)){var e=n;if(2!==e.length)throw new Error("["+e.join(", ")+"] should be length 2, got length "+e.length);if(P(e[0]),O(e[1]),Object.prototype.hasOwnProperty.call(t,e[0]))throw new Error("duplicate key in bitSeqObj: "+e[0]);return t[e[0]]=!0,r++,e}return O(n),[null,n]},n);if(r<1)throw new Error("bitSeqObj expects at least one named pair, got ["+n.join(", ")+"]");var u=f(function(n){return n[0]},e);return l(f(function(n){return n[1]},e)).map(function(n){return i(function(n,t){return null!==t[0]&&(n[t[0]]=t[1]),n},{},f(function(t,r){return [t,n[r]]},u))})},byte:function(n){if(s(),O(n),n>255)throw new Error("Value specified to byte constructor ("+n+"=0x"+n.toString(16)+") is larger in value than a single byte.");var t=(n>15?"0x":"0x0")+n.toString(16);return e(function(r,e){var u=L(r,e);return u===n?b(e+1,u):x(e,t)})},buffer:function(n){return p("buffer",n).map(function(n){return Buffer.from(n)})},encodedString:function(n,t){return p("string",t).map(function(t){return t.toString(n)})},uintBE:d,uint8BE:d(1),uint16BE:d(2),uint32BE:d(4),uintLE:v,uint8LE:v(1),uint16LE:v(2),uint32LE:v(4),intBE:g,int8BE:g(1),int16BE:g(2),int32BE:g(4),intLE:m,int8LE:m(1),int16LE:m(2),int32LE:m(4),floatBE:p("floatBE",4).map(function(n){return n.readFloatBE(0)}),floatLE:p("floatLE",4).map(function(n){return n.readFloatLE(0)}),doubleBE:p("doubleBE",8).map(function(n){return n.readDoubleBE(0)}),doubleLE:p("doubleLE",8).map(function(n){return n.readDoubleLE(0)})},n.exports=e;}])});
}(parsimmon_umd_min));

var Parsimmon = /*@__PURE__*/getDefaultExportFromCjs(parsimmon_umd_min.exports);

let P$1 = Parsimmon;

class Grammar {
    // General
    InlineWhitespace = _ => P$1.regex(/[^\S\n]+/).desc("inline whitespace")
    InlineOptWhitespace = _ => P$1.regex(/[^\S\n]*/).desc("inline optional whitespace")
    WhitespaceNewline = _ => P$1.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")
    Null = r => P$1.seq(P$1.string("("), r.InlineOptWhitespace, P$1.string(")")).map(_ => null).desc("null: ()")
    None = _ => P$1.string("None").map(_ => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")
    Boolean = _ => P$1.alt(P$1.string("True"), P$1.string("False")).map(v => v === "True" ? true : false).desc("either True or False")
    Number = _ => P$1.regex(/[\-\+]?[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")
    Integer = _ => P$1.regex(/[\-\+]?[0-9]+/).map(v => new IntegerEntity(v)).desc("an integer")
    String = _ => P$1.regex(/(?:[^"\\]|\\.)*/).wrap(P$1.string('"'), P$1.string('"')).desc('string (with possibility to escape the quote using \")')
    Word = _ => P$1.regex(/[a-zA-Z]+/).desc("a word")
    Guid = _ => P$1.regex(/[0-9a-zA-Z]{32}/).map(v => new GuidEntity({ value: v })).desc("32 digit hexadecimal (accepts all the letters for safety) value")
    PathSymbolEntity = _ => P$1.regex(/[0-9a-zA-Z_]+/).map(v => new PathSymbolEntity({ value: v }))
    ReferencePath = r => P$1.seq(P$1.string("/"), r.PathSymbolEntity.map(v => v.toString()).sepBy1(P$1.string(".")).tieWith("."))
        .tie()
        .atLeast(2)
        .tie()
        .desc('a path (words with possibly underscore, separated by ".", separated by "/")')
    Reference = r => P$1.alt(
        r.None,
        r.ReferencePath.map(path => new ObjectReferenceEntity({ type: "", path: path })),
        P$1.seqMap(
            r.Word,
            P$1.optWhitespace,
            P$1.alt(P$1.string(`"`), P$1.string(`'"`)).chain(
                result => r.ReferencePath.skip(
                    P$1.string(result.split("").reverse().join(""))
                )
            ),
            (referenceType, _, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        )
    )
    AttributeName = r => r.Word.sepBy1(P$1.string(".")).tieWith(".").desc('words separated by ""')
    AttributeAnyValue = r => P$1.alt(r.Null, r.None, r.Boolean, r.Number, r.Integer, r.String, r.Guid, r.Reference, r.LocalizedText)
    LocalizedText = r => P$1.seqMap(
        P$1.string(LocalizedTextEntity.lookbehind).skip(P$1.optWhitespace).skip(P$1.string("(")),
        r.String.trim(P$1.optWhitespace), // namespace
        P$1.string(","),
        r.String.trim(P$1.optWhitespace), // key
        P$1.string(","),
        r.String.trim(P$1.optWhitespace), // value
        P$1.string(")"),
        (_, namespace, __, key, ___, value, ____) => new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value
        })
    )
    PinReference = r => P$1.seqMap(
        r.PathSymbolEntity,
        P$1.whitespace,
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
            case IntegerEntity:
                return r.Integer
            case String:
                return r.String
            case GuidEntity:
                return r.Guid
            case ObjectReferenceEntity:
                return r.Reference
            case LocalizedTextEntity:
                return r.LocalizedText
            case PinReferenceEntity:
                return r.PinReference
            case FunctionReferenceEntity:
                return r.FunctionReference
            case PinEntity$1:
                return r.Pin
            case Array:
                return P$1.seqMap(
                    P$1.string("("),
                    attributeType
                        .map(v => Grammar.getGrammarForType(r, Utility.getType(v)))
                        .reduce((accum, cur) =>
                            !cur || accum === r.AttributeAnyValue
                                ? r.AttributeAnyValue
                                : accum.or(cur)
                        )
                        .trim(P$1.optWhitespace)
                        .sepBy(P$1.string(","))
                        .skip(P$1.regex(/,?\s*/)),
                    P$1.string(")"),
                    (_, grammar, __) => grammar
                )
            default:
                return defaultGrammar
        }
    }
    // Meta grammar
    static CreateAttributeGrammar = (r, entityType, valueSeparator = P$1.string("=").trim(P$1.optWhitespace)) =>
        r.AttributeName.skip(valueSeparator)
            .chain(attributeName => {
                const attributeKey = attributeName.split(".");
                const attribute = Utility.objectGet(entityType.attributes, attributeKey);
                let attributeValueGrammar = Grammar.getGrammarForType(r, attribute, r.AttributeAnyValue);
                // Returns attributeSetter: a function called with an object as argument that will set the correct attribute value
                return attributeValueGrammar.map(attributeValue =>
                    entity => Utility.objectSet(entity, attributeKey, attributeValue, true)
                )
            })
    // Meta grammar
    static CreateMultiAttributeGrammar = (r, entityType) =>
        /**
         * Basically this creates a parser that looks for a string like 'Key (A=False,B="Something",)'
         * Then it populates an object of type EntityType with the attribute values found inside the parentheses.
         */
        P$1.seqMap(
            entityType.lookbehind
                ? P$1.seq(P$1.string(entityType.lookbehind), P$1.optWhitespace, P$1.string("("))
                : P$1.string("("),
            Grammar.CreateAttributeGrammar(r, entityType)
                .trim(P$1.optWhitespace)
                .sepBy(P$1.string(","))
                .skip(P$1.regex(/,?/).then(P$1.optWhitespace)), // Optional trailing comma
            P$1.string(')'),
            (_, attributes, __) => {
                let result = new entityType();
                attributes.forEach(attributeSetter => attributeSetter(result));
                return result
            })
    FunctionReference = r => Grammar.CreateMultiAttributeGrammar(r, FunctionReferenceEntity)
    Pin = r => Grammar.CreateMultiAttributeGrammar(r, PinEntity$1)
    CustomProperties = r =>
        P$1.string("CustomProperties")
            .then(P$1.whitespace)
            .then(r.Pin)
            .map(pin => entity => {
                /** @type {Array} */
                let properties = Utility.objectGet(entity, ["CustomProperties"], []);
                properties.push(pin);
                Utility.objectSet(entity, ["CustomProperties"], properties, true);
            })

    Object = r => P$1.seqMap(
        P$1.seq(P$1.string("Begin"), P$1.whitespace, P$1.string("Object"), P$1.whitespace),
        P$1
            .alt(
                r.CustomProperties,
                Grammar.CreateAttributeGrammar(r, ObjectEntity)
            )
            .sepBy1(P$1.whitespace),
        P$1.seq(r.WhitespaceNewline, P$1.string("End"), P$1.whitespace, P$1.string("Object")),
        (_, attributes, __) => {
            let result = new ObjectEntity();
            attributes.forEach(attributeSetter => attributeSetter(result));
            return result
        }
    )
    MultipleObject = r => r.Object.sepBy1(P$1.whitespace).trim(P$1.optWhitespace)
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
                .CustomProperties.map(pin => this.separator + this.prefix + "CustomProperties " + SerializerFactory.getSerializer(PinEntity$1).write(pin))
                .join("")}
End Object`;
        return result
    }
}

class Copy extends Context {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);
        this.serializer = new ObjectSerializer();
        let self = this;
        this.copyHandler = _ => {
            self.copied();
            return true
        };
    }

    blueprintFocused() {
        document.body.addEventListener("copy", this.copyHandler);
    }

    blueprintUnfocused() {
        document.body.removeEventListener("copy", this.copyHandler);
    }

    copied() {
        const value = this.blueprint.getNodes(true).map(node => this.serializer.write(node.entity)).join("\n");
        navigator.clipboard.writeText(value);
    }
}

/**
 * @typedef {import("../graph/GraphLink").default} GraphLink
 */
class LinkTemplate extends Template {

    /**
     * Computes the html content of the target element.
     * @param {GraphLink} link Link connecting two graph nodes 
     * @returns The result html 
     */
    render(link) {
        return html`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 0 C 20 0, 30 0, 50 50 S 70 100, 100 100" stroke="black" stroke-width="2" fill="none" vector-effect="non-scaling-stroke" />
            </svg>
        `
    }

    /**
     * Applies the style to the element.
     * @param {GraphLink} link Element of the graph
     */
    apply(link) {
        super.apply(link);
    }

    /**
     * Applies the style relative to the source pin location.
     * @param {GraphLink} link Link element
     */
    applySourceLocation(link, initialPosition) {
        link.style.setProperty("--ueb-from-input", link.originatesFromInput ? "1" : "0");
        // Set initial position
        link.style.setProperty("--ueb-from-x", sanitizeText(initialPosition[0]));
        link.style.setProperty("--ueb-from-y", sanitizeText(initialPosition[1]));
    }

    /**
     * Applies the style relative to the destination pin location.
     * @param {GraphLink} link Link element
     */
    applyDestinationLocation(link, finalPosition) {
        link.style.setProperty("--ueb-to-x", sanitizeText(finalPosition[0]));
        link.style.setProperty("--ueb-to-y", sanitizeText(finalPosition[1]));
    }
}

/**
 * @typedef {import("./GraphPin").default} GraphPin
 */
class GraphLink extends GraphElement {

    /** @type {GraphPin} */
    #source
    /** @type {GraphPin} */
    #destination
    #nodeDeleteHandler = _ => this.blueprint.removeGraphElement(this)
    #nodeDragSourceHandler = _ => this.setSourceLocation(this.#source.getLinkLocation())
    #nodeDragDestinatonHandler = _ => this.setDestinationLocation(this.#destination.getLinkLocation())

    /**
     * @param {?GraphPin} source
     * @param {?GraphPin} destination
     */
    constructor(source, destination) {
        super({}, new LinkTemplate());
        /** @type {import("../template/LinkTemplate").default} */
        this.template;
        this.originatesFromInput = false;
        this.setSourcePin(source);
        this.setDestinationPin(destination);
    }

    setSourceLocation(location) {
        if (location == null) {
            location = this.#source.template.getLinkLocation(this.#source);
        }
        this.template.applySourceLocation(this, location);
    }

    setDestinationLocation(location) {
        if (location == null) {
            location = this.#destination.template.getLinkLocation(this.#destination);
        }
        this.template.applyDestinationLocation(this, location);
    }


    getSourcePin() {
        return this.#source
    }

    /**
     * @param {GraphPin} graphPin 
     */
    setSourcePin(graphPin) {
        this.#source?.removeEventListener("ueb-node-delete", this.#nodeDeleteHandler);
        this.#source?.removeEventListener("ueb-node-drag", this.#nodeDragSourceHandler);
        this.#source = graphPin;
        this.originatesFromInput = graphPin.isInput();
        this.#source?.addEventListener("ueb-node-delete", this.#nodeDeleteHandler);
        this.#source?.addEventListener("ueb-node-drag", this.#nodeDragSourceHandler);
        this.setSourceLocation();
    }

    getDestinationPin() {
        return this.#destination
    }

    /**
     * 
     * @param {GraphPin} graphPin 
     */
    setDestinationPin(graphPin) {
        this.#destination?.removeEventListener("ueb-node-delete", this.#nodeDeleteHandler);
        this.#destination?.removeEventListener("ueb-node-drag", this.#nodeDragDestinatonHandler);
        this.#destination = graphPin;
        this.#destination?.addEventListener("ueb-node-delete", this.#nodeDeleteHandler);
        this.#destination?.addEventListener("ueb-node-drag", this.#nodeDragDestinatonHandler);
    }
}

customElements.define("ueb-link", GraphLink);

/**
 * @typedef {import("../graph/GraphPin").default} GraphPin
 */
class PinTemplate extends Template {

    /**
     * Computes the html content of the pin.
     * @param {GraphPin} pin Pin entity 
     * @returns The result html 
     */
    render(pin) {
        if (pin.isInput()) {
            return html`
                <span class="ueb-node-value-icon ${pin.isConnected() ? 'ueb-node-value-fill' : ''}"></span>
                ${sanitizeText(pin.getPinDisplayName())}
            `
        } else {
            return html`
                ${sanitizeText(pin.getPinDisplayName())}
                <span class="ueb-node-value-icon ${pin.isConnected() ? 'ueb-node-value-fill' : ''}"></span>
            `
        }
    }

    /**
     * Applies the style to the element.
     * @param {GraphPin} pin Element of the graph
     */
    apply(pin) {
        super.apply(pin);
        pin.classList.add(
            "ueb-node-" + (pin.isInput() ? "input" : pin.isOutput() ? "output" : "hidden"), "ueb-node-value-" + sanitizeText(pin.getType()));
        pin.clickableElement = pin;
    }

    /**
     * 
     * @param {GraphPin} pin 
     * @returns 
     */
    getLinkLocation(pin) {
        const rect = pin.querySelector(".ueb-node-value-icon").getBoundingClientRect();
        return Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            pin.blueprint.gridElement)
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
    locationFromEvent(mouseEvent) {
        return Utility.convertLocation([mouseEvent.clientX, mouseEvent.clientY], this.movementSpace)
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
                        e.preventDefault();
                        e.stopPropagation();
                        self.started = false;
                        // Attach the listeners
                        movementListenedElement.addEventListener("mousemove", self.mouseStartedMovingHandler);
                        document.addEventListener("mouseup", self.mouseUpHandler);
                        self.clickedPosition = self.locationFromEvent(e);
                        self.clicked(self.clickedPosition);
                        return true
                    }
                    break
                default:
                    if (!self.exitAnyButton) {
                        self.mouseUpHandler(e);
                    }
                    break
            }
            return false
        };

        this.mouseStartedMovingHandler = e => {
            e.preventDefault();
            e.stopPropagation();

            // Delegate from now on to self.mouseMoveHandler
            movementListenedElement.removeEventListener("mousemove", self.mouseStartedMovingHandler);
            movementListenedElement.addEventListener("mousemove", self.mouseMoveHandler);

            // Do actual actions
            self.startDrag();
            self.started = true;
        };

        this.mouseMoveHandler = e => {
            e.preventDefault();
            e.stopPropagation();
            const location = self.locationFromEvent(e);
            const movement = [e.movementX, e.movementY];
            self.dragTo(location, movement);
        };

        this.mouseUpHandler = e => {
            if (!self.exitAnyButton || e.button == self.clickButton) {
                // Remove the handlers of "mousemove" and "mouseup"
                movementListenedElement.removeEventListener("mousemove", self.mouseStartedMovingHandler);
                movementListenedElement.removeEventListener("mousemove", self.mouseMoveHandler);
                document.removeEventListener("mouseup", self.mouseUpHandler);
                self.endDrag();
            }
        };

        this.target.addEventListener("mousedown", this.mouseDownHandler);
        if (this.clickButton == 2) {
            this.target.addEventListener("contextmenu", this.preventDefault);
        }
    }

    preventDefault(e) {
        e.preventDefault();
    }

    unlistenDOMElement() {
        super.unlistenDOMElement();
        this.target.removeEventListener("mousedown", this.mouseDownHandler);
        if (this.clickButton == 2) {
            this.target.removeEventListener("contextmenu", this.preventDefault);
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

class MouseCreateLink extends MouseClickDrag {

    /** @type {(e: MouseEvent) => void} */
    #mouseenterHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseleaveHandler

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        /** @type {import("../../graph/GraphPin").default} */
        this.target;
        /** @type {import("../../graph/GraphLink").default} */
        this.link;
        /** @type {import("../../entity/PinEntity").default} */
        this.enteredPin;

        let self = this;
        this.#mouseenterHandler = e => {
            if (!self.enteredPin) {
                self.enteredPin = e.target;
            }
        };
        this.#mouseleaveHandler = e => {
            if (self.enteredPin == e.target) {
                self.enteredPin = null;
            }
        };
    }

    startDrag() {
        this.link = new GraphLink(this.target, null);
        this.blueprint.nodesContainerElement.insertBefore(this.link, this.blueprint.selectorElement.nextElementSibling);
        this.blueprint.querySelectorAll("ueb-pin." + this.target.isInput() ? "output" : "input")
            .forEach(pin => {
                pin.addEventListener("mouseenter", this.#mouseenterHandler);
                pin.addEventListener("mouseleave", this.#mouseleaveHandler);
            });
    }

    dragTo(location, movement) {
        this.link.setDestinationLocation(location);
    }

    endDrag() {
        this.blueprint.querySelectorAll("ueb-pin." + this.target.isInput() ? "output" : "input")
            .forEach(pin => {
                pin.removeEventListener("mouseenter", this.#mouseenterHandler);
                pin.removeEventListener("mouseleave", this.#mouseleaveHandler);
            });
        if (this.enteredPin) {
            this.link.setDestinationPin(this.link);
        }
        this.link = null;
    }
}

class GraphPin extends GraphElement {

    constructor(entity) {
        super(entity, new PinTemplate());
        /** @type {import("../entity/PinEntity").default} */
        this.entity;
        /** @type {PinTemplate} */
        this.template;
        /** @type {HTMLElement} */
        this.clickableElement = null;
    }

    createInputObjects() {
        return [
            new MouseCreateLink(this.clickableElement, this.blueprint, {
                moveEverywhere: true,
                looseTarget: true
            }),
        ]
    }

    /**
     * 
     * @returns {String}
     */
    getPinDisplayName() {
        return this.entity.PinName
    }

    getAttributes() {
        return PinEntity.attributes
    }

    isInput() {
        return this.entity.isInput()
    }

    isOutput() {
        return this.entity.isOutput()
    }

    isConnected() {
        return this.entity.isConnected()
    }

    getType() {
        return this.entity.getType()
    }

    /**
     * Returns The exact location where the link originates from or arrives at.
     * @returns {Number[]} The location array
     */
    getLinkLocation() {
        return [0, 0];
    }
}

customElements.define("ueb-pin", GraphPin);

/**
 * @typedef {import("../graph/SelectableDraggable").default} SelectableDraggable
 */
class SelectableDraggableTemplate extends Template {

    /**
     * Returns the html elements rendered from this template.
     * @param {SelectableDraggable} element Element of the graph
     */
    applyLocation(element) {
        element.style.setProperty("--ueb-position-x", sanitizeText(element.location[0]));
        element.style.setProperty("--ueb-position-y", sanitizeText(element.location[1]));
    }

    /**
     * Returns the html elements rendered from this template.
     * @param {SelectableDraggable} element Element of the graph
     */
    applySelected(element) {
        if (element.selected) {
            element.classList.add("ueb-selected");
        } else {
            element.classList.remove("ueb-selected");
        }
    }
}

/**
 * @typedef {import("../graph/GraphNode").default} GraphNode
 */
class NodeTemplate extends SelectableDraggableTemplate {

    /**
     * Computes the html content of the target element.
     * @param {GraphNode} node Graph node element 
     * @returns The result html 
     */
    header(node) {
        return html`
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {GraphNode} node Graph node element 
     * @returns The result html 
     */
    body(node) {
        let inputs = node.entity.CustomProperties.filter(v => v instanceof PinEntity$1);
        inputs.filter(v => v.isOutput());
        inputs = inputs.filter(v => v.isInput());
        return html`
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {GraphNode} node Graph node element 
     * @returns The result html 
     */
    render(node) {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    <div class="ueb-node-header">
                        <span class="ueb-node-name">
                            <span class="ueb-node-symbol"></span>
                            <span class="ueb-node-text">${sanitizeText(node.entity.getNodeDisplayName())}</span>
                        </span>
                    </div>
                    <div class="ueb-node-body">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
                </div>
            </div>
        `
    }

    /**
     * Applies the style to the element.
     * @param {GraphNode} node Element of the graph
     */
    apply(node) {
        super.apply(node);
        if (node.selected) {
            node.classList.add("ueb-selected");
        }
        node.style.setProperty("--ueb-position-x", sanitizeText(node.location[0]));
        node.style.setProperty("--ueb-position-y", sanitizeText(node.location[1]));
        /** @type {HTMLElement} */
        let inputContainer = node.querySelector(".ueb-node-inputs");
        /** @type {HTMLElement} */
        let outputContainer = node.querySelector(".ueb-node-outputs");
        let pins = node.getPinEntities();
        pins.filter(v => v.isInput()).forEach(v => inputContainer.appendChild(new GraphPin(v)));
        pins.filter(v => v.isOutput()).forEach(v => outputContainer.appendChild(new GraphPin(v)));
    }
}

/**
 * @typedef {import("../../graph/SelectableDraggable").default} SelectableDraggable
 */
class MouseMoveNodes extends MouseClickDrag {

    /**
     * 
     * @param {SelectableDraggable} target 
     * @param {*} blueprint 
     * @param {*} options 
     */
    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.stepSize = parseInt(options?.stepSize ?? this.blueprint.gridSize);
        this.mouseLocation = [0, 0];
        /** @type {SelectableDraggable} */
        this.target;
    }

    startDrag() {
        // Get the current mouse position
        this.mouseLocation = Utility.snapToGrid(this.clickedPosition, this.stepSize);
    }

    dragTo(location, movement) {
        const [mouseLocation, targetLocation] = this.stepSize > 1
            ? [Utility.snapToGrid(location, this.stepSize), Utility.snapToGrid(this.target.location, this.stepSize)]
            : [location, this.target.location];
        const d = [
            mouseLocation[0] - this.mouseLocation[0],
            mouseLocation[1] - this.mouseLocation[1]
        ];

        if (d[0] == 0 && d[1] == 0) {
            return
        }

        // Make sure it snaps on the grid
        d[0] += targetLocation[0] - this.target.location[0];
        d[1] += targetLocation[1] - this.target.location[1];

        this.target.dispatchDragEvent(d);

        // Reassign the position of mouse
        this.mouseLocation = mouseLocation;
    }
}

class SelectableDraggable extends GraphElement {

    constructor(...args) {
        super(...args);
        this.dragObject = null;
        this.location = [0, 0];
        this.selected = false;
        /** @type {import("../template/SelectableDraggableTemplate").default} */
        this.template;

        let self = this;
        this.dragHandler = (e) => {
            self.addLocation(e.detail.value);
        };
    }

    createInputObjects() {
        return [
            new MouseMoveNodes(this, this.blueprint, {
                looseTarget: true
            }),
        ]
    }

    setLocation(value = [0, 0]) {
        this.location = value;
        this.template.applyLocation(this);
    }

    addLocation(value) {
        this.setLocation([this.location[0] + value[0], this.location[1] + value[1]]);
    }

    setSelected(value = true) {
        if (this.selected == value) {
            return
        }
        this.selected = value;
        if (this.selected) {
            this.blueprint.addEventListener("ueb-node-drag", this.dragHandler);
        } else {
            this.blueprint.removeEventListener("ueb-node-drag", this.dragHandler);
        }
        this.template.applySelected(this);
    }

    dispatchDragEvent(value) {
        if (!this.selected) {
            this.blueprint.unselectAll();
            this.setSelected(true);
        }
        let dragEvent = new CustomEvent("ueb-node-drag", {
            detail: {
                instigator: this,
                value: value
            },
            cancelable: true
        });
        this.blueprint.dispatchEvent(dragEvent);
    }

    snapToGrid() {
        let snappedLocation = this.blueprint.snapToGrid(this.location);
        if (this.location[0] != snappedLocation[0] || this.location[1] != snappedLocation[1]) {
            this.setLocation(snappedLocation);
        }
    }
}

class GraphNode extends SelectableDraggable {

    /**
     * 
     * @param {ObjectEntity} entity 
     */
    constructor(entity) {
        super(entity, new NodeTemplate());
        /** @type {ObjectEntity} */
        this.entity;
        this.dragLinkObjects = [];
        super.setLocation([this.entity.NodePosX, this.entity.NodePosY]);
    }

    static fromSerializedObject(str) {
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str);
        return new GraphNode(entity)
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispatchDeleteEvent();
    }

    /**
     * 
     * @returns {PinEntity[]}
     */
    getPinEntities() {
        return this.entity.CustomProperties.filter(v => v instanceof PinEntity$1)
    }

    connectedCallback() {
        this.getAttribute("type")?.trim();
        super.connectedCallback();
    }

    setLocation(value = [0, 0]) {
        let nodeType = this.entity.NodePosX.constructor;
        this.entity.NodePosX = new nodeType(value[0]);
        this.entity.NodePosY = new nodeType(value[1]);
        super.setLocation(value);
    }

    dispatchDeleteEvent(value) {
        let dragEvent = new CustomEvent("ueb-node-delete", {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(dragEvent);
    }
}

customElements.define("ueb-node", GraphNode);

let P = Parsimmon;

class KeyGrammar {

    // Creates a grammar where each alternative is the string from ModifierKey mapped to a number for bit or use
    ModifierKey = r => P.alt(...Configuration.ModifierKeys.map((v, i) => P.string(v).map(_ => 1 << i)))
    Key = r => P.alt(...Object.keys(Configuration.Keys).map(v => P.string(v))).map(v => Configuration.Keys[v])
    KeyboardShortcut = r => P.alt(
        P.seqMap(
            P.seqMap(r.ModifierKey, P.optWhitespace, P.string(Configuration.keysSeparator), (v, _, __) => v)
                .atLeast(1)
                .map(v => v.reduce((acc, cur) => acc | cur)),
            P.optWhitespace,
            r.Key,
            (modifierKeysFlag, _, key) => ({
                key: key,
                ctrlKey: Boolean(modifierKeysFlag & (1 << Configuration.ModifierKeys.indexOf("Ctrl"))),
                shiftKey: Boolean(modifierKeysFlag & (1 << Configuration.ModifierKeys.indexOf("Shift"))),
                altKey: Boolean(modifierKeysFlag & (1 << Configuration.ModifierKeys.indexOf("Alt"))),
                metaKey: Boolean(modifierKeysFlag & (1 << Configuration.ModifierKeys.indexOf("Meta")))
            })
        ),
        r.Key.map(v => ({ key: v }))
    )
        .trim(P.optWhitespace)
}

class KeyboardShortcut extends Context {

    static keyGrammar = P.createLanguage(new KeyGrammar())

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);

        /** @type {String[]} */
        this.key = this.options.key;
        this.ctrlKey = options.ctrlKey ?? false;
        this.shiftKey = options.shiftKey ?? false;
        this.altKey = options.altKey ?? false;
        this.metaKey = options.metaKey ?? false;

        let self = this;
        this.keyDownHandler = e => {
            if (
                e.code == self.key
                && e.ctrlKey === self.ctrlKey
                && e.shiftKey === self.shiftKey
                && e.altKey === self.altKey
                && e.metaKey === self.metaKey
            ) {
                self.fire();
                e.preventDefault();
                return true
            }
            return false
        };
    }

    /**
     * 
     * @param {String} keyString
     * @returns {Object}
     */
    static keyOptionsParse(options, keyString) {
        options = {
            ...options,
            ...KeyboardShortcut.keyGrammar.KeyboardShortcut.parse(keyString).value
        };
        return options
    }

    blueprintFocused() {
        document.addEventListener("keydown", this.keyDownHandler);
    }

    blueprintUnfocused() {
        document.removeEventListener("keydown", this.keyDownHandler);
    }

    fire() {
    }
}

class KeyvoardCanc extends KeyboardShortcut {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../../Blueprint").default} blueprint 
     * @param {OBject} options 
     */
    constructor(target, blueprint, options = {}) {
        options = KeyboardShortcut.keyOptionsParse(options, Configuration.deleteNodesKeyboardKey);
        super(target, blueprint, options);
    }

    fire() {
        this.blueprint.removeGraphElement(...this.blueprint.getNodes(true));
    }
}

class KeyboardSelectAll extends KeyboardShortcut {

    /**
     * 
     * @param {HTMLElement} target 
     * @param {import("../../Blueprint").default} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options = {}) {
        options = KeyboardShortcut.keyOptionsParse(options, Configuration.selectAllKeyboardKey);
        super(target, blueprint, options);
    }

    fire() {
        this.blueprint.selectAll();
    }
}

class MouseScrollGraph extends MouseClickDrag {

    startDrag() {
        this.blueprint.template.applyStartDragScrolling(this.blueprint);
    }

    dragTo(location, movement) {
        this.blueprint.scrollDelta([-movement[0], -movement[1]]);
    }

    endDrag() {
        this.blueprint.template.applyEndDragScrolling(this.blueprint);
    }
}

class MouseTracking extends Pointing {

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);

        let self = this;
        this.mousemoveHandler = e => {
            self.blueprint.entity.mousePosition = self.locationFromEvent(e);
            return true
        };
    }

    blueprintFocused() {
        this.target.addEventListener("mousemove", this.mousemoveHandler);
    }

    blueprintUnfocused() {
        this.target.removeEventListener("mousemove", this.mousemoveHandler);
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
        let top = 0;
        let left = 0;
        let count = 0;
        let nodes = this.serializer.readMultiple(value).map(entity => {
            let node = new GraphNode(entity);
            top += node.location[1];
            left += node.location[0];
            ++count;
            return node
        });
        top /= count;
        left /= count;
        if (nodes.length > 0) {
            this.blueprint.unselectAll();
        }
        let mousePosition = this.blueprint.entity.mousePosition;
        this.blueprint.addGraphElement(...nodes);
        nodes.forEach(node => {
            const locationOffset = [
                mousePosition[0] - left,
                mousePosition[1] - top,
            ];
            node.addLocation(this.blueprint.compensateTranslation(locationOffset));
            node.setSelected(true);
            node.snapToGrid();
        });
        return true
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
        if (e.target.closest("ueb-blueprint")) {
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
     * @param {import("../../Blueprint").default} blueprint 
     * @param {Object} options 
     */
    constructor(target, blueprint, options) {
        options.wantsFocusCallback = true;
        super(target, blueprint, options);
        this.looseTarget = options?.looseTarget ?? true;
        let self = this;

        this.mouseWheelHandler = e => {
            e.preventDefault();
            const location = self.locationFromEvent(e);
            self.wheel(Math.sign(e.deltaY), location);
            return true
        };
        this.mouseParentWheelHandler = e => e.preventDefault();

        if (this.blueprint.focused) {
            this.movementSpace.addEventListener("wheel", this.mouseWheelHandler, false);
        }
    }

    blueprintFocused() {
        this.movementSpace.addEventListener("wheel", this.mouseWheelHandler, false);
        this.movementSpace.parentElement?.addEventListener("wheel", this.mouseParentWheelHandler);
    }

    blueprintUnfocused() {
        this.movementSpace.removeEventListener("wheel", this.mouseWheelHandler, false);
        this.movementSpace.parentElement?.removeEventListener("wheel", this.mouseParentWheelHandler);
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

class Blueprint extends GraphElement {

    constructor() {
        super({}, new BlueprintTemplate());
        /** @type {BlueprintTemplate} */
        this.template;
        /** @type {number} */
        this.gridSize = Configuration.gridSize;
        /** @type {GraphNode[]}" */
        this.nodes = [];
        /** @type {GraphLink[]}" */
        this.links = [];
        this.expandGridSize = Configuration.expandGridSize;
        /** @type {number[]} */
        this.additional = /*[2 * this.expandGridSize, 2 * this.expandGridSize]*/[0, 0];
        /** @type {number[]} */
        this.translateValue = /*[this.expandGridSize, this.expandGridSize]*/[0, 0];
        /** @type {number[]} */
        this.mousePosition = [0, 0];
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

    /**
     * Expand the grid, considers the absolute value of params
     * @param {number} x - Horizontal expansion value
     * @param {number} y - Vertical expansion value
     */
    #expand(x, y) {
        x = Math.round(Math.abs(x));
        y = Math.round(Math.abs(y));
        this.additional = [this.additional[0] + x, this.additional[1] + y];
        this.template.applyExpand(this);
    }

    /**
     * Moves the content of the grid according to the coordinates
     * @param {number} x - Horizontal translation value
     * @param {number} y - Vertical translation value
     */
    #translate(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        this.translateValue = [this.translateValue[0] + x, this.translateValue[1] + y];
        this.template.applyTranlate(this);
    }

    createInputObjects() {
        return [
            new Copy(this.getGridDOMElement(), this),
            new Paste(this.getGridDOMElement(), this),
            new KeyvoardCanc(this.getGridDOMElement(), this),
            new KeyboardSelectAll(this.getGridDOMElement, this),
            new Zoom(this.getGridDOMElement(), this, {
                looseTarget: true,
            }),
            new Select(this.getGridDOMElement(), this, {
                clickButton: 0,
                exitAnyButton: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(this.getGridDOMElement(), this, {
                clickButton: 2,
                exitAnyButton: false,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new Unfocus(this.getGridDOMElement(), this),
            new MouseTracking(this.getGridDOMElement(), this)
        ]
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        setSelected(false);
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
                behavior: "smooth"
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

    snapToGrid(location) {
        return Utility.snapToGrid(location, this.gridSize)
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
        this.#expand(scaledX, scaledY);
        // If the expansion is towards the left or top, then scroll back to give the illusion that the content is in the same position and translate it accordingly
        this.#translate(scaledX < 0 ? -scaledX : 0, scaledY < 0 ? -scaledY : 0);
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
        this.template.applyZoom(this, zoom);
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
        return parseFloat(getComputedStyle(this.gridElement).getPropertyValue("--ueb-scale"))
    }

    compensateTranslation(position) {
        position[0] -= this.translateValue[0];
        position[1] -= this.translateValue[1];
        return position
    }

    /**
     * 
     * @returns {GraphNode[]} Nodes
     */
    getNodes(selected = false) {
        if (selected) {
            return this.nodes.filter(
                /**
                 * 
                 * @param {GraphNode} node 
                 */
                node => node.selected
            )
        } else {
            return this.nodes
        }
    }

    /**
     * Select all nodes
     */
    selectAll() {
        this.nodes.forEach(node => this.nodeSelectToggleFunction(node, true));
    }

    /**
     * Unselect all nodes
     */
    unselectAll() {
        this.nodes.forEach(node => this.nodeSelectToggleFunction(node, false));
    }

    /**
     * 
     * @param  {...GraphElement} graphElements 
     */
    addGraphElement(...graphElements) {
        [...graphElements].forEach(v => {
            if (v instanceof GraphNode) {
                this.nodes.push(v);
                this.nodesContainerElement?.appendChild(v);
            }
            if (v instanceof GraphLink) {
                this.links.push(v);
                this.nodesContainerElement?.appendChild(v);
            }
        });
    }

    /**
     * 
     * @param  {...GraphElement} graphElements 
     */
    removeGraphElement(...graphElements) {
        let deleteElements = [...graphElements];
        if (deleteElements.length == 0) {
            return
        }
        let currentDeleteI = 0;
        this.nodes = this.nodes.filter(v => {
            if (v == deleteElements[currentDeleteI]) {
                ++currentDeleteI;
                v.remove();
                return false
            }
            return true
        });
        currentDeleteI = 0;
        this.links = this.links.filter(v => {
            if (v == deleteElements[currentDeleteI]) {
                ++currentDeleteI;
                v.remove();
                return false
            }
            return true
        });
    }

    setFocused(value = true) {
        if (this.focused == value) {
            return
        }
        let event = new CustomEvent(value ? "blueprint-focus" : "blueprint-unfocus");
        this.focused = value;
        this.dataset.focused = this.focused;
        if (!this.focused) {
            this.unselectAll();
        }
        this.dispatchEvent(event);
    }
}

customElements.define("ueb-blueprint", Blueprint);

class GeneralSerializer extends Serializer {

    constructor(wrap, entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        wrap = wrap ?? (v => `(${v})`);
        super(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter);
        this.wrap = wrap;
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

class ToStringSerializer extends GeneralSerializer {

    constructor(entityType) {
        super(undefined, entityType);
    }

    write(object) {
        let result = object.toString();
        return result
    }
}

function initializeSerializerFactory() {
    SerializerFactory.registerSerializer(
        ObjectEntity,
        new ObjectSerializer()
    );
    SerializerFactory.registerSerializer(
        PinEntity$1,
        new GeneralSerializer(v => `${PinEntity$1.lookbehind} (${v})`, PinEntity$1, "", ",", true)
    );
    SerializerFactory.registerSerializer(
        FunctionReferenceEntity,
        new GeneralSerializer(v => `(${v})`, FunctionReferenceEntity, "", ",", false)
    );
    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new GeneralSerializer(v => `${LocalizedTextEntity.lookbehind}(${v})`, LocalizedTextEntity, "", ",", false, "", _ => "")
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
    SerializerFactory.registerSerializer(GuidEntity, new ToStringSerializer(GuidEntity));
    SerializerFactory.registerSerializer(IntegerEntity, new ToStringSerializer(IntegerEntity));
}

initializeSerializerFactory();

export { Blueprint, Configuration, GraphLink, GraphNode };
