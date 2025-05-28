import EventManager from "../Managers/EventManager.js"

class Bridge {

    private data:Record< string, unknown > = {} 
        
    constructor (){

        this.data.EventManager = EventManager.getAllEvents()

    }

    public addData( name:string, data: unknown ){ this.data[ name ] = data }

    public getData( name:string ){ return this.data[ name ]}
}

export default Bridge