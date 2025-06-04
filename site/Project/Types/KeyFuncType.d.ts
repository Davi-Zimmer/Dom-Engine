export interface KeyEventTypeInterface {
    key       : string
    actived   : boolean
    canceled  : boolean
    ctrlKey   : boolean
    shiftKey  : boolean
    altKey    : boolean
}

export interface KeyEventType {

    key      : string
    actived  : boolean
    ctrlKey  : boolean
    shiftKey : boolean
    altKey   : boolean

    constructor({ key, actived, ctrlKey, shiftKey, altKey }: KeyEventTypeInterface ): KeyEventType

}

export type KeyFuncType = ( e: KeyEventType ) => void