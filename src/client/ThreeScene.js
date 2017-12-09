import * as THREE from "three";

class ThreeScene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    this.renderer = new THREE.WebGLRenderer();
    this.loader = new THREE.ObjectLoader();
  }

  init = domElement => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    domElement.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color(0xff0000);
    this.camera.position.z = 5;
    this.loader.load(
      "../assets/rook.json",
      obj => this.scene.add(obj),
      xhr => {},
      xhr => console.error("An error happened")
    );
    this.animate();
  };

  animate = () => {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };
}

export default () => new ThreeScene();
