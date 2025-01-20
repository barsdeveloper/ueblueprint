import { css } from "lit"

export default class Configuration {
    static nodeColors = {
        black: css`20, 20, 20`,
        blue: css`84, 122, 156`,
        darkBlue: css`32, 80, 128`,
        darkerBlue: css`18, 18, 130`,
        darkTurquoise: css`19, 100, 137`,
        gray: css`150,150,150`,
        green: css`95, 129, 90`,
        intenseGreen: css`42, 140, 42`,
        lime: css`150, 160, 30`,
        red: css`151, 33, 32`,
        turquoise: css`46, 104, 106`,
        violet: css`126, 28, 150`,
        yellow: css`148, 116, 24`,
    }
    static alphaPattern = "repeating-conic-gradient(#7c8184 0% 25%, #c2c3c4 0% 50%) 50% / 10px 10px"
    static colorDragEventName = "ueb-color-drag"
    static colorPickEventName = "ueb-color-pick"
    static colorWindowEventName = "ueb-color-window"
    static colorWindowName = "Color Picker"
    static defaultCommentHeight = 96
    static defaultCommentWidth = 400
    static distanceThreshold = 20 // px
    static dragEventName = "ueb-drag"
    static dragGeneralEventName = "ueb-drag-general"
    static edgeScrollThreshold = 50
    static editTextEventName = {
        begin: "ueb-edit-text-begin",
        end: "ueb-edit-text-end",
    }
    static expandGridSize = 400
    static focusEventName = {
        begin: "blueprint-focus",
        end: "blueprint-unfocus",
    }
    static fontSize = css`13px`
    static gridAxisLineColor = css`black`
    static gridExpandThreshold = 0.25 // remaining size factor threshold to cause an expansion event
    static gridLineColor = css`#353535`
    static gridLineWidth = 1 // px
    static gridSet = 8
    static gridSetLineColor = css`#161616`
    static gridShrinkThreshold = 4 // exceding size factor threshold to cause a shrink event
    static gridSize = 16 // px
    static hexColorRegex = /^\s*#(?<r>[0-9a-fA-F]{2})(?<g>[0-9a-fA-F]{2})(?<b>[0-9a-fA-F]{2})([0-9a-fA-F]{2})?|#(?<rs>[0-9a-fA-F])(?<gs>[0-9a-fA-F])(?<bs>[0-9a-fA-F])\s*$/
    static indentation = "   "
    static keysSeparator = /[\.\(\)]/
    static knotOffset = [-Configuration.gridSize, -0.5 * Configuration.gridSize]
    static lineTracePattern = /LineTrace(Single|Multi)(\w*)/
    static linkCurveHeight = 15 // px
    static linkCurveWidth = 80 // px
    static linkMinWidth = 100 // px
    static nameRegexSpaceReplacement = new RegExp(
        // Leading K2_ or K2Node_ is removed
        "^K2(?:[Nn]ode)?_"
        // End of a word (lower case followed by either upper case or number): "AlphaBravo" => "Alpha Bravo"
        + "|(?<=[a-z])(?=[A-Z0-9])"
        // End of upper case word (upper case followed by either word or number)
        + "|(?<=[A-Z])"
        + /* Except "UVs" */ "(?<!U(?=Vs(?![a-z])))"
        + /* Except V2, V3 */ "(?<!V(?=[23](?![0-9])))"
        + /* Except T2d */ "(?<!T(?=2d(?![a-z])))"
        + /* Except BT */ "(?<!BT)"
        + "(?=[A-Z][a-z]|[0-9])"
        // Number followed by a letter
        + "|(?<=[0-9])"
        + /* Except 2D, 3D */ "(?<![23](?=[dD](?![a-z])))"
        + "(?=[a-zA-Z])"
        // "Alpha__Bravo" => "Alpha Bravo"
        + "|\\s*_+\\s*"
        + "|\\s{2,}",
        "g"
    )
    /**
     * @param {Number} start
     * @param {Number} c1
     * @param {Number} c2
     */
    static linkRightSVGPath = (start, c1, c2) => {
        let end = 100 - start
        return `M ${start} 0 C ${c1.toFixed(3)} 0, ${c2.toFixed(3)} 0, 50 50 S ${(end - c1 + start).toFixed(3)} 100, `
            + `${end.toFixed(3)} 100`
    }
    static maxZoom = 7
    static minZoom = -12
    static mouseClickButton = 0
    static mouseRightClickButton = 2
    static mouseWheelZoomThreshold = 80
    static nodeDragEventName = "ueb-node-drag"
    static nodeDragGeneralEventName = "ueb-node-drag-general"
    static nodeTitle = (name, counter) => `${name}_${counter}`
    static nodeRadius = 8 // px
    static nodeReflowEventName = "ueb-node-reflow"
    static paths = {
        actorBoundEvent: "/Script/BlueprintGraph.K2Node_ActorBoundEvent",
        addDelegate: "/Script/BlueprintGraph.K2Node_AddDelegate",
        ambientSound: "/Script/Engine.AmbientSound",
        asyncAction: "/Script/BlueprintGraph.K2Node_AsyncAction",
        blueprint: "/Script/Engine.Blueprint",
        blueprintGameplayTagLibrary: "/Script/GameplayTags.BlueprintGameplayTagLibrary",
        blueprintMapLibrary: "/Script/Engine.BlueprintMapLibrary",
        blueprintSetLibrary: "/Script/Engine.BlueprintSetLibrary",
        callArrayFunction: "/Script/BlueprintGraph.K2Node_CallArrayFunction",
        callDelegate: "/Script/BlueprintGraph.K2Node_CallDelegate",
        callFunction: "/Script/BlueprintGraph.K2Node_CallFunction",
        clearDelegate: "/Script/BlueprintGraph.K2Node_ClearDelegate",
        comment: "/Script/UnrealEd.EdGraphNode_Comment",
        commutativeAssociativeBinaryOperator: "/Script/BlueprintGraph.K2Node_CommutativeAssociativeBinaryOperator",
        componentBoundEvent: "/Script/BlueprintGraph.K2Node_ComponentBoundEvent",
        createDelegate: "/Script/BlueprintGraph.K2Node_CreateDelegate",
        customEvent: "/Script/BlueprintGraph.K2Node_CustomEvent",
        doN: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N",
        doOnce: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:DoOnce",
        dynamicCast: "/Script/BlueprintGraph.K2Node_DynamicCast",
        eAttachmentRule: "/Script/Engine.EAttachmentRule",
        edGraph: "/Script/Engine.EdGraph",
        eDrawDebugTrace: "/Script/Engine.EDrawDebugTrace",
        eMaterialSamplerType: "/Script/Engine.EMaterialSamplerType",
        eNiagara_Float4Channel: "/Niagara/Enums/ENiagara_Float4Channel.ENiagara_Float4Channel",
        enum: "/Script/CoreUObject.Enum",
        enumLiteral: "/Script/BlueprintGraph.K2Node_EnumLiteral",
        eSamplerSourceMode: "/Script/Engine.ESamplerSourceMode",
        eSearchCase: "/Script/CoreUObject.ESearchCase",
        eSearchDir: "/Script/CoreUObject.ESearchDir",
        eSpawnActorCollisionHandlingMethod: "/Script/Engine.ESpawnActorCollisionHandlingMethod",
        eTextureMipValueMode: "/Script/Engine.ETextureMipValueMode",
        eTraceTypeQuery: "/Script/Engine.ETraceTypeQuery",
        event: "/Script/BlueprintGraph.K2Node_Event",
        eWorldPositionIncludedOffsets: "/Script/Engine.EWorldPositionIncludedOffsets",
        executionSequence: "/Script/BlueprintGraph.K2Node_ExecutionSequence",
        flipflop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:FlipFlop",
        forEachElementInEnum: "/Script/BlueprintGraph.K2Node_ForEachElementInEnum",
        forEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoop",
        forEachLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoopWithBreak",
        forLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoop",
        forLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoopWithBreak",
        functionEntry: "/Script/BlueprintGraph.K2Node_FunctionEntry",
        functionResult: "/Script/BlueprintGraph.K2Node_FunctionResult",
        gameplayTag: "/Script/GameplayTags.GameplayTag",
        getInputAxisKeyValue: "/Script/BlueprintGraph.K2Node_GetInputAxisKeyValue",
        ifThenElse: "/Script/BlueprintGraph.K2Node_IfThenElse",
        inputAxisKeyEvent: "/Script/BlueprintGraph.K2Node_InputAxisKeyEvent",
        inputDebugKey: "/Script/InputBlueprintNodes.K2Node_InputDebugKey",
        inputKey: "/Script/BlueprintGraph.K2Node_InputKey",
        inputVectorAxisEvent: "/Script/BlueprintGraph.K2Node_InputVectorAxisEvent",
        isValid: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:IsValid",
        kismetArrayLibrary: "/Script/Engine.KismetArrayLibrary",
        kismetMathLibrary: "/Script/Engine.KismetMathLibrary",
        knot: "/Script/BlueprintGraph.K2Node_Knot",
        linearColor: "/Script/CoreUObject.LinearColor",
        literal: "/Script/BlueprintGraph.K2Node_Literal",
        macro: "/Script/BlueprintGraph.K2Node_MacroInstance",
        makeArray: "/Script/BlueprintGraph.K2Node_MakeArray",
        makeMap: "/Script/BlueprintGraph.K2Node_MakeMap",
        makeSet: "/Script/BlueprintGraph.K2Node_MakeSet",
        makeStruct: "/Script/BlueprintGraph.K2Node_MakeStruct",
        materialExpressionComponentMask: "/Script/Engine.MaterialExpressionComponentMask",
        materialExpressionConstant: "/Script/Engine.MaterialExpressionConstant",
        materialExpressionConstant2Vector: "/Script/Engine.MaterialExpressionConstant2Vector",
        materialExpressionConstant3Vector: "/Script/Engine.MaterialExpressionConstant3Vector",
        materialExpressionConstant4Vector: "/Script/Engine.MaterialExpressionConstant4Vector",
        materialExpressionFunctionInput: "/Script/Engine.MaterialExpressionFunctionInput",
        materialExpressionLogarithm: "/Script/InterchangeImport.MaterialExpressionLogarithm",
        materialExpressionLogarithm10: "/Script/Engine.MaterialExpressionLogarithm10",
        materialExpressionLogarithm2: "/Script/Engine.MaterialExpressionLogarithm2",
        materialExpressionMaterialFunctionCall: "/Script/Engine.MaterialExpressionMaterialFunctionCall",
        materialExpressionSquareRoot: "/Script/Engine.MaterialExpressionSquareRoot",
        materialExpressionSubtract: "/Script/Engine.MaterialExpressionSubtract",
        materialExpressionTextureCoordinate: "/Script/Engine.MaterialExpressionTextureCoordinate",
        materialExpressionTextureSample: "/Script/Engine.MaterialExpressionTextureSample",
        materialExpressionWorldPosition: "/Script/Engine.MaterialExpressionWorldPosition",
        materialGraphNode: "/Script/UnrealEd.MaterialGraphNode",
        materialGraphNodeComment: "/Script/UnrealEd.MaterialGraphNode_Comment",
        metasoundEditorGraphExternalNode: "/Script/MetasoundEditor.MetasoundEditorGraphExternalNode",
        multiGate: "/Script/BlueprintGraph.K2Node_MultiGate",
        niagaraBool: "/Script/Niagara.NiagaraBool",
        niagaraClipboardContent: "/Script/NiagaraEditor.NiagaraClipboardContent",
        niagaraDataInterfaceCollisionQuery: "/Script/Niagara.NiagaraDataInterfaceCollisionQuery",
        niagaraDataInterfaceCurlNoise: "/Script/Niagara.NiagaraDataInterfaceCurlNoise",
        niagaraDataInterfaceVolumeTexture: "/Script/Niagara.NiagaraDataInterfaceVolumeTexture",
        niagaraFloat: "/Script/Niagara.NiagaraFloat",
        niagaraInt32: "/Script/Niagara.NiagaraInt32",
        niagaraNodeConvert: "/Script/NiagaraEditor.NiagaraNodeConvert",
        niagaraNodeFunctionCall: "/Script/NiagaraEditor.NiagaraNodeFunctionCall",
        niagaraNodeInput: "/Script/NiagaraEditor.NiagaraNodeInput",
        niagaraNodeOp: "/Script/NiagaraEditor.NiagaraNodeOp",
        niagaraParameterMap: "/Script/Niagara.NiagaraParameterMap",
        niagaraPosition: "/Script/Niagara.NiagaraPosition",
        pawn: "/Script/Engine.Pawn",
        pcgEditorGraphNode: "/Script/PCGEditor.PCGEditorGraphNode",
        pcgEditorGraphNodeInput: "/Script/PCGEditor.PCGEditorGraphNodeInput",
        pcgEditorGraphNodeOutput: "/Script/PCGEditor.PCGEditorGraphNodeOutput",
        pcgHiGenGridSizeSettings: "/Script/PCG.PCGHiGenGridSizeSettings",
        pcgSubgraphSettings: "/Script/PCG.PCGSubgraphSettings",
        promotableOperator: "/Script/BlueprintGraph.K2Node_PromotableOperator",
        quat4f: "/Script/CoreUObject.Quat4f",
        removeDelegate: "/Script/BlueprintGraph.K2Node_RemoveDelegate",
        reverseForEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ReverseForEachLoop",
        rotator: "/Script/CoreUObject.Rotator",
        select: "/Script/BlueprintGraph.K2Node_Select",
        self: "/Script/BlueprintGraph.K2Node_Self",
        slateBlueprintLibrary: "/Script/UMG.SlateBlueprintLibrary",
        spawnActorFromClass: "/Script/BlueprintGraph.K2Node_SpawnActorFromClass",
        switchEnum: "/Script/BlueprintGraph.K2Node_SwitchEnum",
        switchGameplayTag: "/Script/GameplayTagsEditor.GameplayTagsK2Node_SwitchGameplayTag",
        switchInteger: "/Script/BlueprintGraph.K2Node_SwitchInteger",
        switchName: "/Script/BlueprintGraph.K2Node_SwitchName",
        switchString: "/Script/BlueprintGraph.K2Node_SwitchString",
        timeline: "/Script/BlueprintGraph.K2Node_Timeline",
        timeManagementBlueprintLibrary: "/Script/TimeManagement.TimeManagementBlueprintLibrary",
        transform: "/Script/CoreUObject.Transform",
        userDefinedEnum: "/Script/Engine.UserDefinedEnum",
        variableGet: "/Script/BlueprintGraph.K2Node_VariableGet",
        variableSet: "/Script/BlueprintGraph.K2Node_VariableSet",
        vector: "/Script/CoreUObject.Vector",
        vector2D: "/Script/CoreUObject.Vector2D",
        vector2f: "/Script/CoreUObject.Vector2f",
        vector3f: "/Script/CoreUObject.Vector3f",
        vector4f: "/Script/CoreUObject.Vector4f",
        whileLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:WhileLoop",
    }
    static pinInputWrapWidth = 145 // px
    static removeEventName = "ueb-element-delete"
    static scale = {
        [-12]: 0.133333,
        [-11]: 0.166666,
        [-10]: 0.2,
        [-9]: 0.233333,
        [-8]: 0.266666,
        [-7]: 0.3,
        [-6]: 0.333333,
        [-5]: 0.375,
        [-4]: 0.5,
        [-3]: 0.675,
        [-2]: 0.75,
        [-1]: 0.875,
        0: 1,
        1: 1.25,
        2: 1.375,
        3: 1.5,
        4: 1.675,
        5: 1.75,
        6: 1.875,
        7: 2,
    }
    static smoothScrollTime = 1000 // ms
    static stringEscapedCharacters = /["\\]/g // Try to remove
    static subObjectAttributeNamePrefix = "#SubObject"
    /** @param {ObjectEntity} objectEntity */
    static subObjectAttributeNameFromEntity = (objectEntity, nameOnly = false) =>
        this.subObjectAttributeNamePrefix + (!nameOnly && objectEntity.Class ? `_${objectEntity.Class.type}` : "")
        + "_" + objectEntity.Name
    /** @param {ObjectReferenceEntity} objectReferenceEntity */
    static subObjectAttributeNameFromReference = (objectReferenceEntity, nameOnly = false) =>
        this.subObjectAttributeNamePrefix + (!nameOnly ? "_" + objectReferenceEntity.type : "")
        + "_" + objectReferenceEntity.path
    static subObjectAttributeNameFromName = name => this.subObjectAttributeNamePrefix + "_" + name
    static switchTargetPattern = /\/Script\/[\w\.\/\:]+K2Node_Switch([A-Z]\w+)+/
    static trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end",
    }
    static unescapedBackslash = /(?<=(?:[^\\]|^)(?:\\\\)*)\\(?!\\)/ // Try to remove
    static windowApplyEventName = "ueb-window-apply"
    static windowApplyButtonText = "OK"
    static windowCancelEventName = "ueb-window-cancel"
    static windowCancelButtonText = "Cancel"
    static windowCloseEventName = "ueb-window-close"
    static CommonEnums = {
        [this.paths.eAttachmentRule]: [
            "KeepRelative",
            "KeepWorld",
            "SnapToTarget",
        ],
        [this.paths.eDrawDebugTrace]: ["None", "ForOneFrame", "ForDuration", "Persistent"],
        [this.paths.eMaterialSamplerType]: [
            "Color",
            "Grayscale",
            "Alpha",
            "Normal",
            "Masks",
            "Distance Field Font",
            "Linear Color",
            "Linear Grayscale",
            "Data",
            "External",
            "Virtual Color",
            "Virtual Grayscale",
            "Virtual Alpha",
            "Virtual Normal",
            "Virtual Mask",
            "Virtual Linear Color",
            "Virtual Linear Grayscal",
        ],
        [this.paths.eNiagara_Float4Channel]: [
            ["NewEnumerator0", "R"],
            ["NewEnumerator1", "G"],
            ["NewEnumerator2", "B"],
            ["NewEnumerator3", "A"],
        ],
        [this.paths.eSamplerSourceMode]: ["From texture asset", "Shared: Wrap", "Shared: Clamp", "Hidden"],
        [this.paths.eSearchCase]: ["CaseSensitive", "IgnoreCase"],
        [this.paths.eWorldPositionIncludedOffsets]: [
            "Absolute World Position (Including Material Shader Offsets)",
            "Absolute World Position (Excluding Material Shader Offsets)",
            "Camera Relative World Position (Including Material Shader Offsets)",
            "Camera Relative World Position (Excluding Material Shader Offsets)",
        ],
        [this.paths.eSearchDir]: ["FromStart", "FromEnd"],
        [this.paths.eSpawnActorCollisionHandlingMethod]: [
            ["Undefined", "Default"],
            ["AlwaysSpawn", "Always Spawn, Ignore Collisions"],
            ["AdjustIfPossibleButAlwaysSpawn", "Try To Adjust Location, But Always Spawn"],
            ["AdjustIfPossibleButDontSpawnIfColliding", "Try To Adjust Location, Don't Spawn If Still Colliding"],
            ["DontSpawnIfColliding", "Do Not Spawn"],
        ],
        [this.paths.eTextureMipValueMode]: [
            "None (use computed mip level)",
            "MipLevel (absolute, 0 is full resolution)",
            "MipBias (relative to the computed mip level)",
            "Derivative (explicit derivative to compute mip level)",
        ],
        [this.paths.eTraceTypeQuery]: [["TraceTypeQuery1", "Visibility"], ["TraceTypeQuery2", "Camera"]]
    }
    static ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta",
    ]
    static rgba = ["R", "G", "B", "A"]
    static Keys = {
        /* UE name: JS name */
        "Backspace": "Backspace",
        "Tab": "Tab",
        "LeftControl": "ControlLeft",
        "RightControl": "ControlRight",
        "LeftShift": "ShiftLeft",
        "RightShift": "ShiftRight",
        "LeftAlt": "AltLeft",
        "RightAlt": "AltRight",
        "Enter": "Enter",
        "Pause": "Pause",
        "CapsLock": "CapsLock",
        "Escape": "Escape",
        "Space": "Space",
        "PageUp": "PageUp",
        "PageDown": "PageDown",
        "End": "End",
        "Home": "Home",
        "ArrowLeft": "ArrowLeft",
        "ArrowUp": "ArrowUp",
        "ArrowRight": "ArrowRight",
        "ArrowDown": "ArrowDown",
        "PrintScreen": "PrintScreen",
        "Insert": "Insert",
        "Delete": "Delete",
        "Zero": "Digit0",
        "One": "Digit1",
        "Two": "Digit2",
        "Three": "Digit3",
        "Four": "Digit4",
        "Five": "Digit5",
        "Six": "Digit6",
        "Seven": "Digit7",
        "Eight": "Digit8",
        "Nine": "Digit9",
        "A": "KeyA",
        "B": "KeyB",
        "C": "KeyC",
        "D": "KeyD",
        "E": "KeyE",
        "F": "KeyF",
        "G": "KeyG",
        "H": "KeyH",
        "I": "KeyI",
        "K": "KeyK",
        "L": "KeyL",
        "M": "KeyM",
        "N": "KeyN",
        "O": "KeyO",
        "P": "KeyP",
        "Q": "KeyQ",
        "R": "KeyR",
        "S": "KeyS",
        "T": "KeyT",
        "U": "KeyU",
        "V": "KeyV",
        "W": "KeyW",
        "X": "KeyX",
        "Y": "KeyY",
        "Z": "KeyZ",
        "NumPadZero": "Numpad0",
        "NumPadOne": "Numpad1",
        "NumPadTwo": "Numpad2",
        "NumPadThree": "Numpad3",
        "NumPadFour": "Numpad4",
        "NumPadFive": "Numpad5",
        "NumPadSix": "Numpad6",
        "NumPadSeven": "Numpad7",
        "NumPadEight": "Numpad8",
        "NumPadNine": "Numpad9",
        "Multiply": "NumpadMultiply",
        "Add": "NumpadAdd",
        "Subtract": "NumpadSubtract",
        "Decimal": "NumpadDecimal",
        "Divide": "NumpadDivide",
        "F1": "F1",
        "F2": "F2",
        "F3": "F3",
        "F4": "F4",
        "F5": "F5",
        "F6": "F6",
        "F7": "F7",
        "F8": "F8",
        "F9": "F9",
        "F10": "F10",
        "F11": "F11",
        "F12": "F12",
        "NumLock": "NumLock",
        "ScrollLock": "ScrollLock",
    }
}
