import * as THREE from "three";
import { DoubleSide, MeshBasicMaterial } from "three";
import { King } from "./King";
import { Bishop } from "./Bishop";
import { Queen } from "./Queen";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Rook } from "./Rook";
import { COLORS } from '../constants'
import { PiecesEnum as Piece, PieceColorEnum } from '../constants';

class Board {

  constructor(scale, position, gameBoard, scene) {
    this.pieces = [];
    this.initPieces(gameBoard, scene);
    this.board = new Array(8);

    for (var i = 0; i < this.board.length; ++i) {
      this.board[i] = new Array(8);
      for (let j = 0; j < this.board[i].length; ++j) {

        const fieldPosition = {
          x: position.x + scale * i,
          y: position.y,
          z: position.z + scale * j
        };

        if ((i + j) % 2 === 0)
          this.board[i][j] = this.blackField(fieldPosition, scale * 0.95);
        else this.board[i][j] = this.whiteField(fieldPosition, scale * 0.95);
      }
    }

    const boardFoundamentGeometry = new THREE.CubeGeometry(8.2 * scale, scale * 0.09, 8.2 * scale);
    boardFoundamentGeometry.computeFaceNormals();
    boardFoundamentGeometry.computeVertexNormals();

    const material = new THREE.MeshLambertMaterial({ color: COLORS.board.Fundament });

    this.boardFundament = new THREE.Mesh(boardFoundamentGeometry, material);
    this.boardFundament.position.x = 3.5;
    this.boardFundament.position.y = -0.05;
    this.boardFundament.position.z = 3.5;

    this.appendToScene(scene);
  }

  whiteField = (position, scale) => {
    return this.field(position, scale, COLORS.board.White);
  };

  blackField = (position, scale) => {
    return this.field(position, scale, COLORS.board.Black);
  };

  field = (position, scale, fieldColor) => {
    const geometry = new THREE.CubeGeometry(scale, scale * 0.1, scale);
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    const material = new THREE.MeshLambertMaterial({ color: fieldColor });
    material.side = THREE.DoubleSide;
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = position.x;
    cube.position.y = position.y - 0.05;
    cube.position.z = position.z;
    return cube;
  };

  appendToScene = scene => {
    this.board.forEach(row => {
      row.forEach(field => {
        scene.add(field);
      });
    });

    scene.add(this.boardFundament);
  };

  initPieces = (gameBoard, scene) => {
    gameBoard.board.board.forEach((row, i) => {
      row.forEach((pion, j) => {
        const rotation = PieceColorEnum.White === pion.color ? -Math.PI / 2 : Math.PI / 2;
        switch (pion.piece) {
          case Piece.Pawn:
            const pawn = new Pawn(i, j, 0, pion.color, scene);
            this.pieces.push(pawn);
            break;
          case Piece.King:
            const king = new King(i, j, 0, pion.color, scene);
            this.pieces.push(king);
            break;
          case Piece.Queen:
            const queen = new Queen(i, j, rotation, pion.color, scene);
            this.pieces.push(queen);
            break;
          case Piece.Rook:
            const rook = new Rook(i, j, 0, pion.color, scene);
            this.pieces.push(rook);
            break;
          case Piece.Bishop:
            const bishop = new Bishop(i, j, rotation, pion.color, scene);
            this.pieces.push(bishop);
            break;
          case Piece.Knight:
            const knight = new Knight(i, j, rotation, pion.color, scene);
            this.pieces.push(knight);
            break;
        }
      })
    })
  }

  clickableElements = () => {
    return [
      ...this.pieces.map(p => p.model), ...this.board.reduce((arr, curr) => arr.concat(curr), [])
    ]
  }

  updatePionPosition = (from, to) => {
    const index = this.pieces.findIndex(e => e.position.x == from.x && e.position.z == from.z);
    if (index !== -1) {
      const piece = this.pieces[index];
      piece.position.x = to.x;
      piece.position.z = to.z;
    }
  }
}

export { Board };
