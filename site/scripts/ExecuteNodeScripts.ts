import Node from "./Components/Node.js"
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

    }
    
}


export default executeNodesScripts