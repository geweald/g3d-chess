import { Piece } from './Piece'

class King extends Piece{
    
    constructor(x, z, rotation, color, scene){
        super();
        this.name = "king"; 
        this.load(x, z, rotation, 0.85, color, scene)
    }
}

export { King }