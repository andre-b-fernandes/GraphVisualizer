export default class Graph{
    constructor(nodes = [], edges = []){
        this.nodes = nodes
        this.edges = edges
        this.matrix = new Array(this.nodes.length).fill(undefined).map(() => new Array(this.nodes.length).fill(undefined    ));
        edges.forEach(edge => {
            this.matrix[edge.nodeInID][edge.nodeOutID] = edge.weight
            this.matrix[edge.nodeOutID][edge.nodeInID] = edge.weight
        })
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


    dijkstra(src){
        let Q = []
        let dist = []
        let prev = []
        
        this.nodes.forEach(node => {
            dist[node.id] = Number.MAX_VALUE
            prev[node.id] = undefined
            Q.push(node)
        })
        
        dist[src] = 0

        while (Q.length > 0) {
            let minNodeID = dist.indexOf(Math.min(...dist))
            Q.splice(minNodeID, 1)
            let neighbours = this.matrix[minNodeID]
            for (let index = 0; index < neighbours.length; index++) {
                let weight = neighbours[index]
                let alt = dist[minNodeID] + weight
                if (alt < dist[index]) {
                    dist[index] = alt
                    prev[index] = minNodeID
                }
            }
        }
        return [dist,prev];
    }
}