import Attribute from "../Components/Attribute.js"
import Node from "../Components/Node.js"
import Interpreter from "./Interpreter.js"

class _NodeManager {
  
    private static Instance: _NodeManager

    private constructor() {}
    
    public static GetInstance(){
        if( !this.Instance ) this.Instance = new _NodeManager()
            return this.Instance
    }
    
    private nodes: Node[] = []

    private scenesIds: string[] = []

    private mainScene: Node | null = null


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

    public setMainScene = ( scene : Node ) => this.mainScene = scene
    
    public getMainScene = () => this.mainScene
    
    public nodesLoaded = ( node: Node ) => {
        
        for( const scene of this.nodes ){
            const tag = scene.getTag().toLowerCase()

            if( !(tag === 'scene' || scene.getPossibleAttribute('href')) ) continue
            
            const root = NodeManager.getNodeByTag('Root')[0]

            const childRootId = root.getPossibleAttribute('childRootId') as string

            const gamechildRoot = NodeManager.getNodeById( childRootId )

            if( !gamechildRoot ) throw new Error(`Não existe nenhum filho da raiz com o id "${childRootId}"`)

            let initialSceneId = gamechildRoot.getPossibleAttribute('initialSceneId') as string

            const sceneId = scene.getAttributes()?.id as string

            if( !initialSceneId ){
                gamechildRoot.getAttributes()?.addAttirute( 'initialSceneId', sceneId )
                initialSceneId = sceneId
            }

            const scene2 = NodeManager.getNodeById( initialSceneId )

            if( !scene2 ) throw new Error(`A cena com o id ${initialSceneId} não existe`)

            NodeManager.setMainScene( scene2 )

            console.log( scene2 )
        }

    }

}

const NodeManager = _NodeManager.GetInstance()

export default NodeManager