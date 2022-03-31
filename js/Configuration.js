// @ts-check

export default class Configuration {
    deleteNodesKeyboardKey = "Delete"
    enableZoomIn = ["LeftControl", "RightControl"] // Button to enable more than 0 (1:1) zoom
    expandGridSize = 400
    fontSize = "12px"
    gridAxisLineColor = "black"
    gridExpandThreshold = 0.25 // remaining size factor threshold to cause an expansion event
    gridShrinkThreshold = 4 // exceding size factor threshold to cause a shrink event 
    gridLineColor = "#353535"
    gridLineWidth = 1 // pixel
    gridSet = 8
    gridSetLineColor = "#161616"
    gridSize = 16 // pixel
    keysSeparator = "+"
    linkCurveHeight = 15 // pixel
    linkCurveWidth = 80 // pixel
    linkMinWidth = 100 // pixel
    /**
     * @param {Number} start
     * @param {Number} c1
     * @param {Number} c2
     */
    linkRightSVGPath = (start, c1, c2) => {
        let end = 100 - start
        return `M ${start} 0 C ${c1} 0, ${c2} 0, 50 50 S ${end - c1 + start} 100, ${end} 100`
    }
    maxZoom = 7
    minZoom = -12
    nodeDeleteEventName = "ueb-node-delete"
    nodeDragEventName = "ueb-node-drag"
    nodeDragLocalEventName = "ueb-node-drag-local"
    nodeRadius = 8 // in pixel
    selectAllKeyboardKey = "(bCtrl=True,Key=A)"
    trackingMouseEventName = {
        begin: "ueb-tracking-mouse-begin",
        end: "ueb-tracking-mouse-end"
    }
    ModifierKeys = [
        "Ctrl",
        "Shift",
        "Alt",
        "Meta"
    ]
    Keys = {
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
