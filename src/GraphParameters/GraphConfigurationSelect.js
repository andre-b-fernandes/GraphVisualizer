import React,{Component} from 'react'
import {Panel} from 'reactbulma'
import GraphGilbertSelect from './GraphGilbertSelect'
import GraphSmallWorldSelect from './GraphSmallWorldSelect'

import {REGULAR_GRAPH_KEY, RANDOM_GRAPH_GILBERT_KEY, SMALL_WORLD_GRAPH_KEY} from './GraphModelSelect'

export default class GraphConfigurationSelect extends Component{
    render(){
        return(
            <div hidden={this.props.hidden}>
                <GraphGilbertSelect keyName={this.props.keyName} hidden={this.props.model !== RANDOM_GRAPH_GILBERT_KEY} updateParameterInformation = {this.props.updateParameterInformation}> </GraphGilbertSelect>
                <GraphSmallWorldSelect keyName={this.props.keyName} hidden={this.props.model !== SMALL_WORLD_GRAPH_KEY} updateParameterInformation = {this.props.updateParameterInformation} maxEdges={this.props.maxEdges}></GraphSmallWorldSelect>
                <div hidden={this.props.model !== REGULAR_GRAPH_KEY}>
                    <Panel.Block >
                        No additional configuration needed.
                    </Panel.Block>   
                </div>
            </div>
        )
    }

}