import { KeyFuncType } from "./KeyFuncType"
import { MouseFuncType } from "./MouseFuncType"

export interface EventManagerType {


    reset() : void

    addEvents( canvas: HTMLCanvasElement ): void

    //-------------------- Key Events -------------------- \\
    
    executeKeyActions(): void

    onDown( key: string, callback: KeyFuncType ): void

    onUp( key: string, callback: KeyFuncType ): void

    onPress( key: string, callback: KeyFuncType ): void

    //-------------------- Mouse Events -------------------- \\

    onMouseDown( button: number, callback: MouseFuncType ): void

    onMouseUp( button: number, callback: MouseFuncType): void
    

    onMouseMove( callback: MouseFuncType ): void

    onMouseWheel( callback: MouseFuncType ): void

    getAllEvents(): {
        onPress: EventManagerType['onPress'],
        onDown: EventManagerType['onDown'],
        onUp: EventManagerType['onUp'],
        onMouseDown: EventManagerType['onMouseDown'],
        onMouseUp: EventManagerType['onMouseUp'],
        onMouseMove: EventManagerType['onMouseMove'],
        onMouseWheel: EventManagerType['onMouseWheel']
    }

}