import * as THREE from "three"

class ThreeScene {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    )

    this.renderer = new THREE.WebGLRenderer()
    this.loader = new THREE.ObjectLoader()
  }
  
  init = (domElement) => {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    domElement.appendChild(this.renderer.domElement)
    this.scene.background = new THREE.Color( 0xff0000 );
    this.camera.position.z = 5
    this.loader.load(
      "../assets/rook.json",
      obj => this.scene.add(obj),
      xhr => console.log(xhr.loaded / xhr.total * 100 + "% loaded"),
      xhr => console.error("An error happened"),
    )
    this.animate()
  }

  animate = () => {
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.animate)
  }
}

// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   100,
// )
// const renderer = new THREE.WebGLRenderer()
// const loader = new THREE.ObjectLoader()

// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

// loader.load(
//   "../assets/pawn.json",
//   obj => scene.add(obj),
//   xhr => console.log(xhr.loaded / xhr.total * 100 + "% loaded"),
//   xhr => console.error("An error happened"),
// )

// camera.position.z = 5

// function animate() {
//   requestAnimationFrame(animate)

//   cube.rotation.x += 0.01
//   cube.rotation.y += 0.01
//   renderer.render(scene, camera)
// }
// animate()
const game = new ThreeScene()
game.init(document.body)