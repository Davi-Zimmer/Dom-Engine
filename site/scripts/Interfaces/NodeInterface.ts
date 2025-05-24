import Attribute from "../Components/Attribute.js"
import Node from "../Components/Node.js"
import Prop from "../Props/Prop.js"

interface NodeInterface {
    tag          :  string,
    attributes   ?: Attribute,
    children     ?: Node[],
    propInstance ?: Prop
}

export default NodeInterface