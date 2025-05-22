import Node from "../../Components/Node"
import Get from "./Get"

async function executeNodesScripts( Nodes: Node[] ){

    for( let node of Nodes ){

        const scritpPath = node.attributes?.script
        
        if( !scritpPath ) continue

        const code = await Get( scritpPath )

        const blob = new Blob([code], { type: 'application/javascript' })
        const url = URL.createObjectURL(blob)
        const mod = await import(url)

        if (typeof mod.default === 'function') {
            mod.default(node , scritpPath )  // <<< Passa o caminho também
        }

        URL.revokeObjectURL(url)
    }
}


export default executeNodesScripts