import * as THREE from "three";
import { Board } from './chessPiece/Board'
import { CameraController } from './utils/CameraController';
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
    this.renderer.shadowMapEnabled = true;
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
    // const light = new THREE.PointLight(0xFFFFFF, 1, 100000);
    // light.position.x = 10;
    // light.position.y = 10;
    // light.position.z = 20;
    // light.intensity  = 0.5;
    // this.scene.add(light);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);

    spotLight.castShadow = true;

    this.scene.add(spotLight);
  }

  initBoard = () => {
    // todo do nowych zmiennych stalych gdzies
    const scale = 1;
    const boardCenterPositon = {
      x:0,
      y:0,
      z:0
    }

    this.board = new Board(scale, boardCenterPositon);
    this.board.appendToScene(this.scene);
  }
}

export default () => new ThreeScene();
