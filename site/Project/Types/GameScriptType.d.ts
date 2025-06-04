import { EventManagerType } from "./EventManager"
import { NodeType } from "./NodeType"

export interface GameScriptType {
    scriptName: string

    nodeManager: NodeManager

    constructor( nodeId: string, scriptName: string ) : GameScriptType

    getEvents: EventManagerType['getAllEvents']

    getNodeById( id: string ) : NodeType

    /// Static

    // Create ( callback:() => void ) : Record<'script', unknown> | void
}