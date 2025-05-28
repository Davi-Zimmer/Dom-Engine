import Node from "./Components/Node.js"
import Bridge from "./Main/Bridge.js"
import Get from "./Main/Utils/Get.js"

function adjustImportPath( code:string ) {
    const convertedCode = code.replace(
    /import\s+(.*?)\s+from\s+['"](\.\.\/)+site\/scripts\/(.*?)['"]/g,
    (match, imports, dots, path) => {
        return `import ${imports} from "/scripts/${path}"`;
    }
    );

    return convertedCode
}

async function executeNodesScripts( Nodes: Node[] ){

    // resetLastGameData()
    // const bridge = new Bridge()

    for( let node of Nodes ){

        const scriptPath = node.getAttributes()?.script

        if( !scriptPath ) continue

        const code = await Get( scriptPath )

        const adjusted = adjustImportPath( code )

        const script = document.createElement('script')
        script.setAttribute('type', 'module')

        const nodeId = node.getAttributes()?.id

        const t = `const nodeId = '${ nodeId }' \n`

        script.innerHTML = (t + adjusted)

        document.body.appendChild( script )

        /*
        
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
        */
    }
}


export default executeNodesScripts