import { Piece } from "./Piece";

class Knight extends Piece {
  constructor(x, z, rotation, color, scene) {
    super();
    this.name = "knight";
    this.load(x, z, rotation, 0.85, color, scene);
  }
}

export { Knight };
