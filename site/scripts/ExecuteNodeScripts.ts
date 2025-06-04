import Node from "./Components/Node.js"
import GameScript from "./Main/Utils/GameScripts.js"
import { projectRoute } from "./Main/Utils/Routes.js"

async function executeNodesScripts( Nodes: Node[] ){

    for( let node of Nodes ){

        const scriptPath = node.getAttributes()?.script?.replace('./', '/')

        if( !scriptPath ) continue

        const url = window.location.href + projectRoute + scriptPath

        const module = await import ( url )

        const script = new GameScript( node, scriptPath )

        const data = { script, node, prop: node.getPropInstance() }

        if ( typeof module.default === 'function' ) {
            module.default( data )
        } else if ( typeof module.Script === 'function' ) {
            module.Script( data )
        }
    }
    
}


export default executeNodesScripts