export default class OrderedIndexArray {

    /**
     * @param {(arrayElement: number) => number} compareFunction A function that, given acouple of elements of the array telles what order are they on.
     * @param {(number|array)} value Initial length or array to copy from
     */
    constructor(comparisonValueSupplier = (a) => a, value = null) {
        this.array = new Uint32Array(value)
        this.comparisonValueSupplier = comparisonValueSupplier
        this.length = 0
        this.currentPosition = 0
    }

    /**
     * 
     * @param {number} index The index of the value to return
     * @returns The element of the array
     */
    get(index) {
        return this.array[index]
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
        let l = 0
        let r = this.array.length
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

    /** 
     * Inserts the element in the array.
     * @param element {number} The value to insert into the array.
     * @returns {number} The position into occupied by value into the array.
     */
    insert(element, comparisonValue = null) {
        let position = this.getPosition(this.comparisonValueSupplier(element))
        if (
            position < this.currentPosition
            || comparisonValue != null && position == this.currentPosition && this.comparisonValueSupplier(element) < comparisonValue) {
            ++this.currentPosition
        }
        let newArray = new Uint32Array(this.array.length + 1)
        newArray.set(this.array.subarray(0, position), 0)
        newArray[position] = element
        newArray.set(this.array.subarray(position), position + 1)
        this.array = newArray
        this.length = this.array.length
        return position
    }

    /**
     * Removes the element from the array.
     * @param {number} value The value of the element to be remove.
     */
    remove(element) {
        let position = this.getPosition(this.comparisonValueSupplier(element))
        if (this.array[position] == element) {
            this.removeAt(position)
        }
    }

    /**
     * Removes the element into the specified position from the array.
     * @param {number} position The index of the element to be remove.
     */
    removeAt(position) {
        if (position < this.currentPosition) {
            --this.currentPosition
        }
        let newArray = new Uint32Array(this.array.length - 1)
        newArray.set(this.array.subarray(0, position), 0)
        newArray.set(this.array.subarray(position + 1), position)
        this.array = newArray
        this.length = this.array.length
        return position
    }

    getNext() {
        if (this.currentPosition >= 0 && this.currentPosition < this.array.length) {
            return this.get(this.currentPosition)
        }
        return null
    }

    getNextValue() {
        if (this.currentPosition >= 0 && this.currentPosition < this.array.length) {
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
}
