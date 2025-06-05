import SourceInterface from "../../Interfaces/SourceInterface.js"

class GameSources {
    private sources: SourceInterface[]

    constructor( sources: SourceInterface[]){
        this.sources = sources
    }

    public findSourceByName = ( name: string ) => {
        return this.sources.find( src => src.name === name )?.source
    }

    public getSources = () => this.sources

}

export default GameSources