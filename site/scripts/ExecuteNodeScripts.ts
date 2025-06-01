import Node from "./Components/Node.js"

async function executeNodesScripts( Nodes: Node[] ){

    for( let node of Nodes ){

        const scriptPath = node.getAttributes()?.script

        if( !scriptPath ) continue

        const a = window.location.href + 'Game/'
        const module = await import ( a+scriptPath )

        if ( typeof module.default === 'function' ) {
            module.default( node )
        } else if ( typeof module.Script === 'function' ) {
            module.Script( node )
        }
    }
    
}


export default executeNodesScripts