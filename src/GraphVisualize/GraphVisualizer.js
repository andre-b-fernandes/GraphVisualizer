import React, {Component} from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

export var NODE_WIDTH = 20
export var NODE_HEIGHT = 20
export var EDGE_WIDTH = 10 

export default class GraphVisualizer extends Component{
    render(){
        //console.log(this.props.graph)
        return(
        <div id="graph" style={{borderStyle:"solid"}}>
            <CytoscapeComponent  
                elements={CytoscapeComponent.normalizeElements( this.props.graph.toObject())}
                style={ { height: this.props.height + "px" } }
                wheelSensitivity = {0.1}
            />
        </div>
)
    }
}


// {
//     nodes: [
//         { data: { id: 'one', label: 'Node 1' }, position: { x: 50, y: 50 } },
//         { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 50 } }
//     ],
//     edges: [
//         {
//             data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' }
//         }
//     ]
// }