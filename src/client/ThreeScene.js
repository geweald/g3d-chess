import * as THREE from "three";
import { Board } from "./chessPiece/Board";
import { CameraController } from "./utils/CameraController";

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
    this.renderer.shadowMap.enabled = true;
  }

  init = domElement => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    domElement.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color(0xff0000);
    this.camera.position.z = 5;
    this.addLights();
    this.animate();
    this.initBoard();
    this.cameraController = new CameraController(this.camera, domElement);
  };

  animate = () => {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate);
  };

  addLights = () => {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);

    //spotLight.castShadow = true;

    this.scene.add(spotLight);
  };

  initBoard = () => {
    // todo do nowych zmiennych stalych gdzies
    const scale = 1;
    const boardPositon = {
      x: 0,
      y: 0,
      z: 0
    };

    this.board = new Board(scale, boardPositon);
    this.board.appendToScene(this.scene);
  };
}

export default () => new ThreeScene();
