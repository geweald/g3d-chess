import * as THREE from "three";
import { Board } from "./chessPiece/Board";
import { CameraController } from "./helpers/CameraController";
import { COLORS } from "./constants";

class ThreeScene {
  raycaster = new THREE.Raycaster();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer({ alpha: true });
  mouseVector = new THREE.Vector2();
  callbacks = [];

  init = (domElement, gameBoard) => {
    this.domElement = domElement;

    this.renderer.shadowMap.enabled = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.addLights();
    this.initBoard(gameBoard);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.cameraController = new CameraController(camera, domElement);

    this.domElement.appendChild(this.renderer.domElement);
    this.domElement.addEventListener("mousedown", this.onMouseDown, false);

    this.animate();

    window.addEventListener("resize", this.onWindowResize, false);
  };

  onWindowResize = () => {
    this.cameraController.camera.aspect =
      window.innerWidth / window.innerHeight;
    this.cameraController.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
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

  initBoard = gameBoard => {
    const scale = 1;
    const boardPositon = {
      x: 0,
      y: 0,
      z: 0
    };

    this.board = new Board(scale, boardPositon, gameBoard, this.scene);
  };

  reset = gameBoard => {
    this.board.resetPiecesPositions(gameBoard);
  };

  updatePioPosition = (from, to) => {
    const newFrom = { x: from.x, z: from.y };
    const newTo = { x: to.x, z: to.y };

    this.board.updatePionPosition(newFrom, newTo);
  };

  subscribeOnClick = callback => {
    this.callbacks.push(callback);
  };

  unsubscribeOnClick = callback => {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  };

  onMouseDown = event => {
    if (!this.callbacks.length) return;

    this.mouseVector.x =
      event.clientX / this.renderer.domElement.clientWidth * 2 - 1;
    this.mouseVector.y =
      -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    this.raycaster.setFromCamera(
      this.mouseVector,
      this.cameraController.camera
    );
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    if (intersects.length > 0) {
      const element = intersects[0].object;
      if (element) {
        this.callbacks.forEach(cb =>
          cb({ x: element.position.x, y: element.position.z })
        );
      }
    }
  };

  updatePionColor = (position, color) => {
    this.board.updatePionColor(position, color);
  };
}

export default () => new ThreeScene();
