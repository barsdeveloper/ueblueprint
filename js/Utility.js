import Configuration from "./Configuration"
import SubAttributesDeclaration from "./entity/SubObject"
import UnionType from "./entity/UnionType"

/**
 * @typedef {import("./element/IElement").default} IElement
 * @typedef {import("./entity/IEntity").AnyValue} AnyValue
 * @typedef {import("./entity/IEntity").AnyValueConstructor<*>} AnyValueConstructor
 * @typedef {import("./entity/IEntity").AttributeInformation} TypeInformation
 * @typedef {import("./entity/IEntity").default} IEntity
 * @typedef {import("./entity/IEntity").EntityConstructor} EntityConstructor
 * @typedef {import("./entity/LinearColorEntity").default} LinearColorEntity
 */

export default class Utility {

    static emptyObj = {}

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

    static clamp(val, min = -Infinity, max = Infinity) {
        return Math.min(Math.max(val, min), max)
    }

    /** @param {HTMLElement} element */
    static getScale(element) {
        // @ts-expect-error
        const scale = element.blueprint
            // @ts-expect-error
            ? element.blueprint.getScale()
            : getComputedStyle(element).getPropertyValue("--ueb-scale")
        return scale != "" ? parseFloat(scale) : 1
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static minDecimals(num, decimals = 1) {
        const powered = num * 10 ** decimals
        if (Math.abs(powered % 1) > Configuration.epsilon) {
            // More decimal digits than required
            return num.toString()
        }
        return num.toFixed(decimals)
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static roundDecimals(num, decimals = 1) {
        const power = 10 ** decimals
        return Math.round(num * power) / power
    }

    /**
     * @param {Number} a
     * @param {Number} b
     */
    static approximatelyEqual(a, b) {
        return !(Math.abs(a - b) > Configuration.epsilon)
    }

    /**
     * @param {Number[]} viewportLocation
     * @param {HTMLElement} movementElement
     */
    static convertLocation(viewportLocation, movementElement, ignoreScale = false) {
        const scaleCorrection = ignoreScale ? 1 : 1 / Utility.getScale(movementElement)
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
     * @returns {Boolean}
     */
    static isSerialized(
        entity,
        keys,
        attribute = Utility.objectGet(/** @type {EntityConstructor} */(entity.constructor).attributes, keys)
    ) {
        if (attribute.constructor === Object) {
            return /** @type {TypeInformation} */(attribute).serialized
        }
        return false
    }

    /** @param {String[]} keys */
    static objectGet(target, keys, defaultValue = undefined) {
        if (target === undefined) {
            return undefined
        }
        if (!(keys instanceof Array)) {
            throw new TypeError("UEBlueprint: Expected keys to be an array")
        }
        if (target instanceof SubAttributesDeclaration) {
            target = target.attributes
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

    /**
     * @param {AnyValue} a
     * @param {AnyValue} b
     */
    static equals(a, b) {
        a = Utility.sanitize(a)
        b = Utility.sanitize(b)
        if (a?.constructor === BigInt && b?.constructor === Number) {
            b = BigInt(b)
        } else if (a?.constructor === Number && b?.constructor === BigInt) {
            a = BigInt(a)
        }
        if (a === b) {
            return true
        }
        if (a instanceof Array && b instanceof Array) {
            return a.length == b.length && !a.find((value, i) => !Utility.equals(value, b[i]))
        }
        return false
    }

    /** 
     * @param {null | AnyValue | TypeInformation} value
     * @returns {AnyValueConstructor}
     */
    static getType(value) {
        if (value === null) {
            return null
        }
        if (value?.constructor === Object && value?.type instanceof Function) {
            // @ts-expect-error
            return value.type
        }
        return /** @type {AnyValueConstructor} */(value?.constructor)
    }

    /**
     * @param {AnyValue} value
     * @param {AnyValueConstructor} type
     */
    static isValueOfType(value, type, acceptNull = false) {
        return (acceptNull && value === null) || value instanceof type || value?.constructor === type
    }

    /** @param {AnyValue} value */
    static sanitize(value, targetType = /** @type {AnyValueConstructor} */(value?.constructor)) {
        if (targetType instanceof UnionType) {
            let type = targetType.types.find(t => Utility.isValueOfType(value, t, false))
            if (!type) {
                type = targetType.getFirstType()
            }
            targetType = type
        }
        if (targetType && !Utility.isValueOfType(value, targetType)) {
            value = targetType === BigInt
                ? BigInt(value)
                : new targetType(value)
        }
        if (value instanceof Boolean || value instanceof Number || value instanceof String || value instanceof BigInt) {
            value = value.valueOf() // Get the relative primitive value
        }
        return value
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
        a = [...a]
        b = [...b]
        restart:
        while (true) {
            for (let j = 0; j < b.length; ++j) {
                for (let i = 0; i < a.length; ++i) {
                    if (a[i] == b[j]) {
                        // Found an element in common in the two arrays
                        result.push(
                            // Take and append all the elements skipped from a
                            ...a.splice(0, i),
                            // Take and append all the elements skippend from b
                            ...b.splice(0, j),
                            // Take and append the element in common
                            ...a.splice(0, 1)
                        )
                        b.shift() // Remove the same element from b
                        continue restart
                    }
                }
            }
            break restart
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
    static clearHTMLWhitespace(value) {
        return value
            .replaceAll("&nbsp;", "\u00A0") // whitespace
            .replaceAll("<br>", "\n") // newlines
            .replaceAll(/(\<!--.*?\-->)/g, "") // html comments
    }

    /** @param {String} value */
    static capitalFirstLetter(value) {
        if (value.length === 0) {
            return value
        }
        return value.charAt(0).toLocaleUpperCase() + value.slice(1).toLocaleLowerCase()
    }

    /** @param {String} value */
    static formatStringName(value) {
        return value
            .trim()
            .replace(/^b/, "") // Remove leading b (for boolean values) or newlines
            .replaceAll(/^K2(?:Node|node)?_|(?<=[a-z])(?=[A-Z])|_|\s+/g, " ") // Insert a space between a lowercase and uppercase letter, instead of an underscore or multiple spaces
            .split(" ")
            .map(v => Utility.capitalFirstLetter(v))
            .join(" ")
    }

    /** @param {String} value */
    static getIdFromReference(value) {
        return value
            .replace(/(?:.+\.)?([^\.]+)$/, "$1")
            .replaceAll(/(?<=[a-z\d])(?=[A-Z])|(?<=[a-zA-Z])(?=\d)|(?<=[A-Z]{2})(?=[A-Z][a-z])/g, "-")
            .toLowerCase()
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

    /**
     * @param {Number} begin
     * @param {Number} end
     */
    static range(begin = 0, end = 0, step = end >= begin ? 1 : -1) {
        return Array.from({ length: Math.ceil((end - begin) / step) }, (_, i) => begin + (i * step))
    }

    /**
     * @param {HTMLElement} element
     * @param {String} value
     */
    static paste(element, value) {
        const event = new ClipboardEvent("paste", {
            bubbles: true,
            cancelable: true,
            clipboardData: new DataTransfer(),
        })
        event.clipboardData.setData("text", value)
        element.dispatchEvent(event)
    }

    static animate(from, to, intervalSeconds, callback, timingFunction = x => {
        const v = x ** 3.5
        return v / (v + ((1 - x) ** 3.5))
    }) {
        const startTimestamp = performance.now()
        const doAnimation = currentTimestamp => {
            let delta = (currentTimestamp - startTimestamp) / intervalSeconds
            if (Utility.approximatelyEqual(delta, 1) || delta > 1) {
                delta = 1
            } else {
                requestAnimationFrame(doAnimation)
            }
            const currentValue = from + (to - from) * timingFunction(delta)
            callback(currentValue)
        }
        requestAnimationFrame(doAnimation)
    }

    /** @param {String} value */
    static warn(value) {
        console.warn("UEBlueprint: " + value)
    }
}
