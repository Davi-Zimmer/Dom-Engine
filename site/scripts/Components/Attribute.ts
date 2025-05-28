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

}

export default Attribute