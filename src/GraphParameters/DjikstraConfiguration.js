import React from 'react'
import { Panel,Button } from 'reactbulma'

import 'bulma-slider/dist/css/bulma-slider.min.css'
import 'bulma-slider/dist/js/bulma-slider.min.js'

import GraphSelect from './GraphSelect'

export var DJIKSTRA_NODE_KEY = "DJIKSTRA_NODE_INFO"
export var DJIKSTRA_SRC_KEY = "src"
export var DJIKSTRA_DEST_KEY = "dest"
export var INITIAL_STATE_DJIKSTRA = {
    [DJIKSTRA_SRC_KEY]: 0,
    [DJIKSTRA_DEST_KEY]: 1
}

export default class DijkstraConfiguration extends GraphSelect{
    constructor(props){
        super(props)
        this.state = INITIAL_STATE_DJIKSTRA
    }

    updateNodeInfo(key, value){
        this.setState({
            [key]:value
        }, ()=> {
            this.updateSelected( this.state )
        })
    }

    render(){
        return(
            <div hidden = {this.props.hidden}>
                <Panel.Block>
                    Source Node.
                </Panel.Block>                
                <Panel.Block>
                    <input id="sliderNodeSrc" onChange={event =>{ this.updateNodeInfo( DJIKSTRA_SRC_KEY, parseInt(event.target.value))}} className="slider has-output is-fullwidth is-info" step="1" min="0" max={this.props.maxNodes} value={"" + this.state[DJIKSTRA_SRC_KEY]} type="range"></input>
                    <output htmlFor="sliderNodeSrc">{this.state[DJIKSTRA_SRC_KEY]} </output>
                </Panel.Block>
                <Panel.Block>
                    Destination Node.
                </Panel.Block>
                <Panel.Block>
                    <input id="sliderNodeDest" onChange={event =>{ this.updateNodeInfo( DJIKSTRA_DEST_KEY, parseInt(event.target.value))}} className="slider has-output is-fullwidth is-info" step="1" min="0" max={this.props.maxNodes} value={"" + this.state[DJIKSTRA_DEST_KEY]} type="range"></input>
                    <output htmlFor="sliderNodeDest">{this.state[DJIKSTRA_DEST_KEY]} </output>
                </Panel.Block>
                <Panel.Block>
                    <Button fullwidth primary onClick={() => this.props.updateDjikstra(this.state)} outlined > Run djikstra</Button>
                </Panel.Block>
                
                
            </div>
        )
    }
}