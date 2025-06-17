import { KeyFunc } from "../Types/AllTypes"

interface KeyHandlersInterface {
    onPress : Set< KeyFunc >
    onDown  : Set< KeyFunc >
    onUp    : Set< KeyFunc >
    pressed : boolean
}

export default KeyHandlersInterface