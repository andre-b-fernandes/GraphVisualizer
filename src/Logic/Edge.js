export default class Edge{
    constructor(id, node_out_id, node_in_id, weight = 0){
        this.id = id
        this.weight = weight
        this.node_out_id = node_out_id
        this.node_in_id = node_in_id
    }

    toObject(){
        return {
            data: {
                source: this.node_out_id,
                target: this.node_in_id,
                label: "Edge from Node " + this.node_out_id + " to Node " + this.node_in_id 
            }
        }
    }
}