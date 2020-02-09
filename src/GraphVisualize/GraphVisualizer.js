import React, {Component} from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

export var NODE_WIDTH = 20
export var NODE_HEIGHT = 20
export var EDGE_WIDTH = 10 

export default class GraphVisualizer extends Component{
    render(){
        return(
        <div id="graph" style={{borderStyle:"solid"}}>
            <CytoscapeComponent  
                elements={CytoscapeComponent.normalizeElements( this.props.graph.toObject())}
                style={ { height: this.props.height + "px" } }
                wheelSensitivity = {0.1}
                layout = {{
                  name : 'random'
                }}
                stylesheet={[
                    {
                      selector: 'node[label]',
                      style: {
                        width: 60,
                        height: 60,
                        label: "data(label)",
                        "background-color": "black"
                      }
                    },
                    {
                      selector: 'edge[label]',
                      style: {
                        width: 5,
                        label: "data(label)",
                        "edge-text-rotation" : "autorotate",
                        "line-color": "red",
                        "font-size": "50"
                      }
                    },
                    {
                      selector: '.active',
                      style:{
                        "line-color": "blue"
                      }
                    }
                ]}
            />
        </div>
      )
    }
}