import { Piece } from "./Piece";

class Queen extends Piece {
  constructor(x, z, rotation, color, scene) {
    super();
    this.name = "queen";
    this.load(x, z, rotation, 0.85, color, scene);
  }
}

export { Queen };
