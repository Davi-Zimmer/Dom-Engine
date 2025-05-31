import Node from "../../Components/Node.js"
import EventManager from "../../Managers/EventManager.js"
import NodeManager from "../../Managers/NodeManager.js"

class Script {

    public node: Node
    public scriptName:string

    constructor( nodeId: string, scriptName: string  ){

        this.node = this.getNodeById( nodeId )!

        this.scriptName = scriptName
    }

    public getEvents = () =>  EventManager.getAllEvents()

    // public node: Node

    public getNodeById = ( id: string ) => {
        const nodes = NodeManager.getNodes()
        return nodes.find( n => n.getAttributes()?.id === id)
    }

    public static Create = ( id:string, scriptName:string, callback:( gameScript:Script, node:Node ) => void )  => {
        
        const gameScript = new Script( id, scriptName )

        callback( gameScript, gameScript.node )
        
    }
    
}

export default Script