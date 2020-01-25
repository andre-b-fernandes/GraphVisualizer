import React, { Component } from 'react'
import { Hero, Container, Title, SubTitle} from 'reactbulma'
import GraphParameters from './GraphParameters/GraphParameters'

export default class App extends Component {
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
        <GraphParameters></GraphParameters>
      </div>
    )
  }
}