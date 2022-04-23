// @ts-check

import TypeInitialization from "./entity/TypeInitialization"

export default class Utility {

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
        const scaleCorrection = 1 / Utility.getScale(movementElement)
        const targetOffset = movementElement.getBoundingClientRect()
        let location = [
            Math.round((viewportLocation[0] - targetOffset.x) * scaleCorrection),
            Math.round((viewportLocation[1] - targetOffset.y) * scaleCorrection)
        ]
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
     * @param {String} value
     */
    static FirstCapital(value) {
        return value.charAt(0).toUpperCase() + value.substring(1)
    }

    static getType(value) {
        let constructor = value?.constructor
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
        let result = []
        for (let j = 0; j < b.length; ++j) {
            for (let i = 0; i < a.length; ++i) {
                if (a[i] == b[j]) {
                    result.push(...a.splice(0, i), ...b.splice(0, j), ...a.splice(0, 1))
                    j = 0
                    i = 0
                    b.shift()
                    break
                }
            }
        }
        return [...(new Set(result.concat(...a, ...b)))]
    }

    /**
     * @param {String} value
     */
    static sanitizeInputString(value) {
        return value
            .replace(/\n$/, "") // Remove trailing newline
            .replaceAll("\u00A0", " ") // Replace special space symbol
            .replaceAll("\n", String.raw`\r\n`) // Replace newline with \r\n
    }

    /**
     * @param {String} value
     */
    static formatStringName(value) {
        return value.replaceAll(/\s+/g, " ").replaceAll(/(?<=[a-z])(?=[A-Z])|_/g, " ").trim()
    }
}
