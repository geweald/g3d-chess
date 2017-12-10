import * as THREE from "three";
import { COLORS } from "../constants";

const loader = new THREE.JSONLoader();

class Piece {
  load(x, z, rotation, scale, pieceColor, scene) {
    loader.load(
      `../assets/${this.name}.json`,
      obj => {
        this.model = new THREE.Mesh(
          obj,
          new THREE.MeshLambertMaterial({
            color: COLORS.piece[pieceColor]
          })
        );
        this.model.position.x = x;
        this.model.position.z = z;
        this.model.rotation.y = rotation;
        this.model.scale.x = scale;
        this.model.scale.y = scale;
        this.model.scale.z = scale;
        scene.add(this.model);
      },
      xhr => { },
      xhr => console.error("An error happened")
    );
  }

  setColor(color) => {
  this.model.material.color.setHex(color);
}
}

export { Piece };
