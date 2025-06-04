import Node from "../../Components/Node.js"
import EventManager from "../../Managers/EventManager.js"
import NodeManager from "../../Managers/NodeManager.js"

class GameScript {

    public node: Node
    public scriptPath:string

    public nodeManager = NodeManager

    constructor( node: Node, scriptPath:string ){

        this.node = node

        this.scriptPath = scriptPath
    }

    public getEvents = () =>  EventManager.getAllEvents()

    // public node: Node

    public getNodeById = ( id: string ) => {
        const nodes = NodeManager.getNodes()
        return nodes.find( n => n.getAttributes()?.id === id)
    }

    /*
        public Create = ( callback:() => void )  => {
            
            return callback()
            
        }
    */

    
}

export default GameScript