import { PiecesEnum as Piece, PieceColorEnum } from "../constants";

const BlackFigures = {}; // czarne indexy wierszy 6-7
const WhiteFigures = {}; // białe indexy wierszy 0-1

Object.values(Piece).map(piece => {
  BlackFigures[piece] = { piece, color: PieceColorEnum.Black };
  WhiteFigures[piece] = { piece, color: PieceColorEnum.White };
});

const setMainRow = (pawnsRow, figures) => {
  pawnsRow[0] = pawnsRow[7] = figures[Piece.Rook];
  pawnsRow[1] = pawnsRow[6] = figures[Piece.Knight];
  pawnsRow[2] = pawnsRow[5] = figures[Piece.Bishop];
  pawnsRow[3] = figures[Piece.Queen];
  pawnsRow[4] = figures[Piece.King];
};

const createGameBoard = () => {
  const board = Points.map(row => row.map(() => 0));

  setMainRow(board[0], WhiteFigures);
  board[1] = board[1].map(p => WhiteFigures[Piece.Pawn]);
  board[6] = board[1].map(p => BlackFigures[Piece.Pawn]);
  setMainRow(board[7], BlackFigures);

  return board;
};

const getPossibleKingdMoves = ({ x, y }, board) => {
  const possibleMoves = [
    board[x + 1][y + 1],
    board[x + 1][y],
    board[x + 1][y - 1],
    board[x][y + 1],
    board[x][y - 1],
    board[x - 1][y - 1],
    board[x - 1][y],
    board[x - 1][y + 1]
  ];
  return possibleMoves.filter(field => field !== undefined);
};

const getPossibleKnightdMoves = ({ x, y }, board) => {
  const possibleMoves = [
    board[x + 1][y + 2],
    board[x + 1][y - 2],
    board[x + 2][y - 1],
    board[x - 2][y - 1],
    board[x + 2][y + 1],
    board[x - 2][y + 1],
    board[x - 1][y + 2],
    board[x - 1][y - 2]
  ];
  return possibleMoves.filter(field => field !== undefined);
};

const getPossibleRookdMoves = ({ x, y }, board) => {
  const possibleMoves = [];
  for (let i = x + 1; i < 8; ++i) {
    possibleMoves.push(board[i][y]);
    if (board[i][y] !== 0) break;
  }
  for (let i = x - 1; i >= 0; --i) {
    possibleMoves.push(board[i][y]);
    if (board[i][y] !== 0) break;
  }
  for (let j = y - 1; j >= 0; --j) {
    possibleMoves.push(board[x][j]);
    if (board[x][j] !== 0) break;
  }
  for (let j = y + 1; j < 8; ++j) {
    possibleMoves.push(board[x][j]);
    if (board[x][j] !== 0) break;
  }
  return possibleMoves;
};

const getPossibleBishopdMoves = ({ x, y }, board) => {
  const possibleMoves = [];
  for (let i = x + 1, j = y + 1; i < 8 && j < 8; ++i, ++j) {
    possibleMoves.push(board[i][j]);
    if (board[i][j] !== 0) break;
  }
  for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; --i, --j) {
    possibleMoves.push(board[i][j]);
    if (board[i][j] !== 0) break;
  }
  for (let i = x + 1, j = y - 1; i < 8 && j >= 0; ++i, --j) {
    possibleMoves.push(board[i][j]);
    if (board[i][j] !== 0) break;
  }
  for (let i = x - 1, j = y + 1; i >= 0 && j < 8; --i, ++j) {
    possibleMoves.push(board[i][j]);
    if (board[i][j] !== 0) break;
  }
  return possibleMoves;
};

const getPossibleQueenMoves = (point, board) => {
  return [
    ...getPossibleBishopdMoves(point, board),
    ...getPossibleRookdMoves(point, board)
  ];
};

const getPossiblePawnMovesColor = (frontOne, { x, y }, board) => {
  const possibleMoves = [];
  if (y === 1 && board[x][y + 2 * frontOne] === 0) {
    possibleMoves.push(board[x][y + 2 * frontOne]);
  }
  if (board[x][y + frontOne] === 0) {
    possibleMoves.push(board[x][y + frontOne]);
  }
  if (board[x + 1][y + frontOne] !== 0) {
    possibleMoves.push(board[x + 1][y + frontOne]);
  }
  if (board[x - 1][y + frontOne] !== 0) {
    possibleMoves.push(board[x - 1][y + frontOne]);
  }
  return possibleMoves.filter(field => field !== undefined);
};

const getPossiblePawnMoves = (color, point, board) => {
  return getPossiblePawnMovesColor(
    color === PieceColorEnum.White ? 1 : -1,
    point,
    board
  );
};

const getPossibleMoves = (figure, point, board) => {
  switch (figure.piece) {
    case Piece.King:
      return getPossibleKingdMoves(point, board);
    case Piece.Queen:
      return getPossibleQueenMoves(point, board);
    case Piece.Rook:
      return getPossibleRookdMoves(point, board);
    case Piece.Bishop:
      return getPossibleBishopdMoves(point, board);
    case Piece.Knight:
      return getPossibleKnightdMoves(point, board);
    case Piece.Pawn:
      return getPossiblePawnMoves(figure.color, point, board);
  }
};

class Board {
  board = createGameBoard();

  canMove = (figure, fromPoint, toField) => {
    const possibleMoves = getPossibleMoves(piece, fromPoint, this.board).filter(
      field => field.color !== figure.color
    );
    return possibleMoves.includes(toField);
  };
}

export default () => new Board();
