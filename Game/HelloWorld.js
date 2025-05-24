export default function( GameScript ){

    GameScript.Create('Meu Script', () => {

        const { sayHello } = GameScript.Import('Hello')

        sayHello()

    })

}

/*
    GameScript.node
    GameScript.filePath
    GameScript.bridge
*/