import React from 'react'
import {Panel} from 'reactbulma'

import GraphSelect from './GraphSelect'

export var INITIAL_STATE_SMALL_WORLD = {
    meanDegree: 0,
    beta: 0.5
}

export default class GraphSmallWorldSelect extends GraphSelect{
    constructor(props){
        super(props);
        this.state={
            selected: INITIAL_STATE_SMALL_WORLD
        }
    }

    updateSelectedSmallWorld(key,value){
        this.setState( prevState => {
            let selected = Object.assign({}, prevState.selected)
            selected[key] = value;
            return {selected}
        }, () => {
            this.updateSelected(this.state.selected)
        } )
    }

    render(){
        return(
            <div hidden = {this.props.hidden}>
                <Panel.Block>
                    Mean Degree.
                </Panel.Block>
                <Panel.Block>
                    <input id="sliderDegree" onChange={event =>{ this.updateSelectedSmallWorld("meanDegree", parseInt(event.target.value))}} className="slider has-output is-fullwidth is-info" step="1" min="0" max={"" + this.props.maxEdges} value={"" + this.state.selected.meanDegree} type="range"></input>
                    <output htmlFor="sliderDegree">{this.state.selected.meanDegree} </output>
                </Panel.Block>
                <Panel.Block>
                    Beta.
                </Panel.Block>
                <Panel.Block>
                    <input id="sliderBeta" onChange={event =>{ this.updateSelectedSmallWorld("beta", parseFloat(event.target.value))}} className="slider has-output is-fullwidth is-info" step="0.1" min="0" max="1" value={"" + this.state.selected.beta} type="range"></input>
                    <output htmlFor="sliderBeta">{this.state.selected.beta} </output>
                </Panel.Block>
            </div>
        )
    }

}