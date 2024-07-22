import { css } from "lit"
import Configuration from "../Configuration.js"

const colors = {
    [Configuration.paths.niagaraBool]: css`146, 0, 0`,
    [Configuration.paths.niagaraDataInterfaceVolumeTexture]: css`0, 168, 242`,
    [Configuration.paths.niagaraFloat]: css`160, 250, 68`,
    [Configuration.paths.niagaraMatrix]: css`0, 88, 200`,
    [Configuration.paths.niagaraNumeric]: css`0, 88, 200`,
    [Configuration.paths.niagaraPosition]: css`251, 146, 251`,
    [Configuration.paths.quat4f]: css`0, 88, 200`,
    [Configuration.paths.rotator]: css`157, 177, 251`,
    [Configuration.paths.transform]: css`227, 103, 0`,
    [Configuration.paths.vector]: css`251, 198, 34`,
    [Configuration.paths.vector3f]: css`250, 200, 36`,
    [Configuration.paths.vector4f]: css`0, 88, 200`,
    "Any": css`132, 132, 132`,
    "Any[]": css`132, 132, 132`,
    "audio": css`252, 148, 252`,
    "blue": css`0, 0, 255`,
    "bool": css`146, 0, 0`,
    "byte": css`0, 109, 99`,
    "class": css`88, 0, 186`,
    "default": css`255, 255, 255`,
    "delegate": css`255, 56, 56`,
    "enum": css`0, 109, 99`,
    "exec": css`240, 240, 240`,
    "float": css`160, 252, 70`,
    "green": css`0, 255, 0`,
    "int": css`31, 224, 172`,
    "int32": css`30, 224, 172`,
    "int64": css`169, 223, 172`,
    "interface": css`238, 252, 168`,
    "name": css`201, 128, 251`,
    "object": css`0, 168, 242`,
    "Param": css`255, 166, 39`,
    "Param[]": css`255, 166, 39`,
    "Point": css`63, 137, 255`,
    "Point[]": css`63, 137, 255`,
    "real": css`54, 208, 0`,
    "red": css`255, 0, 0`,
    "string": css`251, 0, 208`,
    "struct": css`0, 88, 200`,
    "Surface": css`69, 196, 126`,
    "Surface[]": css`69, 196, 126`,
    "text": css`226, 121, 167`,
    "time": css`148, 252, 252`,
    "Volume": css`230, 69, 188`,
    "Volume[]": css`230, 69, 188`,
    "wildcard": css`128, 120, 120`,
}

const pinColorMaterial = css`120, 120, 120`

/** @param {PinEntity} entity */
export default function pinColor(entity) {
    if (entity.PinType.PinCategory?.toString() === "mask") {
        const result = colors[entity.PinType.PinSubCategory]
        if (result) {
            return result
        }
    } else if (entity.PinType.PinCategory?.toString() === "optional") {
        return pinColorMaterial
    }
    return colors[entity.getType()]
        ?? colors[entity.PinType.PinCategory?.toString().toLowerCase()]
        ?? colors["default"]
}
