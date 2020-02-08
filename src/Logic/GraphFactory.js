import Edge from './Edge'
import Node from './Node'
import Graph from './Graph'
import {RANDOM_GRAPH_ERDOS_KEY, RANDOM_GRAPH_GILBERT_KEY, REGULAR_GRAPH_KEY, SMALL_WORLD_GRAPH_KEY} from '../GraphParameters/GraphModelSelect'

export default class GraphFactory{
    constructor(num_nodes, dimensions){   
        let center_x = dimensions.width/2;
        let center_y = dimensions.height/2;
        let margin_width = dimensions.width/8;

        let angle_step = 2*Math.PI/num_nodes;
        let angle = 0
        let radius = (dimensions.width - 2*margin_width)/2

        this.nodes = []

        for (let index = 0; index < num_nodes; index+= 4) {
            let difference = Math.min((num_nodes) - index, 4);
            let step = 2*Math.PI/difference 
            // create 4 at each time
            let auxiliary_angle = angle
            let auxiliary_index = index
            let indexes = []
            while (difference > 0) {
                indexes.push(auxiliary_index)
                this.nodes.push(new Node(auxiliary_index, center_x + radius * Math.cos(auxiliary_angle), center_y + radius * Math.sin(auxiliary_angle)))
                auxiliary_angle += step
                auxiliary_index++
                difference--;
            }
            angle += angle_step
        }
        this.mapFunctions = {}
        this.mapFunctions[REGULAR_GRAPH_KEY] = this.generateUndirectedRegular.bind(this)
        this.mapFunctions[RANDOM_GRAPH_GILBERT_KEY] = this.generateRandomGilbert.bind(this)
        this.mapFunctions[SMALL_WORLD_GRAPH_KEY] = this.generateSmallWorld.bind(this)
    }

    generateGraph(model, configuration){
        return this.mapFunctions[model](configuration)
    }

    generateEdges(func){
        let nodes = [...this.nodes]
        let edges = []

        while(nodes.length > 1){
            let node = nodes[0]
            nodes.shift()
            nodes.forEach(another_node => {           
                func(edges, node.id, another_node.id)
            });
        }
        return edges
    }


    generateUndirectedRegular(_configuration) {
        let edges = this.generateEdges( (e, nodeID, anotherNodeID) => {
            e.push(new Edge(nodeID, anotherNodeID))
        });
        return new Graph(this.nodes, edges)
    }

    //G(n,p)
    generateRandomGilbert(probability){
        let edges = this.generateEdges( (e, nodeID, anotherNodeID) => {
            let random = Math.random()
            if (random < probability) {
                e.push(new Edge(nodeID, anotherNodeID))
            }
        });
        return new Graph(this.nodes, edges)
    }

    //Watts–Strogatz model
    generateSmallWorld(configuration){
        let meanDegree = configuration.meanDegree
        let probability = configuration.beta
        let edges = this.generateEdges((e, nodeID, anotherNodeID) => {
            let value = Math.abs(nodeID - anotherNodeID) % (this.nodes.length - meanDegree/2)
            if (value >= 0 && value <= meanDegree/2) {
                let edge = new Edge(nodeID, anotherNodeID)
                if (Math.random() < probability) {
                    let nodes = [...this.nodes]
                    if ((nodeID - meanDegree/2) < 0) {
                        nodes.splice(nodeID, meanDegree/2 + 1)
                        nodes.splice(nodes.length - meanDegree/2, meanDegree/2)
                    }
                    else{
                        nodes.splice(nodeID - meanDegree/2, meanDegree + 1)
                    }
                    edge.nodeInID = nodes[Math.floor(Math.random() * nodes.length)].id
                }
                e.push(edge)
            }
        })
        return new Graph(this.nodes, edges)
    }
}