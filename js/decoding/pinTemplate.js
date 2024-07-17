import Configuration from "../Configuration.js"
import BoolPinTemplate from "../template/pin/BoolPinTemplate.js"
import EnumPinTemplate from "../template/pin/EnumPinTemplate.js"
import ExecPinTemplate from "../template/pin/ExecPinTemplate.js"
import Int64PinTemplate from "../template/pin/Int64PinTemplate.js"
import IntPinTemplate from "../template/pin/IntPinTemplate.js"
import LinearColorPinTemplate from "../template/pin/LinearColorPinTemplate.js"
import NamePinTemplate from "../template/pin/NamePinTemplate.js"
import PinTemplate from "../template/pin/PinTemplate.js"
import RealPinTemplate from "../template/pin/RealPinTemplate.js"
import ReferencePinTemplate from "../template/pin/ReferencePinTemplate.js"
import RotatorPinTemplate from "../template/pin/RotatorPinTemplate.js"
import StringPinTemplate from "../template/pin/StringPinTemplate.js"
import Vector2DPinTemplate from "../template/pin/Vector2DPinTemplate.js"
import Vector4DPinTemplate from "../template/pin/Vector4DPinTemplate.js"
import VectorPinTemplate from "../template/pin/VectorPinTemplate.js"

const inputPinTemplates = {
    [Configuration.paths.linearColor]: LinearColorPinTemplate,
    [Configuration.paths.niagaraBool]: BoolPinTemplate,
    [Configuration.paths.niagaraPosition]: VectorPinTemplate,
    [Configuration.paths.rotator]: RotatorPinTemplate,
    [Configuration.paths.vector]: VectorPinTemplate,
    [Configuration.paths.vector2D]: Vector2DPinTemplate,
    [Configuration.paths.vector3f]: VectorPinTemplate,
    [Configuration.paths.vector4f]: Vector4DPinTemplate,
    "bool": BoolPinTemplate,
    "byte": IntPinTemplate,
    "enum": EnumPinTemplate,
    "int": IntPinTemplate,
    "int64": Int64PinTemplate,
    "MUTABLE_REFERENCE": ReferencePinTemplate,
    "name": NamePinTemplate,
    "rg": Vector2DPinTemplate,
    "real": RealPinTemplate,
    "string": StringPinTemplate,
}

/** @param {PinEntity} entity */
export default function pinTemplate(entity) {
    if (entity.PinType.ContainerType?.valueOf() === "Array") {
        return PinTemplate
    }
    if (entity.PinType.bIsReference?.valueOf() && !entity.PinType.bIsConst?.valueOf()) {
        return inputPinTemplates["MUTABLE_REFERENCE"]
    }
    if (entity.getType() === "exec") {
        return ExecPinTemplate
    }
    return (entity.isInput() ? inputPinTemplates[entity.getType()] : PinTemplate) ?? PinTemplate
}
