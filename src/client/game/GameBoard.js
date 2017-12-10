import { PiecesEnum as Piece, PieceColorEnum, POINTS } from "../constants";

const pointToString = ({ x, y }) => `${x},${y}`;

const stringToPoint = s => {
  const [x, y] = s.split(",").map(a => Number(a));
  return { x, y };
};

const isPointOnBoard = ({ x, y }) => x < 8 && x >= 0 && y < 8 && y >= 0;

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
  const board = new Array(8).fill(0).map(() => new Array(8).fill(0));

  setMainRow(board[0], WhiteFigures);
  board[1] = board[1].map(p => WhiteFigures[Piece.Pawn]);
  board[6] = board[1].map(p => BlackFigures[Piece.Pawn]);
  setMainRow(board[7], BlackFigures);

  return board;
};

const getPossibleKingdMoves = ({ x, y }, board) => {
  const possibleMoves = [
    { x: x + 1, y: y + 1 },
    { x: x + 1, y: y },
    { x: x + 1, y: y - 1 },
    { x: x, y: y + 1 },
    { x: x, y: y - 1 },
    { x: x - 1, y: y - 1 },
    { x: x - 1, y: y },
    { x: x - 1, y: y + 1 }
  ];
  return possibleMoves;
};

const getPossibleKnightdMoves = ({ x, y }, board) => {
  const possibleMoves = [
    { x: x + 1, y: y + 2 },
    { x: x + 1, y: y - 2 },
    { x: x + 2, y: y - 1 },
    { x: x - 2, y: y - 1 },
    { x: x + 2, y: y + 1 },
    { x: x - 2, y: y + 1 },
    { x: x - 1, y: y + 2 },
    { x: x - 1, y: y - 2 }
  ];
  return possibleMoves;
};

const getPossibleRookdMoves = ({ x, y }, board) => {
  const possibleMoves = [];
  for (let i = x + 1; i < 8; ++i) {
    possibleMoves.push({ x: i, y: y });
    if (board[i][y] !== 0) break;
  }
  for (let i = x - 1; i >= 0; --i) {
    possibleMoves.push({ x: i, y: y });
    if (board[i][y] !== 0) break;
  }
  for (let j = y - 1; j >= 0; --j) {
    possibleMoves.push({ x: x, y: j });
    if (board[x][j] !== 0) break;
  }
  for (let j = y + 1; j < 8; ++j) {
    possibleMoves.push({ x: x, y: j });
    if (board[x][j] !== 0) break;
  }
  return possibleMoves;
};

const getPossibleBishopdMoves = ({ x, y }, board) => {
  const possibleMoves = [];
  for (let i = x + 1, j = y + 1; i < 8 && j < 8; ++i, ++j) {
    possibleMoves.push({ x: i, y: j });
    if (board[i][j] !== 0) break;
  }
  for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; --i, --j) {
    possibleMoves.push({ x: i, y: j });
    if (board[i][j] !== 0) break;
  }
  for (let i = x + 1, j = y - 1; i < 8 && j >= 0; ++i, --j) {
    possibleMoves.push({ x: i, y: j });
    if (board[i][j] !== 0) break;
  }
  for (let i = x - 1, j = y + 1; i >= 0 && j < 8; --i, ++j) {
    possibleMoves.push({ x: i, y: j });
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
  if (
    (x === 1 || x == 6) &&
    x + 2 * frontOne &&
    board[x + 2 * frontOne][y] === 0
  ) {
    possibleMoves.push({ x: x + 2 * frontOne, y: y });
  }
  if (x + frontOne < 8 && x + frontOne >= 0) {
    if (board[x + frontOne][y] === 0) {
      possibleMoves.push({ x: x + frontOne, y: y });
    }
    if (board[x + frontOne][y + 1] !== 0) {
      possibleMoves.push({ x: x + frontOne, y: y + 1 });
    }
    if (board[x + frontOne][y - 1] !== 0) {
      possibleMoves.push({ x: x + frontOne, y: y - 1 });
    }
  }
  return possibleMoves;
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

class GameBoard {
  board = createGameBoard();

  resetBoard = () => {
    this.board = createGameBoard();
  };

  canMove = (fromPoint, toPoint) => {
    const field = this.getFigure(fromPoint);
    if (field === 0) return false;

    const possibleMoves = getPossibleMoves(field, fromPoint, this.board).filter(
      point => {
        if (!isPointOnBoard(point)) return false;
        const pointField = this.getFigure(point);
        return pointField === 0 || pointField.color !== field.color;
      }
    );

    return possibleMoves
      .map(point => pointToString(point))
      .includes(pointToString(toPoint));
  };

  getFigures = color => {
    return this.board
      .reduce((a, r) => a.concat(r), [])
      .filter(figure => figure.color === color);
  };

  tryMoveFigure = (from, to) => {
    const canMove = this.canMove(from, to);
    let killed = false;

    if (canMove) {
      killed = Boolean(this.board[to.x][to.y]);
      this.board[to.x][to.y] = this.board[from.x][from.y];
      this.board[from.x][from.y] = 0;
    }
    return { success: canMove, killed };
  };

  getFigure = ({ x, y }) => this.board[x][y];

  isFigure = position => this.getFigure(position) !== 0;

  isChecked = color => {
    let kingPosition;
    this.board.forEach((row, i) => {
      row.forEach((piece, j) => {
        if (piece.color === color && piece.piece === Piece.King) {
          kingPosition = { x: i, y: j };
        }
      });
    });

    this.board.forEach((row, i) => {
      row.forEach((piece, j) => {
        const end = this.canMove({ x: i, y: j }, kingPosition);
        if (end) return true;
      });
    });
    return false;
  };
}

export default () => new GameBoard();
