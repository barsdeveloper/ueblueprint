export default class ETypesNames {

    constructor(type) {
        switch (type) {
            case 'Class':
            case 'None':
                this.value = type
                break
            default:
                throw new Error('Unexpected type name')
        }
    }

    toString() {
        return this.value
    }
}