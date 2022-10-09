export default class OrderedIndexArray {

    /**
     * @param {(arrayElement: number) => number} comparisonValueSupplier
     * @param {number} value
     */
    constructor(comparisonValueSupplier = v => v, value = null) {
        this.array = new Uint32Array(value)
        this.comparisonValueSupplier = comparisonValueSupplier
        this.length = 0
        this.currentPosition = 0
    }

    /** @param {number} index */
    get(index) {
        if (index >= 0 && index < this.length) {
            return this.array[index]
        }
        return null
    }

    getArray() {
        return this.array
    }

    /** @param {number} value */
    getPosition(value) {
        let l = 0
        let r = this.length
        while (l < r) {
            let m = Math.floor((l + r) / 2)
            if (this.comparisonValueSupplier(this.array[m]) < value) {
                l = m + 1
            } else {
                r = m
            }
        }
        return l
    }

    reserve(length) {
        if (this.array.length < length) {
            let newArray = new Uint32Array(length)
            newArray.set(this.array)
            this.array = newArray
        }
    }

    /** @param {number} element */
    insert(element, comparisonValue = null) {
        let position = this.getPosition(this.comparisonValueSupplier(element))
        if (
            position < this.currentPosition
            || comparisonValue != null && position == this.currentPosition && this.comparisonValueSupplier(element) < comparisonValue) {
            ++this.currentPosition
        }
        this.shiftRight(position)
        this.array[position] = element
        ++this.length
        return position
    }

    /** @param {number} element */
    remove(element) {
        let position = this.getPosition(this.comparisonValueSupplier(element))
        if (this.array[position] == element) {
            this.removeAt(position)
        }
    }

    /** @param {number} position */
    removeAt(position) {
        if (position < this.currentPosition) {
            --this.currentPosition
        }
        this.shiftLeft(position)
        --this.length
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
        this.array.set(this.array.subarray(leftLimit + steps), leftLimit)
    }

    shiftRight(leftLimit, steps = 1) {
        this.array.set(this.array.subarray(leftLimit, -steps), leftLimit + steps)
    }
}
