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
            let difference = Math.min(num_nodes - index, 4);
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
        this.mapFunctions[REGULAR_GRAPH_KEY] = this.generate_undirected_regular.bind(this)
        this.mapFunctions[RANDOM_GRAPH_GILBERT_KEY] = this.generate_gilbert_graph.bind(this)
    }

    generate_graph(model, configuration){
        return this.mapFunctions[model](configuration)
    }

    generate_edges(func){
        let nodes = [...this.nodes]
        let edges = []

        while(nodes.length > 1){
            let node = nodes[0]
            nodes.shift()
            nodes.forEach(another_node => {
                func(edges, nodes.length, node.id, another_node.id)
            });
        }

        return edges
    }


    generate_undirected_regular(_configuration) {
        let edges = this.generate_edges( (e, id, nodeID, anotherNodeID) => {
            e.push(new Edge(id, nodeID, anotherNodeID))
        });

        return new Graph(this.nodes, edges)
    }

    generate_gilbert_graph(probability){
        let edges = this.generate_edges( (e, id, nodeID, anotherNodeID) => {
            let random = Math.random()
            if (random < probability) {
                e.push(new Edge(id, nodeID, anotherNodeID))
            }
        });

        return new Graph(this.nodes, edges)
    }

}