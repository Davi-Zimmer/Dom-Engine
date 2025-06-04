import { NodeType } from "./NodeType"

export interface NodeManagerType {

    private constructor() : NodeManagerType
    
    loadNodes () : NodeType[]

    getAllNodesByAttribute  ( attr: string, value: number|string ) : NodeType[]

    getNodeByAttribute ( attr: string, value: number|string ) : NodeType | undefined

    getNodeById ( id: string ) : NodeType | undefined

    getNodeByTag ( tag: string ) : NodeType[]

    getAllNodesByclass ( className: string ) : NodeType[]

    getNodes () : NodeType
}