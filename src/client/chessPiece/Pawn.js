import { Piece } from './Piece'

class Pawn extends Piece{
    
    constructor(x, z, rotation, color, scene){
        super();
        this.name = "pawn"; 
        this.load(x, z, rotation, 0.85, color, scene)
    }
}

export { Pawn }