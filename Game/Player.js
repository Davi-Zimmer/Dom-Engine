export default function( GameScript ){

    GameScript.SetScriptName('Player')

    const { onPress } = GameScript.Import('EventManager')

    const { node } = GameScript

    const playerInstance = node.getPropInstance()

    function addEvents(){
        const speed = node.attributes.getPossibleAttribute('speed') || 1

        onPress('w', () => playerInstance.moveY( -speed ))
        onPress('s', () => playerInstance.moveY(  speed ))
        onPress('a', () => playerInstance.moveX( -speed ))
        onPress('d', () => playerInstance.moveX(  speed ))
    }
    
    GameScript.Create(() => {

        addEvents()
    
        playerInstance.on('Ticker', ({ ctx }) => {

            ctx.fillStyle = 'red'

            const { x, y, w, h } = playerInstance.getRect()

            ctx.fillRect( x, y, w, h )

        })

    })

}