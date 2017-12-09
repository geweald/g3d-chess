import * as THREE from "three";
import { DoubleSide } from "three";
import { King } from './King';
import { Bishop } from './Bishop';
import { Queen } from './Queen';
import { Knight } from './Knight';
import { Pawn } from './Pawn';
import { Rook } from './Rook';
class Board {

    constructor(scale, position)  {
        this.board = new Array(8);
        for(var i =0; i < this.board.length; ++i) {
            this.board[i] = new Array(8);
            for(let j =0; j < this.board[i].length; ++j){
                const fieldPosition = {
                    x: position.x + scale * i,
                    y: position.y,
                    z: position.z + scale * j
                }
                if(((i+j) %2) === 0)
                    this.board[i][j] = this.blackField(fieldPosition, scale);
                else
                    this.board[i][j] = this.whiteField(fieldPosition, scale); 
            }
        }
    }

    whiteField = (position, scale) => {
        return this.field(position, scale, 0xffffff);
    }

    blackField = (position, scale) => {
        return this.field(position, scale, 0xf4a460);
    }

    field = (position, scale, fieldColor) => {
        const geometry = new THREE.CubeGeometry(scale, scale * 0.1, scale);
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        const material = new THREE.MeshBasicMaterial({color: fieldColor});
        material.side = THREE.DoubleSide;
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = position.x;
        cube.position.y = position.y - 0.05;
        cube.position.z = position.z;
        return cube;
    }

    appendToScene = (scene) => {
        this.board.forEach(row => {
            row.forEach(
                field => {
                    scene.add(field);
                }
            )
        });
        
        const white = 0xffffff;
        const black = 0xf4a460;
        new Rook(0, 0, 0, white, scene);
        new Knight(0, 1, -Math.PI/2, white, scene);
        new Bishop(0, 2, 0, white, scene);
        new King(0, 3, 0, white, scene);
        new Queen(0, 4, -Math.PI/2, white, scene);
        new Bishop(0, 5, 0, white, scene);
        new Knight(0, 6, -Math.PI/2, white, scene);
        new Rook(0, 7, 0, white, scene);
        for(let i =0;i<8; ++i)
            new Pawn(1, i, 0, white, scene);
        
        new Rook(7, 0, 0, black, scene);
        new Knight(7, 1, Math.PI/2, black, scene);
        new Bishop(7, 2, 0, black, scene);
        new King(7, 3, 0, black, scene);
        new Queen(7, 4, Math.PI/2, black, scene);
        new Bishop(7, 5, 0, black, scene);
        new Knight(7, 6, Math.PI/2, black, scene);
        new Rook(7, 7, 0, black, scene);
        for(let i =0;i<8; ++i)
            new Pawn(6, i, 0, black, scene);
            
    }
}

export { Board }