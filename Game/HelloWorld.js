export default function( GameScript ){

    GameScript.Create("Meu script", () => {

        console.log( GameScript.node )
   
        // GameScript.export({ data: 'test' })

    })

}


/*
    GameScript.node
    GameScript.filePath
    GameScript.bridge
*/