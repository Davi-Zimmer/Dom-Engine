import RectInterface from "./Interfaces/RectInterface.js"

class Rect {

    private position = { x:0, y:0, w:0, h:0, z:0 }

    constructor( p : RectInterface ){

        Object.assign( this.position, p )

    }

    public getRect = () => this.position

    public getMiddle() {
        const { x, y, w, h } = this.getRect()
        
        return {
            x: x + w / 2,
            y: y + h / 2
        }

    }

    public setX = ( x: number ) => { this.position.x = x }
    public setY = ( y: number ) => { this.position.y = y }
    public setW = ( w: number ) => { this.position.w = w }
    public setH = ( h: number ) => { this.position.h = h }
    public setZ = ( z: number ) => { this.position.z = z }

    public getX = () => { return this.position.x }
    public getY = () => { return this.position.y }
    public getW = () => { return this.position.w }
    public getH = () => { return this.position.h }
    public getZ = () => { return this.position.z }

    public moveX = ( xx:number ) => { this.position.x += xx }
    public moveY = ( yy:number ) => { this.position.y += yy }

}

export default Rect