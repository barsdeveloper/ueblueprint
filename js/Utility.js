export default class Utility {
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
    static objectSet = (keys, value, target) => {
        if (keys.length == 1) {
            if (keys[0] in target) {
                target[keys[0]] = value
                return true
            }
        } else if (keys.length > 0) {
            return Utility.objectSet(keys.slice(1), value, target[keys[0]])
        }
        return false
    }


    /**
     * Gets a value from an object, gives defaultValue in case of failure
     * @param {String[]} keys The chained keys to access from object in order to get the value
     * @param {any} defaultValue Value to return in case from doesn't have it
     * @param {Object} from Object holding the data 
     * @returns {any} The value in from corresponding to the keys or defaultValue otherwise
     */
    static objectGet = (keys, defaultValue, from) => {
        if (keys.length == 0 || !(keys[0] in from)) {
            return defaultValue
        }
        return Utility.objectGet(keys.slice(1), defaultValue, from[keys[0]])
    }
}