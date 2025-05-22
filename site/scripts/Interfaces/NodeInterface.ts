import Attribute from "../Components/Attribute.js"
import Node from "../Components/Node.js"

interface NodeInterface {
    tag        :  string,
    attributes ?: Attribute,
    children   ?: Node[]
}

export default NodeInterface