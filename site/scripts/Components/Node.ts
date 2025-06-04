import NodeInterface from "../Interfaces/NodeInterface.js"
import Get from "../Main/Utils/Get.js"
import loadFile from "../Main/Utils/LoadFile.js"
import NodeManager from "../Managers/NodeManager.js"
import Prop from "../Props/Prop.js"
import Attribute from "./Attribute.js"

class Node {

    private tag            : string
    private attributes    ?: Attribute
    private children       : Node[]
    private propInstance   : Prop | null
    private parentNode     : Node

    constructor( { tag, attributes, children, propInstance, parentNode } : NodeInterface ){

        this.tag          = tag
        this.attributes   = attributes
        this.children     = children || []
        this.propInstance = propInstance || null
        this.parentNode   = parentNode 

        const src = this.attributes?.src
        
        if( src ) {

            let forId = this.attributes?.for
            const name = this.attributes?.getPossibleAttribute('name') as string

            const id = this.attributes?.id!
            if( !forId ) {
                const parentFor = this.parentNode.attributes?.for

                if( !parentFor ){
                    throw new Error(`Erro de atributo> id do Node ${id}, tag:${this.tag}: O id do node no atributo "for" não foi encontrado.\n `)
                }

                forId = parentFor
            }

            if( !name ) {
                throw new Error(`É necessário informar o nome com o atributo "nome" no Node "${id}"`)
            }
            
            const node = NodeManager.getNodeById( forId )!

            if( !node.propInstance ) throw new Error(`Não é possível incorporar os dados de ${src} em um node sem prop (${node.tag}) `)

            const source = loadFile( src )

            if( !source ){
                throw new Error(`Fonte de arquivo não encontrada: ${src}`)
            }
        
            node.getPropInstance()?.addSource({ name, source })
        
        }
        
    }

    static Manager( node: Node ){
        
        // const tag = node.tag.toLowerCase()

    }

    bindAttributes = () => {
        const getAttr = this.attributes?.getPossibleAttribute.bind( this.attributes )

        if( !getAttr || !this.propInstance ) return

        const obj = {
            x: getAttr('x') as number,
            y: getAttr('y') as number,
            w: getAttr('w') as number,
            h: getAttr('h') as number,
            z: getAttr('z') as number
        }

        this.propInstance.updatePosition( obj )
    }

    getTag = () => this.tag 

    getAttributes = () => this.attributes

    setAttributes = ( attr: Attribute ) => { this.attributes = attr }

    getChildNodes = () => this.children

    setPropInstance = ( propInstance: Prop ) => { this.propInstance = propInstance }

    getPropInstance = () => this.propInstance

    getAllChilds = () => this.children

    appendChild = ( node: Node ) => { this.children.push( node ) }

    removeChild = ( node: Node ) => { this.children = this.children.filter( n => n !== node ) }

    getChild = ( node: Node ) => this.children.find( n => n === node)

    overrideChilds = ( nodes: Node[] ) => { this.children = nodes }

}

export default Node