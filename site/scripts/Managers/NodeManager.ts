import Attribute from "../Components/Attribute.js"
import Node from "../Components/Node.js"
import Get from "../Main/Utils/Get.js"
import { explorerHTMLPath } from "../Main/Utils/Routes.js"
import Prop from "../Props/Prop.js"

class _NodeManager {

    private static Instance: _NodeManager

    private nodes: Node[] = []

    private constructor() {}

    public static getInstance(){
        if( !this.Instance ) this.Instance = new _NodeManager()
        return this.Instance
    }

    public getNodes(){ return this.nodes }
        
    private parseAttributes( attrStr: string ){
        
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

    public parseNodes( input:string ) {
        const tagRegex = /<!--([\s\S]*?)-->|<(\w+)([^>]*)\/?>|<\/(\w+)>/g
        let stack = []

        let root = new Node({ tag: 'Root', parentNode: null! })
        
        let current = root

        let match

        while( (match = tagRegex.exec( input )) ){
            
            const [ full, commentContent, openTag, attrStr, closeTag ] = match

            if ( commentContent !== undefined ) continue

            else if( openTag ) {
                let attributes = this.parseAttributes( attrStr )

                if( current == root ){
                   
                    document.title = attributes.getPossibleAttribute('title') as string || document.title
                    
                    delete attributes.title

                }

                const node = new Node({
                    tag: openTag,
                    parentNode: current,
                    attributes
                })

                Node.Manager( node )

                if( !node.getAttributes()?.noProp ){ node.setPropInstance( new Prop({ node } ) ) }

                this.nodes.push( node )

                current.appendChild( node )
                
                if( !full.endsWith("/>") ){

                    stack.push( current )

                    current = node
                    
                }

            } 

            else if( closeTag ) {

                if( current.getTag() !== closeTag )
                    throw new Error(`Mismatched closing tag: expected </${current.getTag()}> but found </${closeTag}>`)
                
                current = stack.pop()!

            }

        }

        return root.getChildNodes()

    }
    
    public async loadNodes() {
        const input = await Get( explorerHTMLPath )

        this.nodes = []

        const tree = this.parseNodes( input )

        return tree
    }

    public getAllNodesByAttribute( attr: string, value: number|string ){
        return this.nodes.filter( n => n.getAttributes()?.[attr as keyof Attribute] === value )
    }

    public getNodeByAttribute( attr: string, value: number|string ){
        return this.nodes.find( n => n.getAttributes()?.[attr as keyof Attribute] === value )
    }

    public getNodeById( id: string ){
        return this.getNodeByAttribute('id', id )
    }

    public getNodeByTag ( tag: string ){
        return this.nodes.filter( n => n.getTag() === tag ) 
    }

    public getAllNodesByclass( className: string ){
        return this.getNodeByAttribute( 'class', className )
    }

}

const NodeManager = _NodeManager.getInstance()

export default NodeManager