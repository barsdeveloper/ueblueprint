import Configuration from "../../Configuration"
import Context from "../Context"
import Parsimmon from "parsimmon"

let P = Parsimmon

class KeyGrammar {

    // Creates a grammar where each alternative is the string from ModifierKey mapped to a number for bit or use
    ModifierKey = r => P.alt(...Configuration.ModifierKeys.map((v, i) => P.string(v).map(_ => 1 << i)))
    Key = r => P.alt(...Object.keys(Configuration.Keys).map(v => P.string(v))).map(v => Configuration.Keys[v])
    KeyboardShortcut = r => P.alt(
        P.seqMap(
            P.seqMap(r.ModifierKey, P.optWhitespace, P.string(Configuration.keysSeparator), (v, _, __) => v)
                .atLeast(1)
                .map(v => v.reduce((acc, cur) => acc | cur)),
            P.optWhitespace,
            r.Key,
            (modifierKeysFlag, _, key) => ({
                key: key,
                ctrlKey: Boolean(modifierKeysFlag & (1 << Configuration.ModifierKeys.indexOf("Ctrl"))),
                shiftKey: Boolean(modifierKeysFlag & (1 << Configuration.ModifierKeys.indexOf("Shift"))),
                altKey: Boolean(modifierKeysFlag & (1 << Configuration.ModifierKeys.indexOf("Alt"))),
                metaKey: Boolean(modifierKeysFlag & (1 << Configuration.ModifierKeys.indexOf("Meta")))
            })
        ),
        r.Key.map(v => ({ key: v }))
    )
        .trim(P.optWhitespace)
}

export default class KeyboardShortcut extends Context {

    static keyGrammar = P.createLanguage(new KeyGrammar())

    constructor(target, blueprint, options = {}) {
        options.wantsFocusCallback = true
        super(target, blueprint, options)

        /** @type {String[]} */
        this.key = this.options.key
        this.ctrlKey = options.ctrlKey ?? false
        this.shiftKey = options.shiftKey ?? false
        this.altKey = options.altKey ?? false
        this.metaKey = options.metaKey ?? false

        let self = this
        this.keyDownHandler = e => {
            if (
                e.code == self.key
                && e.ctrlKey === self.ctrlKey
                && e.shiftKey === self.shiftKey
                && e.altKey === self.altKey
                && e.metaKey === self.metaKey
            ) {
                self.fire()
                e.preventDefault()
                return true
            }
            return false
        }
    }

    /**
     * 
     * @param {String} keyString
     * @returns {Object}
     */
    static keyOptionsParse(options, keyString) {
        options = {
            ...options,
            ...KeyboardShortcut.keyGrammar.KeyboardShortcut.parse(keyString).value
        }
        return options
    }

    blueprintFocused() {
        document.addEventListener("keydown", this.keyDownHandler)
    }

    blueprintUnfocused() {
        document.removeEventListener("keydown", this.keyDownHandler)
    }

    fire() {
    }
}
