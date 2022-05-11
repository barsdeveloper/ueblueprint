export default class ISerializable {

    #showAsString = false

    isShownAsString() {
        return this.#showAsString
    }

    /**
     * @param {Boolean} v
     */
    setShowAsString(v) {
        this.#showAsString = v
    }
}