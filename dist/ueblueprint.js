// @ts-check

class Configuration {
    static deleteNodesKeyboardKey = "Delete"
    static editTextEventName = {
        begin: "ueb-edit-text-begin",
        end: "ueb-edit-text-end",
    }
    static enableZoomIn = ["LeftControl", "RightControl"] // Button to enable more than 0 (1:1) zoom
    static expandGridSize = 400
    static focusEventName = {
        begin: "blueprint-focus",
        end: "blueprint-unfocus",
    }
    static fontSize = "12.5px"
    static gridAxisLineColor = "black"
    static gridExpandThreshold = 0.25 // remaining size factor threshold to cause an expansion event
    static gridLineColor = "#353535"
    static gridLineWidth = 1 // pixel
    static gridSet = 8
    static gridSetLineColor = "#161616"
    static gridShrinkThreshold = 4 // exceding size factor threshold to cause a shrink event 
    static gridSize = 16 // pixel
    static keysSeparator = "+"
    static linkCurveHeight = 15 // pixel
    static linkCurveWidth = 80 // pixel
    static linkMinWidth = 100 // pixel
    /**
     * @param {Number} start
     * @param {Number} c1
     * @param {Number} c2
     */
    static linkRightSVGPath = (start, c1, c2) => {
        let end = 100 - start;
        return `M ${start} 0 C ${c1} 0, ${c2} 0, 50 50 S ${end - c1 + start} 100, ${end} 100`
    }
    static maxZoom = 7
    static minZoom = -12
    static nodeDeleteEventName = "ueb-node-delete"
    static nodeDragEventName = "ueb-node-drag"
    static nodeDragLocalEventName = "ueb-node-drag-local"
    static nodeName = (name, counter) => `${name}_${counter}`
    static nodeRadius = 8 // in pixel
    static selectAllKeyboardKey = "(bCtrl=True,Key=A)"
    static trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end",
    }
    static ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta",
    ]
    static Keys = {
        /* UE name: JS name */
        "Backspace": "Backspace",
        "Tab": "Tab",
        "LeftControl": "ControlLeft",
        "RightControl": "ControlRight",
        "LeftShift": "ShiftLeft",
        "RightShift": "ShiftRight",
        "LeftAlt": "AltLeft",
        "RightAlt": "AltRight",
        "Enter": "Enter",
        "Pause": "Pause",
        "CapsLock": "CapsLock",
        "Escape": "Escape",
        "Space": "Space",
        "PageUp": "PageUp",
        "PageDown": "PageDown",
        "End": "End",
        "Home": "Home",
        "ArrowLeft": "Left",
        "ArrowUp": "Up",
        "ArrowRight": "Right",
        "ArrowDown": "Down",
        "PrintScreen": "PrintScreen",
        "Insert": "Insert",
        "Delete": "Delete",
        "Zero": "Digit0",
        "One": "Digit1",
        "Two": "Digit2",
        "Three": "Digit3",
        "Four": "Digit4",
        "Five": "Digit5",
        "Six": "Digit6",
        "Seven": "Digit7",
        "Eight": "Digit8",
        "Nine": "Digit9",
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
        "NumPadZero": "Numpad0",
        "NumPadOne": "Numpad1",
        "NumPadTwo": "Numpad2",
        "NumPadThree": "Numpad3",
        "NumPadFour": "Numpad4",
        "NumPadFive": "Numpad5",
        "NumPadSix": "Numpad6",
        "NumPadSeven": "Numpad7",
        "NumPadEight": "Numpad8",
        "NumPadNine": "Numpad9",
        "Multiply": "NumpadMultiply",
        "Add": "NumpadAdd",
        "Subtract": "NumpadSubtract",
        "Decimal": "NumpadDecimal",
        "Divide": "NumpadDivide",
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

// @ts-check

/**
 * @typedef {import("../Blueprint").default} Blueprint
 */

/**
 * @template {HTMLElement} T
 */
class IInput {

    /** @type {T} */
    #target
    get target() {
        return this.#target
    }

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }

    /** @type {Object} */
    options

    /**
     * @param {T} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options) {
        this.#target = target;
        this.#blueprint = blueprint;
        options.consumeEvent ??= false;
        options.listenOnFocus ??= false;
        options.unlistenOnTextEdit ??= false;
        this.options = options;
        let self = this;
        this.listenHandler = _ => self.listenEvents();
        this.unlistenHandler = _ => self.unlistenEvents();
        if (this.options.listenOnFocus) {
            this.blueprint.addEventListener(Configuration.focusEventName.begin, this.listenHandler);
            this.blueprint.addEventListener(Configuration.focusEventName.end, this.unlistenHandler);
        }
        if (this.options.unlistenOnTextEdit) {
            this.blueprint.addEventListener(Configuration.editTextEventName.begin, this.unlistenHandler);
            this.blueprint.addEventListener(Configuration.editTextEventName.end, this.listenHandler);
        }
    }

    unlistenDOMElement() {
        this.unlistenEvents();
        this.blueprint.removeEventListener(Configuration.focusEventName.begin, this.listenHandler);
        this.blueprint.removeEventListener(Configuration.focusEventName.end, this.unlistenHandler);
        this.blueprint.removeEventListener(Configuration.editTextEventName.begin, this.unlistenHandler);
        this.blueprint.removeEventListener(Configuration.editTextEventName.end, this.listenHandler);
    }

    /* Subclasses will probabily override the following methods */
    listenEvents() {
    }

    unlistenEvents() {
    }
}

// @ts-check

/**
 * @template T
 */
class TypeInitialization {

    /** @type {T} */
    #value
    get value() {
        return this.#value
    }
    set value(v) {
        this.#value = v;
    }

    #showDefault = true
    get showDefault() {
        return this.#showDefault
    }
    set showDefault(v) {
        this.#showDefault = v;
    }

    /** @type {Constructor|Array<Constructor>} */
    #type
    get type() {
        return this.#type
    }
    set type(v) {
        this.#type = v;
    }

    static sanitize(value, targetType) {
        if (targetType === undefined) {
            targetType = value?.constructor;
        }
        let wrongType = false;
        if (targetType && value?.constructor !== targetType && !(value instanceof targetType)) {
            wrongType = true;
        }
        if (value instanceof Boolean || value instanceof Number || value instanceof String) {
            value = value.valueOf(); // Get the relative primitive value
        }
        if (wrongType) {
            return new targetType(value)
        }
        return value
    }

    /**
     * @typedef {new () => T} Constructor
     * @param {Constructor|Array<Constructor>} type
     * @param {Boolean} showDefault
     * @param {any} value
     */
    constructor(type, showDefault = true, value = undefined) {
        if (value === undefined) {
            if (type instanceof Array) {
                value = [];
            } else {
                value = TypeInitialization.sanitize(new type());
            }
        }
        this.#value = value;
        this.#showDefault = showDefault;
        this.#type = type;
    }
}

// @ts-check

class Utility {

    static sigmoid(x, curvature = 1.7) {
        return 1 / (1 + (x / Math.pow(1 - x, -curvature)))
    }

    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    static getScale(element) {
        return Number(getComputedStyle(element).getPropertyValue("--ueb-scale"))
    }

    /**
     * @param {Number[]} viewportLocation
     * @param {HTMLElement} movementElement
     * @returns
     */
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
     * Gets a value from an object, gives defaultValue in case of failure
     * @param {Object} target Object holding the data
     * @param {String[]} keys The chained keys to access from object in order to get the value
     * @param {any} defaultValue Value to return in case from doesn't have it
     * @returns {any} The value in from corresponding to the keys or defaultValue otherwise
     */
    static objectGet(target, keys, defaultValue = undefined) {
        if (target === undefined) {
            return undefined
        }
        if (!(keys instanceof Array)) {
            throw new TypeError("Expected keys to be an array.")
        }
        if (keys.length == 0 || !(keys[0] in target) || target[keys[0]] === undefined) {
            return defaultValue
        }
        if (keys.length == 1) {
            return target[keys[0]]
        }
        return Utility.objectGet(target[keys[0]], keys.slice(1), defaultValue)
    }

    /**
     * Sets a value in an object
     * @param {Object} target Object holding the data
     * @param {String[]} keys The chained keys to access from object in order to set the value
     * @param {*} value Value to be set
     * @param {Boolean} create Whether to create or not the key in case it doesn't exist
     * @returns {Boolean} Returns true on succes, false otherwise
     */
    static objectSet(target, keys, value, create = false, defaultDictType = Object) {
        if (!(keys instanceof Array)) {
            throw new TypeError("Expected keys to be an array.")
        }
        if (keys.length == 1) {
            if (create || keys[0] in target || target[keys[0]] === undefined) {
                target[keys[0]] = value;
                return true
            }
        } else if (keys.length > 0) {
            if (create && !(target[keys[0]] instanceof Object)) {
                target[keys[0]] = new defaultDictType();
            }
            return Utility.objectSet(target[keys[0]], keys.slice(1), value, create, defaultDictType)
        }
        return false
    }

    static equals(a, b) {
        a = TypeInitialization.sanitize(a);
        b = TypeInitialization.sanitize(b);
        if (a === b) {
            return true
        }
        if (a instanceof Array && b instanceof Array) {
            return a.length == b.length && !a.find((value, i) => !Utility.equals(value, b[i]))
        }
    }

    /**
     * @param {String} value
     */
    static FirstCapital(value) {
        return value.charAt(0).toUpperCase() + value.substring(1)
    }

    static getType(value) {
        let constructor = value?.constructor;
        switch (constructor) {
            case TypeInitialization:
                return Utility.getType(value.type)
            case Function:
                // value is already a constructor
                return value
            default:
                return constructor
        }
    }

    /**
     * @param {Number[]} location
     * @param {Number} gridSize
     */
    static snapToGrid(location, gridSize) {
        if (gridSize === 1) {
            return location
        }
        return [
            gridSize * Math.round(location[0] / gridSize),
            gridSize * Math.round(location[1] / gridSize)
        ]
    }

    /**
     * @template T
     * @param {Array<T>} a
     * @param {Array<T>} b
     */
    static mergeArrays(a = [], b = []) {
        let result = [];
        for (let j = 0; j < b.length; ++j) {
            for (let i = 0; i < a.length; ++i) {
                if (a[i] == b[j]) {
                    result.push(...a.splice(0, i), ...b.splice(0, j), ...a.splice(0, 1));
                    j = 0;
                    i = 0;
                    b.shift();
                    break
                }
            }
        }
        return [...(new Set(result.concat(...a, ...b)))]
    }

    /**
     * @param {String} value
     */
    static encodeInputString(value) {
        return value
            .replace(/\n$/, "") // Remove trailing newline
            .replaceAll("\u00A0", " ") // Replace special space symbol
            .replaceAll("\r\n", String.raw`\r\n`) // Replace newline with \r\n
            .replaceAll("\n", String.raw`\r\n`) // Replace newline with \r\n
    }

    /**
     * @param {String} value
     */
    static decodeInputString(value) {
        return value
            .replaceAll(" ", "\u00A0") // Replace special space symbol
            .replaceAll(String.raw`\r\n`, "<br />\n") // Replace newline with \r\n
    }

    /**
     * @param {String} value
     */
    static encodeString(value, input = false) {
        return value
            .replaceAll("\u00A0", " ") // Replace special space symbol
            .replaceAll("\n", String.raw`\n`) // Replace newline with \n
    }

    /**
     * @param {String} value
     */
    static decodeString(value, input = false) {
        return value
            .replaceAll(" ", "\u00A0") // Replace special space symbol
            .replaceAll(String.raw`\n`, "\n") // Replace newline with \n
    }

    /**
     * @param {String} value
     */
    static formatStringName(value) {
        return value
            .trim()
            .replaceAll(/\s+/g, " ") // Multiple spaces is just a single normal space
            .replace(/^b/, "") // Remove leading b (for boolean values)
            .replaceAll(/(?<=[a-z])(?=[A-Z])|_/g, " ") // Insert a space between
    }
}

// @ts-check

class IEntity {

    static attributes = {}

    constructor(values) {
        /**
         * @param {Object} target
         * @param {Object} properties
         * @param {Object} values
         * @param {String} prefix
         */
        const defineAllAttributes = (target, properties, values, prefix = "") => {
            for (let property of Utility.mergeArrays(
                Object.getOwnPropertyNames(properties),
                Object.getOwnPropertyNames(values ?? {})
            )) {
                if (!(property in properties)) {
                    console.warn(`Property ${prefix}${property} is not defined in ${this.constructor.name}`);
                }
                let defaultValue = properties[property];
                const defaultType = Utility.getType(defaultValue);
                // Not instanceof because all objects are instenceof Object, exact match needed
                if (defaultType === Object) {
                    target[property] = {};
                    defineAllAttributes(target[property], properties[property], values[property], property + ".");
                    continue
                }
                /*
                 * The value can either be:
                 *     - Array: can contain multiple values, its property is assigned multiple times like (X=1, X=4, X="Hello World").
                 *     - TypeInitialization: contains the maximum amount of information about the attribute.
                 *     - A type: the default value will be default constructed object without arguments.
                 *     - A proper value.
                 */
                const value = Utility.objectGet(values, [property]);
                if (value !== undefined) {
                    target[property] = TypeInitialization.sanitize(value, defaultType);
                    continue
                }
                if (defaultValue instanceof TypeInitialization) {
                    if (!defaultValue.showDefault) {
                        target[property] = undefined; // Declare undefined to preserve the order or attributes
                        continue
                    }
                    defaultValue = defaultValue.value;
                }
                if (defaultValue instanceof Array) {
                    target[property] = [];
                    continue
                }
                if (defaultValue instanceof Function) {
                    defaultValue = TypeInitialization.sanitize(new defaultValue(), defaultType);
                }
                target[property] = TypeInitialization.sanitize(defaultValue, defaultType);
            }
        };
        // @ts-expect-error
        const attributes = this.constructor.attributes;
        if (values.constructor !== Object && Object.getOwnPropertyNames(attributes).length == 1) {
            // Where there is just one attribute, option can be the value of that attribute
            values = {
                [Object.getOwnPropertyNames(attributes)[0]]: values
            };
        }
        defineAllAttributes(this, attributes, values);
    }
}

// @ts-check

class ObjectReferenceEntity extends IEntity {

    static attributes = {
        type: String,
        path: String,
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.type;
        /** @type {String} */ this.path;
    }
}

// @ts-check

class FunctionReferenceEntity extends IEntity {

    static attributes = {
        MemberParent: ObjectReferenceEntity,
        MemberName: "",
    }

    constructor(options = {}) {
        super(options);
        /** @type {ObjectReferenceEntity} */ this.MemberParent;
        /** @type {String} */ this.MemberName;
    }
}

// @ts-check

class GuidEntity extends IEntity {

