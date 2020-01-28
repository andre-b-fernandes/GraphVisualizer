import React, { Component } from 'react'
import { Panel, Button } from 'reactbulma'
import GraphModelSelect, {REGULAR_GRAPH_KEY, RANDOM_GRAPH_GILBERT_KEY, RANDOM_GRAPH_ERDOS_KEY, SMALL_WORLD_GRAPH_KEY, SELECTED_GRAPH_KEY} from './GraphModelSelect'
import GraphNodesSelect, {INITIAL_STATE_NODES} from './GraphNodesSelect'
import GraphConfigurationSelect from './GraphConfigurationSelect'

import {INITIAL_STATE_GILBERT} from './GraphGilbertSelect'
import {INITIAL_STATE_ERDOS} from './GraphErdosRenySelect'
import {INITIAL_STATE_SMALL_WORLD} from './GraphSmallWorldSelect'

var SELECTED_TAB_MODEL_KEY = "graph_model";
var SELECTED_TAB_CONFIGURATION_KEY = "graph_configuration";
var SELECTED_TAB_NODES_KEY = "graph_nodes";

var KEY_NAME_MODEL = "model";
var KEY_NAME_CONFIGURATION = "configuration";
var KEY_NAME_NODES = "nodes";

export default class GraphParameters extends Component {
    constructor(props) {
        super(props);
        this.updateParameters = this.updateParameters.bind(this)
        this.initialStates = {}
        this.initialStates[REGULAR_GRAPH_KEY] = undefined;
        this.initialStates[RANDOM_GRAPH_GILBERT_KEY] = INITIAL_STATE_GILBERT;
        this.initialStates[RANDOM_GRAPH_ERDOS_KEY] = INITIAL_STATE_ERDOS;
        this.initialStates[SMALL_WORLD_GRAPH_KEY] = INITIAL_STATE_SMALL_WORLD
        this.state = {
            parameters : {},
            selectedTab : SELECTED_TAB_MODEL_KEY,
        }
    }

    componentDidMount(){
        this.updateParameters(KEY_NAME_MODEL, SELECTED_GRAPH_KEY)
        this.setState( prevState => {
            let parameters = Object.assign({}, prevState.parameters)
            parameters[KEY_NAME_NODES] = INITIAL_STATE_NODES;
            return {parameters}
        }, () => {
            this.props.updateGraph(this.state.parameters)
        })
    }

    updateParameters(key, value){
        this.setState( prevState => {
            let parameters = Object.assign({}, prevState.parameters)
            parameters[key] = value;
            if (key === KEY_NAME_MODEL) {
                parameters[KEY_NAME_CONFIGURATION] = this.initialStates[value]
            }
            return {parameters}
        })
    }

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    Parameters
                </Panel.Heading>
                <Panel.Tabs>
                    <Panel.Tab onClick={() => this.setState({selectedTab: SELECTED_TAB_MODEL_KEY})} active={this.state.selectedTab === SELECTED_TAB_MODEL_KEY}>
                        Graph Model
                    </Panel.Tab>
                    <Panel.Tab onClick={() => this.setState({selectedTab: SELECTED_TAB_CONFIGURATION_KEY})} active={this.state.selectedTab === SELECTED_TAB_CONFIGURATION_KEY}> 
                        Graph Configuration
                    </Panel.Tab>
                    <Panel.Tab onClick={() => this.setState({selectedTab: SELECTED_TAB_NODES_KEY})} active={this.state.selectedTab === SELECTED_TAB_NODES_KEY}>
                        Number of Nodes
                    </Panel.Tab>
                </Panel.Tabs>
                <GraphModelSelect keyName={KEY_NAME_MODEL} hidden={this.state.selectedTab !== SELECTED_TAB_MODEL_KEY} updateParameterInformation = {this.updateParameters}></GraphModelSelect>
                <GraphNodesSelect keyName={KEY_NAME_NODES}  hidden={this.state.selectedTab !== SELECTED_TAB_NODES_KEY} updateParameterInformation = {this.updateParameters} ></GraphNodesSelect>
                <GraphConfigurationSelect maxEdges={this.state.parameters[KEY_NAME_NODES] - 1} keyName={KEY_NAME_CONFIGURATION} model={this.state.parameters[KEY_NAME_MODEL]} hidden={this.state.selectedTab !== SELECTED_TAB_CONFIGURATION_KEY} updateParameterInformation = {this.updateParameters}></GraphConfigurationSelect>
                <Button primary fullwidth onClick={()=> { this.props.updateGraph(this.state.parameters)}}> Run </Button>
            </Panel>
        )
    }
}