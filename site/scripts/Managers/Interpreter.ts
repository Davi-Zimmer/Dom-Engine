import Attribute from "../Components/Attribute.js"
import Node from "../Components/Node.js"
import AttributeInterface from "../Interfaces/AttributeInterface.js"
import Get from "../Main/Utils/Get.js"
import { explorerHTMLPath } from "../Main/Utils/Routes.js"
import NodeManager from "./NodeManager.js"


interface SimpleObject {
    tag:string,
    attributes: AttributeInterface
    children: SimpleObject[]
}

class Interpreter {
        
    private static CreateNode( tag:string, attr:string='', children: []=[]  ):SimpleObject{
        const attributes = Attribute.parseAttributes( attr )
        
        return {
            tag,
            attributes,
            children,
        }
    }

    public static ParseTagToObject( input:string ) {
        const tagRegex = /<!--([\s\S]*?)-->|<(\w+)([^>]*)\/?>|<\/(\w+)>/g
        let stack = []

        let root = this.CreateNode('Root')
        
        let current = root

        let match

        while( (match = tagRegex.exec( input )) ){
            
            const [ full, commentContent, openTag, attrStr, closeTag ] = match

            if ( commentContent !== undefined ) continue

            else if( openTag ) {
           
                const node = this.CreateNode(
                    openTag,
                    attrStr,
                )

                current.children.push( node )
                
                if( !full.endsWith("/>") ){

                    stack.push( current )

                    current = node
                    
                }

            } 

            else if( closeTag ) {

                if( current.tag !== closeTag )
                    throw new Error(`Mismatched closing tag: expected </${current.tag}> but found </${closeTag}>`)
                
                current = stack.pop()!

            }

        }

        return root

    }

    public static LoadJson = async ( path: string ) => {
        const input = await Get( path )

        const tree = this.ParseTagToObject( input )

        return tree
    }

    public static NodeTreatment( node: Node ){
        
        NodeManager.addNode( node )

        const parentNode = node.getParentNode()
        const attributes = node.getAttributes()

        if( parentNode?.getTag().toLowerCase() === 'root' ){
            document.title = document.title = node.getPossibleAttribute('title') as string || document.title
        }

        const nodeTag = node.getTag().toLowerCase() 

        if( nodeTag === 'scene' ) NodeManager.registerSceneID( attributes?.id! )

    }
    
    public static async ParseJsonToNodes( current: SimpleObject, parentNode:Node ) {

        let  { tag, attributes , children } = current
        const attrs = new Attribute( attributes )

        console.log( children )

        if( attrs.href !== undefined ){

            let path = attrs.href

            if( attrs.href[0] === '.' ){
                const splitedPath = attrs.href.split('')
                splitedPath.shift()
                path = splitedPath.join('')
            }
            const serverPath = 'Project' + path 

            attrs.href = serverPath

            const html = await this.LoadJson( serverPath )
            
            children = html.children

        }

        const node = new Node({
            tag,
            parentNode,
            attributes: attrs
        })

        this.NodeTreatment( node )
    
        const childresNodes:Node[] = []

        for(const child of children) childresNodes.push( await this.ParseJsonToNodes( child, node ) )
    
        node.setChildren( childresNodes )

        return node

    }

    public static ConvertHTML = async () => {

        const obj = await this.LoadJson( explorerHTMLPath )

        const tree = this.ParseJsonToNodes( obj, null! )

        this.a( obj )

        return tree
    }

    public static RemoveUndefinedAttributes( object: Object ){
        const result: any = {}
        
        Object.keys( object ).forEach( key => {
            const value = (object as any)[key]

            if( value !== undefined ){
                result[key] = value
            }
        })

        return result 
    }

    public static ObjectToJson( object: Object ){
        return JSON.stringify( object, ( key, value ) => value === undefined ? undefined : value  )
    }

    public static Export( tree: Node ){

    }

    public static ExtractScenesNode( node: SimpleObject ): SimpleObject | undefined {
        const isScenes = ( { tag }: SimpleObject ) => tag.toLowerCase() === 'scenes'

        for( const child of node.children ) { 

            if( isScenes( child ) ) {
                return child
            }

        }

        return undefined
    }

    private static a( obj: SimpleObject ){

        const nodeContainer = obj.children[0]

        const scenes = this.ExtractScenesNode( nodeContainer )
        
        if( !scenes ) return // fazer outro tratamento se não existir nenhuma cena

    }

    private static CreateJsonFiles( rootNode: SimpleObject ){
        const scenesIds = NodeManager.getScenesIDs()

        const nodes = NodeManager.getNodes()
       
    }
}


export default Interpreter