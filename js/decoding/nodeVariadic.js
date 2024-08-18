import Configuration from "../Configuration.js"
import ArrayEntity from "../entity/ArrayEntity.js"
import GuidEntity from "../entity/GuidEntity.js"
import NaturalNumberEntity from "../entity/NaturalNumberEntity.js"
import PinEntity from "../entity/PinEntity.js"
import StringEntity from "../entity/StringEntity.js"

/** @param {PinEntity} pinEntity */
const indexFromUpperCaseLetterName = pinEntity =>
    pinEntity.PinName?.toString().match(/^\s*([A-Z])\s*$/)?.[1]?.charCodeAt(0) - "A".charCodeAt(0)

/** @param {ObjectEntity} entity */
export default function nodeVariadic(entity) {
    /** @type {() => PinEntity[]} */
    let pinEntities
    /** @type {(pinEntity: PinEntity) => Number} */
    let pinIndexFromEntity
    /** @type {(newPinIndex: Number, minIndex: Number, maxIndex: Number, newPin: PinEntity) => String} */
    let pinNameFromIndex
    const type = entity.getType()
    let name
    switch (type) {
        case Configuration.paths.commutativeAssociativeBinaryOperator:
        case Configuration.paths.promotableOperator:
            name = entity.FunctionReference?.MemberName?.toString()
            switch (name) {
                default:
                    if (
                        !name?.startsWith("Add_")
                        && !name?.startsWith("Subtract_")
                        && !name?.startsWith("Multiply_")
                        && !name?.startsWith("Divide_")
                    ) {
                        break
                    }
                case "And_Int64Int64":
                case "And_IntInt":
                case "BMax":
                case "BMin":
                case "BooleanAND":
                case "BooleanNAND":
                case "BooleanOR":
                case "Concat_StrStr":
                case "FMax":
                case "FMin":
                case "Max":
                case "MaxInt64":
                case "Min":
                case "MinInt64":
                case "Or_Int64Int64":
                case "Or_IntInt":
                    pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isInput())
                    pinIndexFromEntity ??= indexFromUpperCaseLetterName
                    pinNameFromIndex ??= (index, min = -1, max = -1) => {
                        const result = String.fromCharCode(index >= 0 ? index : max + "A".charCodeAt(0) + 1)
                        entity.NumAdditionalInputs = new NaturalNumberEntity(pinEntities().length - 1)
                        return result
                    }
                    break
            }
            break
        case Configuration.paths.multiGate:
            pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isOutput())
            pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName?.toString().match(/^\s*Out[_\s]+(\d+)\s*$/i)?.[1])
            pinNameFromIndex ??= (index, min = -1, max = -1, newPin) =>
                `Out ${index >= 0 ? index : min > 0 ? "Out 0" : max + 1}`
            break
        // case Configuration.paths.niagaraNodeOp:
        //     pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isInput())
        //     pinIndexFromEntity ??= indexFromUpperCaseLetterName
        //     pinNameFromIndex ??= (index, min = -1, max = -1, newPin) => {
        //         const result = String.fromCharCode(index >= 0 ? index : max + "A".charCodeAt(0) + 1)
        //         entity.AddedPins ??= []
        //         entity.AddedPins.push(newPin)
        //         return result
        //     }
        //     break
        case Configuration.paths.switchInteger:
            pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isOutput())
            pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName?.toString().match(/^\s*(\d+)\s*$/)?.[1])
            pinNameFromIndex ??= (index, min = -1, max = -1, newPin) => (index < 0 ? max + 1 : index).toString()
            break
        case Configuration.paths.switchGameplayTag:
            pinNameFromIndex ??= (index, min = -1, max = -1, newPin) => {
                const result = `Case_${index >= 0 ? index : min > 0 ? "0" : max + 1}`
                entity.PinNames ??= new ArrayEntity()
                entity.PinNames.valueOf().push(new StringEntity(result))
                delete entity.PinTags.valueOf()[entity.PinTags.length - 1]
                entity.PinTags.valueOf()[entity.PinTags.length] = null
                return result
            }
        case Configuration.paths.switchName:
        case Configuration.paths.switchString:
            pinEntities ??= () => entity.getPinEntities().filter(pinEntity => pinEntity.isOutput())
            pinIndexFromEntity ??= pinEntity => Number(pinEntity.PinName.toString().match(/^\s*Case[_\s]+(\d+)\s*$/i)?.[1])
            pinNameFromIndex ??= (index, min = -1, max = -1, newPin) => {
                const result = `Case_${index >= 0 ? index : min > 0 ? "0" : max + 1}`
                entity.PinNames ??= new ArrayEntity()
                entity.PinNames.valueOf().push(new StringEntity(result))
                return result
            }
            break
    }
    if (pinEntities) {
        return () => {
            let min = Number.MAX_SAFE_INTEGER
            let max = Number.MIN_SAFE_INTEGER
            let values = []
            const modelPin = pinEntities().reduce(
                (acc, cur) => {
                    const value = pinIndexFromEntity(cur)
                    if (!isNaN(value)) {
                        values.push(value)
                        min = Math.min(value, min)
                        if (value > max) {
                            max = value
                            return cur
                        }
                    } else if (acc === undefined) {
                        return cur
                    }
                    return acc
                },
                undefined
            )
            if (min === Number.MAX_SAFE_INTEGER || max === Number.MIN_SAFE_INTEGER) {
                min = undefined
                max = undefined
            }
            if (!modelPin) {
                return null
            }
            values.sort((a, b) => a < b ? -1 : a === b ? 0 : 1)
            let prev = values[0]
            let index = values.findIndex(
                // Search for a gap
                value => {
                    const result = value - prev > 1
                    prev = value
                    return result
                }
            )
            const newPin = new PinEntity(modelPin)
            newPin.PinId = new GuidEntity()
            newPin.PinName = new StringEntity(pinNameFromIndex(index, min, max, newPin))
            newPin.PinToolTip = undefined
            // @ts-expect-error
            newPin.DefaultValue = new (newPin.DefaultValue.constructor)()
            entity.getCustomproperties(true).push(newPin)
            return newPin
        }
    }
}
