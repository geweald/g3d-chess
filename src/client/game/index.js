import Board from "./GameBoard";
import Scene from "../ThreeScene";
import * as io from "../api";
import { PieceColorEnum, COLORS, PiecesEnum } from "../constants";

class Game {
  selected = { figure: null, position: {} };
  started = false;
  isLocalTurn = false;
  onMoveCallbacks = [];
  onGameOverCallbacks = [];

  constructor(domElement) {
    this.board = Board();
    this.scene = Scene();

    this.scene.init(domElement, this.board);
    this.scene.subscribeOnClick(this.fieldChosen);

    io.onOponentMoved(({ fromPoint, toPoint }) => {
      this.moveFigure(fromPoint, toPoint);
    });

    io.onStart(isMyTurn => {
      console.log("Game started, your are " + (isMyTurn ? "white." : "black."));
      this.resetGame();

      this.localColor = isMyTurn ? PieceColorEnum.White : PieceColorEnum.Black;
      this.isLocalTurn = isMyTurn;
    });

    io.onOponentLeft(() => {
      this.started = false;
    });
  }

  fieldChosen = position => {
    if (!this.isLocalTurn || !this.started) return;

    const figure = this.board.getFigure(position);
    if (this.board.isFigure(position) && figure.color === this.localColor) {
      if (figure.color === this.localColor) {
        if (this.selected.figure) {
          this.scene.updatePionColor(
            this.selected.position,
            COLORS.piece[this.localColor]
          );
        }
        this.selected = { figure, position };
        this.scene.updatePionColor(
          position,
          COLORS.pieceSelected[this.localColor]
        );
      }
    } else if (
      this.selected.figure &&
      this.board.canMove(this.selected.position, position)
    ) {
      this.moveFigure(this.selected.position, position);
      this.scene.updatePionColor(position, COLORS.piece[this.localColor]);
      this.selected.figure = null;

      io.emitMove({ fromPoint: this.selected.position, toPoint: position });
      this.onMoveCallbacks.forEach(cb => cb());
    }
  };

  moveFigure = (from, to) => {
    const toField = this.board.getFigure(to);
    const { success, killed } = this.board.tryMoveFigure(from, to);
    if (!success) return;

    if (killed) {
      this.scene.updatePioPosition(to, { x: 1000, y: 1000 });
      if (toField.piece === PiecesEnum.King) {
        const isWinner = this.localColor === toField.color;
        io.emitGameOver();
        this.onGameOverCallbacks.forEach(cb => cb(isWinner));
      }
    }
    this.scene.updatePioPosition(from, to);
    this.isLocalTurn = !this.isLocalTurn;
  };

  onLocalMove = callback => {
    this.onMoveCallbacks.push(callback);
  };

  onGameOver = callback => {
    this.onGameOverCallbacks.push(callback);
  };

  resetGame = () => {
    this.board.resetBoard();
    this.scene.reset(this.board);
    this.started = true;
  };
}

export default domElement => new Game(domElement);
