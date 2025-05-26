export default function( GameScript ){

    GameScript.Create('Window', () => {

        const windowInstance = GameScript.node.getPropInstance()

        const { on, setZ, setW, setH } = windowInstance

        setZ( -Infinity )
        setW( innerWidth )
        setH( innerHeight )

        on('Ticker', ({ ctx }) => {

            const { x, y, w, h } = windowInstance.getRect()
            
            ctx.fillStyle = 'rgb( 0, 0, 0, 1 )'
            ctx.fillRect( x, y, w, h )

        })

    })

}