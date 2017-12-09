import * as THREE from "three";
import { DoubleSide } from "three";

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
                    this.board[i][j] = this.whiteField(fieldPosition, scale);
                else
                    this.board[i][j] = this.blackField(fieldPosition, scale); 
            }
        }
    }

    whiteField = (position, scale) => {
        return this.field(position, scale, 0xffffff);
    }

    blackField = (position, scale) => {
        return this.field(position, scale, 0x000000);
    }

    field = (position, scale, fieldColor) => {
        const geometry = new THREE.CubeGeometry(scale, scale * 0.1, scale);
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        const material = new THREE.MeshBasicMaterial({color: fieldColor});
        material.side = THREE.DoubleSide;
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;
        return cube;
    }

    appendToScene = (scene) => {
        this.board.forEach(row => {
            console.log("a")
            row.forEach(
                field => {
                    scene.add(field);
                }
            )
        });
    }
}

export { Board }