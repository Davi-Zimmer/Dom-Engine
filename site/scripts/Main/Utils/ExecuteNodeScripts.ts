import Node from "../../Components/Node.js"
import Bridge from "../Bridge.js"
import EventHandler from "./EventHandler.js"
import GameScript from "./GameScripts.js"
import Get from "./Get.js"

function resetLastGameData(){
    EventHandler.reset()
}

async function executeNodesScripts( Nodes: Node[] ){

    resetLastGameData()

    const bridge = new Bridge()

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

                bridge.addData( name as string, data )
            }
            
        }

        URL.revokeObjectURL(url)
    }
}


export default executeNodesScripts