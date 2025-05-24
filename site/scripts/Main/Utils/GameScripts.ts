import Node from "../../Components/Node.js"

class GameScript {

    private node     : Node
    private filePath : string
    private bridge   : Record< string, unknown >

    constructor ( node: Node, filePath: string, bridge: Record< string, unknown >){

        this.node = node
        this.filePath = filePath
        this.bridge = bridge

    }

    Create( name: string, func: Function ){
        
        try {
            const data = func() 

            return { name, data }

        } catch ( ex ) {

            const path = window.location.href + this.filePath
           
            console.error(`O Script \"${name}\" em \"${path}\" apresenta Erros: ${ex}`)
            
            return { name, data: ex }
        }

    }

}

export default GameScript