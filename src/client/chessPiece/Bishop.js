import { Piece } from "./Piece";

class Bishop extends Piece {
  constructor(x, z, rotation, color, scene) {
    super();
    this.name = "bishop";
    this.load(x, z, rotation, 0.85, color, scene);
  }
}

export { Bishop };
