export interface AttributeTypeInterface {
    id      ?: string
    for     ?: string
    repeat  ?: number
    src     ?: string
    class   ?: string
    script  ?: string
    content ?: string
    prop    ?: boolean
}

export interface AttributeType extends AttributeTypeInterface{
 
    constructor( props : AttributeTypeInterface ) : AttributeType

    bind( attributeName: keyof AttributeType, value: string | number | boolean  ) : void

    removeAttribute( attributeName: string ): void

    addAttirute( attrName: string, value: any ): void
}