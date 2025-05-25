import EventManager from "../Managers/EventManager.js"

class Bridge {

    private data:Record< string, unknown > = {} 
        
    constructor (){

        this.data.EventManager = {
            onPress : EventManager.onPress.bind( EventManager ),
            onDown  : EventManager.onDown.bind( EventManager ),
            onUp    : EventManager.onUp.bind( EventManager ),

            onMouseDown : EventManager.onMouseDown.bind( EventManager ),
            onMouseUp   : EventManager.onMouseUp.bind( EventManager ),
            onMouseMove : EventManager.onMouseMove.bind( EventManager ),
            onMouseWheel: EventManager.onMouseWheel.bind( EventManager )
        }

    }

    public addData( name:string, data: unknown ){ this.data[ name ] = data }

    public getData( name:string ){ return this.data[ name ]}
}

export default Bridge