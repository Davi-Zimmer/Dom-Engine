class Ticker {

    private connections: Function[] = []

    constructor(){}

    public Connect( func: Function ){
        this.connections.push( func )
    }

    public Disconnect( func: Function ){
        this.connections = this.connections.filter( c => c !== func )
    }

    public GetConnections() {
        return this.connections
    }

    
}


export default Ticker