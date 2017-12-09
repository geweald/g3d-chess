import { PiecesEnum } from "../constants";

class Player {
  constructor() {
    this.pieces = {
      [PiecesEnum.King]: 1,
      [PiecesEnum.Queen]: 1,
      [PiecesEnum.Rook]: 2,
      [PiecesEnum.Bishop]: 2,
      [PiecesEnum.Knight]: 2,
      [PiecesEnum.Pawn]: 8
    };
  }
}

export default () => new Player();
