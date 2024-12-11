import Configuration from "./Configuration.js"

export default class Utility {

    /** @param {Number} value */
    static clamp(value, min = -Infinity, max = Infinity) {
        return Math.min(Math.max(value, min), max)
    }

    /** @param {HTMLElement} element */
    static getScale(element) {
        // @ts-expect-error
        const scale = element.blueprint?.getScale() ?? getComputedStyle(element).getPropertyValue("--ueb-scale")
        return scale != "" ? parseFloat(scale) : 1
    }

    /**
     * @param {Number} num
     * @param {Number} decimals
     */
    static minDecimals(num, decimals = 1, epsilon = 1e-8) {
        const powered = num * 10 ** decimals
        if (Math.abs(powered % 1) > epsilon) {
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

    /** @param {Number} num */
    static printExponential(num) {
        if (num == Number.POSITIVE_INFINITY) {
            return "inf"
        } else if (num == Number.NEGATIVE_INFINITY) {
            return "-inf"
        }
        const int = Math.round(num)
        if (int >= 1000) {
            const exp = Math.floor(Math.log10(int))
            const dec = Math.round(num / 10 ** (exp - 2)) / 100
            // Not using num.toExponential() because of the omitted leading 0 on the exponential
            return `${dec}e+${exp < 10 ? "0" : ""}${exp}`
        }
        const intPart = Math.floor(num)
        if (intPart == 0) {
            return num.toString()
        }
        return this.roundDecimals(num, Math.max(0, 3 - Math.floor(num).toString().length)).toString()
    }

    /**
     * @param {Number} a
     * @param {Number} b
     */
    static approximatelyEqual(a, b, epsilon = 1e-8) {
        return !(Math.abs(a - b) > epsilon)
    }

    /**
     * @param {Coordinates} viewportLocation
     * @param {HTMLElement} movementElement
     */
    static convertLocation(viewportLocation, movementElement, ignoreScale = false) {
        const scaleCorrection = ignoreScale ? 1 : 1 / Utility.getScale(movementElement)
        const bounding = movementElement.getBoundingClientRect()
        const location = /** @type {Coordinates} */([
            Math.round((viewportLocation[0] - bounding.x) * scaleCorrection),
            Math.round((viewportLocation[1] - bounding.y) * scaleCorrection)
        ])
        return location
    }

    /**
     * @param {IEntity} entity
     * @param {String} key
     * @returns {Boolean}
     */
    static isSerialized(entity, key) {
        return entity["attributes"]?.[key]?.serialized
            ?? entity.constructor["attributes"]?.[key]?.serialized
            ?? false
    }

    /** @param {String[]} keys */
    static objectGet(target, keys, defaultValue = undefined) {
        if (target === undefined) {
            return undefined
        }
        if (!(keys instanceof Array)) {
            throw new TypeError("UEBlueprint: Expected keys to be an array")
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
     * @returns {Boolean}
     */
    static objectSet(target, keys, value, defaultDictType = Object) {
        if (!(keys instanceof Array)) {
            throw new TypeError("Expected keys to be an array.")
        }
        if (keys.length == 1) {
            if (keys[0] in target || target[keys[0]] === undefined) {
                target[keys[0]] = value
                return true
            }
        } else if (keys.length > 0) {
            if (!(target[keys[0]] instanceof Object)) {
                target[keys[0]] = new defaultDictType()
            }
            return Utility.objectSet(target[keys[0]], keys.slice(1), value, defaultDictType)
        }
        return false
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Number} gridSize
     * @returns {Coordinates}
     */
    static snapToGrid(x, y, gridSize) {
        if (gridSize === 1) {
            return [x, y]
        }
        return [
            gridSize * Math.floor(x / gridSize),
            gridSize * Math.floor(y / gridSize)
        ]
    }

    /**
     * @template T
     * @param {Array<T>} reference
     * @param {Array<T>} additional
     * @param {(v: T) => void} adding - Process added element
     * @param {(l: T, r: T) => Boolean} predicate
     */
    static mergeArrays(reference = [], additional = [], predicate = (l, r) => l == r, adding = v => { }) {
        let result = []
        reference = [...reference]
        additional = [...additional]
        restart:
        while (true) {
            for (let j = 0; j < additional.length; ++j) {
                for (let i = 0; i < reference.length; ++i) {
                    if (predicate(reference[i], additional[j])) {
                        // Found an element in common in the two arrays
                        result.push(
                            // Take and append all the elements skipped from a
                            ...reference.splice(0, i),
                            // Take and append all the elements skippend from b
                            ...additional.splice(0, j).map(v => (adding(v), v)),
                            // Take and append the element in common
                            ...reference.splice(0, 1)
                        )
                        additional.shift() // Remove the same element from b
                        continue restart
                    }
                }
            }
            break restart
        }
        // Append remaining the elements in the arrays and make it unique
        result.push(...reference)
        result.push(...additional.filter(vb => !result.some(vr => predicate(vr, vb))))
        return result
    }

    /** @param {String} value */
    static escapeNewlines(value) {
        return value
            .replaceAll("\n", "\\n") // Replace newline with \n
            .replaceAll("\t", "\\t") // Replace tab with \t
    }

    /** @param {String} value */
    static escapeString(value, inline = true) {
        let result = value.replaceAll(new RegExp(`(${Configuration.stringEscapedCharacters.source})`, "g"), '\\$1')
        if (inline) {
            result = result
                .replaceAll("\n", "\\n") // Replace newline with \n
                .replaceAll("\t", "\\t") // Replace tab with \t
        }
        return result
    }

    /** @param {String} value */
    static unescapeString(value) {
        return value
            .replaceAll(new RegExp(Configuration.unescapedBackslash.source + "t", "g"), "\t") // Replace tab with \t
            .replaceAll(new RegExp(Configuration.unescapedBackslash.source + "n", "g"), "\n") // Replace newline with \n
            .replaceAll(new RegExp(`\\\\(${Configuration.stringEscapedCharacters.source})`, "g"), "$1")
    }

    /** @param {String} value */
    static clearHTMLWhitespace(value) {
        return value
            .replaceAll("&nbsp;", "\u00A0") // whitespace
            .replaceAll(/<br\s*\/>|<br>/g, "\n") // newlines
            .replaceAll(/(\<!--.*?\-->)/g, "") // html comments
    }

    /** @param {String} value */
    static encodeHTMLWhitespace(value) {
        return value.replaceAll(" ", "\u00A0")
    }

    /** @param {String} value */
    static capitalFirstLetter(value) {
        if (value.length === 0) {
            return value
        }
        return value.charAt(0).toUpperCase() + value.slice(1)
    }

    /** @param {String} value */
    static formatStringName(value = "") {
        return value
            // Remove leading b (for boolean values) or newlines
            .replace(/^\s*b(?=[A-Z])/, "")
            // Insert a space where needed, possibly removing unnecessary elading characters
            .replaceAll(Configuration.nameRegexSpaceReplacement, " ")
            .trim()
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

    /** @param {String} pathValue */
    static getNameFromPath(pathValue, dropCounter = false) {
        // From end to the first "/" or "."
        const regex = dropCounter ? /([^\.\/]+?)(?:_\d+)$/ : /([^\.\/]+)$/
        return pathValue.match(regex)?.[1] ?? ""
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Coordinates}
     */
    static getPolarCoordinates(x, y, positiveTheta = false) {
        let theta = Math.atan2(y, x)
        if (positiveTheta && theta < 0) {
            theta = 2 * Math.PI + theta
        }
        return [
            Math.sqrt(x * x + y * y),
            theta,
        ]
    }

    /**
     * @param {Number} r
     * @param {Number} theta
     * @returns {Coordinates}
     */
    static getCartesianCoordinates(r, theta) {
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

    /** @param {String[]} words */
    static getFirstWordOrder(words) {
        return new RegExp(/\s*/.source + words.join(/[^\n]+\n\s*/.source) + /\s*/.source)
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

    /** @param {Blueprint} blueprint */
    static async copy(blueprint) {
        const event = new ClipboardEvent("copy", {
            bubbles: true,
            cancelable: true,
            clipboardData: new DataTransfer(),
        })
        blueprint.dispatchEvent(event)
    }

    static animate(
        from,
        to,
        intervalSeconds,
        callback,
        acknowledgeRequestAnimationId = id => { },
        timingFunction = x => {
            const v = x ** 3.5
            return v / (v + ((1 - x) ** 3.5))
        }
    ) {
        let startTimestamp
        const doAnimation = currentTimestamp => {
            if (startTimestamp === undefined) {
                startTimestamp = currentTimestamp
            }
            let delta = (currentTimestamp - startTimestamp) / intervalSeconds
            if (Utility.approximatelyEqual(delta, 1) || delta > 1) {
                delta = 1
            } else {
                acknowledgeRequestAnimationId(requestAnimationFrame(doAnimation))
            }
            const currentValue = from + (to - from) * timingFunction(delta)
            callback(currentValue)
        }
        acknowledgeRequestAnimationId(requestAnimationFrame(doAnimation))
    }
}
