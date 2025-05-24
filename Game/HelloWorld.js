export default function( GameScript ){

    return GameScript.Create("Meu script", () => {

        console.log( GameScript.node )
   
    })

}


/*
    GameScript.node
    GameScript.filePath
    GameScript.bridge
*/