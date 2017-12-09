import * as THREE from "three";
import { Board } from "./chessPiece/Board";
import { CameraController } from "./utils/CameraController";

class ThreeScene {
  constructor() {
    this.scene = new THREE.Scene();


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.shadowMap.enabled = true;
  }

  init = (domElement, gameBoard) => {
    this.domElement = domElement;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    domElement.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color(0xff0000);
    this.addLights();
    this.initBoard(gameBoard);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.cameraController = new CameraController(camera, domElement);

    this.animate();
  };

  animate = () => {
    this.renderer.render(this.scene, this.cameraController.camera);
    requestAnimationFrame(this.animate);
  };

  addLights = () => {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 60, 0);

    spotLight.castShadow = true;

    this.scene.add(spotLight);
  };

  initBoard = (gameBoard) => {
    // todo do nowych zmiennych stalych gdzies
    const scale = 1;
    const boardPositon = {
      x: 0,
      y: 0,
      z: 0
    };

    this.board = new Board(scale, boardPositon, gameBoard, this.scene);
  };


  updatePioPosition = (form, to) => {
    this.board.updatePionPosition(from, to);
  }

  subscribeOnClick = callback => {
    this.callback = callback;
    this.domElement.addEventListener("mousedown", this.onMouseDown, false);
  }
  onMouseDown = (event) => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, this.cameraController.camera);
    const intersects = raycaster.intersectObjects(this.scene.children, false);
    if (intersects.length > 0) {
      const inter = intersects[0].object;
      const clickable = this.board.clickableElements();
      const index = clickable.findIndex(e => e === inter);
      if (index !== -1) {
        const element = clickable[index];
        this.callback(element.position.x, element.position.z);
      }
    }
  }
}

export default () => new ThreeScene();
