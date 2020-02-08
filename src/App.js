import React, { Component } from 'react'
import { Hero, Container, Title, SubTitle} from 'reactbulma'
import GraphParameters from './GraphParameters/GraphParameters'
import GraphVisualizer, {NODE_HEIGHT} from './GraphVisualize/GraphVisualizer'
import GraphFactory from './Logic/GraphFactory'
import Graph from './Logic/Graph'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      parameters : {},
      graph: new Graph(),
      height: 0
    }
    this.updateGraph = this.updateGraph.bind(this)
  }

  updateGraph(value){
    this.setState({ parameters: value}, () =>{
      let height = this.state.parameters.nodes * NODE_HEIGHT + 500
      let gf = new GraphFactory(this.state.parameters.nodes, { height: height, width: document.getElementById('root').clientWidth })
      this.setState({height: height, graph : gf.generateGraph(this.state.parameters.model, this.state.parameters.configuration)})
    })
  }

  render() {
    return (
      <div>
        <Hero primary small bold>
          <Hero.Body>
            <Container>
              <Title>
                Graph Visualizer
              </Title>
              <SubTitle>
                Use the tools below to select the type of graph and its parameters.
              </SubTitle>
            </Container>
          </Hero.Body>
        </Hero>
        <GraphParameters updateGraph={this.updateGraph}></GraphParameters>
        <GraphVisualizer graph={this.state.graph} height={this.state.height}></GraphVisualizer>
      </div>
    )
  }
}