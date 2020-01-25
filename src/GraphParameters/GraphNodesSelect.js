import React from 'react'
import GraphSelect from './GraphSelect'

import 'bulma-slider/dist/css/bulma-slider.min.css'
import 'bulma-slider/dist/js/bulma-slider.min.js'

export default class GraphNodesSelect extends GraphSelect{
    constructor(props){
        super(props);
        this.state = {
            selected : 50
        }
    }

    render(){
        return(
            <div hidden ={this.props.hidden}>
                <input id="sliderNodes" onChange={event =>{ this.updateSelected(event.target.value)}} className="slider has-output is-fullwidth is-info" step="1" min="0" max="100" value={"" + this.state.selected} type="range"></input>
                <output htmlFor="sliderNodes">{this.state.selected} </output>
            </div>
        )
    }
}