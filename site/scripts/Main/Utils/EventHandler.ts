import KeyEvent from "./KeyEvent.js"

type KeyFunc = ( e: KeyEvent ) => void

interface KeyHandlers {
    onPress : Set< KeyFunc >
    onDown  : Set< KeyFunc >
    onUp    : Set< KeyFunc >
    pressed : boolean
}


class _EventHandler {

    private static Instance: _EventHandler

    private constructor(){}

    static GetInstance(){

        if( !this.Instance ) this.Instance = new _EventHandler()

        return this.Instance

    } 

    private keyMap: Record< string, KeyHandlers> = {}

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

    public addEvents( canvas: HTMLCanvasElement ){
        canvas.addEventListener('keydown', e => this.keyDown( e ) )
        canvas.addEventListener('keyup'  , e => this.keyUp( e ) )
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

    public reset(){ this.keyMap = {} }


}


const EventHandler = _EventHandler.GetInstance()

export default EventHandler