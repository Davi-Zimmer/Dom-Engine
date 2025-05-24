import NodeManager from "../NodeManager.js"

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

    private addEvents( canvas: HTMLElement ){
        
        canvas.addEventListener('keydown', e => {

        })

        canvas.addEventListener('keyup', e => {
            
        })

    }

    private configureCanvas(){
        
        const canvas = document.querySelector('canvas')

        if( !canvas ) throw new Error('Não existe um canvas')

        const ctx = canvas.getContext('2d')

        if( !ctx ) throw new Error('Não foi possível extrair o ctx')

        return { ctx, canvas}
    }

    private setup(){

        const { canvas, ctx } = this.configureCanvas()

        this.addEvents( canvas )

        this.loop({ canvas, ctx })
        
    }

    private loop( drawingObj: DrawingProps){

        const LOOP = () => {
            
            this.update( drawingObj )

            requestAnimationFrame( LOOP )
        }

        LOOP()
    }

    private update( drawingObj: DrawingProps ){

        // console.log('Ticking')

    }


}

NodeManager.loadNodes().then( tree => {
    console.log( tree )
    
})

Object.assign( window, {NodeManager} )


const Engine = _Engine.getInstance()

export default Engine