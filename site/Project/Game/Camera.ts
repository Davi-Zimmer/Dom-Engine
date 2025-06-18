import { ScriptArgs } from "../Types/ScriptArgs"

export default function ({ GameScript, prop }: ScriptArgs){
    // GameScript.getNodeById('Camera')

    const { on, getRect, setX, setY } = prop

    const pos = { x: 0, y: 0, w: 20, h: 20 }

    const playerProp = GameScript.getNodeById('Player').getPropInstance()

    on('Ticker', ({ctx}) => {

        const { x, y } = getRect()

        // const playerPos = playerProp.getMiddle()
        // setX( playerPos.x - innerWidth / 2 )
        // setY( playerPos.y - innerHeight / 2 )

        ctx.fillStyle = 'blue'
        ctx.fillRect( pos.x - x, pos.y - y, pos.w, pos.h )
    })

}

