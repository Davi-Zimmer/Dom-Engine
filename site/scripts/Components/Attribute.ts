import AttributeInterface from "../Interfaces/AttributeInterface.js"

class Attribute {
    
    public id      ?: string
    public for     ?: string
    public repeat  ?: number
    public src     ?: string
    public class   ?: string
    public script  ?: string
    public content ?: string
    public noProp  ?: boolean
    public title   ?: boolean

    constructor( props : AttributeInterface ){
        
        Object.assign( this, props )
        
        this.id = props.id || crypto.randomUUID()
    }

    bind( attributeName: keyof Attribute, value: string | number | boolean  ){

        Object.assign( this, { [attributeName] : value })

    }

    getPossibleAttribute( attr: string ){
        return this[ attr as keyof Attribute ] as number | string | undefined
    }

    removeAttribute = ( attributeName: keyof Attribute ) => delete this[ attributeName ]
    
    public static parseAttributes( attrStr: string ){
        
        const attr = new Attribute({})
        
        const attrRejex = /(!?)(\w+)(=(["'])(.*?)\4)?/g

        let match

        while ( match = attrRejex.exec( attrStr ) ) {

            const isNegaded = match[1] === '!'

            let attributeName = match[2] as keyof Attribute

            if( match[5] !== undefined ) {

                const number = Number( match[5] )

                let content:string | number = match[5]

                if( !isNaN( number ) ) content = number

                attr.bind( attributeName, content )
            }
            else attr.bind( attributeName, !isNegaded )

        }

        return attr
    }

}

export default Attribute