var MIN_EDGE_WEIGHT = 0
var MAX_EDGE_WEIHT = 100

export default class Edge{
    constructor(nodeOutID, nodeInID, weight = Math.floor(Math.random() * (MAX_EDGE_WEIHT - MIN_EDGE_WEIGHT + 1) + MIN_EDGE_WEIGHT)){
        this.weight = weight
        this.nodeOutID = nodeOutID
        this.nodeInID = nodeInID
    }

    toObject(){
        return {
            data: {
                source: this.nodeOutID,
                target: this.nodeInID,
                label: this.weight 
            }
        }
    }
}