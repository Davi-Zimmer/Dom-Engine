import { EventManagerType } from "./EventManager"
import { NodeType } from "./NodeType"

export interface ScriptType {
    scriptName: string
    constructor( nodeId: string, scriptName: string ) : ScriptType

    getEvents: EventManagerType['getAllEvents']

    getNodeById( id: string ) : NodeType

    /// Static
    static Create( id:string, scriptName:string, callback:( gameScript:ScriptType, node:NodeType ) => void ) : void

}