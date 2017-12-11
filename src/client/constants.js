export const PieceColorEnum = {
  White: "White",
  Black: "Black"
};

export const PiecesEnum = {
  King: "King",
  Queen: "Queen",
  Rook: "Rook",
  Bishop: "Bishop",
  Knight: "Knight",
  Pawn: "Pawn"
};

export const CAMERA_LOOK_AT = {
  x: 3.5,
  y: 0,
  z: 3.5
};

export const COLORS = {
  piece: {
    [PieceColorEnum.White]: 0xffffff,
    [PieceColorEnum.Black]: 0x333333
  },
  pieceSelected: {
    [PieceColorEnum.White]: 0xff0000,
    [PieceColorEnum.Black]: 0xff0000
  },
  board: {
    White: 0xffffff,
    Black: 0x111111,
    Fundament: 0x000000
  }
};
