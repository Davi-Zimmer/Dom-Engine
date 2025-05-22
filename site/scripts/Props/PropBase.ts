import Node from "../Components/Node.js"
import PropName from "../enum/PropName.js"

class PropBase {
    
    private node: Node
    private name: PropName
    
    constructor( { node, name } : PropBase ){
        
        this.node = node
        this.name = name

    }

  

}