import { ScriptArgs } from "../Types/ScriptArgs"

export default function ( { prop, GameScript } : ScriptArgs ){
    
    const { setW, setH, setZ, on, getRect } = prop


    // const n = GameScript.nodeManager.getNodeById('Player')
    // console.log( n )


    setW( innerWidth )
    setH( innerHeight )

    setZ( -Infinity )

    const { x, y, w, h } = getRect()

    on('Ticker', ({ctx}) => {
        ctx.fillStyle = '#000'
        ctx.fillRect( x, y, w, h )
    })

}