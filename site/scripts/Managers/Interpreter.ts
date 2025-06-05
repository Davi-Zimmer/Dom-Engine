import Attribute from "../Components/Attribute.js"
import Node from "../Components/Node.js"
import Get from "../Main/Utils/Get.js"
import { explorerHTMLPath } from "../Main/Utils/Routes.js"
import NodeManager from "./NodeManager.js"

interface SimpleObject {
    tag:string,
    atributes:string
    children: SimpleObject[]
}

class Interpreter {
        
    private static parseAttributes( attrStr: string ){
        
        const attr = new Attribute({})
        
        const attrRejex = /(!?)(\w+)(=(["'])(.*?)\4)?/g

        let match

        while ( match = attrRejex.exec( attrStr ) ) {

            const isNegaded = match[1] === '!'

            let attributeName = match[2] as keyof Attribute

            if( match[5] !== undefined ) {

                const number = Number( match[5] )

                let content:string | number = match[5]

                if( !isNaN( number ) ) content = number

                attr.bind( attributeName, content )
            }
            else attr.bind( attributeName, !isNegaded )

        }

        return attr
    }

    private static createNode( tag:string, atributes:string='', children: []=[]  ):SimpleObject{
        return {
            tag,
            atributes ,
            children
        }
    }

    public static parseTagToObject( input:string ) {
        const tagRegex = /<!--([\s\S]*?)-->|<(\w+)([^>]*)\/?>|<\/(\w+)>/g
        let stack = []

        let root = this.createNode('Root')
        
        let current = root

        let match

        while( (match = tagRegex.exec( input )) ){
            
            const [ full, commentContent, openTag, attrStr, closeTag ] = match

            if ( commentContent !== undefined ) continue

            else if( openTag ) {
           
                const node = this.createNode(
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

    public static loadJson = async () => {
        const input = await Get( explorerHTMLPath )

        const tree = this.parseTagToObject( input )

        return tree
    }
    
    public static parseJsonToNodes( current: SimpleObject, parentNode:Node ) {

        const  { tag, atributes, children } = current

        const attr = this.parseAttributes( atributes )

        const node = new Node({
            tag,
            parentNode,
            attributes: attr,
        })

        NodeManager.addNode( node )

        node.setChildren( 
            children.map( child => this.parseJsonToNodes( child, node ))
        )

        return node

    }

    public static convertHTML = async () => {

        const obj = await this.loadJson()

        const tree = this.parseJsonToNodes( obj, null! )

        return tree
    }

}


export default Interpreter