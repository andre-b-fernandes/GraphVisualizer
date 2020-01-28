export default class Node{
    constructor(id, pos_x, pos_y){
        this.id = id
        this.x = pos_x
        this.y = pos_y
    }

    toObject(){
        return {
            data: {
                id: this.id,
                label: "Node " + this.id,
            },
            
            position: {
                x: this.x,
                y: this.y,
            }
        }
    }
}