import KeyEventInterface from "../Interfaces/KeyEventInterface"

class KeyEvent {

    public key       : string
    public actived   : boolean
    public ctrlKey   : boolean
    public shiftKey  : boolean
    public altKey    : boolean

    constructor({ key, actived, ctrlKey, shiftKey, altKey }: KeyEventInterface ){
        this.key      = key
        this.actived  = actived
        this.ctrlKey  = ctrlKey
        this.shiftKey = shiftKey
        this.altKey   = altKey
    }

}

export default KeyEvent