    static attributes = {
        value: String,
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
        return new GuidEntity({ value: guid })
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

// @ts-check

class IdentifierEntity extends IEntity {

    static attributes = {
        value: String,
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

// @ts-check

class IntegerEntity extends IEntity {

    static attributes = {
        value: Number,
    }

    /**
     * @param {Object | Number | String} options
     */
    constructor(options = 0) {
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

// @ts-check

class InvariantTextEntity extends IEntity {

    static lookbehind = "INVTEXT"
    static attributes = {
        value: String,
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.value;
    }
}

// @ts-check

class KeyBindingEntity extends IEntity {

    static attributes = {
        ActionName: "",
        bShift: false,
        bCtrl: false,
        bAlt: false,
        bCmd: false,
        Key: IdentifierEntity,
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.ActionName;
        /** @type {Boolean} */ this.bShift;
        /** @type {Boolean} */ this.bCtrl;
        /** @type {Boolean} */ this.bAlt;
        /** @type {Boolean} */ this.bCmd;
        /** @type {IdentifierEntity} */ this.Key;
    }
}

// @ts-check

class LocalizedTextEntity extends IEntity {

    static lookbehind = "NSLOCTEXT"
    static attributes = {
        namespace: String,
        key: String,
        value: String,
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.namespace;
        /** @type {String} */ this.key;
        /** @type {String} */ this.value;
    }
}

// @ts-check

class PathSymbolEntity extends IEntity {

    static attributes = {
        value: String,
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.value;
    }

    valueOf() {
        return this.value
    }

    toString() {
        return this.value
    }
}

// @ts-check

class PinReferenceEntity extends IEntity {

    static attributes = {
        objectName: PathSymbolEntity,
        pinGuid: GuidEntity,
    }

    constructor(options = {}) {
        super(options);
        /** @type {PathSymbolEntity} */ this.objectName;
        /** @type {GuidEntity} */ this.pinGuid;
    }
}

// @ts-check

class PinEntity extends IEntity {

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
            bIsUObjectWrapper: false,
        },
        LinkedTo: new TypeInitialization([PinReferenceEntity], false),
        DefaultValue: new TypeInitialization(String, false),
        AutogeneratedDefaultValue: "",
        DefaultObject: new TypeInitialization(ObjectReferenceEntity, false, null),
        PersistentGuid: GuidEntity,
        bHidden: false,
        bNotConnectable: false,
        bDefaultValueIsReadOnly: false,
        bDefaultValueIsIgnored: false,
        bAdvancedView: false,
        bOrphanedPin: false,
    }

    constructor(options = {}) {
        super(options);
        /** @type {GuidEntity} */ this.PinId;
        /** @type {String} */ this.PinName;
        /** @type {LocalizedTextEntity} */ this.PinFriendlyName;
        /** @type {String} */ this.PinToolTip;
        /** @type {String} */ this.Direction;
        /**
         * @type {{
         *     PinCategory: String,
         *     PinSubCategory: String,
         *     PinSubCategoryObject: ObjectReferenceEntity,
         *     PinSubCategoryMemberReference: any,
         *     PinValueType: String,
         *     ContainerType: ObjectReferenceEntity,
         *     bIsReference: Boolean,
         *     bIsConst: Boolean,
         *     bIsWeakPointer: Boolean,
         *     bIsUObjectWrapper: Boolean,
         * }}
         */ this.PinType;
        /** @type {PinReferenceEntity[]} */ this.LinkedTo;
        /** @type {String} */ this.DefaultValue;
        /** @type {String} */ this.AutogeneratedDefaultValue;
        /** @type {ObjectReferenceEntity} */ this.DefaultObject;
        /** @type {GuidEntity} */ this.PersistentGuid;
        /** @type {Boolean} */ this.bHidden;
        /** @type {Boolean} */ this.bNotConnectable;
        /** @type {Boolean} */ this.bDefaultValueIsReadOnly;
        /** @type {Boolean} */ this.bDefaultValueIsIgnored;
        /** @type {Boolean} */ this.bAdvancedView;
        /** @type {Boolean} */ this.bOrphanedPin;
    }

    getDefaultValue() {
        return this.DefaultValue ?? ""
    }

    isInput() {
        return !this.bHidden && this.Direction != "EGPD_Output"
    }

    isOutput() {
        return !this.bHidden && this.Direction == "EGPD_Output"
    }

    /**
     * 
     * @returns {Boolean}
     */
    isLinked() {
        return this.LinkedTo?.length > 0 ?? false
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     */
    linkTo(targetObjectName, targetPinEntity) {
        /** @type {PinReferenceEntity[]} */
        this.LinkedTo;
        const linkFound = this.LinkedTo?.find(pinReferenceEntity => {
            // @ts-ignore
            return pinReferenceEntity.objectName == targetObjectName
                && pinReferenceEntity.pinGuid.valueOf() == targetPinEntity.PinId.valueOf()
        });
        if (!linkFound) {
            (this.LinkedTo ?? (this.LinkedTo = [])).push(new PinReferenceEntity({
                objectName: targetObjectName,
                pinGuid: targetPinEntity.PinId,
            }));
            return true
        }
        return false
    }

    /**
     * @param {String} targetObjectName
     * @param {PinEntity} targetPinEntity
     */
    unlinkFrom(targetObjectName, targetPinEntity) {
        /** @type {PinReferenceEntity[]} */
        this.LinkedTo;
        const indexElement = this.LinkedTo.findIndex(pinReferenceEntity => {
            // @ts-expect-error
            return pinReferenceEntity.objectName == targetObjectName
                && pinReferenceEntity.pinGuid == targetPinEntity.PinId
        });
        if (indexElement >= 0) {
            if (this.LinkedTo.length == 1) {
                this.LinkedTo = undefined;
            } else {
                this.LinkedTo.splice(indexElement, 1);
            }
            return true
        }
        return false
    }

    getType() {
        return this.PinType.PinCategory
    }
}

// @ts-check

class VariableReferenceEntity extends IEntity {

    static attributes = {
        MemberName: String,
        MemberGuid: GuidEntity,
        bSelfContext: false,
    }

    constructor(options = {}) {
        super(options);
        /** @type {String} */ this.MemberName;
        /** @type {GuidEntity} */ this.MemberGuid;
        /** @type {Boolean} */ this.bSelfContext;
    }
}

// @ts-check

class ObjectEntity extends IEntity {

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
        AdvancedPinDisplay: new TypeInitialization(IdentifierEntity, false, null),
        EnabledState: new TypeInitialization(IdentifierEntity, false, null),
        NodeGuid: GuidEntity,
        ErrorType: new TypeInitialization(IntegerEntity, false),
        ErrorMsg: new TypeInitialization(String, false, ""),
        CustomProperties: [PinEntity],
    }

    static nameRegex = /(\w+)_(\d+)/

    constructor(options = {}) {
        super(options);
        /** @type {ObjectReferenceEntity} */ this.Class;
        /** @type {String} */ this.Name;
        /** @type {Boolean} */ this.bIsPureFunc;
        /** @type {VariableReferenceEntity} */ this.VariableReference;
        /** @type {FunctionReferenceEntity} */ this.FunctionReference;
        /** @type {FunctionReferenceEntity} */ this.EventReference;
        /** @type {ObjectReferenceEntity} */ this.TargetType;
        /** @type {IntegerEntity} */ this.NodePosX;
        /** @type {IntegerEntity} */ this.NodePosY;
        /** @type {IdentifierEntity} */ this.AdvancedPinDisplay;
        /** @type {IdentifierEntity} */ this.EnabledState;
        /** @type {GuidEntity} */ this.NodeGuid;
        /** @type {IntegerEntity} */ this.ErrorType;
        /** @type {String} */ this.ErrorMsg;
        /** @type {PinEntity[]} */ this.CustomProperties;
    }

    getObjectName(dropCounter = false) {
        if (dropCounter) {
            return this.getNameAndCounter()[0]
        }
        return this.Name
    }

    /**
     * @returns {[String, Number]}
     */
    getNameAndCounter() {
        const result = this.getObjectName(false).match(ObjectEntity.nameRegex);
        if (result && result.length == 3) {
            return [result[1], parseInt(result[2])]
        }
    }

    getDisplayName() {
        let name = this.FunctionReference?.MemberName;
        if (name) {
            name = Utility.formatStringName(name);
            return name
        }
        name = Utility.formatStringName(this.getNameAndCounter()[0]);
        return name
    }

    getCounter() {
        return this.getNameAndCounter()[1]
    }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var parsimmon_umd_min = {exports: {}};

(function (module, exports) {
!function(n,t){module.exports=t();}("undefined"!=typeof self?self:commonjsGlobal,function(){return function(n){var t={};function r(e){if(t[e])return t[e].exports;var u=t[e]={i:e,l:!1,exports:{}};return n[e].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=n,r.c=t,r.d=function(n,t,e){r.o(n,t)||Object.defineProperty(n,t,{configurable:!1,enumerable:!0,get:e});},r.r=function(n){Object.defineProperty(n,"__esModule",{value:!0});},r.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(t,"a",t),t},r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.p="",r(r.s=0)}([function(n,t,r){function e(n){if(!(this instanceof e))return new e(n);this._=n;}var u=e.prototype;function o(n,t){for(var r=0;r<n;r++)t(r);}function i(n,t,r){return function(n,t){o(t.length,function(r){n(t[r],r,t);});}(function(r,e,u){t=n(t,r,e,u);},r),t}function a(n,t){return i(function(t,r,e,u){return t.concat([n(r,e,u)])},[],t)}function f(n,t){var r={v:0,buf:t};return o(n,function(){var n;r={v:r.v<<1|(n=r.buf,n[0]>>7),buf:function(n){var t=i(function(n,t,r,e){return n.concat(r===e.length-1?Buffer.from([t,0]).readUInt16BE(0):e.readUInt16BE(r))},[],n);return Buffer.from(a(function(n){return (n<<1&65535)>>8},t))}(r.buf)};}),r}function c(){return "undefined"!=typeof Buffer}function s(){if(!c())throw new Error("Buffer global does not exist; please use webpack if you need to parse Buffers in the browser.")}function l(n){s();var t=i(function(n,t){return n+t},0,n);if(t%8!=0)throw new Error("The bits ["+n.join(", ")+"] add up to "+t+" which is not an even number of bytes; the total should be divisible by 8");var r,u=t/8,o=(r=function(n){return n>48},i(function(n,t){return n||(r(t)?t:n)},null,n));if(o)throw new Error(o+" bit range requested exceeds 48 bit (6 byte) Number max.");return new e(function(t,r){var e=u+r;return e>t.length?x(r,u.toString()+" bytes"):b(e,i(function(n,t){var r=f(t,n.buf);return {coll:n.coll.concat(r.v),buf:r.buf}},{coll:[],buf:t.slice(r,e)},n).coll)})}function h(n,t){return new e(function(r,e){return s(),e+t>r.length?x(e,t+" bytes for "+n):b(e+t,r.slice(e,e+t))})}function p(n,t){if("number"!=typeof(r=t)||Math.floor(r)!==r||t<0||t>6)throw new Error(n+" requires integer length in range [0, 6].");var r;}function d(n){return p("uintBE",n),h("uintBE("+n+")",n).map(function(t){return t.readUIntBE(0,n)})}function v(n){return p("uintLE",n),h("uintLE("+n+")",n).map(function(t){return t.readUIntLE(0,n)})}function g(n){return p("intBE",n),h("intBE("+n+")",n).map(function(t){return t.readIntBE(0,n)})}function m(n){return p("intLE",n),h("intLE("+n+")",n).map(function(t){return t.readIntLE(0,n)})}function y(n){return n instanceof e}function E(n){return "[object Array]"==={}.toString.call(n)}function w(n){return c()&&Buffer.isBuffer(n)}function b(n,t){return {status:!0,index:n,value:t,furthest:-1,expected:[]}}function x(n,t){return E(t)||(t=[t]),{status:!1,index:-1,value:null,furthest:n,expected:t}}function B(n,t){if(!t)return n;if(n.furthest>t.furthest)return n;var r=n.furthest===t.furthest?function(n,t){if(function(){if(void 0!==e._supportsSet)return e._supportsSet;var n="undefined"!=typeof Set;return e._supportsSet=n,n}()&&Array.from){for(var r=new Set(n),u=0;u<t.length;u++)r.add(t[u]);var o=Array.from(r);return o.sort(),o}for(var i={},a=0;a<n.length;a++)i[n[a]]=!0;for(var f=0;f<t.length;f++)i[t[f]]=!0;var c=[];for(var s in i)({}).hasOwnProperty.call(i,s)&&c.push(s);return c.sort(),c}(n.expected,t.expected):t.expected;return {status:n.status,index:n.index,value:n.value,furthest:t.furthest,expected:r}}var j={};function S(n,t){if(w(n))return {offset:t,line:-1,column:-1};n in j||(j[n]={});for(var r=j[n],e=0,u=0,o=0,i=t;i>=0;){if(i in r){e=r[i].line,0===o&&(o=r[i].lineStart);break}("\n"===n.charAt(i)||"\r"===n.charAt(i)&&"\n"!==n.charAt(i+1))&&(u++,0===o&&(o=i+1)),i--;}var a=e+u,f=t-o;return r[t]={line:a,lineStart:o},{offset:t,line:a+1,column:f+1}}function _(n){if(!y(n))throw new Error("not a parser: "+n)}function L(n,t){return "string"==typeof n?n.charAt(t):n[t]}function O(n){if("number"!=typeof n)throw new Error("not a number: "+n)}function k(n){if("function"!=typeof n)throw new Error("not a function: "+n)}function P(n){if("string"!=typeof n)throw new Error("not a string: "+n)}var q=2,A=3,I=8,F=5*I,M=4*I,z="  ";function R(n,t){return new Array(t+1).join(n)}function U(n,t,r){var e=t-n.length;return e<=0?n:R(r,e)+n}function W(n,t,r,e){return {from:n-t>0?n-t:0,to:n+r>e?e:n+r}}function D(n,t){var r,e,u,o,f,c=t.index,s=c.offset,l=1;if(s===n.length)return "Got the end of the input";if(w(n)){var h=s-s%I,p=s-h,d=W(h,F,M+I,n.length),v=a(function(n){return a(function(n){return U(n.toString(16),2,"0")},n)},function(n,t){var r=n.length,e=[],u=0;if(r<=t)return [n.slice()];for(var o=0;o<r;o++)e[u]||e.push([]),e[u].push(n[o]),(o+1)%t==0&&u++;return e}(n.slice(d.from,d.to).toJSON().data,I));o=function(n){return 0===n.from&&1===n.to?{from:n.from,to:n.to}:{from:n.from/I,to:Math.floor(n.to/I)}}(d),e=h/I,r=3*p,p>=4&&(r+=1),l=2,u=a(function(n){return n.length<=4?n.join(" "):n.slice(0,4).join(" ")+"  "+n.slice(4).join(" ")},v),(f=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(f=2);}else {var g=n.split(/\r\n|[\n\r\u2028\u2029]/);r=c.column-1,e=c.line-1,o=W(e,q,A,g.length),u=g.slice(o.from,o.to),f=o.to.toString().length;}var m=e-o.from;return w(n)&&(f=(8*(o.to>0?o.to-1:o.to)).toString(16).length)<2&&(f=2),i(function(t,e,u){var i,a=u===m,c=a?"> ":z;return i=w(n)?U((8*(o.from+u)).toString(16),f,"0"):U((o.from+u+1).toString(),f," "),[].concat(t,[c+i+" | "+e],a?[z+R(" ",f)+" | "+U("",r," ")+R("^",l)]:[])},[],u).join("\n")}function N(n,t){return ["\n","-- PARSING FAILED "+R("-",50),"\n\n",D(n,t),"\n\n",(r=t.expected,1===r.length?"Expected:\n\n"+r[0]:"Expected one of the following: \n\n"+r.join(", ")),"\n"].join("");var r;}function G(n){return void 0!==n.flags?n.flags:[n.global?"g":"",n.ignoreCase?"i":"",n.multiline?"m":"",n.unicode?"u":"",n.sticky?"y":""].join("")}function C(){for(var n=[].slice.call(arguments),t=n.length,r=0;r<t;r+=1)_(n[r]);return e(function(r,e){for(var u,o=new Array(t),i=0;i<t;i+=1){if(!(u=B(n[i]._(r,e),u)).status)return u;o[i]=u.value,e=u.index;}return B(b(e,o),u)})}function J(){var n=[].slice.call(arguments);if(0===n.length)throw new Error("seqMap needs at least one argument");var t=n.pop();return k(t),C.apply(null,n).map(function(n){return t.apply(null,n)})}function T(){var n=[].slice.call(arguments),t=n.length;if(0===t)return Y("zero alternates");for(var r=0;r<t;r+=1)_(n[r]);return e(function(t,r){for(var e,u=0;u<n.length;u+=1)if((e=B(n[u]._(t,r),e)).status)return e;return e})}function V(n,t){return H(n,t).or(X([]))}function H(n,t){return _(n),_(t),J(n,t.then(n).many(),function(n,t){return [n].concat(t)})}function K(n){P(n);var t="'"+n+"'";return e(function(r,e){var u=e+n.length,o=r.slice(e,u);return o===n?b(u,o):x(e,t)})}function Q(n,t){!function(n){if(!(n instanceof RegExp))throw new Error("not a regexp: "+n);for(var t=G(n),r=0;r<t.length;r++){var e=t.charAt(r);if("i"!==e&&"m"!==e&&"u"!==e&&"s"!==e)throw new Error('unsupported regexp flag "'+e+'": '+n)}}(n),arguments.length>=2?O(t):t=0;var r=function(n){return RegExp("^(?:"+n.source+")",G(n))}(n),u=""+n;return e(function(n,e){var o=r.exec(n.slice(e));if(o){if(0<=t&&t<=o.length){var i=o[0],a=o[t];return b(e+i.length,a)}return x(e,"valid match group (0 to "+o.length+") in "+u)}return x(e,u)})}function X(n){return e(function(t,r){return b(r,n)})}function Y(n){return e(function(t,r){return x(r,n)})}function Z(n){if(y(n))return e(function(t,r){var e=n._(t,r);return e.index=r,e.value="",e});if("string"==typeof n)return Z(K(n));if(n instanceof RegExp)return Z(Q(n));throw new Error("not a string, regexp, or parser: "+n)}function $(n){return _(n),e(function(t,r){var e=n._(t,r),u=t.slice(r,e.index);return e.status?x(r,'not "'+u+'"'):b(r,null)})}function nn(n){return k(n),e(function(t,r){var e=L(t,r);return r<t.length&&n(e)?b(r+1,e):x(r,"a character/byte matching "+n)})}function tn(n,t){arguments.length<2&&(t=n,n=void 0);var r=e(function(n,e){return r._=t()._,r._(n,e)});return n?r.desc(n):r}function rn(){return Y("fantasy-land/empty")}u.parse=function(n){if("string"!=typeof n&&!w(n))throw new Error(".parse must be called with a string or Buffer as its argument");var t,r=this.skip(an)._(n,0);return t=r.status?{status:!0,value:r.value}:{status:!1,index:S(n,r.furthest),expected:r.expected},delete j[n],t},u.tryParse=function(n){var t=this.parse(n);if(t.status)return t.value;var r=N(n,t),e=new Error(r);throw e.type="ParsimmonError",e.result=t,e},u.assert=function(n,t){return this.chain(function(r){return n(r)?X(r):Y(t)})},u.or=function(n){return T(this,n)},u.trim=function(n){return this.wrap(n,n)},u.wrap=function(n,t){return J(n,this,t,function(n,t){return t})},u.thru=function(n){return n(this)},u.then=function(n){return _(n),C(this,n).map(function(n){return n[1]})},u.many=function(){var n=this;return e(function(t,r){for(var e=[],u=void 0;;){if(!(u=B(n._(t,r),u)).status)return B(b(r,e),u);if(r===u.index)throw new Error("infinite loop detected in .many() parser --- calling .many() on a parser which can accept zero characters is usually the cause");r=u.index,e.push(u.value);}})},u.tieWith=function(n){return P(n),this.map(function(t){if(function(n){if(!E(n))throw new Error("not an array: "+n)}(t),t.length){P(t[0]);for(var r=t[0],e=1;e<t.length;e++)P(t[e]),r+=n+t[e];return r}return ""})},u.tie=function(){return this.tieWith("")},u.times=function(n,t){var r=this;return arguments.length<2&&(t=n),O(n),O(t),e(function(e,u){for(var o=[],i=void 0,a=void 0,f=0;f<n;f+=1){if(a=B(i=r._(e,u),a),!i.status)return a;u=i.index,o.push(i.value);}for(;f<t&&(a=B(i=r._(e,u),a),i.status);f+=1)u=i.index,o.push(i.value);return B(b(u,o),a)})},u.result=function(n){return this.map(function(){return n})},u.atMost=function(n){return this.times(0,n)},u.atLeast=function(n){return J(this.times(n),this.many(),function(n,t){return n.concat(t)})},u.map=function(n){k(n);var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(b(u.index,n(u.value)),u):u})},u.contramap=function(n){k(n);var t=this;return e(function(r,e){var u=t.parse(n(r.slice(e)));return u.status?b(e+r.length,u.value):u})},u.promap=function(n,t){return k(n),k(t),this.contramap(n).map(t)},u.skip=function(n){return C(this,n).map(function(n){return n[0]})},u.mark=function(){return J(en,this,en,function(n,t,r){return {start:n,value:t,end:r}})},u.node=function(n){return J(en,this,en,function(t,r,e){return {name:n,value:r,start:t,end:e}})},u.sepBy=function(n){return V(this,n)},u.sepBy1=function(n){return H(this,n)},u.lookahead=function(n){return this.skip(Z(n))},u.notFollowedBy=function(n){return this.skip($(n))},u.desc=function(n){E(n)||(n=[n]);var t=this;return e(function(r,e){var u=t._(r,e);return u.status||(u.expected=n),u})},u.fallback=function(n){return this.or(X(n))},u.ap=function(n){return J(n,this,function(n,t){return n(t)})},u.chain=function(n){var t=this;return e(function(r,e){var u=t._(r,e);return u.status?B(n(u.value)._(r,u.index),u):u})},u.concat=u.or,u.empty=rn,u.of=X,u["fantasy-land/ap"]=u.ap,u["fantasy-land/chain"]=u.chain,u["fantasy-land/concat"]=u.concat,u["fantasy-land/empty"]=u.empty,u["fantasy-land/of"]=u.of,u["fantasy-land/map"]=u.map;var en=e(function(n,t){return b(t,S(n,t))}),un=e(function(n,t){return t>=n.length?x(t,"any character/byte"):b(t+1,L(n,t))}),on=e(function(n,t){return b(n.length,n.slice(t))}),an=e(function(n,t){return t<n.length?x(t,"EOF"):b(t,null)}),fn=Q(/[0-9]/).desc("a digit"),cn=Q(/[0-9]*/).desc("optional digits"),sn=Q(/[a-z]/i).desc("a letter"),ln=Q(/[a-z]*/i).desc("optional letters"),hn=Q(/\s*/).desc("optional whitespace"),pn=Q(/\s+/).desc("whitespace"),dn=K("\r"),vn=K("\n"),gn=K("\r\n"),mn=T(gn,vn,dn).desc("newline"),yn=T(mn,an);e.all=on,e.alt=T,e.any=un,e.cr=dn,e.createLanguage=function(n){var t={};for(var r in n)({}).hasOwnProperty.call(n,r)&&function(r){t[r]=tn(function(){return n[r](t)});}(r);return t},e.crlf=gn,e.custom=function(n){return e(n(b,x))},e.digit=fn,e.digits=cn,e.empty=rn,e.end=yn,e.eof=an,e.fail=Y,e.formatError=N,e.index=en,e.isParser=y,e.lazy=tn,e.letter=sn,e.letters=ln,e.lf=vn,e.lookahead=Z,e.makeFailure=x,e.makeSuccess=b,e.newline=mn,e.noneOf=function(n){return nn(function(t){return n.indexOf(t)<0}).desc("none of '"+n+"'")},e.notFollowedBy=$,e.of=X,e.oneOf=function(n){for(var t=n.split(""),r=0;r<t.length;r++)t[r]="'"+t[r]+"'";return nn(function(t){return n.indexOf(t)>=0}).desc(t)},e.optWhitespace=hn,e.Parser=e,e.range=function(n,t){return nn(function(r){return n<=r&&r<=t}).desc(n+"-"+t)},e.regex=Q,e.regexp=Q,e.sepBy=V,e.sepBy1=H,e.seq=C,e.seqMap=J,e.seqObj=function(){for(var n,t={},r=0,u=(n=arguments,Array.prototype.slice.call(n)),o=u.length,i=0;i<o;i+=1){var a=u[i];if(!y(a)){if(E(a)&&2===a.length&&"string"==typeof a[0]&&y(a[1])){var f=a[0];if(Object.prototype.hasOwnProperty.call(t,f))throw new Error("seqObj: duplicate key "+f);t[f]=!0,r++;continue}throw new Error("seqObj arguments must be parsers or [string, parser] array pairs.")}}if(0===r)throw new Error("seqObj expects at least one named parser, found zero");return e(function(n,t){for(var r,e={},i=0;i<o;i+=1){var a,f;if(E(u[i])?(a=u[i][0],f=u[i][1]):(a=null,f=u[i]),!(r=B(f._(n,t),r)).status)return r;a&&(e[a]=r.value),t=r.index;}return B(b(t,e),r)})},e.string=K,e.succeed=X,e.takeWhile=function(n){return k(n),e(function(t,r){for(var e=r;e<t.length&&n(L(t,e));)e++;return b(e,t.slice(r,e))})},e.test=nn,e.whitespace=pn,e["fantasy-land/empty"]=rn,e["fantasy-land/of"]=X,e.Binary={bitSeq:l,bitSeqObj:function(n){s();var t={},r=0,e=a(function(n){if(E(n)){var e=n;if(2!==e.length)throw new Error("["+e.join(", ")+"] should be length 2, got length "+e.length);if(P(e[0]),O(e[1]),Object.prototype.hasOwnProperty.call(t,e[0]))throw new Error("duplicate key in bitSeqObj: "+e[0]);return t[e[0]]=!0,r++,e}return O(n),[null,n]},n);if(r<1)throw new Error("bitSeqObj expects at least one named pair, got ["+n.join(", ")+"]");var u=a(function(n){return n[0]},e);return l(a(function(n){return n[1]},e)).map(function(n){return i(function(n,t){return null!==t[0]&&(n[t[0]]=t[1]),n},{},a(function(t,r){return [t,n[r]]},u))})},byte:function(n){if(s(),O(n),n>255)throw new Error("Value specified to byte constructor ("+n+"=0x"+n.toString(16)+") is larger in value than a single byte.");var t=(n>15?"0x":"0x0")+n.toString(16);return e(function(r,e){var u=L(r,e);return u===n?b(e+1,u):x(e,t)})},buffer:function(n){return h("buffer",n).map(function(n){return Buffer.from(n)})},encodedString:function(n,t){return h("string",t).map(function(t){return t.toString(n)})},uintBE:d,uint8BE:d(1),uint16BE:d(2),uint32BE:d(4),uintLE:v,uint8LE:v(1),uint16LE:v(2),uint32LE:v(4),intBE:g,int8BE:g(1),int16BE:g(2),int32BE:g(4),intLE:m,int8LE:m(1),int16LE:m(2),int32LE:m(4),floatBE:h("floatBE",4).map(function(n){return n.readFloatBE(0)}),floatLE:h("floatLE",4).map(function(n){return n.readFloatLE(0)}),doubleBE:h("doubleBE",8).map(function(n){return n.readDoubleBE(0)}),doubleLE:h("doubleLE",8).map(function(n){return n.readDoubleLE(0)})},n.exports=e;}])});
}(parsimmon_umd_min));

var Parsimmon = /*@__PURE__*/getDefaultExportFromCjs(parsimmon_umd_min.exports);

// @ts-check

let P = Parsimmon;

class Grammar {

    /*   ---   Factory   ---   */

    static getGrammarForType(r, attributeType, defaultGrammar) {
        if (attributeType instanceof TypeInitialization) {
            attributeType = attributeType.type;
        }
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
            case IdentifierEntity:
                return r.Identifier
            case ObjectReferenceEntity:
                return r.Reference
            case LocalizedTextEntity:
                return r.LocalizedText
            case InvariantTextEntity:
                return r.InvariantText
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

    static createAttributeGrammar = (r, entityType, valueSeparator = P.string("=").trim(P.optWhitespace)) =>
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

    /**
     * @template T
     * @param {new (values: Object) => T} entityType 
     * @returns {Parsimmon.Parser<T>}
     */
    static createMultiAttributeGrammar = (r, entityType) =>
        /**
         * Basically this creates a parser that looks for a string like 'Key (A=False,B="Something",)'
         * Then it populates an object of type EntityType with the attribute values found inside the parentheses.
         */
        P.seqMap(
            // @ts-expect-error
            entityType.lookbehind
                // @ts-expect-error
                ? P.seq(P.string(entityType.lookbehind), P.optWhitespace, P.string("("))
                : P.string("("),
            Grammar.createAttributeGrammar(r, entityType)
                .trim(P.optWhitespace)
                .sepBy(P.string(","))
                .skip(P.regex(/,?/).then(P.optWhitespace)), // Optional trailing comma
            P.string(')'),
            (_, attributes, __) => {
                let values = {};
                attributes.forEach(attributeSetter => attributeSetter(values));
                return new entityType(values)
            }
        )

    /*   ---   General   ---   */

    InlineWhitespace = r => P.regex(/[^\S\n]+/).desc("inline whitespace")

    InlineOptWhitespace = r => P.regex(/[^\S\n]*/).desc("inline optional whitespace")

    MultilineWhitespace = r => P.regex(/[^\S\n]*\n\s*/).desc("whitespace with at least a newline")

    Null = r => P.seq(P.string("("), r.InlineOptWhitespace, P.string(")")).map(_ => null).desc("null: ()")

    Boolean = r => P.alt(P.string("True"), P.string("False")).map(v => v === "True" ? true : false)
        .desc("either True or False")

    Number = r => P.regex(/[\-\+]?[0-9]+(?:\.[0-9]+)?/).map(Number).desc("a number")

    Word = r => P.regex(/[a-zA-Z]+/).desc("a word")

    String = r => P.regex(/(?:[^"\\]|\\.)*/).wrap(P.string('"'), P.string('"'))
        .desc('string (with possibility to escape the quote using \")')

    ReferencePath = r => P.seq(
        P.string("/"),
        r.PathSymbol
            .map(v => v.toString())
            .sepBy1(P.string("."))
            .tieWith(".")
    )
        .tie()
        .atLeast(2)
        .tie()
        .desc('a path (words with possibly underscore, separated by ".", separated by "/")')

    AttributeName = r => r.Word.sepBy1(P.string(".")).tieWith(".").desc('words separated by ""')

    /*   ---   Entity   ---   */

    None = r => P.string("None").map(_ => new ObjectReferenceEntity({ type: "None", path: "" })).desc("none")

    Integer = r => P.regex(/[\-\+]?[0-9]+/).map(v => new IntegerEntity(v)).desc("an integer")

    Guid = r => P.regex(/[0-9a-zA-Z]{32}/).map(v => new GuidEntity({ value: v }))
        .desc("32 digit hexadecimal (accepts all the letters for safety) value")

    Identifier = r => P.regex(/\w+/).map(v => new IdentifierEntity(v))

    PathSymbol = r => P.regex(/[0-9\w]+/).map(v => new PathSymbolEntity({ value: v }))

    Reference = r => P.alt(
        r.None,
        ...[r.ReferencePath.map(path => new ObjectReferenceEntity({ type: "", path: path }))]
            .flatMap(referencePath => [
                referencePath, // version having just path
                referencePath.trim(P.string('"')) // Version having path surround with double quotes
            ]),
        P.seqMap(
            r.Word, // Goes into referenceType
            P.optWhitespace, // Goes into _ (ignored)
            P.alt(...[r.ReferencePath].flatMap(referencePath => [
                referencePath.wrap(P.string(`"`), P.string(`"`)),
                referencePath.wrap(P.string(`'"`), P.string(`"'`))
            ])), // Goes into referencePath
            (referenceType, _, referencePath) => new ObjectReferenceEntity({ type: referenceType, path: referencePath })
        ),
        r.Word.map(type => new ObjectReferenceEntity({ type: type, path: "" })),
    )

    LocalizedText = r => P.seqMap(
        P.string(LocalizedTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")), // Goes into _ (ignored)
        r.String.trim(P.optWhitespace), // Goes into namespace
        P.string(","), // Goes into __ (ignored)
        r.String.trim(P.optWhitespace), // Goes into key
        P.string(","), // Goes into ___ (ignored)
        r.String.trim(P.optWhitespace), // Goes into value
        P.string(")"), // Goes into ____ (ignored)
        (_, namespace, __, key, ___, value, ____) => new LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value
        })
    )

    InvariantText = r => r.String.trim(P.optWhitespace).wrap(
        P.string(InvariantTextEntity.lookbehind).skip(P.optWhitespace).skip(P.string("(")),
        P.string(")")
    )
        .map(value => new InvariantTextEntity({ value: value }))

    AttributeAnyValue = r => P.alt(
        r.Null,
        r.None,
        r.Boolean,
        r.Number,
        r.Integer,
        r.String,
        r.Guid,
        r.LocalizedText,
        r.InvariantText,
        r.Reference
    )

    PinReference = r => P.seqMap(
        r.PathSymbol, // Goes into objectNAme
        P.whitespace, // Goes into _ (ignored)
        r.Guid, // Goes into pinGuid
        (objectName, _, pinGuid) => new PinReferenceEntity({
            objectName: objectName,
            pinGuid: pinGuid
        })
    )

    FunctionReference = r => Grammar.createMultiAttributeGrammar(r, FunctionReferenceEntity)

    KeyBinding = r => P.alt(
        r.Identifier.map(identifier => new KeyBindingEntity({
            Key: identifier
        })),
        Grammar.createMultiAttributeGrammar(r, KeyBindingEntity)
    )

    Pin = r => Grammar.createMultiAttributeGrammar(r, PinEntity)

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

    /** @returns {Parsimmon.Parser<ObjectEntity>} */
    Object = r => P.seqMap(
        P.seq(P.string("Begin"), P.whitespace, P.string("Object"), P.whitespace),
        P
            .alt(
                r.CustomProperties,
                Grammar.createAttributeGrammar(r, ObjectEntity)
            )
            .sepBy1(P.whitespace),
        P.seq(r.MultilineWhitespace, P.string("End"), P.whitespace, P.string("Object")),
        (_, attributes, __) => {
            let values = {};
            attributes.forEach(attributeSetter => attributeSetter(values));
            return new ObjectEntity(values)
        }
    )

    /** @returns {Parsimmon.Parser<ObjectEntity[]>} */
    MultipleObject = r => r.Object.sepBy1(P.whitespace).trim(P.optWhitespace)
}

// @ts-check

class SerializerFactory {

    static #serializers = new Map()

    static registerSerializer(entity, object) {
        SerializerFactory.#serializers.set(entity, object);
    }

    static getSerializer(entity) {
        return SerializerFactory.#serializers.get(Utility.getType(entity))
    }
}

// @ts-check

class ISerializer {

    static grammar = Parsimmon.createLanguage(new Grammar())

    constructor(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        this.entityType = entityType;
        this.prefix = prefix ?? "";
        this.separator = separator ?? ",";
        this.trailingSeparator = trailingSeparator ?? false;
        this.attributeValueConjunctionSign = attributeValueConjunctionSign ?? "=";
        this.attributeKeyPrinter = attributeKeyPrinter ?? (k => k.join("."));
    }

    writeValue(value, fullKey = undefined) {
        if (value === null) {
            return "()"
        }
        const serialize = v => SerializerFactory.getSerializer(Utility.getType(v)).write(v);
        // This is an exact match (and not instanceof) to hit also primitive types (by accessing value.constructor they are converted to objects automatically)
        switch (value?.constructor) {
            case Function:
                return this.writeValue(value(), fullKey)
            case Boolean:
                return Utility.FirstCapital(value.toString())
            case Number:
                return value.toString()
            case String:
                return `"${Utility.encodeString(value)}"`
        }
        if (value instanceof Array) {
            return `(${value.map(v => serialize(v) + ",").join("")})`
        }
        if (value instanceof IEntity) {
            return serialize(value)
        }
    }

    /**
     * @param {String[]} key
     * @param {Object} object
     * @returns {String}
     */
    subWrite(key, object) {
        let result = "";
        let fullKey = key.concat("");
        const last = fullKey.length - 1;
        for (const property of Object.getOwnPropertyNames(object)) {
            fullKey[last] = property;
            const value = object[property];
            if (object[property]?.constructor === Object) {
                // Recursive call when finding an object
                result += (result.length ? this.separator : "")
                    + this.subWrite(fullKey, value);
            } else if (value !== undefined && this.showProperty(object, fullKey, value)) {
                result += (result.length ? this.separator : "")
                    + this.prefix
                    + this.attributeKeyPrinter(fullKey)
                    + this.attributeValueConjunctionSign
                    + this.writeValue(value, fullKey);
            }
        }
        if (this.trailingSeparator && result.length && fullKey.length === 1) {
            // append separator at the end if asked and there was printed content
            result += this.separator;
        }
        return result
    }

    showProperty(object, attributeKey, attributeValue) {
        const attributes = this.entityType.attributes;
        const attribute = Utility.objectGet(attributes, attributeKey);
        if (attribute instanceof TypeInitialization) {
            return !Utility.equals(attribute.value, attributeValue) || attribute.showDefault
        }
        return true
    }
}

// @ts-check

class ObjectSerializer extends ISerializer {

    constructor() {
        super(ObjectEntity, "   ", "\n", false);
    }

    showProperty(object, attributeKey, attributeValue) {
        switch (attributeKey.toString()) {
            case "Class":
            case "Name":
            case "CustomProperties":
                // Serielized separately
                return false
        }
        return super.showProperty(object, attributeKey, attributeValue)
    }

    read(value) {
        const parseResult = ISerializer.grammar.Object.parse(value);
        if (!parseResult.status) {
            throw new Error("Error when trying to parse the object.")
        }
        return parseResult.value
    }

    /**
     * @param {String} value
     * @returns {ObjectEntity[]}
     */
    readMultiple(value) {
        const parseResult = ISerializer.grammar.MultipleObject.parse(value);
        if (!parseResult.status) {
            throw new Error("Error when trying to parse the object.")
        }
        return parseResult.value
    }

    /**
     * @param {ObjectEntity} object
     */
    write(object) {
        let result = `Begin Object Class=${object.Class.path} Name=${this.writeValue(object.Name, "Name")}
${this.subWrite([], object)
            + object
                .CustomProperties.map(pin =>
                    this.separator
                    + this.prefix
                    + "CustomProperties "
                    + SerializerFactory.getSerializer(PinEntity).write(pin)
                )
                .join("")}
End Object\n`;
        return result
    }
}

// @ts-check

class Copy extends IInput {

    /** @type {(e: ClipboardEvent) => void} */
    #copyHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        options.unlistenOnTextEdit = true; // No nodes copy if inside a text field, just text (default behavior)
        super(target, blueprint, options);
        this.serializer = new ObjectSerializer();
        let self = this;
        this.#copyHandler = _ => self.copied();
    }

    listenEvents() {
        document.body.addEventListener("copy", this.#copyHandler);
    }

    unlistenEvents() {
        document.body.removeEventListener("copy", this.#copyHandler);
    }

    copied() {
        const value = this.blueprint.getNodes(true).map(node => this.serializer.write(node.entity)).join("\n");
        navigator.clipboard.writeText(value);
    }
}

// @ts-check

/**
 * This solves the sole purpose of providing compression capability for html inside template literals strings. Check rollup.config.js function minifyHTML()
 */
const html = String.raw;

// @ts-check

/**
 * @typedef {import("../element/IElement").default} IElement
 * @typedef {import("../input/IInput").default} IInput")}
 */

/**
 * @template {IElement} T
 */
class ITemplate {

    /** @type {IInput[]} */
    #inputObjects = []

    get inputObjects() {
        return this.#inputObjects
    }

    /**
     * @param {T} entity
     */
    render(entity) {
        return ""
    }

    /**
     * @param {T} element
     */
    setup(element) {
        // TODO replace with the safer element.setHTML(...) when it will be availableBreack
        element.innerHTML = this.render(element);
    }

    /**
     * @param {T} element
     */
    inputSetup(element) {
        this.#inputObjects = this.createInputObjects(element);
    }

    /**
     * @param {T} element
     */
    cleanup(element) {
        this.#inputObjects.forEach(v => v.unlistenDOMElement());
    }

    /**
     * @param {T} element
     * @returns {IInput[]}
     */
    createInputObjects(element) {
        return []
    }
}

// @ts-check

class IKeyboardShortcut extends IInput {

    /** @type {KeyBindingEntity[]} */
    #activationKeys

    constructor(target, blueprint, options = {}) {
        options.activateAnyKey ??= false;
        options.activationKeys ??= [];
        options.listenOnFocus ??= true;
        options.unlistenOnTextEdit ??= true; // No shortcuts when inside of a text field
        if (!(options.activationKeys instanceof Array)) {
            options.activationKeys = [options.activationKeys];
        }
        options.activationKeys = options.activationKeys.map(v => {
            if (v instanceof KeyBindingEntity) {
                return v
            }
            if (v.constructor === String) {
                // @ts-expect-error
                const parsed = ISerializer.grammar.KeyBinding.parse(v);
                if (parsed.status) {
                    return parsed.value
                }
            }
            throw new Error("Unexpected key value")
        });

        super(target, blueprint, options);

        this.#activationKeys = this.options.activationKeys ?? [];

        const wantsShift = keyEntry => keyEntry.bShift || keyEntry.Key == "LeftShift" || keyEntry.Key == "RightShift";
        const wantsCtrl = keyEntry => keyEntry.bCtrl || keyEntry.Key == "LeftControl" || keyEntry.Key == "RightControl";
        const wantsAlt = keyEntry => keyEntry.bAlt || keyEntry.Key == "LeftAlt" || keyEntry.Key == "RightAlt";

        let self = this;
        /** @param {KeyboardEvent} e */
        this.keyDownHandler = e => {
            if (
                this.options.activateAnyKey
                || self.#activationKeys.some(keyEntry =>
                    wantsShift(keyEntry) == e.shiftKey
                    && wantsCtrl(keyEntry) == e.ctrlKey
                    && wantsAlt(keyEntry) == e.altKey
                    && Configuration.Keys[keyEntry.Key] == e.code
                )
            ) {
                if (options.consumeEvent) {
                    e.stopImmediatePropagation();
                }
                self.fire();
                document.removeEventListener("keydown", self.keyDownHandler);
                document.addEventListener("keyup", self.keyUpHandler);
            }
        };

        /** @param {KeyboardEvent} e */
        this.keyUpHandler = e => {
            if (
                this.options.activateAnyKey
                || self.#activationKeys.some(keyEntry =>
                    keyEntry.bShift && e.key == "Shift"
                    || keyEntry.bCtrl && e.key == "Control"
                    || keyEntry.bAlt && e.key == "Alt"
                    || keyEntry.bCmd && e.key == "Meta"
                    || Configuration.Keys[keyEntry.Key] == e.code
                )
            ) {
                if (options.consumeEvent) {
                    e.stopImmediatePropagation();
                }
                self.unfire();
                document.removeEventListener("keyup", this.keyUpHandler);
                document.addEventListener("keydown", this.keyDownHandler);
            }
        };

    }

    listenEvents() {
        document.addEventListener("keydown", this.keyDownHandler);
    }

    unlistenEvents() {
        document.removeEventListener("keydown", this.keyDownHandler);
    }

    // Subclasses will want to override

    fire() {
    }

    unfire() {
    }
}

// @ts-check

class KeyboardCanc extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Configuration.deleteNodesKeyboardKey;
        super(target, blueprint, options);
    }

    fire() {
        this.blueprint.removeGraphElement(...this.blueprint.getNodes(true));
    }
}

// @ts-check

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 */

/**
 * @template {HTMLElement} T
 * @extends {IInput<T>}
 */
class IPointing extends IInput {

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.movementSpace = this.blueprint?.getGridDOMElement() ?? document.documentElement;
    }

    /**
     * @param {MouseEvent} mouseEvent
     */
    locationFromEvent(mouseEvent) {
        return this.blueprint.compensateTranslation(
            Utility.convertLocation(
                [mouseEvent.clientX, mouseEvent.clientY],
                this.movementSpace
            )
        )
    }
}

// @ts-check

class IMouseWheel extends IPointing {

    /** @type {(e: WheelEvent) => void} */
    #mouseWheelHandler

    /** @type {(e: WheelEvent) => void} */
    #mouseParentWheelHandler

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options) {
        options.listenOnFocus = true;
        super(target, blueprint, options);
        this.looseTarget = options?.looseTarget ?? true;
        let self = this;

        this.#mouseWheelHandler = e => {
            e.preventDefault();
            const location = self.locationFromEvent(e);
            self.wheel(Math.sign(e.deltaY), location);
        };
        this.#mouseParentWheelHandler = e => e.preventDefault();

        if (this.blueprint.focused) {
            this.movementSpace.addEventListener("wheel", this.#mouseWheelHandler, false);
        }
    }

    listenEvents() {
        this.movementSpace.addEventListener("wheel", this.#mouseWheelHandler, false);
        this.movementSpace.parentElement?.addEventListener("wheel", this.#mouseParentWheelHandler);
    }

    unlistenEvents() {
        this.movementSpace.removeEventListener("wheel", this.#mouseWheelHandler, false);
        this.movementSpace.parentElement?.removeEventListener("wheel", this.#mouseParentWheelHandler);
    }

    /* Subclasses will override the following method */
    wheel(variation, location) {
    }
}

// @ts-check

class Zoom extends IMouseWheel {

    #enableZoonIn = false

    get enableZoonIn() {
        return this.#enableZoonIn
    }

    set enableZoonIn(value) {
        value = Boolean(value);
        if (value == this.#enableZoonIn) {
            return
        }
        this.#enableZoonIn = value;
    }

    wheel(variation, location) {
        let zoomLevel = this.blueprint.getZoom();
        variation = -variation;
        if (!this.enableZoonIn && zoomLevel == 0 && variation > 0) {
            return
        }
        zoomLevel += variation;
        this.blueprint.setZoom(zoomLevel, location);
    }
}

// @ts-check

class KeyboardEnableZoom extends IKeyboardShortcut {

    /** @type {Zoom} */
    #zoomInputObject

    /**
     * @param {HTMLElement} target
     * @param {import("../../Blueprint").default} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Configuration.enableZoomIn;
        super(target, blueprint, options);
    }

    fire() {
        this.#zoomInputObject = this.blueprint.getInputObject(Zoom);
        this.#zoomInputObject.enableZoonIn = true;
    }

    unfire() {
        this.#zoomInputObject.enableZoonIn = false;
    }
}

// @ts-check

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 */
class KeyboardSelectAll extends IKeyboardShortcut {

    /**
     * @param {HTMLElement} target
     * @param {Blueprint} blueprint
     * @param {Object} options
     */
    constructor(target, blueprint, options = {}) {
        options.activationKeys = Configuration.selectAllKeyboardKey;
        super(target, blueprint, options);
    }

    fire() {
        this.blueprint.selectAll();
    }
}

// @ts-check

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 */

/**
 * This class manages the ui gesture of mouse click and drag. Tha actual operations are implemented by the subclasses.
 * @template {HTMLElement} T
 * @extends {IPointing<T>}
 */
class IMouseClickDrag extends IPointing {

    /** @type {(e: MouseEvent) => void} */
    #mouseDownHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseStartedMovingHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseMoveHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseUpHandler

    #trackingMouse = false

    started = false

    constructor(target, blueprint, options = {}) {
        options.clickButton ??= 0;
        options.consumeEvent ??= true;
        options.exitAnyButton ??= true;
        options.looseTarget ??= false;
        options.moveEverywhere ??= false;
        super(target, blueprint, options);
        this.clickedPosition = [0, 0];

        const movementListenedElement = this.options.moveEverywhere ? document.documentElement : this.movementSpace;
        let self = this;

        this.#mouseDownHandler = e => {
            this.blueprint.setFocused(true);
            switch (e.button) {
                case self.options.clickButton:
                    // Either doesn't matter or consider the click only when clicking on the parent, not descandants
                    if (self.options.looseTarget || e.target == e.currentTarget) {
                        if (this.options.consumeEvent) {
                            e.stopImmediatePropagation(); // Captured, don't call anyone else
                        }
                        // Attach the listeners
                        movementListenedElement.addEventListener("mousemove", self.#mouseStartedMovingHandler);
                        document.addEventListener("mouseup", self.#mouseUpHandler);
                        self.clickedPosition = self.locationFromEvent(e);
                        self.clicked(self.clickedPosition);
                    }
                    break
                default:
                    if (!self.options.exitAnyButton) {
                        self.#mouseUpHandler(e);
                    }
                    break
            }
        };

        this.#mouseStartedMovingHandler = e => {
            if (this.options.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            // Delegate from now on to self.#mouseMoveHandler
            movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler);
            movementListenedElement.addEventListener("mousemove", self.#mouseMoveHandler);
            // Handler calls e.preventDefault() when it receives the event, this means dispatchEvent returns false
            const dragEvent = self.getEvent(Configuration.trackingMouseEventName.begin);
            self.#trackingMouse = this.target.dispatchEvent(dragEvent) == false;
            // Do actual actions
            self.startDrag();
            self.started = true;
        };

        this.#mouseMoveHandler = e => {
            if (this.options.consumeEvent) {
                e.stopImmediatePropagation(); // Captured, don't call anyone else
            }
            const location = self.locationFromEvent(e);
            const movement = [e.movementX, e.movementY];
            self.dragTo(location, movement);
            if (self.#trackingMouse) {
                self.blueprint.mousePosition = self.locationFromEvent(e);
            }
        };

        this.#mouseUpHandler = e => {
            if (!self.options.exitAnyButton || e.button == self.options.clickButton) {
                if (this.options.consumeEvent) {
                    e.stopImmediatePropagation(); // Captured, don't call anyone else
                }
                // Remove the handlers of "mousemove" and "mouseup"
                movementListenedElement.removeEventListener("mousemove", self.#mouseStartedMovingHandler);
                movementListenedElement.removeEventListener("mousemove", self.#mouseMoveHandler);
                document.removeEventListener("mouseup", self.#mouseUpHandler);
                if (self.started) {
                    self.endDrag();
                }
                self.unclicked();
                if (self.#trackingMouse) {
                    const dragEvent = self.getEvent(Configuration.trackingMouseEventName.end);
                    this.target.dispatchEvent(dragEvent);
                    self.#trackingMouse = false;
                }
                self.started = false;
            }
        };

        this.listenEvents();
    }

    listenEvents() {
        this.target.addEventListener("mousedown", this.#mouseDownHandler);
        if (this.options.clickButton == 2) {
            this.target.addEventListener("contextmenu", e => e.preventDefault());
        }
    }

    unlistenEvents() {
        this.target.removeEventListener("mousedown", this.#mouseDownHandler);
    }

    getEvent(eventName) {
        return new CustomEvent(eventName, {
            detail: {
                tracker: this
            },
            bubbles: true,
            cancelable: true
        })
    }

    /* Subclasses will override the following methods */
    clicked(location) {
    }

    startDrag(location) {
    }

    dragTo(location, movement) {
    }

    endDrag() {
    }

    unclicked(location) {
    }
}

// @ts-check

class MouseScrollGraph extends IMouseClickDrag {

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

// @ts-check

class MouseTracking extends IPointing {

    /** @type {IPointing} */
    #mouseTracker = null

    /** @type {(e: MouseEvent) => void} */
    #mousemoveHandler

    /** @type {(e: CustomEvent) => void} */
    #trackingMouseStolenHandler

    /** @type {(e: CustomEvent) => void} */
    #trackingMouseGaveBackHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        super(target, blueprint, options);

        let self = this;

        this.#mousemoveHandler = e => {
            e.preventDefault();
            self.blueprint.mousePosition = self.locationFromEvent(e);
        };

        this.#trackingMouseStolenHandler = e => {
            if (!self.#mouseTracker) {
                e.preventDefault();
                this.#mouseTracker = e.detail.tracker;
                self.unlistenMouseMove();
            }
        };

        this.#trackingMouseGaveBackHandler = e => {
            if (self.#mouseTracker == e.detail.tracker) {
                e.preventDefault();
                self.#mouseTracker = null;
                self.listenMouseMove();
            }
        };
    }

    listenMouseMove() {
        this.target.addEventListener("mousemove", this.#mousemoveHandler);
    }

    unlistenMouseMove() {
        this.target.removeEventListener("mousemove", this.#mousemoveHandler);
    }

    listenEvents() {
        this.listenMouseMove();
        this.blueprint.addEventListener(
            Configuration.trackingMouseEventName.begin,
            /** @type {(e: Event) => any} */(this.#trackingMouseStolenHandler));
        this.blueprint.addEventListener(
            Configuration.trackingMouseEventName.end,
            /** @type {(e: Event) => any} */(this.#trackingMouseGaveBackHandler));
    }

    unlistenEvents() {
        this.unlistenMouseMove();
        this.blueprint.removeEventListener(
            Configuration.trackingMouseEventName.begin,
            /** @type {(e: Event) => any} */(this.#trackingMouseStolenHandler));
        this.blueprint.removeEventListener(
            Configuration.trackingMouseEventName.end,
            /** @type {(e: Event) => any} */(this.#trackingMouseGaveBackHandler)
        );
    }
}

// @ts-check

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../entity/IEntity").default} IEntity
 * @typedef {import("../input/IInput").default} IInput
 * @typedef {import("../template/ITemplate").default} ITemplate
 */

/**
 * @template {IEntity} T
 * @template {ITemplate} U
 */
class IElement extends HTMLElement {

    /** @type {Blueprint} */
    #blueprint
    get blueprint() {
        return this.#blueprint
    }
    set blueprint(blueprint) {
        this.#blueprint = blueprint;
    }

    /** @type {T} */
    #entity
    get entity() {
        return this.#entity
    }
    set entity(entity) {
        this.#entity = entity;
    }

    /** @type {U} */
    #template
    get template() {
        return this.#template
    }
    set template(template) {
        this.#template = template;
    }

    /** @type {IInput[]} */
    inputObjects = []

    /**
     * @param {T} entity
     * @param {U} template
     */
    constructor(entity, template) {
        super();
        this.#entity = entity;
        this.#template = template;
        this.inputObjects = [];
    }

    getTemplate() {
        return this.template
    }

    connectedCallback() {
        this.#blueprint = this.closest("ueb-blueprint");
        this.template.setup(this);
        this.template.inputSetup(this);
    }

    disconnectedCallback() {
        this.template.cleanup(this);
    }

    /**
     * @param {IElement} element
     */
    isSameGraph(element) {
        return this.#blueprint && this.#blueprint == element?.blueprint
    }

    /**
     * @template {IInput} V
     * @param {new (...args: any[]) => V} type
     * @returns {V}
     */
    getInputObject(type) {
        return /** @type {V} */ (this.template.inputObjects.find(object => object.constructor == type))
    }

    // Subclasses will want to override
    createInputObjects() {
        return []
    }
}

// @ts-check

/**
 * @typedef {import("../template/SelectableDraggableTemplate").default} SelectableDraggableTemplate
 * @typedef {import("../entity/IEntity").default} IEntity  
 */

/**
 * @template {IEntity} T
 * @template {SelectableDraggableTemplate} U
 * @extends {IElement<T, U>}
 */
class ISelectableDraggableElement extends IElement {

    constructor(...args) {
        // @ts-expect-error
        super(...args);
        this.dragObject = null;
        this.location = [0, 0];
        this.selected = false;

        let self = this;
        this.dragHandler = (e) => {
            self.addLocation(e.detail.value);
        };
    }

    #setSelected(value = true) {
        this.selected = value;
        if (this.blueprint) {
            if (this.selected) {
                this.blueprint.addEventListener(Configuration.nodeDragEventName, this.dragHandler);
            } else {
                this.blueprint.removeEventListener(Configuration.nodeDragEventName, this.dragHandler);
            }
        }
        this.template.applySelected(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.#setSelected(this.selected);
    }

    /**
     * @param {Number[]} value 
     */
    setLocation(value = [0, 0]) {
        const d = [value[0] - this.location[0], value[1] - this.location[1]];
        this.location = value;
        this.template.applyLocation(this);
        if (this.blueprint) {
            const dragLocalEvent = new CustomEvent(Configuration.nodeDragLocalEventName, {
                detail: {
                    value: d
                },
                bubbles: false,
                cancelable: true
            });
            this.dispatchEvent(dragLocalEvent);
        }
    }

    addLocation(value) {
        this.setLocation([this.location[0] + value[0], this.location[1] + value[1]]);
    }

    setSelected(value = true) {
        if (this.selected != value) {
            this.#setSelected(value);
        }
    }

    dispatchDragEvent(value) {
        const dragEvent = new CustomEvent(Configuration.nodeDragEventName, {
            detail: {
                value: value
            },
            bubbles: true,
            cancelable: true
        });
        this.dispatchEvent(dragEvent);
    }

    snapToGrid() {
        let snappedLocation = Utility.snapToGrid(this.location, Configuration.gridSize);
        if (this.location[0] != snappedLocation[0] || this.location[1] != snappedLocation[1]) {
            this.setLocation(snappedLocation);
        }
    }
}

// @ts-check

document.createElement("div");

const tagReplacement = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
};

function sanitizeText(value) {
    return value.toString().replace(/[&<>'"]/g, tag => tagReplacement[tag])
}

// @ts-check

/**
 * @typedef {import("../element/LinkElement").default} LinkElement
 * @typedef {import("../element/LinkMessageElement").default} LinkMessageElement
 */

class LinkTemplate extends ITemplate {

    /**
     * Returns a function performing the inverse multiplication y = a / x + q. The value of a and q are calculated using
     * the derivative of that function y' = -a / x^2 at the point p (x = p[0] and y = p[1]). This means
     * y'(p[0]) = m => -a / p[0]^2 = m => a = -m * p[0]^2. Now, in order to determine q we can use the starting
     * function: p[1] = a / p[0] + q => q = p[1] - a / p[0]
     * @param {Number} m slope
     * @param {Number[]} p reference point
     * @returns Maximum value
     */
    static decreasingValue(m, p) {
        const a = -m * p[0] ** 2;
        const q = p[1] - a / p[0];
        return x => a / x + q
    }

    /**
     * Returns a function performing a clamped line passing through two points. It is clamped after and before the
     * points. It is easier explained with an example.
     *            b ______
     *             /
     *            /
     *           /
     *          /
     *         /
     *  ______/ a
     */
    static clampedLine(a, b) {
        if (a[0] > b[0]) {
            const temp = a;
            a = b;
            b = temp;
        }
        const m = (b[1] - a[1]) / (b[0] - a[0]);
        const q = a[1] - m * a[0];
        return x => x < a[0]
            ? a[1]
            : x > b[0]
                ? b[1]
                : m * x + q
    }

    static c1DecreasingValue = LinkTemplate.decreasingValue(-0.1, [100, 15])

    static c2DecreasingValue = LinkTemplate.decreasingValue(-0.06, [500, 130])

    static c2Clamped = LinkTemplate.clampedLine([0, 100], [200, 30])

    /**
     * @param {LinkElement} link
     */
    render(link) {
        const uniqueId = crypto.randomUUID();
        return html`
            <svg version="1.2" baseProfile="tiny" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <g>
                    <path id="${uniqueId}" fill="none" vector-effect="non-scaling-stroke" />
                    <use href="#${uniqueId}" pointer-events="stroke" stroke-width="10" />
                </g>
            </svg>
        `
    }

    /**
     * @param {LinkElement} link
     */
    setup(link) {
        super.setup(link);
        if (link.linkMessageElement) {
            link.appendChild(link.linkMessageElement);
        }
        link.classList.add("ueb-positioned");
        link.pathElement = link.querySelector("path");
        const referencePin = link.sourcePin ?? link.destinationPin;
        if (referencePin) {
            link.style.setProperty("--ueb-pin-color", referencePin.getColor());
        }
        this.applyPins(link);
        if (link.sourcePin && link.destinationPin) {
            this.applyFullLocation(link);
        }
    }

    /**
     * @param {LinkElement} link
     */
    applyPins(link) {
        if (link.sourcePin) {
            link.dataset.source = link.sourcePin.GetPinId().toString();
        }
        if (link.destinationPin) {
            link.dataset.destination = link.destinationPin.GetPinId().toString();
        }
    }

    /**
     * @param {LinkElement} link
     */
    applyStartDragging(link) {
        link.blueprint.dataset.creatingLink = "true";
        link.classList.add("ueb-link-dragging");
    }

    /**
     * @param {LinkElement} link
     */
    applyFinishDragging(link) {
        link.blueprint.dataset.creatingLink = "false";
        link.classList.remove("ueb-link-dragging");
    }

    /**
     * @param {LinkElement} link
     */
    applySourceLocation(link) {
        link.style.setProperty("--ueb-from-input", link.originatesFromInput ? "1" : "0");
        link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]));
        link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]));
    }

    /**
     * @param {LinkElement} link
     */
    applyFullLocation(link) {
        const dx = Math.max(Math.abs(link.sourceLocation[0] - link.destinationLocation[0]), 1);
        const width = Math.max(dx, Configuration.linkMinWidth);
        Math.max(Math.abs(link.sourceLocation[1] - link.destinationLocation[1]), 1);
        const fillRatio = dx / width;
        const xInverted = link.originatesFromInput
            ? link.sourceLocation[0] < link.destinationLocation[0]
            : link.destinationLocation[0] < link.sourceLocation[0];
        let start = dx < width // If under minimum width
            ? (width - dx) / 2 // Start from half the empty space
            : 0; // Otherwise start from the beginning

        link.style.setProperty("--ueb-from-x", sanitizeText(link.sourceLocation[0]));
        link.style.setProperty("--ueb-from-y", sanitizeText(link.sourceLocation[1]));
        link.style.setProperty("--ueb-to-x", sanitizeText(link.destinationLocation[0]));
        link.style.setProperty("--ueb-to-y", sanitizeText(link.destinationLocation[1]));
        link.style.setProperty("margin-left", `-${start}px`);
        if (xInverted) {
            start += fillRatio * 100;
        }
        link.style.setProperty("--ueb-start-percentage", `${start}%`);
        const c1
            = start
            + (xInverted
                ? LinkTemplate.c1DecreasingValue(width)
                : 10
            )
            * fillRatio;
        let c2 = LinkTemplate.c2Clamped(xInverted ? -dx : dx) + start;
        c2 = Math.min(c2, LinkTemplate.c2DecreasingValue(width));
        const d = Configuration.linkRightSVGPath(start, c1, c2);
        // TODO move to CSS when Firefox will support property d and css will have enough functions
        link.pathElement?.setAttribute("d", d);
    }

    /**
     * @param {LinkElement} link
     * @param {LinkMessageElement} linkMessage
     */
    applyLinkMessage(link, linkMessage) {
        link.querySelectorAll("ueb-link-message").forEach(element => element.remove());
        link.appendChild(linkMessage);
        link.linkMessageElement = linkMessage;
    }
}

// @ts-check

/**
 * @typedef {import("./PinElement").default} PinElement
 * @typedef {import("./LinkMessageElement").default} LinkMessageElement
 * @typedef {import("../entity/IEntity").default} IEntity
 */

/**
 * @extends {IElement<Object, LinkTemplate>}
 */
class LinkElement extends IElement {

    /** @type {PinElement} */
    #source
    get sourcePin() {
        return this.#source
    }
    set sourcePin(pin) {
        if (this.#source == pin) {
            return
        }
        if (this.#source) {
            const nodeElement = this.#source.getNodeElement();
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler);
            nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler);
            if (this.#destination) {
                this.#unlinkPins();
            }
        }
        this.#source = pin;
        if (this.#source) {
            const nodeElement = this.#source.getNodeElement();
            this.originatesFromInput = pin.isInput();
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler);
            nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragSourceHandler);
            this.setSourceLocation();
            if (this.#destination) {
                this.#linkPins();
            }
        }
        this.template.applyPins(this);
    }

    /** @type {PinElement} */
    #destination
    get destinationPin() {
        return this.#destination
    }
    set destinationPin(pin) {
        if (this.#destination == pin) {
            return
        }
        if (this.#destination) {
            const nodeElement = this.#destination.getNodeElement();
            nodeElement.removeEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler);
            nodeElement.removeEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragDestinatonHandler);
            if (this.#source) {
                this.#unlinkPins();
            }
        }
        this.#destination = pin;
        if (this.#destination) {
            const nodeElement = this.#destination.getNodeElement();
            nodeElement.addEventListener(Configuration.nodeDeleteEventName, this.#nodeDeleteHandler);
            nodeElement.addEventListener(Configuration.nodeDragLocalEventName, this.#nodeDragDestinatonHandler);
            this.setDestinationLocation();
            if (this.#source) {
                this.#linkPins();
            }
        }
        this.template.applyPins(this);
    }

    #nodeDeleteHandler
    #nodeDragSourceHandler
    #nodeDragDestinatonHandler
    sourceLocation = [0, 0]
    /** @type {SVGPathElement} */
    pathElement
    /** @type {LinkMessageElement} */
    linkMessageElement
    originatesFromInput = false
    destinationLocation = [0, 0]

    /**
     * @param {PinElement} source
     * @param {PinElement} destination
     */
    constructor(source, destination) {
        super({}, new LinkTemplate());
        const self = this;
        this.#nodeDeleteHandler = _ => self.remove();
        this.#nodeDragSourceHandler = e => self.addSourceLocation(e.detail.value);
        this.#nodeDragDestinatonHandler = e => self.addDestinationLocation(e.detail.value);
        if (source) {
            this.sourcePin = source;
        }
        if (destination) {
            this.destinationPin = destination;
        }
        if (source && destination) {
            this.#linkPins();
        }
    }

    #linkPins() {
        this.#source.linkTo(this.#destination);
        this.#destination.linkTo(this.#source);
    }

    #unlinkPins() {
        if (this.#source && this.#destination) {
            this.#source.unlinkFrom(this.#destination);
            this.#destination.unlinkFrom(this.#source);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#unlinkPins();
    }

    /**
     * @returns {Number[]}
     */
    getSourceLocation() {
        return this.sourceLocation
    }

    /**
     * @param {Number[]} offset
     */
    addSourceLocation(offset) {
        const location = [
            this.sourceLocation[0] + offset[0],
            this.sourceLocation[1] + offset[1]
        ];
        this.sourceLocation = location;
        this.template.applyFullLocation(this);
    }

    /**
     * @param {Number[]} location
     */
    setSourceLocation(location = null) {
        if (location == null) {
            location = this.#source.template.getLinkLocation(this.#source);
        }
        this.sourceLocation = location;
        this.template.applySourceLocation(this);
    }

    getDestinationLocation() {
        return this.destinationLocation
    }

    /**
     * @param {Number[]} offset
     */
    addDestinationLocation(offset) {
        const location = [
            this.destinationLocation[0] + offset[0],
            this.destinationLocation[1] + offset[1]
        ];
        this.setDestinationLocation(location);
    }

    /**
     * @param {Number[]} location
     */
    setDestinationLocation(location = null) {
        if (location == null) {
            location = this.#destination.template.getLinkLocation(this.#destination);
        }
        this.destinationLocation = location;
        this.template.applyFullLocation(this);
    }

    /**
     * @param {LinkMessageElement} linkMessage
     */
    setLinkMessage(linkMessage) {
        if (linkMessage) {
            this.template.applyLinkMessage(this, linkMessage);
        } else if (this.linkMessageElement) {
            this.linkMessageElement.remove();
            this.linkMessageElement = null;
        }
    }

    startDragging() {
        this.template.applyStartDragging(this);
    }

    finishDragging() {
        this.template.applyFinishDragging(this);
    }
}

customElements.define("ueb-link", LinkElement);

// @ts-check

/**
 * @typedef {import("../element/LinkMessageElement").default} LinkMessageElement
 */

class LinkMessageTemplate extends ITemplate {

    /**
     * @param {LinkMessageElement} linkMessage
     */
    render(linkMessage) {
        return html`
            <span class="${sanitizeText(linkMessage.icon)}"></span>
            <span class="ueb-link-message"></span>
        `
    }

    /**
     * Applies the style to the element.
     * @param {LinkMessageElement} linkMessage
     */
    setup(linkMessage) {
        super.setup(linkMessage);
        const linkMessageSetup = _ =>
            /** @type {HTMLElement} */(linkMessage.querySelector(".ueb-link-message")).innerText = linkMessage.message(
            linkMessage.linkElement.sourcePin,
            linkMessage.linkElement.destinationPin
        );
        linkMessage.linkElement = linkMessage.closest("ueb-link");
        if (linkMessage.linkElement) {
            linkMessageSetup();
        } else {
            window.customElements.whenDefined("ueb-link-message").then(linkMessageSetup);
        }
    }

}

// @ts-check

/**
 * @typedef {import("./PinElement").default} PinElement
 * @typedef {import("./LinkElement").default} LinkElement
 * @typedef {(sourcePin: PinElement, destinationPin: PinElement) => String} LinkRetrieval
 */

/**
 * @extends {IElement<Object, LinkMessageTemplate>}
 */
class LinkMessageElement extends IElement {

    static convertType = _ => new LinkMessageElement(
        "ueb-icon-conver-type",
        /** @type {LinkRetrieval} */
        (s, d) => `Convert ${s.getType()} to ${d.getType()}.`
    )
    static correct = _ => new LinkMessageElement(
        "ueb-icon-correct",
        /** @type {LinkRetrieval} */
        (s, d) => ""
    )
    static directionsIncompatible = _ => new LinkMessageElement(
        "ueb-icon-directions-incompatible",
        /** @type {LinkRetrieval} */
        (s, d) => "Directions are not compatbile."
    )
    static placeNode = _ => new LinkMessageElement(
        "ueb-icon-place-node",
        /** @type {LinkRetrieval} */
        (s, d) => "Place a new node."
    )
    static replaceLink = _ => new LinkMessageElement(
        "ueb-icon-replace-link",
        /** @type {LinkRetrieval} */
        (s, d) => "Replace existing input connections."
    )
    static sameNode = _ => new LinkMessageElement(
        "ueb-icon-same-node",
        /** @type {LinkRetrieval} */
        (s, d) => "Both are on the same node."
    )
    static typesIncompatible = _ => new LinkMessageElement(
        "ueb-icon-types-incompatible",
        /** @type {LinkRetrieval} */
        (s, d) => `${s.getType()} is not compatible with ${d.getType()}.`
    )

    /** @type {String} */
    icon
    /** @type {LinkRetrieval} */
    message
    /** @type {LinkElement} */
    linkElement

    constructor(icon, message) {
        super({}, new LinkMessageTemplate());
        this.icon = icon;
        this.message = message;
    }

}

customElements.define("ueb-link-message", LinkMessageElement);

// @ts-check

/**
 * @typedef {import("../../element/PinElement").default} PinElement
 */

/**
 * @extends IMouseClickDrag<PinElement>
 */
class MouseCreateLink extends IMouseClickDrag {

    /** @type {NodeListOf<PinElement>} */
    #listenedPins

    /** @type {(e: MouseEvent) => void} */
    #mouseenterHandler

    /** @type {(e: MouseEvent) => void} */
    #mouseleaveHandler

    /** @type {LinkElement} */
    link

    /** @type {PinElement} */
    enteredPin

    linkValid = false

    constructor(target, blueprint, options) {
        super(target, blueprint, options);

        let self = this;
        this.#mouseenterHandler = e => {
            if (!self.enteredPin) {
                self.linkValid = false;
                self.enteredPin = /** @type {PinElement} */ (e.target);
                const a = self.enteredPin, b = self.target;
                if (a.getNodeElement() == b.getNodeElement()) {
                    this.setLinkMessage(LinkMessageElement.sameNode());
                } else if (a.isOutput() == b.isOutput()) {
                    this.setLinkMessage(LinkMessageElement.directionsIncompatible());
                } else if (a.isOutput() == b.isOutput()) {
                    this.setLinkMessage(LinkMessageElement.directionsIncompatible());
                } else if (self.blueprint.getLinks([a, b]).length) {
                    this.setLinkMessage(LinkMessageElement.replaceLink());
                    self.linkValid = true;
                } else {
                    this.setLinkMessage(LinkMessageElement.correct());
                    self.linkValid = true;
                }
            }
        };
        this.#mouseleaveHandler = e => {
            if (self.enteredPin == e.target) {
                self.enteredPin = null;
                self.linkValid = false;
                this.setLinkMessage(LinkMessageElement.placeNode());
            }
        };
    }

    startDrag() {
        this.link = new LinkElement(this.target, null);
        this.blueprint.nodesContainerElement.prepend(this.link);
        this.setLinkMessage(LinkMessageElement.placeNode());
        this.#listenedPins = this.blueprint.querySelectorAll("ueb-pin");
        this.#listenedPins.forEach(pin => {
            if (pin != this.target) {
                pin.getClickableElement().addEventListener("mouseenter", this.#mouseenterHandler);
                pin.getClickableElement().addEventListener("mouseleave", this.#mouseleaveHandler);
            }
        });
        this.link.startDragging();
        this.link.setDestinationLocation(this.clickedPosition);
    }

    dragTo(location, movement) {
        this.link.setDestinationLocation(location);
    }

    endDrag() {
        this.#listenedPins.forEach(pin => {
            pin.removeEventListener("mouseenter", this.#mouseenterHandler);
            pin.removeEventListener("mouseleave", this.#mouseleaveHandler);
        });
        if (this.enteredPin && this.linkValid) {
            this.blueprint.addGraphElement(this.link);
            this.link.destinationPin = this.enteredPin;
            this.link.setLinkMessage(null);
            this.link.finishDragging();
        } else {
            this.link.finishDragging();
            this.link.remove();
        }
        this.enteredPin = null;
        this.link = null;
        this.#listenedPins = null;
    }

    setLinkMessage(linkMessage) {
        this.link.setLinkMessage(linkMessage);
    }
}

// @ts-check

/**
 * @typedef {import ("../input/IInput").default} IInput
 * @typedef {import("../element/NodeElement").default} NodeElement
 * @typedef {import("../element/PinElement").default} PinElement
 */

class PinTemplate extends ITemplate {

    hasInput = false

    /**
     * @param {PinElement} pin
     * @returns {IInput[]}
     */
    createInputObjects(pin) {
        return [
            new MouseCreateLink(pin.clickableElement, pin.blueprint, {
                moveEverywhere: true,
                looseTarget: true
            })
        ]
    }

    /**
     * @param {PinElement} pin
     */
    render(pin) {
        const icon = html`
            <div class="ueb-pin-icon">
                ${this.renderIcon(pin)}
            </div>
        `;
        const content = html`
            <div class="ueb-pin-content">
                <span class="ueb-pin-name">${sanitizeText(pin.getPinDisplayName())}</span>
                ${this.renderInput(pin)}
            </div>
        `;
        if (pin.isInput()) {
            return icon + content
        } else {
            return content + icon
        }
    }

    /**
     * @param {PinElement} pin
     */
    renderIcon(pin) {
        return '<span class="ueb-pin-icon-value"></span>'
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        return ""
    }

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin);
        pin.classList.add(
            "ueb-node-" + (pin.isInput() ? "input" : pin.isOutput() ? "output" : "hidden"),
            "ueb-pin-" + sanitizeText(pin.getType())
        );
        pin.dataset.id = pin.GetPinIdValue();
        if (pin.entity.bAdvancedView) {
            pin.dataset.advancedView = "true";
        }
        pin.clickableElement = pin;
        pin.nodeElement = pin.closest("ueb-node");
    }

    /**
     * @param {PinElement} pin
     */
    applyConnected(pin) {
        if (pin.isLinked()) {
            pin.classList.add("ueb-pin-fill");
        } else {
            pin.classList.remove("ueb-pin-fill");
        }
    }

    /**
     * @param {PinElement} pin
     */
    getLinkLocation(pin) {
        const rect = pin.querySelector(".ueb-pin-icon").getBoundingClientRect();
        return pin.blueprint.compensateTranslation(Utility.convertLocation(
            [(rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2],
            pin.blueprint.gridElement))
    }
}

// @ts-check

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

class ExecPinTemplate extends PinTemplate {

    /**
     * @param {PinElement} pin
     */
    renderIcon(pin) {
        return html`
            <svg class="ueb-pin-icon-exec" width="16" height="16" viewBox="-2 0 16 16" fill="none">
                <path class="ueb-pin-tofill" stroke-width="1.25" stroke="currentColor" d="
                    M 2 1
                    a 2 2 0 0 0 -2 2
                    v 10
                    a 2 2 0 0 0 2 2
                    h 4
                    a 2 2 0 0 0 1.519 -0.698
                    l 4.843 -5.651
                    a 1 1 0 0 0 0 -1.302
                    L 7.52 1.7
                    a 2 2 0 0 0 -1.519 -0.698
                    z
                " />
            </svg>
        `
    }
}

/**
 * @typedef {import("../../element/PinElement").default} PinElement
 */

/**
 * @extends IMouseClickDrag<PinElement>
 */
class MouseIgnore extends IMouseClickDrag {

    constructor(target, blueprint, options = {}) {
        options.consumeEvent = true;
        super(target, blueprint, options);
    }
}

// @ts-check

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

class IInputPinTemplate extends PinTemplate {

    /** @type {HTMLElement} */
    input = null
    hasInput = true

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin);
        if (this.input = pin.querySelector(".ueb-pin-input-content")) {
            let self = this;
            this.onFocusHandler = (e) => {
                pin.blueprint.dispatchEditTextEvent(true);
            };
            this.onFocusOutHandler = (e) => {
                e.preventDefault();
                document.getSelection().removeAllRanges(); // Deselect text inside the input
                self.acceptInput(pin);
                pin.blueprint.dispatchEditTextEvent(false);
            };
            this.input.addEventListener("focus", this.onFocusHandler);
            this.input.addEventListener("focusout", this.onFocusOutHandler);
        }
    }

    /**
     * @param {PinElement} pin
     */
    cleanup(pin) {
        super.cleanup(pin);
        if (this.input) {
            this.input.removeEventListener("focus", this.onFocusHandler);
            this.input.removeEventListener("focusout", this.onFocusOutHandler);
        }
    }

    /**
     * @param {PinElement} pin
     */
    createInputObjects(pin) {
        if (pin.isInput()) {
            return [
                ...super.createInputObjects(pin),
                new MouseIgnore(pin.querySelector(".ueb-pin-input-content"), pin.blueprint),
            ]
        }
        return super.createInputObjects(pin)
    }

    /**
     * @param {PinElement} pin
     */
    getInput(pin) {
        return Utility.encodeInputString(
            /** @type {HTMLElement} */(pin.querySelector(".ueb-pin-input-content")).innerText
        )
    }

    /**
     * @param {PinElement} pin
     */
    acceptInput(pin) {
        pin.entity.DefaultValue = this.getInput(pin);
    }

    /**
     * @param {PinElement} pin
     */
    renderInput(pin) {
        if (pin.isInput()) {
            return html`
                <div class="ueb-pin-input">
                    <div class="ueb-pin-input-content" role="textbox" contenteditable="true">
                        ${Utility.decodeInputString(sanitizeText(pin.entity.getDefaultValue()))}
                    </div>
                </div>
            `
        }
        return ""
    }
}

// @ts-check

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

class RealPinTemplate extends IInputPinTemplate {


    /**
     * @param {PinElement} pin
     */
    acceptInput(pin) {
        const value = parseFloat(this.getInput(pin));
        pin.entity.DefaultValue = isNaN(value)
            ? pin.entity.AutogeneratedDefaultValue
            : value.toString();
    }
}

// @ts-check

/**
 * @typedef {import("../element/PinElement").default} PinElement
 */

class StringPinTemplate extends IInputPinTemplate {

    /**
     * @param {PinElement} pin
     */
    setup(pin) {
        super.setup(pin);
    }
}

// @ts-check

/**
 * @typedef {import("../entity/GuidEntity").default} GuidEntity
 * @typedef {import("../entity/PinEntity").default} PinEntity
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 * @typedef {import("./NodeElement").default} NodeElement
 */

/**
 * @extends {IElement<PinEntity, PinTemplate>}
 */
class PinElement extends IElement {

    static #typeTemplateMap = {
        "exec": ExecPinTemplate,
        "real": RealPinTemplate,
        "string": StringPinTemplate,
    }

    #color = ""

    /** @type {NodeElement} */
    nodeElement

    /** @type {HTMLElement} */
    clickableElement

    connections = 0

    /**
     * @param {PinEntity} entity
     */
    constructor(entity) {
        super(
            entity,
            new (PinElement.#typeTemplateMap[entity.getType()] ?? PinTemplate)()
        );
    }

    connectedCallback() {
        super.connectedCallback();
        this.#color = window.getComputedStyle(this).getPropertyValue("--ueb-pin-color");
    }

    /** @return {GuidEntity} */
    GetPinId() {
        return this.entity.PinId
    }

    /** @return {String} */
    GetPinIdValue() {
        return this.GetPinId().value
    }

    /**
     * @returns {String}
     */
    getPinName() {
        return this.entity.PinName
    }

    /**
     * @returns {String}
     */
    getPinDisplayName() {
        if (this.entity.PinToolTip) {
            const matchResult = this.entity.PinToolTip.match(/\s*(.+?(?=\\n)|.+\S)\s*/); // Match up until the first \n
            return matchResult[1]
        }
        return Utility.formatStringName(this.entity.PinName)
    }

    isInput() {
        return this.entity.isInput()
    }

    isOutput() {
        return this.entity.isOutput()
    }

    isLinked() {
        return this.entity.isLinked()
    }

    getType() {
        return this.entity.getType()
    }

    getClickableElement() {
        return this.clickableElement
    }

    getColor() {
        return this.#color
    }

    getLinkLocation() {
        return this.template.getLinkLocation(this)
    }

    /**
     * @returns {NodeElement}
     */
    getNodeElement() {
        return this.closest("ueb-node")
    }

    getLinks() {
        return this.entity.LinkedTo ?? []
    }

    sanitizeLinks() {
        this.entity.LinkedTo = this.getLinks().filter(pinReference => {
            let pin = this.blueprint.getPin(pinReference);
            if (pin) {
                let link = this.blueprint.getLink(this, pin, true);
                if (!link) {
                    this.blueprint.addGraphElement(new LinkElement(this, pin));
                }
            }
            return pin
        });
    }

    /**
     * @param {PinElement} targetPinElement
     */
    linkTo(targetPinElement) {
        this.entity.linkTo(targetPinElement.nodeElement.getNodeName(), targetPinElement.entity);
        this.template.applyConnected(this);
    }

    /**
     * @param {PinElement} targetPinElement
     */
    unlinkFrom(targetPinElement) {
        this.entity.unlinkFrom(targetPinElement.nodeElement.getNodeName(), targetPinElement.entity);
        this.template.applyConnected(this);
    }

    /**
     * 
     * @param {PinElement} originalPinElement
     * @param {PinReferenceEntity} newReference
     */
    redirectLink(originalPinElement, newReference) {
        const index = this.entity.LinkedTo.findIndex(pinReference =>
            pinReference.objectName.toString() == originalPinElement.getPinName()
            && pinReference.pinGuid == originalPinElement.entity.PinId
        );
        if (index >= 0) {
            this.entity.LinkedTo[index] = newReference;
            return true
        }
        return false
    }
}

customElements.define("ueb-pin", PinElement);

// @ts-check

/**
 * @typedef {import("../../Blueprint").default} Blueprint
 * @typedef {import("../../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 */

/**
 * @extends {IMouseClickDrag<ISelectableDraggableElement>}
 */
class MouseMoveNodes extends IMouseClickDrag {

    constructor(target, blueprint, options) {
        super(target, blueprint, options);
        this.stepSize = parseInt(options?.stepSize ?? this.blueprint.gridSize);
        this.mouseLocation = [0, 0];
    }

    startDrag() {
        // Get the current mouse position
        this.mouseLocation = Utility.snapToGrid(this.clickedPosition, this.stepSize);

        if (!this.target.selected) {
            this.blueprint.unselectAll();
            this.target.setSelected(true);
        }
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

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll();
            this.target.setSelected(true);
        }
    }
}

// @ts-check

/**
 * @typedef {import("../element/ISelectableDraggableElement").default} ISelectableDraggableElement
 */

/**
 * @extends {ITemplate<ISelectableDraggableElement>}
 */
class SelectableDraggableTemplate extends ITemplate {

