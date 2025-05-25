import KeyEvent from "../Events/KeyEvent.js"
import KeyHandlersInterface from "../Interfaces/KeyHandlersInterface.js"
import { KeyFunc, MouseFunc } from "../Types/AllTypes.js"

class _EventManager {

    private static Instance: _EventManager

    private constructor(){}

    static GetInstance(){

        if( !this.Instance ) this.Instance = new _EventManager()

        return this.Instance

    } 

    public reset(){ 
        this.keyMap = {}

        this.mouseDownCallbacks  = {}
        this.mouseUpCallbacks    = {}
        this.mouseMoveCallbacks  = []
        this.mouseWheelCallbacks = []
    }


    public addEvents( canvas: HTMLCanvasElement ){
        canvas.addEventListener('keydown'  , e => this.keyDown( e ) )
        canvas.addEventListener('keyup'    , e => this.keyUp( e ) )

        canvas.addEventListener('mousedown'  , e => this.mouseDown( e ))
        canvas.addEventListener('mouseup'    , e => this.mouseUp( e ))
        canvas.addEventListener('wheel'      , e => this.mouseWheel( e ))
        canvas.addEventListener('mousemove'  , e => this.mouseMove( e ))
        canvas.addEventListener('contextmenu', e => this.mouseContextMenu( e ))
    }


    //-------------------- Key Events -------------------- \\
    private keyMap: Record< string, KeyHandlersInterface> = {}

    private keyDown( e: KeyboardEvent ){
        
        const key = e.key.toLowerCase()
        const data = this.keyMap[ key ]

        if( !data ) return 

        if( !data.pressed ){
            data.pressed = true

            const { altKey, shiftKey, ctrlKey } = e
            
            const evt = new KeyEvent({
                key, altKey, shiftKey, ctrlKey,
                actived: true,
                canceled: false,
            })

            for( const callback of data.onDown ) callback( evt )
        }



    }

    private keyUp( e: KeyboardEvent ){

        const key = e.key.toLowerCase()
        const data = this.keyMap[ key ]

        if( !data ) return

        if( data.pressed ){
            data.pressed = false

            const { altKey, shiftKey, ctrlKey } = e
            
            const evt = new KeyEvent({
                key, altKey, shiftKey, ctrlKey,
                actived: true,
                canceled: false,
            })

            for( const callback of data.onUp ) callback( evt )
        }
    }

    private ensureKey( key: string ) {
        if (!this.keyMap[key]) {
            this.keyMap[key] = {
                onDown: new Set(),
                onPress: new Set(),
                onUp: new Set(),
                pressed: false
            };
        }
    }

    public executeKeyActions(){

        for( const key in this.keyMap ){
            
            const data = this.keyMap[key]

            if( data.pressed ){

                const evt = new KeyEvent({ key, actived: true, canceled: false, ctrlKey: false, shiftKey: false, altKey: false });
                
                for( const callback of data.onPress ) callback( evt )

            }



        }

    }

    public onDown( key: string, callback: KeyFunc ){
        key = key.toLowerCase()
        
        this.ensureKey( key )
        
        this.keyMap[ key ].onDown.add( callback )
    }

    public onUp( key: string, callback: KeyFunc ){
        key = key.toLowerCase()
        
        this.ensureKey( key )
        
        this.keyMap[ key ].onUp.add( callback )
    }

    public onPress( key: string, callback: KeyFunc ){
        key = key.toLowerCase()
        
        this.ensureKey( key )
        
        this.keyMap[ key ].onPress.add( callback )
    }

    //-------------------- Mouse Events -------------------- \\

    private mouseDownCallbacks : Record<number, Function[]> = {}
    private mouseUpCallbacks   : Record<number, Function[]> = {}
    private mouseMoveCallbacks : Function[] = []
    private mouseWheelCallbacks: Function[] = []

    private mouseDown( e: MouseEvent ) {
        
        const callback = this.mouseDownCallbacks[ e.button ]

        if( callback ) callback.forEach( cb => cb( e ) )

    }

    private mouseUp( e: MouseEvent ){
        
        const callback = this.mouseUpCallbacks[ e.button ]

        if( callback ) callback.forEach( cb => cb( e ) )

    }

    private mouseMove( e: MouseEvent ){
        this.mouseMoveCallbacks.forEach( callback => callback( e ) )
    }

    private mouseWheel( e: MouseEvent ){
        this.mouseWheelCallbacks.forEach( callback => callback( e ) )
    }

    private mouseContextMenu( e: MouseEvent ){

        e.preventDefault()

        const callback = this.mouseDownCallbacks[ e.button ]

        if( callback ) callback.forEach( cb => cb( e ) )

    }

    public onMouseDown( button: number, callback: MouseFunc ) {

        if( !this.mouseDownCallbacks[ button ] ) this.mouseDownCallbacks[ button ] = []

        this.mouseDownCallbacks[button].push( callback )

    }

    public onMouseUp( button: number, callback: MouseFunc) {

        if( !this.mouseUpCallbacks[ button ] ) this.mouseUpCallbacks[ button ] = []

        this.mouseUpCallbacks[button].push( callback )
        
    }

    public onMouseMove( callback: MouseFunc ) {
        this.mouseMoveCallbacks.push( callback )
    }

    public onMouseWheel( callback: MouseFunc ){
        this.mouseWheelCallbacks.push( callback )
    }

}


const EventManager = _EventManager.GetInstance()

export default EventManager