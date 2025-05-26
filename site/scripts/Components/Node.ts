import NodeInterface from "../Interfaces/NodeInterface.js"
import Prop from "../Props/Prop.js"
import Attribute from "./Attribute.js"

class Node {

    private tag            : string
    private attributes    ?: Attribute
    private children      : Node[]
    private propInstance  : Prop | null

    constructor( { tag, attributes, children, propInstance } : NodeInterface ){

        this.tag          = tag
        this.attributes   = attributes
        this.children     = children || []
        this.propInstance = propInstance || null

    }

    bindAttributes(){
        const getAttr = this.attributes?.getPossibleAttribute.bind( this.attributes )

        if( !getAttr || !this.propInstance ) return

        const obj = {
            x: getAttr('x'),
            y: getAttr('y'),
            w: getAttr('w'),
            h: getAttr('h'),
            z: getAttr('z')
        }

        this.propInstance.updatePosition( obj )
    }

    getTag(){ return this.tag }

    getAttributes(){ return this.attributes }

    setAttributes( attr: Attribute ){ this.attributes = attr }

    getChildNodes(){ return this.children }

    setPropInstance( propInstance: Prop ){ this.propInstance = propInstance }

    getPropInstance(){ return this.propInstance }

    getAllChilds() { return this.children }

    appendChild( node: Node ){ this.children.push( node ) }

    removeChild( node: Node ){ this.children = this.children.filter( n => n !== node ) }

    getChild( node: Node ){ return this.children.find( n => n === node) }

    overrideChilds( nodes: Node[] ) { this.children = nodes }

}

export default Node