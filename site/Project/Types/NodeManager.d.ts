import { NodeType } from "./NodeType"
import { PropType } from "./PropType"

export interface NodeManagerType {
    
    loadNodes () : NodeType[]

    getAllNodesByAttribute  ( attr: string, value: number|string ) : NodeType[]

    getNodeByAttribute ( attr: string, value: number|string ) : NodeType | undefined

    getNodeById ( id: string ) : NodeType | undefined

    getNodeByTag ( tag: string ) : NodeType[]

    getAllNodesByclass ( className: string ) : NodeType[]

    getNodes () : NodeType

    getPropByNodeId( id: string ): PropType | undefined
}