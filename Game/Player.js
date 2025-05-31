import Script from '../site/scripts/Main/Utils/GameScripts.js'


Script.Create( nodeId, 'Player', ( GameScript, node ) => {

    const { onPress, onDown } = GameScript.getEvents()

    const playerInstance = node.getPropInstance() 

    const speed = node.attributes.getPossibleAttribute('speed') || 5

    node.bindAttributes()

    onPress('w', () => playerInstance.moveY( -speed ))
    onPress('s', () => playerInstance.moveY(  speed ))
    onPress('a', () => playerInstance.moveX( -speed ))
    onPress('d', () => playerInstance.moveX(  speed ))

    const sources = playerInstance.getSources()

    const a = sources[0].source

    onDown(' ', () => {
        sources[1].source.play()
    })
        
    playerInstance.on('Ticker', ({ ctx }) => {

        ctx.fillStyle = 'red'

        const { x, y, w, h } = playerInstance.getRect()

        ctx.drawImage( a, x, y, w, h )

    })

})