    /**
     * @param {ISelectableDraggableElement} element
     */
    createInputObjects(element) {
        return [
            ...super.createInputObjects(element),
            new MouseMoveNodes(element, element.blueprint, {
                looseTarget: true
            }),
        ]
    }

    /**
     * @param {ISelectableDraggableElement} element
     */
    applyLocation(element) {
        element.style.setProperty("--ueb-position-x", sanitizeText(element.location[0]));
        element.style.setProperty("--ueb-position-y", sanitizeText(element.location[1]));
    }

    /**
     * @param {ISelectableDraggableElement} element
     */
    applySelected(element) {
        if (element.selected) {
            element.classList.add("ueb-selected");
        } else {
            element.classList.remove("ueb-selected");
        }
    }
}

// @ts-check

/**
 * @typedef {import("../element/NodeElement").default} NodeElement
 */

class NodeTemplate extends SelectableDraggableTemplate {

    toggleAdvancedDisplayHandler

    /**
     * Computes the html content of the target element.
     * @param {NodeElement} node Graph node element
     * @returns The result html
     */
    render(node) {
        return html`
            <div class="ueb-node-border">
                <div class="ueb-node-content">
                    <div class="ueb-node-header">
                        <div class="ueb-node-name">
                            <span class="ueb-node-name-symbol"></span>
                            <span class="ueb-node-name-text">
                                ${sanitizeText(node.getNodeDisplayName())}
                            </span>
                        </div>
                    </div>
                    <div class="ueb-node-body">
                        <div class="ueb-node-inputs"></div>
                        <div class="ueb-node-outputs"></div>
                    </div>
                    ${node.entity.EnabledState.toString() == "DevelopmentOnly" ? html`
                        <div class="ueb-node-developmentonly">Development Only</div>
                    ` : ""}
                    ${node.entity.AdvancedPinDisplay ? html`
                        <div class="ueb-node-expansion">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="ueb-node-expansion-icon"
                                viewBox="4 4 24 24"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="
                                        M 16.003 18.626
                                        l 7.081 -7.081
                                        L 25 13.46
                                        l -8.997 8.998 -9.003 -9 1.917 -1.916
                                        z
                                    "
                                />
                            </svg>
                        </div>
                    ` : ""}
                </div>
            </div>
        `
    }

