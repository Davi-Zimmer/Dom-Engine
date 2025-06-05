import Attribute from "../Components/Attribute.js"
import Node from "../Components/Node.js"

class _NodeManager {
  
    private static Instance: _NodeManager

    private constructor() {}

    public static getInstance(){
        if( !this.Instance ) this.Instance = new _NodeManager()
        return this.Instance
    }

    private nodes: Node[] = []

    public addNode ( node: Node ){
        this.nodes.push( node )
    }

    public getNodes = () => this.nodes

    public getPropByNodeId = ( id: string ) => this.getNodeById( id )?.getPropInstance() 

    public getAllNodesByAttribute = ( attr: string, value: number|string ) => {
        return this.nodes.filter( n => n.getAttributes()?.[attr as keyof Attribute] === value )
    }

    public getNodeByAttribute = ( attr: string, value: number|string ) => {
        return this.nodes.find( n => n.getAttributes()?.[attr as keyof Attribute] === value )
    }

    public getNodeById = ( id: string ) => {
        return this.getNodeByAttribute('id', id )
    }

    public getNodeByTag = ( tag: string ) => {

        return this.nodes.filter( n => n.getTag() === tag ) 
    }

    public getAllNodesByclass = ( className: string ) => {
        return this.getNodeByAttribute( 'class', className )
    }
}

const NodeManager = _NodeManager.getInstance()

export default NodeManager