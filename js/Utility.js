import CalculatedType from "./entity/CalculatedType"
import TypeInitialization from "./entity/TypeInitialization"

/**
 * @typedef {import("./element/IElement").default} IElement
 * @typedef {import("./entity/IEntity").default} IEntity
 * @typedef {import("./entity/LinearColorEntity").default} LinearColorEntity
 * @typedef {import("./entity/TypeInitialization").AnyValue} AnyValue 
 */
/**
 * @template T
 * @typedef {import("./entity/TypeInitialization").AnyValueConstructor<T>} AnyValueConstructor 
 */

export default class Utility {

    static booleanConverter = {
        fromAttribute: (value, type) => {
            value ? "true" : "false"
        },
        toAttribute: (value, type) => {
            if (value === true) {
                return "true"
            }
            if (value === false) {
                return "false"
            }
            return ""
        }
    }

    static sigmoid(x, curvature = 1.7) {
        return 1 / (1 + (x / (1 - x) ** -curvature))
    }

    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    /** @param {HTMLElement} element */
    static getScale(element) {
        const scale = getComputedStyle(element).getPropertyValue("--ueb-scale")
        return scale != "" ? parseFloat(scale) : 1
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static minDecimals(num, decimals = 1) {
        const powered = num * 10 ** decimals
        if (Math.abs(powered % 1) > Number.EPSILON) {
            // More decimal digits than required
            return num.toString()
        }
        return num.toFixed(decimals)
    }

    /**
     * @param {Number[]} viewportLocation
     * @param {HTMLElement} movementElement
     */
    static convertLocation(viewportLocation, movementElement) {
        const scaleCorrection = 1 / Utility.getScale(movementElement)
        const targetOffset = movementElement.getBoundingClientRect()
        let location = [
            Math.round((viewportLocation[0] - targetOffset.x) * scaleCorrection),
            Math.round((viewportLocation[1] - targetOffset.y) * scaleCorrection)
        ]
        return location
    }

    /**
     * @param {IEntity} entity
     * @param {String[]} keys
     * @param {any} propertyDefinition
     * @returns {Boolean}
     */
    static isSerialized(
        entity,
        keys,
        // @ts-expect-error
        propertyDefinition = Utility.objectGet(entity.constructor.attributes, keys)
    ) {
        if (propertyDefinition instanceof CalculatedType) {
            return Utility.isSerialized(entity, keys, propertyDefinition.calculate(entity))
        }
        if (propertyDefinition instanceof TypeInitialization) {
            if (propertyDefinition.serialized) {
                return true
            }
            return Utility.isSerialized(entity, keys, propertyDefinition.type)
        }
        return false
    }

    /** @param {String[]} keys */
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
     * @param {String[]} keys
     * @param {Boolean} create
     * @returns {Boolean}
     */
    static objectSet(target, keys, value, create = false, defaultDictType = Object) {
        if (!(keys instanceof Array)) {
            throw new TypeError("Expected keys to be an array.")
        }
        if (keys.length == 1) {
            if (create || keys[0] in target || target[keys[0]] === undefined) {
                target[keys[0]] = value
                return true
            }
        } else if (keys.length > 0) {
            if (create && !(target[keys[0]] instanceof Object)) {
                target[keys[0]] = new defaultDictType()
            }
            return Utility.objectSet(target[keys[0]], keys.slice(1), value, create, defaultDictType)
        }
        return false
    }

    static equals(a, b) {
        a = TypeInitialization.sanitize(a)
        b = TypeInitialization.sanitize(b)
        if (a === b) {
            return true
        }
        if (a instanceof Array && b instanceof Array) {
            return a.length == b.length && !a.find((value, i) => !Utility.equals(value, b[i]))
        }
    }

    /**
     * @param {AnyValue | AnyValueConstructor<IEntity>} value
     * @returns {AnyValueConstructor<IEntity>} 
     */
    static getType(value) {
        if (value === null) {
            return null
        }
        if (value instanceof TypeInitialization) {
            return Utility.getType(value.type)
        }
        if (value instanceof Function) {
            // value is already a constructor
            return value
        }
        /** @ts-expect-error */
        return value?.constructor
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
        let result = []
        for (let j = 0; j < b.length; ++j) {
            for (let i = 0; i < a.length; ++i) {
                if (a[i] == b[j]) {
                    // Found a corresponding element in the two arrays
                    result.push(
                        // Take and append all the elements skipped from a
                        ...a.splice(0, i),
                        // Take and append all the elements skippend from b
                        ...b.splice(0, j),
                        // Take and append the element in common
                        ...a.splice(0, 1)
                    )
                    j = 0
                    i = 0
                    b.shift()
                    break
                }
            }
        }
        // Append remaining the elements in the arrays and make it unique
        return [...(new Set(result.concat(...a, ...b)))]
    }

    /** @param {String} value */
    static escapeString(value, input = false) {
        return value
            .replaceAll('"', '\\"') // Escape "
            .replaceAll("\n", "\\n") // Replace newline with \n
    }

    /** @param {String} value */
    static unescapeString(value, input = false) {
        return value
            .replaceAll('\\"', '"')
            .replaceAll("\\n", "\n")
    }

    /** @param {String} value */
    static formatStringName(value) {
        return value
            .trim()
            .replace(/^b/, "") // Remove leading b (for boolean values) or newlines
            .replaceAll(/(?<=[a-z])(?=[A-Z])|_|\s+/g, " ") // Insert a space between a lowercase and uppercase letter, instead of an underscore or multiple spaces
    }

    /** @param {String} value */
    static getIdFromReference(value) {
        return value
            .replace(/(?:.+\.)?([^\.]+)$/, "$1")
            .replaceAll(/(?<=[a-z\d])(?=[A-Z])|(?<=[a-zA-Z])(?=\d)|(?<=[A-Z]{2})(?=[A-Z][a-z])/g, "-")
            .toLocaleLowerCase()
    }

    /** @param {LinearColorEntity} value */
    static printLinearColor(value) {
        return `${Math.round(value.R.valueOf() * 255)}, ${Math.round(value.G.valueOf() * 255)}, ${Math.round(value.B.valueOf() * 255)}`
    }

    /**  @param {[Number, Number]} param0 */
    static getPolarCoordinates([x, y], positiveTheta = false) {
        let theta = Math.atan2(y, x)
        if (positiveTheta && theta < 0) {
            theta = 2 * Math.PI + theta
        }
        return [
            Math.sqrt(x * x + y * y),
            theta,
        ]
    }

    /**  @param {[Number, Number]} param0 */
    static getCartesianCoordinates([r, theta]) {
        return [
            r * Math.cos(theta),
            r * Math.sin(theta)
        ]
    }
}