    /**
     * @param {NodeElement} node
     */
    setup(node) {
        super.setup(node);
        node.dataset.name = sanitizeText(node.entity.getObjectName());
        if (node.entity.EnabledState) {
            node.dataset.enabledState = node.entity.EnabledState.toString();
        }
        if (node.selected) {
            node.classList.add("ueb-selected");
        }
        this.applyAdvancedPinDisplay(node);
        node.style.setProperty("--ueb-position-x", sanitizeText(node.location[0]));
        node.style.setProperty("--ueb-position-y", sanitizeText(node.location[1]));
        /** @type {HTMLElement} */
        let inputContainer = node.querySelector(".ueb-node-inputs");
        /** @type {HTMLElement} */
        let outputContainer = node.querySelector(".ueb-node-outputs");
        let pins = node.getPinEntities();
        pins.filter(v => v.isInput()).forEach(v => inputContainer.appendChild(new PinElement(v)));
        pins.filter(v => v.isOutput()).forEach(v => outputContainer.appendChild(new PinElement(v)));
        this.toggleAdvancedDisplayHandler = _ => {
            node.toggleShowAdvancedPinDisplay();
        };
        if (node.entity.AdvancedPinDisplay) {
            node.querySelector(".ueb-node-expansion").addEventListener("click", this.toggleAdvancedDisplayHandler);
        }
    }

