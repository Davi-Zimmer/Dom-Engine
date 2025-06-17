export interface RectTypeInterface {
    x?: number,
    y?: number,
    w?: number,
    h?: number,
    z?: number
}

export interface SimpleRect {
    x: number
    y: number
    w: number
    h: number
}

export interface RectType {
    constructor( p : RectTypeInterface ): RectType
    getRect() : SimpleRect

    getMiddle() : {x:number, y:number}

    setX ( x: number ) : void
    setY ( y: number ) : void
    setW ( w: number ) : void
    setH ( h: number ) : void
    setZ ( z: number ) : void

    getX (): number
    getY (): number
    getW (): number
    getH (): number
    getZ (): number

    moveX( xx:number ) : void
    moveY( yy:number ) : void

}