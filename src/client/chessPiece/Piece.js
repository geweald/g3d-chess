import * as THREE from "three";

class Piece {
  constructor() {
    this.loader = new THREE.JSONLoader();
  }
  load(x, z, rotation, scale, pieceColor, scene) {
    this.loader.load(
      `../assets/${this.name}.json`,
      (obj, mat) => {
        this.model = new THREE.Mesh(
          obj,
          new THREE.MeshLambertMaterial({ color: pieceColor })
        );
        this.model.position.x = x;
        this.model.position.z = z;
        this.model.rotation.y = rotation;
        this.model.scale.x = scale;
        this.model.scale.y = scale;
        this.model.scale.z = scale;
        scene.add(this.model);
      },
      xhr => {},
      xhr => console.error("An error happened")
    );
  }
}

export { Piece };