    /**
     * @param {NodeElement} node
     */
    applyAdvancedPinDisplay(node) {
        if (node.entity.AdvancedPinDisplay) {
            node.dataset.advancedDisplay = node.entity.AdvancedPinDisplay.toString();
        }
    }

    /**
     * @param {NodeElement} node
     */
    applyRename(node) {
        const nodeName = node.entity.getObjectName();
        node.dataset.name = sanitizeText(nodeName);
        // @ts-expect-error
        node.querySelector(".ueb-node-name-text").innerText = sanitizeText(node.getNodeDisplayName());
    }

    /**
     * @param {NodeElement} node
     * @returns {NodeListOf<PinElement>}
     */
    getPinElements(node) {
        return node.querySelectorAll("ueb-pin")
    }
}

// @ts-check

/**
 * @extends {ISelectableDraggableElement<ObjectEntity, NodeTemplate>}
 */
class NodeElement extends ISelectableDraggableElement {

    /**
     * @param {ObjectEntity} entity
     */
    constructor(entity) {
        super(entity, new NodeTemplate());
        this.dragLinkObjects = [];
        super.setLocation([this.entity.NodePosX.value, this.entity.NodePosY.value]);
    }

    /**
     * @param {String} str
     */
    static fromSerializedObject(str) {
        str = str.trim();
        let entity = SerializerFactory.getSerializer(ObjectEntity).read(str);
        return new NodeElement(entity)
    }

