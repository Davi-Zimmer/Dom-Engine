export default function( GameScript ){

    GameScript.Create('Meu Script', () => {

        const { onPress } = GameScript.Import('EventHandler')
        const e = GameScript.Import('EventHandler')

        const { sayHello } = GameScript.Import('Hello')

        onPress('w', sayHello )

        e.onUp('s', () => {
            console.log('HAHA!')
        })

        e.onMouseUp(2, () => {
            console.log('click')
        })
        
    })

}

/*
    GameScript.node
    GameScript.filePath
    GameScript.bridge
*/