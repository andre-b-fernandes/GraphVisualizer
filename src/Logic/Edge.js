export default class Edge{
    constructor(nodeOutID, nodeInID, weight = 0){
        this.weight = weight
        this.nodeOutID = nodeOutID
        this.nodeInID = nodeInID
    }

    toObject(){
        return {
            data: {
                source: this.nodeOutID,
                target: this.nodeInID,
                label: "Edge from Node " + this.nodeOutID + " to Node " + this.nodeInID 
            }
        }
    }
}