import Node from "../../Components/Node.js"
import GameScriptResult from "../../Interfaces/GameScriptResultInterface.js"
import GameScript from "./GameScripts.js"
import Get from "./Get.js"

async function executeNodesScripts( Nodes: Node[] ){

    const bridge: Record< string, unknown > = {}

    for( let node of Nodes ){

        const scriptPath = node.getAttributes()?.script
        
        if( !scriptPath ) continue

        const code = await Get( scriptPath )

        const blob = new Blob([code], { type: 'application/javascript' })
        const url = URL.createObjectURL(blob)
        const mod = await import(url)

        if ( typeof mod.default === "function" ) {

            const gameScript = new GameScript( node, scriptPath, bridge )
            
            mod.default( gameScript )

            if( gameScript.dataToExport() ){
                
                const { name, data } = gameScript.dataToExport()

                bridge[ name as string ] = data
            }

            // const result:GameScriptResult = mod.default( gameScript )
            // if( result ) bridge[ result.name ] = result.data
            
        }

        URL.revokeObjectURL(url)
    }
}


export default executeNodesScripts