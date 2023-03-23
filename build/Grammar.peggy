
{{
import ByteEntity from "../js/entity/ByteEntity.js"
import EnumEntity from "../js/entity/EnumEntity.js"
import FormatTextEntity from "../js/entity/FormatTextEntity.js"
import FunctionReferenceEntity from "../js/entity/FunctionReferenceEntity.js"
import GuidEntity from "../js/entity/GuidEntity.js"
import IdentifierEntity from "../js/entity/IdentifierEntity.js"
import Integer64Entity from "../js/entity/Integer64Entity.js"
import IntegerEntity from "../js/entity/IntegerEntity.js"
import InvariantTextEntity from "../js/entity/InvariantTextEntity.js"
import KeyBindingEntity from "../js/entity/KeyBindingEntity.js"
import LinearColorEntity from "../js/entity/LinearColorEntity.js"
import LocalizedTextEntity from "../js/entity/LocalizedTextEntity.js"
import MacroGraphReferenceEntity from "../js/entity/MacroGraphReferenceEntity.js"
import ObjectEntity from "../js/entity/ObjectEntity.js"
import ObjectReferenceEntity from "../js/entity/ObjectReferenceEntity.js"
import PathSymbolEntity from "../js/entity/PathSymbolEntity.js"
import PinEntity from "../js/entity/PinEntity.js"
import PinReferenceEntity from "../js/entity/PinReferenceEntity.js"
import PinTypeEntity from "../js/entity/PinTypeEntity.js"
import RealUnitEntity from "../js/entity/UnitRealEntity.js"
import RotatorEntity from "../js/entity/RotatorEntity.js"
import SimpleSerializationRotatorEntity from "../js/entity/SimpleSerializationRotatorEntity.js"
import SimpleSerializationVector2DEntity from "../js/entity/SimpleSerializationVector2DEntity.js"
import SimpleSerializationVectorEntity from "../js/entity/SimpleSerializationVectorEntity.js"
import SymbolEntity from "../js/entity/SymbolEntity.js"
import UnionType from "../js/entity/UnionType.js"
import VariableReferenceEntity from "../js/entity/VariableReferenceEntity.js"
import Vector2DEntity from "../js/entity/Vector2DEntity.js"
import VectorEntity from "../js/entity/VectorEntity.js"

const createObject = entries => entries.reduce((acc, cur) => ({...acc, ...cur}), {})
}}

start = multipleObjects

/*   ---   Fragments  ---   */

