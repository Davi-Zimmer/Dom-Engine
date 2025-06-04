import { DrawingType } from "../Types/DrawindType"
import { GameScriptType } from "../Types/GameScriptType"
import { PropType } from "../Types/PropType"
import { SimpleRect } from "../Types/RectType"
import { ScriptArgs } from "../Types/ScriptArgs"


function tick( {ctx} : DrawingType, playerProp:PropType, camProp: PropType){
  const player = playerProp.getRect()
    const cam = camProp.getRect()

    const pos = {
        x : player.x - cam.x,
        y : player.y - cam.y
    }

    ctx.fillStyle = 'red'
    ctx.fillRect( pos.x, pos.y, player.w, player.h )
}

    function a ( m: Function, moving:Record<'isMoving', boolean>){
        return () => {
            if ( !moving.isMoving ) {
                moving.isMoving = true
                m()
            }
        }
    }

function addEvents( { getEvents }: GameScriptType, origin: PropType){
    const { onPress, onDown, onUp } = getEvents()

    const speed = 50

    const { moveX, moveY } = origin

    onDown('w', () => moveY( -speed ))
    onDown('a', () => moveX( -speed ))
    onDown('s', () => moveY( speed ) )
    onDown('d', () => moveX( speed ) )

}

export default function ( { prop, GameScript, node }:ScriptArgs ){

    const { setW, setH, on, moveProp } = prop
    
    setW( 50 )
    setH( 50 )

    const camProp = GameScript.getNodeById('Camera').getPropInstance()
        

    const a = { x: 0, y: 0, w: 0, h: 0 }

    addEvents( GameScript, prop)
    
    on('Ticker', data => {
        tick( data, prop, camProp )
    })
    
}