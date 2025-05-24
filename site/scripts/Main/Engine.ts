import NodeManager from "../NodeManager.js"
import Rect from "../Rect.js"

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

    private acceptedKeys : Record< string, Function > = {}
    private executeKeys  : Record< string, Function > = {}

    private setExecuteKeys( key: string, func: Function ) {
        
        if( this.executeKeys[ key ] ) return
        this.executeKeys[ key ] = func

    }

    private keyDown( e: KeyboardEvent ){

        const key = e.key.toLowerCase()

        const func = this.acceptedKeys[ key ]

        if( func ) this.setExecuteKeys( key, func )

    }

    private keyUp( e: KeyboardEvent ){
        
        const key = e.key.toLocaleLowerCase()

        delete this.executeKeys[ key ]

    }

    private addEvents( canvas: HTMLElement ){
        
        canvas.addEventListener('keydown', e => this.keyDown(e) )


        canvas.addEventListener('keyup', e => this.keyUp( e ) )

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

        this.addEvents( canvas )

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

        for( const key in this.executeKeys ){

            const func = this.executeKeys[ key ]

            const stop = func()

            if( stop ) delete this.executeKeys[ key ]

        }

    }

    public addAcceptedKey( key: string, func: Function ){
        this.acceptedKeys[ key ] = func
    }

    public removeAcceptedKey( key:string ){
        delete this.acceptedKeys[ key ]
    }

    
    //---------------------------------------------------------------------\\
    
    private gameObjects:Rect[] = []


    private start(){

        this.addAcceptedKey('k', () => console.log('Hello!'))
        
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