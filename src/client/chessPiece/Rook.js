import { Piece } from './Piece'

class Rook extends Piece{
    
    constructor(x, z, rotation, color, scene){
        super();
        this.name = "rook"; 
        this.load(x, z, rotation, 0.85, color, scene)
    }
}

export { Rook }