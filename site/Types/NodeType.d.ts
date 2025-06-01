import { AttributeType } from "./AttributeType"
import { PropType } from "./PropType"

export interface NodeTypeInterface {
    tag          :  string,
    attributes   ?: AttributeType,
    children     ?: NodeType[],
    propInstance ?: PropType,
    parentNode   : NodeType
}

export interface NodeType {

    constructor( { tag, attributes, children, propInstance, parentNode } : NodeTypeInterface ) : NodeType

    bindAttributes(): void

    setAttributes( attr: AttributeType ) : void

    getTag(): string

    getAttributes(): AttributeType

    setAttributes( attr: AttributeType ): void

    getChildNodes() : NodeType[]

    setPropInstance( propInstance: PropType ) : void

    getPropInstance(): PropType

    getAllChilds(): NodeType[]

    appendChild( node: NodeType ): void

    removeChild( node: NodeType ):void

    getChild( node: NodeType ) : NodeType

    overrideChilds( nodes: NodeType[] ) : void
}