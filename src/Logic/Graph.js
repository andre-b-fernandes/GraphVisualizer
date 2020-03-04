import PriorityQueue from './PriorityQueue'

export default class Graph{
    constructor(nodes = [], edges = []){
        this.nodes = nodes
        this.edges = edges
        this.path = []
        this.matrix = new Array(this.nodes.length).fill(undefined).map(() => new Array(this.nodes.length).fill(undefined));
        edges.forEach(edge => {
            this.matrix[edge.nodeInID][edge.nodeOutID] = edge
            this.matrix[edge.nodeOutID][edge.nodeInID] = edge
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

    neighbors(nodeID){
        let row = this.matrix[nodeID]
        let nb = []
        for (let index = 0; index < row.length; index++) {
            const element = row[index];
            if (index !== nodeID && element !== undefined) {
                nb.push(index)
            }
        }
        return nb
    }


    dijkstra(src){
        let Q = new PriorityQueue()
        let dist = {}
        let prev = {}
        
        this.nodes.forEach(node => {
            dist[node.id] = Number.MAX_VALUE
            prev[node.id] = undefined
        })
        
        dist[src] = 0
        Q.enqueue(src, 0)

        while (!Q.isEmpty()) {
            let minNodeID = Q.dequeue().element
            let neighbours = this.neighbors(minNodeID)
            neighbours.forEach(neighbor => {
                let weight = this.matrix[minNodeID][neighbor].weight
                let alt = dist[minNodeID] + weight
                if (alt < dist[neighbor]) {                    
                    dist[neighbor] = alt
                    prev[neighbor] = minNodeID
                    Q.enqueue(neighbor, dist[neighbor])
                }
            })
        }
        let result = [dist,prev]
        this.djikstraResult = {
            dist: dist,
            prev: prev
        }
        return result;
    }

    pathToDest(dest){
        for (let index = 0; index < this.path.length - 1; index++) {
            const node = this.path[index];
            const nextNode = this.path[index + 1];
            this.matrix[node][nextNode].selected = false
        }
        let path = []
        path.push(dest)
        let node = this.djikstraResult.prev[dest]
        while (node !== undefined) {
            path.push(node)
            node = this.djikstraResult.prev[node]
        }
        this.path = path.reverse()
        console.log(this.path)
        for (let index = 0; index < this.path.length - 1; index++) {
            const node = this.path[index];
            const nextNode = this.path[index + 1];
            this.matrix[node][nextNode].selected = true
        }
    }
}