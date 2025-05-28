import DrawingInterface from "../Interfaces/DrawingInterface.js"
import NodeManager from "../Managers/NodeManager.js"
import EventManager from "../Managers/EventManager.js"
import executeNodesScripts from "../ExecuteNodeScripts.js"
import Rect from "../Rect.js"

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

        EventManager.addEvents( canvas )

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

    private tickGameThings(){

        EventManager.executeKeyActions()

    }

    public isColliding( rect1: Rect, rect2:Rect ){
        const a = rect1.getRect()
        const b = rect2.getRect()

        return (
            a.x + a.w > b.x &&
            a.y + a.h > b.y &&
            a.x < b.x + b.w &&
            a.y < b.y + b.h 
        )
    }
    
    //---------------------------------------------------------------------\\
    
    public loadGame(){

        const nodes = NodeManager.getNodes()
    
        executeNodesScripts( nodes )

    }

    private start(){
        
        setTimeout(() => {
            this.loadGame()
        }, 500);
        
    }

    private update( drawingObj: DrawingInterface ){

        this.tickGameThings()

        const nodes = NodeManager.getNodes() 

        const sortedNodes = nodes.sort( ( a, b ) => a.getPropInstance()?.getZ()! - b.getPropInstance()?.getZ()!  )

        sortedNodes.forEach( node => {

            const instance = node.getPropInstance()

            if( !instance ) return  

            instance.update( drawingObj  )

        })
    }

}


NodeManager.loadNodes().then( tree => {
    console.log( tree )
})

Object.assign( window, { NodeManager } )

const Engine = _Engine.getInstance()


export default Engine