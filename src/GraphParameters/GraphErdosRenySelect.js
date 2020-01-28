import React from 'react'
import {Panel} from 'reactbulma'

import GraphSelect from './GraphSelect'

export var INITIAL_STATE_ERDOS = 0;

export default class GraphErdosRenySelect extends GraphSelect{
    constructor(props){
        super(props);
        this.state = {
            selected: INITIAL_STATE_ERDOS
        }
    }

    render(){
        return(
            <div hidden={this.props.hidden}>
                <Panel.Block>
                    Number of Edges.
                </Panel.Block>
                <Panel.Block>
                    <input id="sliderNumEdges" onChange={event => { this.updateSelected(parseInt(event.target.value)) }} className="slider has-output is-fullwidth is-info" step="1" min="0" max={"" + this.props.maxEdges} value={"" + this.state.selected} type="range"></input>
                    <output htmlFor="sliderNumEdges">{this.state.selected} </output>
                </Panel.Block>
            </div>
        )
    }
}