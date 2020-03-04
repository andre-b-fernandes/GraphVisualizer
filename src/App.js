import React, { Component } from 'react'
import { Hero, Container, Title, SubTitle, Checkbox} from 'reactbulma'
import GraphParameters from './GraphParameters/GraphParameters'
import GraphVisualizer, {NODE_HEIGHT} from './GraphVisualize/GraphVisualizer'
import GraphFactory from './Logic/GraphFactory'
import Graph from './Logic/Graph'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      parameters : {},
      hidden: false,
      graph: new Graph(),
      height: 0,
      path: []
    }
    this.updateGraph = this.updateGraph.bind(this)
    this.updateDjikstra = this.updateDjikstra.bind(this)
  }

  updateGraph(value){
    this.setState({ parameters: value}, () =>{
      let height = this.state.parameters.nodes * NODE_HEIGHT + 500
      let gf = new GraphFactory(this.state.parameters.nodes, { height: height, width: document.getElementById('root').clientWidth })
      let graph = gf.generateGraph(this.state.parameters.model, this.state.parameters.configuration)
      graph.dijkstra(this.state.parameters.djikstra.src)
      console.log(graph)
      this.setState({height: height, graph : graph})
    })
  }

  updateDjikstra(dj){
    if (dj.src !== this.state.parameters.djikstra.src) {
        this.setState(prevState => {
          let parameters = Object.assign({}, prevState.parameters)
          parameters.djikstra = {
            src: dj.src,
            dest: dj.dest
          };
          return { parameters }
        }, ()=>{
            this.state.graph.dijkstra(dj.src)            
        })
    }
    this.state.graph.pathToDest(dj.dest)
    this.setState({
        graph: this.state.graph
    })
    console.log("here")
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
        <GraphParameters hidden={this.state.hidden} updateGraph={this.updateGraph} updateDjikstra={this.updateDjikstra}></GraphParameters>
        <Checkbox onClick={() => { this.setState({ hidden: !this.state.hidden }) }}> Hide </Checkbox>
        <GraphVisualizer path={this.state.path} graph={this.state.graph} height={this.state.height}></GraphVisualizer>
      </div>
    )
  }
}