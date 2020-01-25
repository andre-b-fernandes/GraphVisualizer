import React, { Component } from 'react'
import { Panel, Button } from 'reactbulma'
import GraphModelSelect from './GraphModelSelect'
import GraphNodesSelect from './GraphNodesSelect'
import GraphConfigurationSelect from './GraphConfigurationSelect'

var SELECTED_TAB_MODEL_KEY = "graph_model";
var SELECTED_TAB_CONFIGURATION_KEY = "graph_configuration";
var SELECTED_TAB_NODES_KEY = "graph_nodes";

var KEY_NAME_MODEL = "model";
var KEY_NAME_CONFIGURATION = "configuration";
var KEY_NAME_NODES = "nodes";

export default class GraphParameters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parameters : {},
            selectedTab : SELECTED_TAB_MODEL_KEY
        }
        this.updateParameters = this.updateParameters.bind(this)
    }

    updateParameters(key, value){
        this.setState( prevState => {
            let parameters = Object.assign({}, prevState.parameters)
            parameters[key] = value;
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
                <GraphConfigurationSelect keyName={KEY_NAME_CONFIGURATION} model={this.state.parameters[KEY_NAME_MODEL]} hidden={this.state.selectedTab !== SELECTED_TAB_CONFIGURATION_KEY} updateParameterInformation = {this.updateParameters}></GraphConfigurationSelect>
                <Button primary fullwidth> Run </Button>
            </Panel>
        )
    }
}