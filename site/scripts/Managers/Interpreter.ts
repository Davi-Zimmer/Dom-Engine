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

    public static LoadJson = async () => {
        const input = await Get( explorerHTMLPath )

        const tree = this.ParseTagToObject( input )

        return tree
    }

    public static NodeTreatment( node: Node ){
        
        NodeManager.addNode( node )

        const parentNode = node.getParentNode()
        const attributes = node.getAttributes()

        if( parentNode?.getTag().toLowerCase() === 'root' ){
            document.title = document.title = attributes?.getPossibleAttribute('title') as string || document.title
        }

        if( node.getTag().toLowerCase() === 'scene') NodeManager.registerSceneID( attributes?.id! )
    }
    
    public static ParseJsonToNodes( current: SimpleObject, parentNode:Node ) {

        const  { tag, attributes , children } = current
        const attrs = new Attribute( attributes )

        const node = new Node({
            tag,
            parentNode,
            attributes: attrs
        })

        this.NodeTreatment( node )
    
        node.setChildren( 
            children.map( child => this.ParseJsonToNodes( child, node ))
        )

        return node

    }

    public static ConvertHTML = async () => {

        const obj = await this.LoadJson()

        const tree = this.ParseJsonToNodes( obj, null! )

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
}


export default Interpreter