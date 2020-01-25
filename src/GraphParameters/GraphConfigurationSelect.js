import React,{Component} from 'react'
import GraphGilbertSelect from './GraphGilbertSelect'

import {REGULAR_GRAPH_KEY, RANDOM_GRAPH_GILBERT_KEY, RANDOM_GRAPH_ERDOS_KEY, SMALL_WORLD_GRAPH_KEY} from './GraphModelSelect'

export default class GraphConfigurationSelect extends Component{
    render(){
        return(
            <div hidden={this.props.hidden}>
                <GraphGilbertSelect keyName={this.props.keyName} hidden={this.props.model !== RANDOM_GRAPH_GILBERT_KEY} updateParameterInformation = {this.props.updateParameterInformation}> </GraphGilbertSelect>
            </div>
        )
    }

}