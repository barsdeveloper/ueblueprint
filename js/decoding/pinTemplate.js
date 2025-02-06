import Configuration from "../Configuration.js"
import BoolPinTemplate from "../template/pin/BoolPinTemplate.js"
import EnumPinTemplate from "../template/pin/EnumPinTemplate.js"
import ExecPinTemplate from "../template/pin/ExecPinTemplate.js"
import Int64PinTemplate from "../template/pin/Int64PinTemplate.js"
import IntPinTemplate from "../template/pin/IntPinTemplate.js"
import LinearColorPinTemplate from "../template/pin/LinearColorPinTemplate.js"
import NamePinTemplate from "../template/pin/NamePinTemplate.js"
import PinTemplate from "../template/pin/PinTemplate.js"
import ReadonlyNamePinTemplate from "../template/pin/ReadonlyInputPinTemplate.js"
import RealPinTemplate from "../template/pin/RealPinTemplate.js"
import ReferencePinTemplate from "../template/pin/ReferencePinTemplate.js"
import RotatorPinTemplate from "../template/pin/RotatorPinTemplate.js"
import StringPinTemplate from "../template/pin/StringPinTemplate.js"
import Vector2DPinTemplate from "../template/pin/Vector2DPinTemplate.js"
import Vector4DPinTemplate from "../template/pin/Vector4DPinTemplate.js"
import VectorPinTemplate from "../template/pin/VectorPinTemplate.js"
import pinTitle from "./pinTitle.js"

const p = Configuration.paths
const inputPinTemplates = {
    "bool": BoolPinTemplate,
    "byte": IntPinTemplate,
    "enum": EnumPinTemplate,
    "float": RealPinTemplate,
    "int": IntPinTemplate,
    "int64": Int64PinTemplate,
    "MUTABLE_REFERENCE": ReferencePinTemplate,
    "name": NamePinTemplate,
    "real": RealPinTemplate,
    "rg": Vector2DPinTemplate,
    "string": StringPinTemplate,
    [p.linearColor]: LinearColorPinTemplate,
    [p.niagaraBool]: BoolPinTemplate,
    [p.niagaraFloat]: RealPinTemplate,
    [p.niagaraInt32]: IntPinTemplate,
    [p.niagaraPosition]: VectorPinTemplate,
    [p.rotator]: RotatorPinTemplate,
    [p.vector]: VectorPinTemplate,
    [p.vector2D]: Vector2DPinTemplate,
    [p.vector2f]: Vector2DPinTemplate,
    [p.vector3f]: VectorPinTemplate,
    [p.vector4f]: Vector4DPinTemplate,
}

/** @param {PinEntity<IEntity>} entity */
export default function pinTemplate(entity) {
    if (entity.PinType.ContainerType?.toString() === "Array") {
        return PinTemplate
    }
    if (entity.PinType.bIsReference?.valueOf() && !entity.PinType.bIsConst?.valueOf()) {
        return inputPinTemplates["MUTABLE_REFERENCE"]
    }
    if (entity.isExecution()) {
        return ExecPinTemplate
    }
    if (entity.PinName?.toString() === "self" && pinTitle(entity) === "Target") {
        return ReadonlyNamePinTemplate
    }
    const type = entity.getType()
    return (entity.isInput() ? inputPinTemplates[type] : PinTemplate) ?? PinTemplate
}
