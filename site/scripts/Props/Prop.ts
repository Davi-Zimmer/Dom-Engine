import Node from "../Components/Node.js"
import DrawingInterface from "../Interfaces/DrawingInterface.js"
import PropInterface from "../Interfaces/PropBaseInterface.js"
import Ticker from "../Connectors/Ticker.js"
import Rect from "../Rect.js"

class Prop extends Rect {
    
    private node: Node
    
    public Ticker = new Ticker()

    constructor({ node, x=0, y=0, w=0, h=0 } : PropInterface ){
        super({ x, y , w, h })
        this.node = node
    }

    public getNode(){ return this.node }

    public update( { canvas, ctx } : DrawingInterface ){

        

        for( const func of this.Ticker.GetConnections() ){
            
            func({ canvas, ctx })

        }

    }


}

export default Prop