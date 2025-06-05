import { DrawingType } from "./DrawindType"
import GameSourcesType from "./GameSources"
import { NodeType } from "./NodeType"
import { OnFunctions } from "./OnFunctions"
import { RectType, RectTypeInterface } from "./RectType"
import { SourceType } from "./SourceType"

export interface PropTypeInterface extends RectTypeInterface {
    node: Node
}

export interface PropType extends RectType {

    events: Record< string, OnFunctions >
    collisionMask: RectType
    renderMask   : RectType

    constructor({ node, x, y, w, h } : PropTypeInterface ) : PropType

    updatePosition ({ x, y, w, h, z }: RectTypeInterface ) : void

    getEvent( eventName: string ) : Record< string, OnFunctions >

    getSources () : GameSourcesType

    addSource( data: SourceType ) : void
    
    getNode() : NodeType

    createEvent( eventName:string ) : void

    on( eventName: string, callback: OnFunctions ) : void

    trigger( eventName: string, data: unknown ) : void 

    update ( { canvas, ctx } : DrawingType ) : void

    moveProp ( target: { x: number, y: number }, velocity: number, minDistance: number ) : void

}