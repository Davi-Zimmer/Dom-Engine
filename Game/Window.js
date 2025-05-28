import Script from '../site/scripts/Main/Utils/GameScripts.js'

Script.Create( nodeId, 'Window', ( GameScript ) => {

    const windowInstance = GameScript.node.getPropInstance()

    const { setZ, setW, setH } = windowInstance

    setW( innerWidth )
    setH( innerHeight )

    setZ( -Infinity )

    const { x, y, w, h } = windowInstance.getRect()

    windowInstance.on('Ticker', ({ ctx }) => {
        ctx.fillStyle = 'rgb( 0, 0, 0 )'
        ctx.fillRect( x, y, w, h )
    })

})