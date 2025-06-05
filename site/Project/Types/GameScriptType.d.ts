import { EventManagerType } from "./EventManager"
import FrameType from "./FrameType"
import { NodeManagerType } from "./NodeManager"
import { NodeType } from "./NodeType"
import SpriteAnimatorType from "./SpriteAnimator"

export interface GameScriptType {
    scriptName: string

    nodeManager: NodeManagerType

    constructor( nodeId: string, scriptName: string ) : GameScriptType

    getEvents: EventManagerType['getAllEvents']

    getNodeById( id: string ) : NodeType


    SpriteAnimator: new ( frames:FrameType[] ) => SpriteAnimatorType
    /// Static

    // Create ( callback:() => void ) : Record<'script', unknown> | void
}