import Node from "../Components/Node.js"
import PropInterface from "../Interfaces/PropBaseInterface.js"
import Rect from "../Rect.js"

class Prop extends Rect {
    
    private node: Node
    
    constructor({ node, x=0, y=0, w=0, h=0 } : PropInterface ){
        super({ x, y , w, h })
        this.node = node
    }

    getNode(){ return this.node }


}

export default Prop