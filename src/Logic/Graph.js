export default class Graph{
    constructor(nodes = [], edges = []){
        this.nodes = nodes
        this.edges = edges
    }

    toObject(){
        let edgesObject = []
        let nodesObject = []

        this.nodes.forEach(node => {
            nodesObject.push(node.toObject())
        })

        this.edges.forEach(edge => {
            edgesObject.push(edge.toObject())
        })

        return { 
            nodes: nodesObject,
            edges: edgesObject
        }
    }
}