import { css } from "lit"

/**
 * @typedef {import("./element/PinElement").default} PinElement
 * @typedef {import("lit").CSSResult} CSSResult
 */

export default class Configuration {
    static #pinColor = {
        "/Script/CoreUObject.LinearColor": css`3, 76, 168`,
        "/Script/CoreUObject.Rotator": css`152, 171, 241`,
        "/Script/CoreUObject.Transform": css`241, 110, 1`,
        "/Script/CoreUObject.Vector": css`215, 202, 11`,
        "/Script/Engine.Actor": css`0, 168, 242`,
        "/Script/Engine.GameStateBase": css`0, 168, 242`,
        "/Script/Engine.Pawn": css`0, 168, 242`,
        "/Script/Engine.PlayerState": css`0, 168, 242`,
        "bool": css`117, 0, 0`,
        "byte": css`0, 110, 98`,
        "class": css`88, 0, 186`,
        "default": css`167, 167, 167`,
        "exec": css`240, 240, 240`,
        "int": css`32, 224, 173`,
        "name": css`203, 129, 252`,
        "real": css`50, 187, 0`,
        "string": css`213, 0, 176`,
        "wildcard": css`128, 120, 120`,
    }
    static alphaPattern = "repeating-conic-gradient(#7c8184 0% 25%, #c2c3c4 0% 50%) 50% / 10px 10px"
    static colorDragEventName = "ueb-color-drag"
    static colorPickEventName = "ueb-color-pick"
    static colorWindowEventName = "ueb-color-window"
    static defaultCommentHeight = 96
    static defaultCommentWidth = 400
    static deleteNodesKeyboardKey = "Delete"
    static dragGeneralEventName = "ueb-drag-general"
    static dragEventName = "ueb-drag"
    static editTextEventName = {
        begin: "ueb-edit-text-begin",
        end: "ueb-edit-text-end",
    }
    static enableZoomIn = ["LeftControl", "RightControl"] // Button to enable more than 0 (1:1) zoom
    static expandGridSize = 400
    static focusEventName = {
        begin: "blueprint-focus",
        end: "blueprint-unfocus",
    }
    static fontSize = css`12.5px`

    /**
     * @param {PinElement} pin
     * @return {CSSResult}
     */
    static getPinColor(pin) {
        if (!pin) {
            return Configuration.#pinColor["default"]
        }
        if (Configuration.#pinColor[pin.pinType]) {
            return Configuration.#pinColor[pin.pinType]
        }
        if (pin.entity.PinType.PinCategory == "struct" || pin.entity.PinType.PinCategory == "object") {
            switch (pin.entity.PinType.PinSubCategoryObject.type) {
                case "ScriptStruct":
                    return css`0, 88, 200`
                default:
                    if (pin.entity.PinType.PinSubCategoryObject.getName().endsWith("Actor")) {
                        return Configuration.#pinColor["/Script/Engine.Actor"]
                    }
            }
        }
        return Configuration.#pinColor["default"]
    }
    static gridAxisLineColor = css`black`
    static gridExpandThreshold = 0.25 // remaining size factor threshold to cause an expansion event
    static gridLineColor = css`#353535`
    static gridLineWidth = 1 // pixel
    static gridSet = 8
    static gridSetLineColor = css`#161616`
    static gridShrinkThreshold = 4 // exceding size factor threshold to cause a shrink event
    static gridSize = 16 // pixel
    static hexColorRegex = /^\s*#(?<r>[0-9a-fA-F]{2})(?<g>[0-9a-fA-F]{2})(?<b>[0-9a-fA-F]{2})([0-9a-fA-F]{2})?|#(?<rs>[0-9a-fA-F])(?<gs>[0-9a-fA-F])(?<bs>[0-9a-fA-F])\s*$/
    static keysSeparator = "+"
    static linkCurveHeight = 15 // pixel
    static linkCurveWidth = 80 // pixel
    static linkMinWidth = 100 // pixel
    /**
     * @param {Number} start
     * @param {Number} c1
     * @param {Number} c2
     */
    static linkRightSVGPath = (start, c1, c2) => {
        let end = 100 - start
        return `M ${start} 0 C ${c1} 0, ${c2} 0, 50 50 S ${end - c1 + start} 100, ${end} 100`
    }
    static maxZoom = 7
    static minZoom = -12
    static mouseWheelFactor = 0.2
    static nodeDeleteEventName = "ueb-node-delete"
    static nodeDragGeneralEventName = "ueb-node-drag-general"
    static nodeDragEventName = "ueb-node-drag"
    static nodeName = (name, counter) => `${name}_${counter}`
    static nodeRadius = 8 // in pixel
    static nodeReflowEventName = "ueb-node-reflow"
    static nodeType = {
        callFunction: "/Script/BlueprintGraph.K2Node_CallFunction",
        comment: "/Script/UnrealEd.EdGraphNode_Comment",
        doN: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:Do N",
        dynamicCast: "/Script/BlueprintGraph.K2Node_DynamicCast",
        executionSequence: "/Script/BlueprintGraph.K2Node_ExecutionSequence",
        forEachElementInEnum: "/Script/BlueprintGraph.K2Node_ForEachElementInEnum",
        forEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoop",
        forEachLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForEachLoopWithBreak",
        forLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoop",
        forLoopWithBreak: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ForLoopWithBreak",
        ifThenElse: "/Script/BlueprintGraph.K2Node_IfThenElse",
        knot: "/Script/BlueprintGraph.K2Node_Knot",
        macro: "/Script/BlueprintGraph.K2Node_MacroInstance",
        makeArray: "/Script/BlueprintGraph.K2Node_MakeArray",
        makeMap: "/Script/BlueprintGraph.K2Node_MakeMap",
        pawn: "/Script/Engine.Pawn",
        reverseForEachLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:ReverseForEachLoop",
        select: "/Script/BlueprintGraph.K2Node_Select",
        variableGet: "/Script/BlueprintGraph.K2Node_VariableGet",
        variableSet: "/Script/BlueprintGraph.K2Node_VariableSet",
        whileLoop: "/Engine/EditorBlueprintResources/StandardMacros.StandardMacros:WhileLoop",
    }
    static selectAllKeyboardKey = "(bCtrl=True,Key=A)"
    static distanceThreshold = 5 // in pixel
    static trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end",
    }
    static windowApplyEventName = "ueb-window-apply"
    static windowCancelEventName = "ueb-window-cancel"
    static windowCloseEventName = "ueb-window-close"
    static ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta",
    ]
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
        "ArrowLeft": "Left",
        "ArrowUp": "Up",
        "ArrowRight": "Right",
        "ArrowDown": "Down",
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
