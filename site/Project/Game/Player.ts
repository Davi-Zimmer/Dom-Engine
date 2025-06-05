import { DrawingType } from "../Types/DrawindType"
import FrameType from "../Types/FrameType"
import { GameScriptType } from "../Types/GameScriptType"
import { PropType } from "../Types/PropType"
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

function addEvents( { getEvents }: GameScriptType, origin: PropType, func: (dir:string) => void){
    const { onPress, onDown, onUp } = getEvents()

    const speed = 5

    const { moveX, moveY } = origin


    onDown('w', () =>  func('up')   )
    onDown('a', () =>  func('right'))
    onDown('s', () =>  func('down') )
    onDown('d', () =>  func('left') )

    onPress('w', () => moveY( -speed ))
    onPress('a', () => moveX( -speed ))
    onPress('s', () => moveY( speed ) )
    onPress('d', () => moveX( speed ) )

}


function getSprites(): Record<string, FrameType[]>{
    return {
        left: [
            [ 32, 0, 16, 16, 7 ],
            [ 48, 0, 16, 16, 2 ]
        ],

        up: [
            [ 64, 0, 16, 16, 7 ],
            [ 80, 0, 16, 16, 2 ]
        ],

        down: [
            [ 96, 0, 16, 16 , 7 ],
            [ 112, 0, 16, 16, 2 ]
        ],

        right: [
            [128, 0, 16, 16, 7 ],
            [144, 0, 16, 16, 2 ]
        ]
        
    }
}


export default function ( { prop, GameScript, node }: ScriptArgs ){

    const { setW, setH, on, moveProp } = prop
    
    setW( 50 )
    setH( 50 )

    const gameSources = GameScript.nodeManager.getPropByNodeId('GameSources')?.getSources()

    if( !gameSources ) return

    const spriteSheet = gameSources.findSourceByName('spriteSheet') as HTMLImageElement
    
    if( !spriteSheet ) return

    const spritesCoords = getSprites() 

    const spriteAnimator = new GameScript.SpriteAnimator( spritesCoords.down )
    const camProp = GameScript.getNodeById('Camera').getPropInstance()
    
    function change( dir: string ) {
        const animation = spritesCoords[dir]
        spriteAnimator.setFrames( animation )
    }

    addEvents( GameScript, prop, change )
    
    on('Ticker', ({ ctx }) => {
        // tick( data, prop, camProp )
        const player = prop.getRect()
        const cam = camProp.getRect()

        const pos = {
            x : player.x - cam.x,
            y : player.y - cam.y
        }

        const [ a, b, c, d ] = spriteAnimator.getCurrentFrame()

        ctx.drawImage(spriteSheet, a, b, c, d,  pos.x, pos.y, player.w, player.h )

        spriteAnimator.update()
    } )
    
}