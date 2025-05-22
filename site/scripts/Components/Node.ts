import NodeInterface from "../Interfaces/NodeInterface.js"
import Attribute from "./Attribute.js"

class Node {

    public tag         : string
    public attributes ?: Attribute
    public children    : Node[]

    constructor( { tag, attributes, children } : NodeInterface ){

        this.tag        = tag
        this.attributes = attributes
        this.children   = children || []

    }

    getChilds() { return this.children }

    appendChild( node: Node ){ this.children.push( node ) }

    removeChild( node: Node ){ 
        this.children = this.children.filter( n => n !== node ) 
    }


}

export default Node