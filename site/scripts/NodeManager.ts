import Attribute from "./Components/Attribute.js"
import Node from "./Components/Node.js"
import Get from "./Main/Utils/Get.js"

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
        
        const attrRejex = /(\w+)=["']([^"']+)["']/g

        let match

        while ( match = attrRejex.exec( attrStr ) ) {

            let attributeName = match[1] as keyof Attribute

            attr.bind( attributeName, match[2] )

        }

        return attr
    }

    public parseNodes( input:string ) {
        const tagRegex = /<!--([\s\S]*?)-->|<(\w+)([^>]*)\/?>|<\/(\w+)>/g
        let stack = []

        let root = new Node({ tag: 'root' })
        
        let current = root

        let match

        while( (match = tagRegex.exec( input )) ){
            
            const [ full, commentContent, openTag, attrStr, closeTag ] = match

            if ( commentContent !== undefined ) continue
            else if( openTag ) {

                const node = new Node({
                    tag: openTag,
                    attributes: this.parseAttributes( attrStr )
                })

                this.nodes.push( node )

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

        return root.children

    }
    
    public async loadNodes() {
        const input = await Get( 'Game/Explorer.html' )

        this.nodes = []

        const tree = this.parseNodes( input )

        return tree
    }

    public getNodesByAttribute( attr: string, value: number|string ){
        return this.nodes.filter( n => n.attributes?.[attr as keyof Attribute] === value )
    }

    public getNodeByAttribute( attr: string, value: number|string ){
        return this.nodes.find( n => n.attributes?.[attr as keyof Attribute] === value )
    }

   public getNodeById( id: string ){
        return this.getNodeByAttribute('id', id )
    }

    public getNodeByClass ( tag: string ){
        return this.nodes.filter( n => n.tag === tag ) 
    }

    public getNodesByclass( className: string ){
        return this.getNodeByAttribute('class', className)
    }

}

const NodeManager = _NodeManager.getInstance()

export default NodeManager

/*
const keyFuncs: Record<string, () => void > = {
    q:  async () => console.log( await LoadHtml() ),
    e:  () => executeNodesScripts( Nodes ),
    a:  async () => console.log( JSON.stringify( await LoadHtml(), null, 2 ) )
}

document.addEventListener('keydown', e => {
    if( !e.ctrlKey ) return

    const key = e.key.toLowerCase()

    const func = keyFuncs[ key ]

    if( func ){

        e.preventDefault()

        func()
    }
    
})


*/