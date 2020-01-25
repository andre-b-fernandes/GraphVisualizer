import React from 'react'
import { Panel, Checkbox } from 'reactbulma'
import GraphSelect from './GraphSelect'

export var REGULAR_GRAPH_KEY = "RegularGraph";
export var RANDOM_GRAPH_GILBERT_KEY = "RandomGraphGilbert";
export var RANDOM_GRAPH_ERDOS_KEY = "RandomGraphErdos";
export var SMALL_WORLD_GRAPH_KEY = "SmallWorldGraph";

export var KEY_NAME_MODEL = "model";

export default class GraphSelectModel extends GraphSelect {
    constructor(props) {
        super(props);
        this.state = {
            selected: REGULAR_GRAPH_KEY
        }
    }

    render() {
        return (
            <div hidden = {this.props.hidden}>
                <Panel.Block>
                    <Checkbox onChange={() => this.updateSelected(RANDOM_GRAPH_GILBERT_KEY)} checked={this.state.selected === RANDOM_GRAPH_GILBERT_KEY} >Random Graph - Edgar Gilbert</Checkbox>
                </Panel.Block>
                <Panel.Block>
                    <Checkbox onChange={() => this.updateSelected(RANDOM_GRAPH_ERDOS_KEY)} checked={this.state.selected === RANDOM_GRAPH_ERDOS_KEY} >Random Graph - Erdős–Rényi</Checkbox>
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