    connectedCallback() {
        this.getAttribute("type")?.trim();
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispatchDeleteEvent();
    }

    getNodeName() {
        return this.entity.getObjectName()
    }

    getNodeDisplayName() {
        return this.entity.getDisplayName()
    }

    sanitizeLinks() {
        this.getPinElements().forEach(pin => pin.sanitizeLinks());
    }

    /**
     * @param {String} name
     */
    rename(name) {
        if (this.entity.Name == name) {
            return false
        }
        for (let sourcePinElement of this.getPinElements()) {
            for (let targetPinReference of sourcePinElement.getLinks()) {
                this.blueprint.getPin(targetPinReference).redirectLink(sourcePinElement, new PinReferenceEntity({
                    objectName: name,
                    pinGuid: sourcePinElement.entity.PinId,
                }));
            }
        }
        this.entity.Name = name;
        this.template.applyRename(this);
    }

    getPinElements() {
        return this.template.getPinElements(this)
    }

    /**
     * @returns {PinEntity[]}
     */
    getPinEntities() {
        return this.entity.CustomProperties.filter(v => v instanceof PinEntity)
    }

    setLocation(value = [0, 0]) {
        let nodeType = this.entity.NodePosX.constructor;
        // @ts-expect-error
        this.entity.NodePosX = new nodeType(value[0]);
        // @ts-expect-error
        this.entity.NodePosY = new nodeType(value[1]);
        super.setLocation(value);
    }

