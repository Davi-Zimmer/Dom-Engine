import SourceInterfaceType from "./SourceInterfaceType"

interface GameSourcesType {

    findSourceByName ( name: string ) : HTMLImageElement | HTMLAudioElement | undefined

    getSources(): SourceInterfaceType   []
}

export default GameSourcesType