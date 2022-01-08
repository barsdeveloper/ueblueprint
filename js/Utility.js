import Configuration from "./Configuration"
import TypeInitialization from "./entity/TypeInitialization"

export default class Utility {
    static clamp(val, min, max) {
        return Math.min(Math.max(val, min), max)
    }

    static getScale(element) {
        return getComputedStyle(element).getPropertyValue("--ueb-scale")
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
            console.error("Expected keys to be an array.")
        }
        if (keys.length == 1) {
            if (create || keys[0] in target) {
                target[keys[0]] = value
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
            console.error("Expected keys to be an array.")
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
        a = TypeInitialization.sanitize(a)
        b = TypeInitialization.sanitize(b)
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
        let constructor = value?.constructor
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
