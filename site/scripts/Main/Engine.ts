import NodeManager from "../NodeManager.js"
import Rect from "../Rect.js"
import EventHandler from "./Utils/EventHandler.js"

interface DrawingProps {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
}

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

    private loop( drawingObj: DrawingProps){

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
    
    private gameObjects:Rect[] = []


    private start(){
        
       
        
    }

    private update( drawingObj: DrawingProps ){

        this.tickGameThings()
        //console.log('Ticking')

        const sortedObjects = this.gameObjects.sort( ( a, b ) => a.getZ() - b.getZ()  )

        sortedObjects.forEach( obj => {

            // obj.update( drawingObj )

        })
    }


}

NodeManager.loadNodes().then( tree => {
    console.log( tree )
    
})

Object.assign( window, {NodeManager} )


const Engine = _Engine.getInstance()

export default Engine