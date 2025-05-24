import Node from "../../Components/Node.js"

class GameScript {

    private node     : Node
    private filePath : string
    private bridge   : Record< string, unknown >
    private name     : string = ''

    private toExportData : Record< string, unknown > = {}

    constructor ( node: Node, filePath: string, bridge: Record< string, unknown >){

        this.node = node
        this.filePath = filePath
        this.bridge = bridge
    }

    public dataToExport(){ return this.toExportData }

    SetScriptName( name:string ){
        if( this.name !== '' ) throw new Error('O nome do script já foi definido.')

        this.name = name
    }

    Create( nameOrFunc: string | Function, func: Function ){

        let name

        if( typeof nameOrFunc === 'string' ){
            
            this.SetScriptName( nameOrFunc )
            
            name = nameOrFunc
        }

        else if( typeof nameOrFunc === 'function' ){ 
            name = this.name
            func = nameOrFunc 
        }

        this.toExportData.data = null 

        try {
            func()
        } catch ( ex ) {

            const path = window.location.href + this.filePath
           
            console.error(`O Script \"${name}\" em \"${path}\" apresenta falhas: ${ex}`)

        }

    }

    Export( data: Record< string, unknown > ){

        if( this.bridge[ this.name ] )
            throw new Error(`Já existe um script com o nome "${this.name}" sendo exportado.`)
        

        this.toExportData = { data, name:this.name } 
    }

    Import( scriptName: string ){ 

        const data = this.bridge[ scriptName ]

        if( !data )
            throw new Error(`Importação falha: Não foi possível importar os dados de ${scriptName}, pois eles não existem ou não foram declarados antes.`)

        return data
    }

}

export default GameScript