    dispatchDeleteEvent(value) {
        let deleteEvent = new CustomEvent(Configuration.nodeDeleteEventName, {
            bubbles: true,
            cancelable: true,
        });
        this.dispatchEvent(deleteEvent);
    }

    setShowAdvancedPinDisplay(value) {
        this.entity.AdvancedPinDisplay = new IdentifierEntity(value ? "Shown" : "Hidden");
        this.template.applyAdvancedPinDisplay(this);
    }

    toggleShowAdvancedPinDisplay() {
        this.setShowAdvancedPinDisplay(this.entity.AdvancedPinDisplay.value != "Shown");
    }
}

customElements.define("ueb-node", NodeElement);

// @ts-check

class Paste extends IInput {

    /** @type {(e: ClipboardEvent) => void} */
    #pasteHandle

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        options.unlistenOnTextEdit = true; // No nodes paste if inside a text field, just text (default behavior)
        super(target, blueprint, options);
        this.serializer = new ObjectSerializer();
        let self = this;
        this.#pasteHandle = e => self.pasted(e.clipboardData.getData("Text"));
    }

    listenEvents() {
        document.body.addEventListener("paste", this.#pasteHandle);
    }

    unlistenEvents() {
        document.body.removeEventListener("paste", this.#pasteHandle);
    }

    pasted(value) {
        let top = 0;
        let left = 0;
        let count = 0;
        let nodes = this.serializer.readMultiple(value).map(entity => {
            let node = new NodeElement(entity);
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
        let mousePosition = this.blueprint.mousePosition;
        nodes.forEach(node => {
            const locationOffset = [
                mousePosition[0] - left,
                mousePosition[1] - top,
            ];
            node.addLocation(locationOffset);
            node.setSelected(true);
            node.snapToGrid();
        });
        this.blueprint.addGraphElement(...nodes);
        return true
    }
}

// @ts-check

class Select extends IMouseClickDrag {

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
        }
    }

    unclicked() {
        if (!this.started) {
            this.blueprint.unselectAll();
        }
    }
}

// @ts-check

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

// @ts-check

/**
 * @typedef {{
 *     primaryInf: Number,
 *     primarySup: Number,
 *     secondaryInf: Number,
 *     secondarySup: Number
 * }} BoundariesInfo
 * @typedef {{
 *     primaryBoundary: Number,
 *     secondaryBoundary: Number,
 *     insertionPosition?: Number,
 *     rectangle: Number
 *     onSecondaryAxis: Boolean
 * }} Metadata
 * @typedef {any} Rectangle
 */
class FastSelectionModel {

    /**
     * @param {Number[]} initialPosition Coordinates of the starting point of selection [primaryAxisValue, secondaryAxisValue].
     * @param {Rectangle[]} rectangles Rectangles that can be selected by this object.
     * @param {(rect: Rectangle) => BoundariesInfo} boundariesFunc A function that, given a rectangle, it provides the boundaries of such rectangle.
     * @param {(rect: Rectangle, selected: Boolean) => void} selectFunc A function that selects or deselects individual rectangles.
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
        this.computeBoundaries();
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
            this.computeBoundaries();
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
            this.computeBoundaries();
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

// @ts-check

/**
 * @typedef {import("../element/SelectorElement").default} SelectorElement
 */

class SelectorTemplate extends ITemplate {

    /**
     * Applies the style to the element.
     * @param {SelectorElement} selector Selector element
     */
    setup(selector) {
        super.setup(selector);
        this.applyFinishSelecting(selector);
    }

    /**
     * Applies the style relative to selection beginning.
     * @param {SelectorElement} selector Selector element
     */
    applyStartSelecting(selector, initialPosition) {
        // Set initial position
        selector.style.setProperty("--ueb-from-x", sanitizeText(initialPosition[0]));
        selector.style.setProperty("--ueb-from-y", sanitizeText(initialPosition[1]));
        // Final position coincide with the initial position, at the beginning of selection
        selector.style.setProperty("--ueb-to-x", sanitizeText(initialPosition[0]));
        selector.style.setProperty("--ueb-to-y", sanitizeText(initialPosition[1]));
        selector.blueprint.dataset.selecting = "true";
    }

    /**
     * Applies the style relative to selection.
     * @param {SelectorElement} selector Selector element
     */
    applyDoSelecting(selector, finalPosition) {
        selector.style.setProperty("--ueb-to-x", sanitizeText(finalPosition[0]));
        selector.style.setProperty("--ueb-to-y", sanitizeText(finalPosition[1]));
    }

    /**
     * Applies the style relative to selection finishing.
     * @param {SelectorElement} selector Selector element
     */
    applyFinishSelecting(selector) {
        selector.blueprint.dataset.selecting = "false";
    }
}

// @ts-check

/**
 * @extends {IElement<Object, SelectorTemplate>}
 */
class SelectorElement extends IElement {

    constructor() {
        super({}, new SelectorTemplate());
        this.selectionModel = null;
    }

    /**
     * @param {Number[]} initialPosition
     */
    startSelecting(initialPosition) {
        this.template.applyStartSelecting(this, initialPosition);
        this.selectionModel = new FastSelectionModel(initialPosition, this.blueprint.getNodes(), this.blueprint.nodeBoundariesSupplier, this.blueprint.nodeSelectToggleFunction);
    }

    /**
     * @param {Number[]} finalPosition
     */
    doSelecting(finalPosition) {
        this.template.applyDoSelecting(this, finalPosition);
        this.selectionModel.selectTo(finalPosition);
    }

    finishSelecting() {
        this.template.applyFinishSelecting(this);
        this.selectionModel = null;
    }
}

customElements.define("ueb-selector", SelectorElement);

// @ts-check

class Unfocus extends IInput {

    /** @type {(e: MouseEvent) => void} */
    #clickHandler

    constructor(target, blueprint, options = {}) {
        options.listenOnFocus = true;
        super(target, blueprint, options);

        let self = this;
        this.#clickHandler = e => self.clickedSomewhere(/** @type {HTMLElement} */(e.target));
        if (this.blueprint.focus) {
            document.addEventListener("click", this.#clickHandler);
        }
    }

    /**
     * @param {HTMLElement} target
     */
    clickedSomewhere(target) {
        // If target is outside the blueprint grid
        if (!target.closest("ueb-blueprint")) {
            this.blueprint.setFocused(false);
        }
    }

    listenEvents() {
        document.addEventListener("click", this.#clickHandler);
    }

    unlistenEvents() {
        document.removeEventListener("click", this.#clickHandler);
    }
}

// @ts-check

/**
 * @typedef {import("../Blueprint").default} Blueprint
 * @typedef {import("../element/PinElement").default} PinElement
 * @typedef {import("../entity/PinReferenceEntity").default} PinReferenceEntity
 */

class BlueprintTemplate extends ITemplate {

    /**
     * @param {Blueprint} blueprint
     */
    createInputObjects(blueprint) {
        return [
            new Copy(blueprint.getGridDOMElement(), blueprint),
            new Paste(blueprint.getGridDOMElement(), blueprint),
            new KeyboardCanc(blueprint.getGridDOMElement(), blueprint),
            new KeyboardSelectAll(blueprint.getGridDOMElement(), blueprint),
            new Zoom(blueprint.getGridDOMElement(), blueprint, {
                looseTarget: true,
            }),
            new Select(blueprint.getGridDOMElement(), blueprint, {
                clickButton: 0,
                exitAnyButton: true,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new MouseScrollGraph(blueprint.getGridDOMElement(), blueprint, {
                clickButton: 2,
                exitAnyButton: false,
                looseTarget: true,
                moveEverywhere: true,
            }),
            new Unfocus(blueprint.getGridDOMElement(), blueprint),
            new MouseTracking(blueprint.getGridDOMElement(), blueprint),
            new KeyboardEnableZoom(blueprint.getGridDOMElement(), blueprint),
        ]
    }

    /**
     * @param {Blueprint} element
     */
    header(element) {
        return html`
            <div class="ueb-viewport-header">
                <div class="ueb-viewport-zoom">1:1</div>
            </div>
        `
    }

    /**
     * @param {Blueprint} element
     */
    overlay(element) {
        return html`
            <div class="ueb-viewport-overlay"></div>
        `
    }

    /**
     * @param {Blueprint} element
     */
    viewport(element) {
        return html`
            <div class="ueb-viewport-body">
                <div class="ueb-grid" style="
                    --ueb-additional-x:${sanitizeText(element.additional[0])};
                    --ueb-additional-y:${sanitizeText(element.additional[1])};
                    --ueb-translate-x:${sanitizeText(element.translateValue[0])};
                    --ueb-translate-y:${sanitizeText(element.translateValue[1])};
                ">
                    <div class="ueb-grid-content">
                        <div data-links></div>
                        <div data-nodes></div>
                    </div>
                </div>
            </div>
        `
    }

    /**
     * Computes the html content of the target element.
     * @param {Blueprint} element Target element
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
    setup(blueprint) {
        super.setup(blueprint);
        blueprint.classList.add("ueb", `ueb-zoom-${blueprint.zoom}`);
        Object.entries({
            "--ueb-font-size": sanitizeText(Configuration.fontSize),
            "--ueb-grid-size": `${sanitizeText(Configuration.gridSize)}px`,
            "--ueb-grid-line-width": `${sanitizeText(Configuration.gridLineWidth)}px`,
            "--ueb-grid-line-color": sanitizeText(Configuration.gridLineColor),
            "--ueb-grid-set": sanitizeText(Configuration.gridSet),
            "--ueb-grid-set-line-color": sanitizeText(Configuration.gridSetLineColor),
            "--ueb-grid-axis-line-color": sanitizeText(Configuration.gridAxisLineColor),
            "--ueb-node-radius": `${sanitizeText(Configuration.nodeRadius)}px`,
            "--ueb-link-min-width": sanitizeText(Configuration.linkMinWidth)
        }).forEach(entry => blueprint.style.setProperty(entry[0], entry[1]));
        blueprint.headerElement = blueprint.querySelector('.ueb-viewport-header');
        blueprint.overlayElement = blueprint.querySelector('.ueb-viewport-overlay');
        blueprint.viewportElement = blueprint.querySelector('.ueb-viewport-body');
        blueprint.selectorElement = new SelectorElement();
        blueprint.gridElement = blueprint.viewportElement.querySelector(".ueb-grid");
        blueprint.querySelector(".ueb-grid-content").append(blueprint.selectorElement);
        blueprint.linksContainerElement = blueprint.querySelector("[data-links]");
        blueprint.linksContainerElement.append(...blueprint.getLinks());
        blueprint.nodesContainerElement = blueprint.querySelector("[data-nodes]");
        blueprint.nodesContainerElement.append(...blueprint.getNodes());
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
        blueprint.dataset.dragScrolling = "true";
    }

    /**
     * Applies the style to the element.
     * @param {Blueprint} blueprint The blueprint element
     */
    applyEndDragScrolling(blueprint) {
        blueprint.dataset.dragScrolling = "false";
    }

    /**
     * 
     * @param {Blueprint} blueprint
     * @param {PinReferenceEntity} pinReference
     * @returns {PinElement}
     */
    getPin(blueprint, pinReference) {
        return blueprint.querySelector(
            `ueb-node[data-name="${pinReference.objectName}"] ueb-pin[data-id="${pinReference.pinGuid}"]`
        )
    }
}

// @ts-check

/**
 * @typedef {import("./element/PinElement").default} PinElement
 * @typedef {import("./entity/GuidEntity").default} GuidEntity
 * @typedef {import("./entity/PinReferenceEntity").default} PinReferenceEntity
 */

/**
 * @extends {IElement<Object, BlueprintTemplate>}
 */
class Blueprint extends IElement {

    /** @type {Number[]} */
    #additional
    get additional() {
        return this.#additional
    }
    set additional(value) {
        value[0] = Math.abs(value[0]);
        value[1] = Math.abs(value[1]);
    }
    /** @type {Number[]} */
    #translateValue
    get translateValue() {
        return this.#translateValue
    }
    set translateValue(value) {
        this.#translateValue = value;
    }
    /** @type {Map<String, Number>} */
    #nodeNameCounter = new Map()
    /** @type {Number} */
    gridSize
    /** @type {NodeElement[]}" */
    nodes = []
    /** @type {LinkElement[]}" */
    links = []
    /** @type {Number[]} */
    mousePosition = [0, 0]
    /** @type {HTMLElement} */
    gridElement = null
    /** @type {HTMLElement} */
    viewportElement = null
    /** @type {HTMLElement} */
    overlayElement = null
    /** @type {SelectorElement} */
    selectorElement = null
    /** @type {HTMLElement} */
    linksContainerElement = null
    /** @type {HTMLElement} */
    nodesContainerElement = null
    /** @type {Number} */
    zoom = 0
    /** @type {HTMLElement} */
    headerElement = null
    focused = false
    nodeBoundariesSupplier = node => {
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
    }
    /** @type {(node: NodeElement, selected: Boolean) => void}} */
    nodeSelectToggleFunction = (node, selected) => {
        node.setSelected(selected);
    }

    /**
     * @param {Configuration} settings
     */
    constructor(settings = new Configuration()) {
        super({}, new BlueprintTemplate());
        /** @type {Number} */
        this.gridSize = Configuration.gridSize;
        /** @type {Number[]} */
        this.#additional = [2 * Configuration.expandGridSize, 2 * Configuration.expandGridSize];
        /** @type {Number[]} */
        this.#translateValue = [Configuration.expandGridSize, Configuration.expandGridSize];
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    #expand(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        this.additional[0] += x;
        this.additional[1] += y;
        this.template.applyExpand(this);
    }

    /**
     * @param {Number} x
     * @param {Number} y
     */
    #translate(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        this.translateValue[0] += x;
        this.translateValue[1] += y;
        this.template.applyTranlate(this);
    }

    getGridDOMElement() {
        return this.gridElement
    }

    disconnectedCallback() {
        super.disconnectedCallback();
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
        const maxScroll = this.getScrollMax();
        let currentScroll = this.getScroll();
        let finalScroll = [
            currentScroll[0] + delta[0],
            currentScroll[1] + delta[1]
        ];
        let expand = [0, 0];
        let shrink = [0, 0];
        let direction = [0, 0];
        for (let i = 0; i < 2; ++i) {
            if (delta[i] < 0 && finalScroll[i] < Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                // Expand left/top
                expand[i] = Configuration.expandGridSize;
                direction[i] = -1;
                if (maxScroll[i] - finalScroll[i] > Configuration.gridShrinkThreshold * Configuration.expandGridSize) {
                    shrink[i] = -Configuration.expandGridSize;
                }
            } else if (delta[i] > 0 && finalScroll[i]
                > maxScroll[i] - Configuration.gridExpandThreshold * Configuration.expandGridSize) {
                // Expand right/bottom
                expand[i] = Configuration.expandGridSize;
                direction[i] = 1;
                if (finalScroll[i] > Configuration.gridShrinkThreshold * Configuration.expandGridSize) {
                    shrink[i] = -Configuration.expandGridSize;
                }
            }
        }
        if (expand[0] != 0 || expand[1] != 0) {
            this.seamlessExpand(expand, direction);
            direction = [
                -direction[0],
                -direction[1]
            ];
            this.seamlessExpand(shrink, direction);
        }
        currentScroll = this.getScroll();
        finalScroll = [
            currentScroll[0] + delta[0],
            currentScroll[1] + delta[1]
        ];
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
        return Configuration.expandGridSize
    }

    getViewportSize() {
        return [
            this.viewportElement.clientWidth,
            this.viewportElement.clientHeight
        ]
    }

    /**
     * Get the scroll limits
     * @return {Array} The horizonal and vertical maximum scroll limits
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
     * @param {Number} x - Horizontal 
     * @param {Number} y - Vertical expand value (negative means top, positive means bottom)
     * @param {Number} factor - Either 1 (expand) or -1 (shrink)
     */

    /**
     * Expand or shrink the grind indefinitely, the content will remain into position
     * @param {Number[]} param0 - Expand value (negative means shrink, positive means expand)
     * @param {Number[]} param1 - Direction of expansion (negative: left/top, position: right/bottom)
     */
    seamlessExpand([x, y], [directionX, directionY] = [1, 1]) {
        [
            this.viewportElement.scrollLeft,
            this.viewportElement.scrollTop
        ];
        let scale = this.getScale();
        let scaledX = x / scale;
        let scaledY = y / scale;
        // First expand the grid to contain the additional space
        this.#expand(scaledX, scaledY);
        // If the expansion is towards the left or top, then scroll back to give the illusion that the content is in the same position and translate it accordingly
        const translate = [0, 0];
        if (directionX < 0) {
            this.viewportElement.scrollLeft += x;
            translate[0] = scaledX;
        }
        if (directionY < 0) {
            this.viewportElement.scrollTop += y;
            translate[1] = scaledY;
        }
        this.#translate(translate[0], translate[1]);
    }

    progressiveSnapToGrid(x) {
        return Configuration.expandGridSize * Math.round(x / Configuration.expandGridSize + 0.5 * Math.sign(x))
    }

    getZoom() {
        return this.zoom
    }

    setZoom(zoom, center) {
        zoom = Utility.clamp(zoom, Configuration.minZoom, Configuration.maxZoom);
        if (zoom == this.zoom) {
            return
        }
        let initialScale = this.getScale();
        this.template.applyZoom(this, zoom);
        this.zoom = zoom;

        if (center) {
            center[0] += this.translateValue[0];
            center[1] += this.translateValue[1];
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

    /**
     * @param {Number[]} position
     */
    compensateTranslation(position) {
        position[0] -= this.translateValue[0];
        position[1] -= this.translateValue[1];
        return position
    }

    /**
     * Returns the list of nodes in this blueprint. It can filter the list providing just the selected ones.
     */
    getNodes(selected = false) {
        if (selected) {
            return this.nodes.filter(
                node => node.selected
            )
        } else {
            return this.nodes
        }
    }

    /**
     * @param {PinReferenceEntity} pinReference
     */
    getPin(pinReference) {
        return this.template.getPin(this, pinReference)
    }

    /**
     * Returns the list of links in this blueprint.
     * @returns {LinkElement[]} Nodes
     */
    getLinks([a, b] = []) {
        if (a == null != b == null) {
            const pin = a ?? b;
            return this.links.filter(link => link.sourcePin == pin || link.destinationPin == pin)
        }
        if (a != null && b != null) {
            return this.links.filter(link =>
                link.sourcePin == a && link.destinationPin == b
                || link.sourcePin == b && link.destinationPin == a)
        }
        return this.links
    }

    /**
     * @param {PinElement} sourcePin 
     * @param {PinElement} destinationPin 
     * @returns 
     */
    getLink(sourcePin, destinationPin, ignoreDirection = false) {
        return this.links.find(link =>
            link.sourcePin == sourcePin && link.destinationPin == destinationPin
            || ignoreDirection && link.sourcePin == destinationPin && link.destinationPin == sourcePin
        )
    }

    /**
     * Select all nodes
     */
    selectAll() {
        this.getNodes().forEach(node => this.nodeSelectToggleFunction(node, true));
    }

    /**
     * Unselect all nodes
     */
    unselectAll() {
        this.getNodes().forEach(node => this.nodeSelectToggleFunction(node, false));
    }

    /**
     * @param  {...IElement} graphElements
     */
    addGraphElement(...graphElements) {
        for (let element of graphElements) {
            if (element instanceof NodeElement && !this.nodes.includes(element)) {
                const nodeName = element.entity.getObjectName();
                const homonymNode = this.nodes.find(node => node.entity.getObjectName() == nodeName);
                if (homonymNode) {
                    // Inserted node keeps tha name and the homonym nodes is renamed
                    let name = homonymNode.entity.getObjectName(true);
                    this.#nodeNameCounter[name] = this.#nodeNameCounter[name] ?? -1;
                    do {
                        ++this.#nodeNameCounter[name];
                    } while (this.nodes.find(node =>
                        node.entity.getObjectName() == Configuration.nodeName(name, this.#nodeNameCounter[name])
                    ))
                    homonymNode.rename(Configuration.nodeName(name, this.#nodeNameCounter[name]));
                }
                this.nodes.push(element);
                this.nodesContainerElement?.appendChild(element);
            } else if (element instanceof LinkElement && !this.links.includes(element)) {
                this.links.push(element);
                this.linksContainerElement?.appendChild(element);
            }
        }
        graphElements.filter(element => element instanceof NodeElement).forEach(
            node => /** @type {NodeElement} */(node).sanitizeLinks()
        );
    }

    /**
     * @param  {...IElement} graphElements
     */
    removeGraphElement(...graphElements) {
        for (let element of graphElements) {
            if (element.closest("ueb-blueprint") == this) {
                element.remove();
                let elementsArray = element instanceof NodeElement
                    ? this.nodes
                    : element instanceof LinkElement
                        ? this.links
                        : null;
                elementsArray?.splice(
                    elementsArray.findIndex(v => v === element),
                    1
                );
            }
        }
    }

    setFocused(value = true) {
        if (this.focused == value) {
            return
        }
        let event = new CustomEvent(value ? "blueprint-focus" : "blueprint-unfocus");
        this.focused = value;
        this.dataset.focused = this.focused ? "true" : "false";
        if (!this.focused) {
            this.unselectAll();
        }
        this.dispatchEvent(event);
    }

    dispatchEditTextEvent(value) {
        const event = new CustomEvent(
            value
                ? Configuration.editTextEventName.begin
                : Configuration.editTextEventName.end
        );
        this.dispatchEvent(event);
    }
}

customElements.define("ueb-blueprint", Blueprint);

// @ts-check

class GeneralSerializer extends ISerializer {

    constructor(wrap, entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter) {
        wrap = wrap ?? (v => `(${v})`);
        super(entityType, prefix, separator, trailingSeparator, attributeValueConjunctionSign, attributeKeyPrinter);
        this.wrap = wrap;
    }

    /**
     * @template T
     * @param {String} value
     * @returns {T}
     */
    read(value) {
        let grammar = Grammar.getGrammarForType(ISerializer.grammar, this.entityType);
        const parseResult = grammar.parse(value);
        if (!parseResult.status) {
            throw new Error(`Error when trying to parse the entity ${this.entityType.prototype.constructor.name}.`)
        }
        return parseResult.value
    }

    /**
     * @template T
     * @param {T} object
     * @returns {String}
     */
    write(object) {
        let result = this.wrap(this.subWrite([], object));
        return result
    }
}

// @ts-check

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

// @ts-check

class PinSerializer extends GeneralSerializer {

    constructor() {
        super(v => `${PinEntity.lookbehind} (${v})`, PinEntity, "", ",", true);
    }

    writeValue(value, fullKey) {
        if (value?.constructor === String && fullKey == "DefaultValue") {
            // @ts-expect-error
            return `"${Utility.encodeInputString(value)}"`
        }
        return super.writeValue(value, fullKey)
    }
}

// @ts-check

class ToStringSerializer extends GeneralSerializer {

    constructor(entityType) {
        super(undefined, entityType);
    }

    write(object) {
        let result = object.toString();
        return result
    }
}

// @ts-check

function initializeSerializerFactory() {

    SerializerFactory.registerSerializer(
        ObjectEntity,
        new ObjectSerializer()
    );

    SerializerFactory.registerSerializer(
        PinEntity, 
        new PinSerializer()
    );

    SerializerFactory.registerSerializer(
        FunctionReferenceEntity,
        new GeneralSerializer(v => `(${v})`, FunctionReferenceEntity, "", ",", false)
    );

    SerializerFactory.registerSerializer(
        KeyBindingEntity,
        new GeneralSerializer(v => `(${v})`, KeyBindingEntity, "", ",", false)
    );

    SerializerFactory.registerSerializer(
        LocalizedTextEntity,
        new GeneralSerializer(v => `${LocalizedTextEntity.lookbehind}(${v})`, LocalizedTextEntity, "", ", ", false, "", _ => "")
    );

    SerializerFactory.registerSerializer(
        InvariantTextEntity,
        new GeneralSerializer(v => `${InvariantTextEntity.lookbehind}(${v})`, InvariantTextEntity, "", ", ", false, "", _ => "")
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
                    ? objectReference.type ? `'"${objectReference.path}"'` : `"${objectReference.path}"`
                    : ""
            ))
    );

    SerializerFactory.registerSerializer(IdentifierEntity, new ToStringSerializer(IdentifierEntity));

    SerializerFactory.registerSerializer(PathSymbolEntity, new ToStringSerializer(PathSymbolEntity));

    SerializerFactory.registerSerializer(GuidEntity, new ToStringSerializer(GuidEntity));

    SerializerFactory.registerSerializer(IntegerEntity, new ToStringSerializer(IntegerEntity));
}

// @ts-check

initializeSerializerFactory();

export { Blueprint, Configuration, LinkElement, NodeElement };
