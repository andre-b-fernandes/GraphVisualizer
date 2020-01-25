import React from 'react'
import { Panel } from 'reactbulma'

import GraphSelect from './GraphSelect'

export default class GraphGilbertSelect extends GraphSelect {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0.5
        }
    }

    render() {
        return (
            <div hidden={this.props.hidden}>
                <Panel.Block>
                    Edge forming probability.
                </Panel.Block>
                <Panel.Block>
                    <input id="sliderProbability" onChange={event => { this.updateSelected(event.target.value) }} className="slider has-output is-fullwidth is-info" step="0.1" min="0" max="1" value={"" + this.state.selected} type="range"></input>
                    <output htmlFor="sliderProbability">{this.state.selected} </output>
                </Panel.Block>
            </div>
        )
    }
}