inlineSpace = $[ \t]
space = $[ \n\t]
multilineSpace = $(inlineSpace*)|2.., "\n"|
word = $[a-z_]i+
symbol = $[a-z_]i[0-9a-z_]i*
hexDigit = $[0-9A-F]i
integer = $[\-\+]?[0-9]+
insideString = $([^"\\] / ("\\".))*
attributeName = $word|1.., "."|
pathFragment = $("/" symbol|1.., "." / ":"|)|2..|
pathSpaceFragment = $("/" symbol|1.., "." / ":" / inlineSpace*|)|2..|
path = @pathFragment / '"' @pathSpaceFragment '"' / '\'"' @pathSpaceFragment '"\''
unknownValue = boolean / string / guidEntity / number / noneReferenceEntity
unknownEntry = key: attributeName space* "=" space* value: unknownValue {
    return { key: value }
}
byte = $(
    "0"* (
        "25"[0-5]
        / "2"[0-4][0-9]
        / "1"[0-9][0-9]
        / [0-9][0-9]?
    )?
    ![0-9]
)
realUnit = value: $(
    "+"? (
        "."[0-9]+
        / "0"("."[0-9]+)?
        / "1"(".""0"+)? ![0-9]
    )
)

/*   ---   Primitive  ---   */

boolean = true / false
false = "false" { return false; }
true  = "true" { return true; }
null = "(" inlineSpace* ")" { return null; }
number = value: $(integer ("."[0-9]+)?) { return Number(value); }
unitNumber = value: realUnit { return Number(value); }
bigint = value: integer { return BigInt(value); }
naturalNumber = value: [0-9] { return parseInt(value); }
colorNumber = value: byte { return parseInt(value); }
string = '"' value: insideString '"' { return value; }

/*   ---   Entity   ---   */

byteEntity = value: byte {
    return new ByteEntity(value)
}

enumEntity = vaue: symbol {
    return new EnumEntity(value)
}

formatTextEntity = "LOCGEN_FORMAT_NAMED" space* 
            "("
            (localizedTextEntity / invariantTextEntity / formatTextEntity)|.., space* "," space*|
            (space* ",")?
            ")"
        

functionReferenceEntity =  "(" space*
    entries: (
        "MemberParent" space* "=" space* objectReferenceEntity
        / "MemberName" space* "=" space* string
        / "MemberGuid" space* "=" space* guidEntity
    )|.., space* "," space*|
    (space* ",")?
    space* ")" {
        return new FunctionReferenceEntity(createObject(entries))
    }

guidEntity = value: $hexDigit|32| {
    return new GuidEntity(value)
}

identifierEntity = value: string {
    return new IdentifierEntity(value)
}

integer64Entity = value: bigint {
    return new Integer64Entity(value)
}

integerEntity = value: integer {
    return new IntegerEntity(value)
}

invariantTextEntity = "INVTEXT" space* "(" space* value: string space* ")" {
    return new InvariantTextEntity(value)
}

keyBindingEntity =  "(" space*
    entries: (
        "ActionName" space* "=" space* string
        / "bShift" space* "=" space* boolean
        / "bCtrl" space* "=" space* boolean
        / "bAlt" space* "=" space* boolean
        / "bCmd" space* "=" space* boolean
        / "Key" space* "=" space* identifierEntity
    )|.., space* "," space*|
    (space* ",")?
    space* ")" {
        return new KeyBindingEntity(createObject(entries))
    }

linearColorEntity =  "(" space*
    entries: (
        "R" space* "=" space* realUnitEntity
        / "G" space* "=" space* realUnitEntity
        / "B" space* "=" space* realUnitEntity
        / "A" space* "=" space* realUnitEntity
    )|.., space* "," space*|
    (space* ",")?
    space* ")" {
        return new LinearColorEntity(createObject(entries))
    }

localizedTextEntity = "NSLOCTEXT" space* "(" space* 
    namespace: string space* "," space* 
    key: string space* "," space*
    value: string space* "," space*
    ")" {
        return LocalizedTextEntity({
            namespace: namespace,
            key: key,
            value: value,
        })
    }

macroGraphReferenceEntity =  "(" space*
    entries: (
        "MacroGraph" space* "=" space* objectReferenceEntity
        / "GraphBlueprint" space* "=" space* objectReferenceEntity
        / "GraphGuid" space* "=" space* guidEntity
    )|.., space* "," space*|
    (space* ",")?
    space* ")" {
        return new MacroGraphReferenceEntity(createObject(entries))
    }

naturalNumberEntity = value: naturalNumber {
    return new NaturalNumberEntity(value)
}

objectEntity = "Begin" space+ "Object" space+
    entries: (
    (
        "Class" space* "=" space* objectReferenceEntity
        / "Name" space* "=" space* string
    )|1.., space+|
    / (
        customProperties
        / "Class" space* "=" space* objectReferenceEntity
        / "Name" space* "=" space* string
        / "AxisKey" space* "=" space* symbolEntity
        / "InputAxisKey" space* "=" space* symbolEntity
        / "bIsPureFunc" space* "=" space* boolean
        / "bIsConstFunc" space* "=" space* boolean
        / "VariableReference" space* "=" space* variableReferenceEntity / null
        / "SelfContextInfo" space* "=" space* symbolEntity / null
        / "DelegatePropertyName" space* "=" space* string
        / "DelegateOwnerClass" space* "=" space* objectReferenceEntity
        / "ComponentPropertyName" space* "=" space* string
        / "EventReference" space* "=" space* functionReferenceEntity / null
        / "FunctionReference" space* "=" space* functionReferenceEntity / null
        / "CustomFunctionName" space* "=" space* string
        / "TargetType" space* "=" space* objectReferenceEntity / null
        / "MacroGraphReference" space* "=" space* macroGraphReferenceEntity / null
        / "Enum" space* "=" space* objectReferenceEntity
        / "InputKey" space* "=" space* symbolEntity
        / "bOverrideFunction" space* "=" space* boolean
        / "bInternalEvent" space* "=" space* boolean
        / "bConsumeInput" space* "=" space* boolean
        / "bExecuteWhenPaused" space* "=" space* boolean
        / "bOverrideParentBinding" space* "=" space* boolean
        / "bControl" space* "=" space* boolean
        / "bAlt" space* "=" space* boolean
        / "bShift" space* "=" space* boolean
        / "bCommand" space* "=" space* boolean
        / "CommentColor" space* "=" space* linearColorEntity
        / "bCommentBubbleVisible_InDetailsPanel" space* "=" space* boolean
        / "bColorCommentBubble" space* "=" space* boolean
        / "MoveMode" space* "=" space* symbolEntity
        / "NodePosX" space* "=" space* integerEntity
        / "NodePosY" space* "=" space* integerEntity
        / "NodeWidth" space* "=" space* integerEntity
        / "NodeHeight" space* "=" space* integerEntity
        / "bCommentBubblePinned" space* "=" space* boolean
        / "bCommentBubbleVisible" space* "=" space* boolean
        / "NodeComment" space* "=" space* string
        / "AdvancedPinDisplay" space* "=" space* identifierEntity / null
        / "EnabledState" space* "=" space* identifierEntity / null
        / "NodeGuid" space* "=" space* guidEntity
        / "ErrorType" space* "=" space* integerEntity
        / "ErrorMsg" space* "=" space* string
    )|1.., multilineSpace|
    )
    space+ "End" space+ "Object" {
        new ObjectEntity(createObject(entries))
    }

multipleObjects = (@objectEntity space+)+

customProperties = "CustomProperties" space+ pinEntity

noneReferenceEntity = "None"i {
    return new ObjectReferenceEntity({
        type: "None",
        path: "",
    })
}

typeReferenceEntity = value: symbol {
    return new ObjectReferenceEntity({
        type: value,
        path: "",
    })
}

pathReferenceEntity = value: path {
    return new ObjectReferenceEntity({
        type: "",
        path: value,
    })
}

fullReferenceEntity = type: symbol inlineSpace* path: path {
    return new ObjectReferenceEntity({
        type: type,
        path: path,
    })
}

objectReferenceEntity = noneReferenceEntity / fullReferenceEntity / pathReferenceEntity / typeReferenceEntity

pathSymbolEntity = value: pathSpaceFragment {
    return new PathSymbolEntity(value)
}

pinEntity = "Pin" space*  "(" space*
    entries: (
        "PinId" space* "=" space* guidEntity
        / "PinName" space* "=" space* string
        / "PinFriendlyName" space* "=" space* localizedTextEntity / formatTextEntity / string
        / "PinToolTip" space* "=" space* string
        / "Direction" space* "=" space* string
        / "PinType.PinCategory" space* "=" space* string
        / "PinType.PinSubCategory" space* "=" space* string
        / "PinType.PinSubCategoryObject" space* "=" space* objectReferenceEntity
        / "PinType.PinSubCategoryMemberReference" space* "=" space* functionReferenceEntity / null
        / "PinType.PinValueType" space* "=" space* pinTypeEntity / null
        / "PinType.ContainerType" space* "=" space* pathSymbolEntity
        / "PinType.bIsReference" space* "=" space* boolean
        / "PinType.bIsConst" space* "=" space* boolean
        / "PinType.bIsWeakPointer" space* "=" space* boolean
        / "PinType.bIsUObjectWrapper" space* "=" space* boolean
        / "PinType.bSerializeAsSinglePrecisionFloat" space* "=" space* boolean
        / "LinkedTo" space* "=" space* 
            "("
            (pinReferenceEntity)|.., space* "," space*|
            (space* ",")?
            ")"
        
        / "DefaultValue" space* "=" space* '"' unknownValue '"'
        / "AutogeneratedDefaultValue" space* "=" space* string
        / "DefaultObject" space* "=" space* objectReferenceEntity / null
        / "PersistentGuid" space* "=" space* guidEntity
        / "bHidden" space* "=" space* boolean
        / "bNotConnectable" space* "=" space* boolean
        / "bDefaultValueIsReadOnly" space* "=" space* boolean
        / "bDefaultValueIsIgnored" space* "=" space* boolean
        / "bAdvancedView" space* "=" space* boolean
        / "bOrphanedPin" space* "=" space* boolean
    )|.., space* "," space*|
    (space* ",")?
    space* ")" {
        return new PinEntity(createObject(entries))
    }

pinReferenceEntity = objectName: symbol space+ pinGuid: guidEntity {
    return new PinReferenceEntity({
        objectName: objectName,
        pinGuid: pinGuid,
    })
}

pinTypeEntity =  "(" space*
    entries: (
        "TerminalCategory" space* "=" space* string
        / "TerminalSubCategory" space* "=" space* string
        / "bTerminalIsConst" space* "=" space* boolean
        / "bTerminalIsWeakPointer" space* "=" space* boolean
        / "bTerminalIsUObjectWrapper" space* "=" space* boolean
    )|.., space* "," space*|
    (space* ",")?
    space* ")" {
        return new PinTypeEntity(createObject(entries))
    }

rotatorEntity =  "(" space*
    entries: (
        "R" space* "=" space* number
        / "P" space* "=" space* number
        / "Y" space* "=" space* number
    )|.., space* "," space*|
    (space* ",")?
    space* ")" {
        return new RotatorEntity(createObject(entries))
    }

simpleSerializationRotatorEntity = "(" space*
    p: number space* "," space*
    y: number space* "," space*
    r: number space* "," space*
    ")" {
        new SimpleSerializationRotatorEntity({
            R: r,
            P: p,
            Y: y,
        })
    }

simpleSerializationVector2DEntity = "(" space*
    x: number space* "," space*
    y: number space* "," space*
    ")" {
        new SimpleSerializationVector2DEntity({
            X: x,
            Y: y,
        })
    }

simpleSerializationVectorEntity = "(" space*
    x: number space* "," space*
    y: number space* "," space*
    z: number space* "," space*
    ")" {
        new SimpleSerializationVectorEntity({
            X: x,
            Y: y,
            Z: z,
        })
    }

symbolEntity = value: symbol {
    return new SymbolEntity(value)
}

realUnitEntity = value: realUnit {
    return new RealUnitEntity(value)
}

variableReferenceEntity =  "(" space*
    entries: (
        "MemberScope" space* "=" space* string
        / "MemberName" space* "=" space* string
        / "MemberGuid" space* "=" space* guidEntity
        / "bSelfContext" space* "=" space* boolean
    )|.., space* "," space*|
    (space* ",")?
    space* ")" {
        return new VariableReferenceEntity(createObject(entries))
    }
