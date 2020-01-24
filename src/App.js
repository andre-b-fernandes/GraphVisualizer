import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'

export default class Demo extends Component {

  state = {
    w: 0,
    h: 0,
    elements: [
      { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
      { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
      { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ]
  }

  componentDidMount = () => {
    this.setState({
      w: window.innerWidth,
      h: window.innerHeight
    })
    this.setUpListeners()
  }

  setUpListeners = () => {
    this.cy.on('click', 'node', (event) => {
      console.log(event.target)
    })
  }

  render() {
    return (
      <div>
        <CytoscapeComponent
          elements={this.state.elements}
          style={{ width: this.state.w, height: this.state.h }}
          cy={(cy) => { this.cy = cy }}
        />
      </div>
    )
  }
}