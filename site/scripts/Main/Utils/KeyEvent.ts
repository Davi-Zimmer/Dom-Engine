export interface KeyEventInterface {
    key       : string
    actived   : boolean
    canceled  : boolean
    ctrlKey   : boolean
    shiftKey  : boolean
    altKey    : boolean
}

class KeyEvent {

    public key       : string
    public actived   : boolean
    public ctrlKey   : boolean
    public shiftKey  : boolean
    public altKey    : boolean

    constructor({ key, actived, canceled, ctrlKey, shiftKey, altKey }: KeyEventInterface ){
        this.key      = key
        this.actived  = actived
        this.ctrlKey  = ctrlKey
        this.shiftKey = shiftKey
        this.altKey   = altKey
    }

}

export default KeyEvent
