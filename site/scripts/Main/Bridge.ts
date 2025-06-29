import EventHandler from "./Utils/EventHandler.js"

class Bridge {

    private data:Record< string, unknown > = {} 
        
    constructor (){

        this.data.EventHandler = {
            onPress : EventHandler.onPress.bind( EventHandler ),
            onDown  : EventHandler.onDown.bind( EventHandler ),
            onUp    : EventHandler.onUp.bind( EventHandler ),
        }

    }

    public addData( name:string, data: unknown ){ this.data[ name ] = data }

    public getData( name:string ){ return this.data[ name ]}
}

export default Bridge