import Attribute from "../Components/Attribute.js"
import Node from "../Components/Node.js"

class _NodeManager {
  
    private static Instance: _NodeManager

    private constructor() {}
    
    public static GetInstance(){
        if( !this.Instance ) this.Instance = new _NodeManager()
            return this.Instance
    }
    
    private nodes: Node[] = []

    private scenesIds: string[] = []

    public addNode ( node: Node ){
        this.nodes.push( node )
    }

    public registerSceneID = ( id: string ) => this.scenesIds.push( id )
    
    public getScenesIDs = () => this.scenesIds
    
    public getSceneObjectById = ( id: string ) => this.nodes.find( node => node.getAttributes()?.id === id )
    
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

const NodeManager = _NodeManager.GetInstance()

export default NodeManager