import Node from "../Components/Node.js"
import DrawingInterface from "../Interfaces/DrawingInterface.js"
import PropInterface from "../Interfaces/PropBaseInterface.js"

import Rect from "../Rect.js"
import NodeManager from "../Managers/NodeManager.js"
import Engine from "../Main/Engine.js"
import RectInterface from "../Interfaces/RectInterface.js"
import SourceInterface from "../Interfaces/SourceInterface.js"

type OnFunctions = (obj:DrawingInterface) => void 

class Prop extends Rect {
    
    private node: Node

    public events: Record< string, OnFunctions[] > = {}

    public collisionMask: RectInterface = {}
    public renderMask   : RectInterface = {}

    private sources: SourceInterface[] = []

    constructor({ node, x=0, y=0, w=10, h=10 } : PropInterface ){
        const coords = { x, y, w, h }
        
        super( coords )

        Object.assign( this.collisionMask, coords )
        Object.assign( this.renderMask )

        this.node = node

        this.setup()
    }

    public updatePosition = ({ x, y, w, h, z }: RectInterface) => {
        this.setX( x || this.getX() )
        this.setY( y || this.getY() )
        this.setW( w || this.getW() )
        this.setH( h || this.getH() )
        this.setZ( z || this.getZ() )
    }

    private setup(){
        this.createEvent('Ticker')
    }

    public getEvent = ( eventName: string ) => {
        return this.events[ eventName ]
    }

    public getSources = () => this.sources
    public addSource = ( data: SourceInterface ) => this.sources.push( data )
    
    public getNode = () => { return this.node }

    public createEvent = ( eventName:string ) => {

        if( !this.events[ eventName ] ) this.events[ eventName ] = []

    }

    public on = ( eventName: string, callback: OnFunctions ) => {
        
        this.createEvent( eventName )

        this.events[ eventName ].push( callback )
    }

    public trigger = ( eventName: string, data: unknown ) => {
        const event = this.events[ eventName ]

        if( event ) event.forEach( fn => fn( data as DrawingInterface )  )
        
    }

    public moveProp = ( target : {x:number,y:number}, velocity:number = 1, minDistance: 5 ) => {
        const playerPos = this.getMiddle()

        const dir = {
            x: target.x - playerPos.x,
            y: target.y - playerPos.y,
        }

        const distance = Math.sqrt( dir.x**2 + dir.y**2)

        if( distance > minDistance ){

            this.moveX( dir.x / distance * velocity )
            this.moveY( dir.y / distance * velocity )
        }

    }

    public update = ( { canvas, ctx } : DrawingInterface ) => {

        for( const func of this.getEvent('Ticker') ){
            
            func({ canvas, ctx })

        }

        const nodes = NodeManager.getNodes()

        let collisions: Prop[] = []

        nodes.forEach( node => {
            
            const instance = node.getPropInstance()

            if( !instance || instance === this ) return

            const isColliding = Engine.isColliding( instance, this )
        
            if( isColliding ) collisions.push( instance )
            
        })

        if( collisions.length > 0 ) this.trigger('Collision', collisions )

    }

}

export default Prop