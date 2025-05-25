import DrawingInterface from "../Interfaces/DrawingInterface.js"
import NodeManager from "../NodeManager.js"
import Prop from "../Props/Prop.js"
import Rect from "../Rect.js"
import EventHandler from "./Utils/EventHandler.js"
import executeNodesScripts from "./Utils/ExecuteNodeScripts.js"

class _Engine {
    
    private static Instance: _Engine

    public static getInstance() {
        
        if( !this.Instance ) this.Instance = new _Engine()
        
        return this.Instance
    }

    private constructor() {

        this.setup()

    }

    private configureCanvas(){
        
        const canvas = document.querySelector('canvas')

        if( !canvas ) throw new Error('Não existe um canvas')
        
        canvas.width = innerWidth
        canvas.height = innerHeight

        const ctx = canvas.getContext('2d')

        if( !ctx ) throw new Error('Não foi possível extrair o ctx')

        return { ctx, canvas}
    }

    private setup(){

        const { canvas, ctx } = this.configureCanvas()

        EventHandler.addEvents( canvas )

        this.loop({ canvas, ctx })

        this.start()
        
    }

    private loop( drawingObj: DrawingInterface){

        const LOOP = () => {
            
            this.update( drawingObj )

            requestAnimationFrame( LOOP )
        }

        LOOP()
    }

    private tickGameThings( ){

        EventHandler.executeKeyActions()

    }


    
    //---------------------------------------------------------------------\\
    
    public reloadGame(){

        const nodes = NodeManager.getNodes()
        executeNodesScripts( nodes )

    }

    private start(){
        
       
        
    }

    private update( drawingObj: DrawingInterface ){

        this.tickGameThings()

        const nodes = NodeManager.getNodes() 

        const sortedNodes = nodes.sort( ( a, b ) => a.getPropInstance()?.getZ()! - b.getPropInstance()?.getZ()!  )

        sortedNodes.forEach( node => {

            node.getPropInstance()?.update( drawingObj  )

        })
    }


}

NodeManager.loadNodes().then( tree => {
    console.log( tree )
    
})

Object.assign( window, { NodeManager } )


const Engine = _Engine.getInstance()

document.addEventListener('keydown' , e => {

    if( e.ctrlKey && e.key.toLocaleLowerCase() === "q" ) {
        
        Engine.reloadGame()
    }    
   
})
export default Engine