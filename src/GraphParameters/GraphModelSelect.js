import React from 'react'
import { Panel, Checkbox } from 'reactbulma'
import GraphSelect from './GraphSelect'

export var REGULAR_GRAPH_KEY = "RegularGraph";
export var RANDOM_GRAPH_GILBERT_KEY = "RandomGraphGilbert";
export var SMALL_WORLD_GRAPH_KEY = "SmallWorldGraph";
export var SELECTED_GRAPH_KEY = REGULAR_GRAPH_KEY;

export default class GraphSelectModel extends GraphSelect {
    constructor(props) {
        super(props);
        this.state = {
            selected: SELECTED_GRAPH_KEY
        }
    }

    render() {
        return (
            <div hidden = {this.props.hidden}>
                <Panel.Block>
                    <Checkbox onChange={() => this.updateSelected(RANDOM_GRAPH_GILBERT_KEY)} checked={this.state.selected === RANDOM_GRAPH_GILBERT_KEY} >Random Graph - Edgar Gilbert</Checkbox>
                </Panel.Block>
                <Panel.Block>
                    <Checkbox onChange={() => this.updateSelected(REGULAR_GRAPH_KEY)} checked={this.state.selected === REGULAR_GRAPH_KEY}>Regular Graph</Checkbox>
                </Panel.Block>
                <Panel.Block>
                    <Checkbox onChange={() => this.updateSelected(SMALL_WORLD_GRAPH_KEY)} checked={this.state.selected === SMALL_WORLD_GRAPH_KEY}>Small World Graph</Checkbox>
                </Panel.Block>
            </div>
        )
    }
}